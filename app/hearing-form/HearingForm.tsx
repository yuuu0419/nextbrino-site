"use client";
import { useState } from "react";
import { SECTIONS, type Question } from "./questions";

type Answers = Record<string, string>;
type CheckedAnswers = Record<string, string[]>;
type SubAnswers = Record<string, string>;

const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日"];

function generateTimeOptions(): string[] {
  const opts: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      opts.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  opts.push("24:00");
  return opts;
}
const TIME_OPTIONS = generateTimeOptions();

type DayHours = { closed: boolean; start: string; end: string };
type HoursState = { days: Record<string, DayHours>; holidayClosed: boolean; otherHolidays: string };

const EMPTY_HOURS: HoursState = {
  days: Object.fromEntries(WEEKDAYS.map((d) => [d, { closed: false, start: "", end: "" }])),
  holidayClosed: false,
  otherHolidays: "",
};

function BusinessHoursField({ value, onChange }: { value: HoursState; onChange: (v: HoursState) => void }) {
  const updateDay = (day: string, patch: Partial<DayHours>) =>
    onChange({ ...value, days: { ...value.days, [day]: { ...value.days[day], ...patch } } });

  return (
    <div className="hf-hours">
      {WEEKDAYS.map((day) => (
        <div key={day} className="hf-hours-row">
          <span className="hf-hours-day">{day}</span>
          <label className="hf-choice-label hf-hours-closed">
            <input
              type="checkbox"
              className="hf-checkbox"
              checked={value.days[day].closed}
              onChange={() => updateDay(day, { closed: !value.days[day].closed })}
            />
            <span>休み</span>
          </label>
          <div className="hf-hours-time">
            <select
              className="hf-input hf-hours-select"
              disabled={value.days[day].closed}
              value={value.days[day].start}
              onChange={(e) => updateDay(day, { start: e.target.value })}
            >
              <option value="">--:--</option>
              {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <span className="hf-hours-tilde">〜</span>
            <select
              className="hf-input hf-hours-select"
              disabled={value.days[day].closed}
              value={value.days[day].end}
              onChange={(e) => updateDay(day, { end: e.target.value })}
            >
              <option value="">--:--</option>
              {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      ))}
      <label className="hf-choice-label hf-hours-holiday">
        <input
          type="checkbox"
          className="hf-checkbox"
          checked={value.holidayClosed}
          onChange={() => onChange({ ...value, holidayClosed: !value.holidayClosed })}
        />
        <span>祝日休み</span>
      </label>
      <input
        type="text"
        className="hf-input hf-sub-input"
        placeholder="その他休日 例）○/○〜○/○ 夏季休業"
        value={value.otherHolidays}
        onChange={(e) => onChange({ ...value, otherHolidays: e.target.value })}
      />
    </div>
  );
}

export default function HearingForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState<CheckedAnswers>({});
  const [subAnswers, setSubAnswers] = useState<SubAnswers>({});
  const [businessHours, setBusinessHours] = useState<Record<string, HoursState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const setAnswer = (id: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setAnswers((prev) => ({ ...prev, [id]: e.target.value }));

  const setSub = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setSubAnswers((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleCheckbox = (id: string, option: string) => {
    setChecked((prev) => {
      const current = prev[id] ?? [];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      return { ...prev, [id]: next };
    });
  };

  const buildRows = (): { label: string; value: string }[] => {
    const rows: { label: string; value: string }[] = [];
    SECTIONS.forEach((section, sIdx) => {
      section.questions.forEach((question, qIdx) => {
        const id = `s${sIdx}-q${qIdx}`;
        if (question.type === "text") {
          rows.push({ label: question.label, value: answers[id] ?? "" });
        } else if (question.type === "two-text") {
          question.subLabels?.forEach((subLabel, i) => {
            rows.push({ label: `${question.label}_${subLabel}`, value: subAnswers[`${id}__${i}`] ?? "" });
          });
        } else if (question.type === "business-hours") {
          const hours = businessHours[id] ?? EMPTY_HOURS;
          WEEKDAYS.forEach((day) => {
            const d = hours.days[day];
            const value = d.closed ? "休み" : d.start && d.end ? `${d.start}〜${d.end}` : "";
            rows.push({ label: `営業時間_${day}`, value });
          });
          rows.push({ label: "祝日休み", value: hours.holidayClosed ? "はい" : "いいえ" });
          rows.push({ label: "その他休日", value: hours.otherHolidays });
        } else if (question.type === "radio") {
          const selected = answers[id] ?? "";
          const sub = selected ? subAnswers[`${id}__${selected}`] : "";
          rows.push({ label: question.label, value: sub ? `${selected}（${sub}）` : selected });
        } else if (question.type === "checkbox") {
          const selectedOpts = checked[id] ?? [];
          const formatted = selectedOpts.map((opt) => {
            const sub = subAnswers[`${id}__${opt}`];
            return sub ? `${opt}（${sub}）` : opt;
          });
          rows.push({ label: question.label, value: formatted.join("、") });
        }
      });
    });
    return rows;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/hearing-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: buildRows() }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const renderQuestion = (id: string, question: Question) => {
    const { type, placeholder, options } = question;

    if (type === "text") {
      return (
        <input
          type="text"
          className="hf-input"
          placeholder={placeholder}
          value={answers[id] ?? ""}
          onChange={setAnswer(id)}
        />
      );
    }

    if (type === "two-text") {
      return (
        <div className="hf-two-text">
          {question.subLabels?.map((subLabel, i) => (
            <div key={subLabel} className="hf-two-text-item">
              <span className="hf-two-text-label">{subLabel}</span>
              <input
                type="text"
                className="hf-input"
                placeholder={question.subPlaceholders?.[i]}
                value={subAnswers[`${id}__${i}`] ?? ""}
                onChange={setSub(`${id}__${i}`)}
              />
            </div>
          ))}
        </div>
      );
    }

    if (type === "business-hours") {
      return (
        <BusinessHoursField
          value={businessHours[id] ?? EMPTY_HOURS}
          onChange={(v) => setBusinessHours((prev) => ({ ...prev, [id]: v }))}
        />
      );
    }

    if (type === "radio") {
      return (
        <div className="hf-choices">
          {options?.map((opt) => (
            <div key={opt.label}>
              <label className="hf-choice-label">
                <input
                  type="radio"
                  name={id}
                  className="hf-radio"
                  checked={answers[id] === opt.label}
                  onChange={() => setAnswers((prev) => ({ ...prev, [id]: opt.label }))}
                />
                <span>{opt.label}</span>
              </label>
              {opt.subPlaceholder && answers[id] === opt.label && (
                <input
                  type="text"
                  className="hf-input hf-sub-input"
                  placeholder={opt.subPlaceholder}
                  value={subAnswers[`${id}__${opt.label}`] ?? ""}
                  onChange={setSub(`${id}__${opt.label}`)}
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    if (type === "checkbox") {
      return (
        <div className="hf-choices">
          {options?.map((opt) => {
            const isChecked = (checked[id] ?? []).includes(opt.label);
            return (
              <div key={opt.label}>
                <label className="hf-choice-label">
                  <input
                    type="checkbox"
                    className="hf-checkbox"
                    checked={isChecked}
                    onChange={() => toggleCheckbox(id, opt.label)}
                  />
                  <span>{opt.label}</span>
                </label>
                {opt.subPlaceholder && isChecked && (
                  <input
                    type="text"
                    className="hf-input hf-sub-input"
                    placeholder={opt.subPlaceholder}
                    value={subAnswers[`${id}__${opt.label}`] ?? ""}
                    onChange={setSub(`${id}__${opt.label}`)}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  if (status === "done") {
    return (
      <div className="hf-complete">
        <p className="hf-complete-title">送信が完了しました</p>
        <p className="hf-complete-text">ご協力いただきありがとうございます。<br />内容を確認のうえ、担当者よりご連絡いたします。</p>
        <style>{`
          .hf-complete { text-align: center; padding: 80px 0; }
          .hf-complete-title { font-size: 1.4rem; font-weight: 700; color: #15263b; margin-bottom: 16px; }
          .hf-complete-text { font-size: .95rem; line-height: 2; color: rgba(21,38,59,0.75); }
        `}</style>
      </div>
    );
  }

  return (
    <form className="hf-form" onSubmit={handleSubmit}>
      {SECTIONS.map((section, sIdx) => (
        <div key={section.title} className="hf-section">
          <p className="hf-section-title">{section.title}</p>
          <div className="hf-table">
            {section.questions.map((question, qIdx) => {
              const id = `s${sIdx}-q${qIdx}`;
              return (
                <div key={id} className="hf-row">
                  <div className="hf-label-cell">
                    <span>{question.label}</span>
                    {question.required ? (
                      <span className="hf-req">必須</span>
                    ) : (
                      <span className="hf-opt">任意</span>
                    )}
                  </div>
                  <div className="hf-input-cell">{renderQuestion(id, question)}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {status === "error" && (
        <p className="hf-error">送信に失敗しました。時間をおいて再度お試しください。</p>
      )}

      <div className="hf-submit-wrap">
        <button type="submit" className="hf-submit" disabled={status === "sending"}>
          {status === "sending" ? "送信中..." : "送信する"}
        </button>
      </div>

      <style>{`
        .hf-form { display: flex; flex-direction: column; }

        .hf-section { margin-bottom: 40px; }
        .hf-section-title {
          font-size: 1rem;
          font-weight: 700;
          color: #15263b;
          letter-spacing: .04em;
          margin: 0 0 4px;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(21,38,59,0.35);
        }

        .hf-table { width: 100%; }

        .hf-row {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid rgba(21,38,59,0.15);
          padding: 22px 0;
        }

        .hf-label-cell {
          width: 320px;
          min-width: 320px;
          font-size: .88rem;
          font-weight: 700;
          color: rgba(21,38,59,0.9);
          letter-spacing: .02em;
          line-height: 1.7;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 8px;
          padding-right: 24px;
          padding-top: 10px;
        }

        .hf-req {
          font-size: .72rem;
          background: #1565c0;
          color: #fff;
          padding: 2px 8px;
          border-radius: 2px;
          letter-spacing: .06em;
          font-weight: 700;
          flex-shrink: 0;
        }
        .hf-opt {
          font-size: .72rem;
          background: rgba(21,38,59,0.12);
          color: rgba(21,38,59,0.7);
          padding: 2px 8px;
          border-radius: 2px;
          letter-spacing: .06em;
          font-weight: 700;
          flex-shrink: 0;
        }

        .hf-input-cell {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .hf-input {
          width: 100%;
          padding: 11px 14px;
          border: 1px solid rgba(21,38,59,0.2);
          border-radius: 4px;
          font-size: .9rem;
          font-family: var(--font-main);
          color: #15263b;
          background: rgba(255,255,255,0.55);
          outline: none;
          box-sizing: border-box;
          transition: border-color .2s, background .2s;
        }
        .hf-input::placeholder { color: rgba(21,38,59,0.35); }
        .hf-input:focus { border-color: rgba(21,38,59,0.5); background: rgba(255,255,255,0.8); }
        .hf-input:disabled { opacity: .4; }

        .hf-choices { display: flex; flex-direction: column; gap: 10px; padding-top: 6px; }
        .hf-choice-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: .88rem;
          color: rgba(21,38,59,0.85);
          cursor: pointer;
        }
        .hf-radio, .hf-checkbox { accent-color: #15263b; width: 16px; height: 16px; flex-shrink: 0; }
        .hf-sub-input { margin: 6px 0 4px; max-width: 420px; }

        .hf-two-text { display: flex; flex-direction: column; gap: 14px; }
        .hf-two-text-item { display: flex; flex-direction: column; gap: 6px; }
        .hf-two-text-label { font-size: .78rem; color: rgba(21,38,59,0.55); font-weight: 700; }

        .hf-hours { display: flex; flex-direction: column; gap: 10px; padding-top: 4px; }
        .hf-hours-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .hf-hours-day {
          width: 22px;
          font-size: .88rem;
          font-weight: 700;
          color: rgba(21,38,59,0.85);
          flex-shrink: 0;
        }
        .hf-hours-closed { flex-shrink: 0; }
        .hf-hours-time { display: flex; align-items: center; gap: 8px; }
        .hf-hours-select { width: auto; min-width: 100px; padding: 8px 10px; }
        .hf-hours-tilde { color: rgba(21,38,59,0.5); }
        .hf-hours-holiday { margin-top: 6px; }

        .hf-error {
          text-align: center;
          font-size: .85rem;
          color: #c0392b;
          margin-bottom: 16px;
        }

        .hf-submit-wrap { text-align: center; margin-bottom: 8px; }
        .hf-submit:disabled { opacity: .45; cursor: not-allowed; }
        .hf-submit {
          display: inline-block;
          width: 100%;
          max-width: 600px;
          padding: 18px 0;
          background: rgba(21,38,59,0.85);
          color: #fff;
          border: 1px solid rgba(21,38,59,0.9);
          font-size: .95rem;
          letter-spacing: .2em;
          font-family: var(--font-main);
          font-weight: 700;
          cursor: pointer;
          border-radius: 4px;
          transition: background .25s, border-color .25s;
        }
        .hf-submit:hover { background: #15263b; border-color: #15263b; }

        @media (max-width: 640px) {
          .hf-row { flex-direction: column; gap: 10px; padding: 18px 0; }
          .hf-label-cell { width: 100%; min-width: unset; padding-top: 0; padding-right: 0; }
          .hf-input-cell { width: 100%; }
          .hf-sub-input { max-width: 100%; }
          .hf-hours-row { gap: 10px; }
          .hf-hours-select { min-width: 88px; }
          .hf-submit { max-width: 80%; padding: 12px 0; font-size: .82rem; }
        }
      `}</style>
    </form>
  );
}
