"use client";
import { useState } from "react";
import { SECTIONS, type Question } from "./questions";

type Answers = Record<number, string>;
type CheckedAnswers = Record<number, string[]>;

export default function HearingForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState<CheckedAnswers>({});
  const [otherText, setOtherText] = useState<Answers>({});
  const [status, setStatus] = useState<"idle" | "notice">("idle");

  const setAnswer = (no: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setAnswers((prev) => ({ ...prev, [no]: e.target.value }));

  const setOther = (no: number) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setOtherText((prev) => ({ ...prev, [no]: e.target.value }));

  const toggleCheckbox = (no: number, option: string) => {
    setChecked((prev) => {
      const current = prev[no] ?? [];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      return { ...prev, [no]: next };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("notice");
  };

  const renderQuestion = (question: Question) => {
    const { no, type, placeholder, options } = question;
    const hasOther = options?.includes("その他");

    if (type === "text" || type === "date") {
      return (
        <input
          type={type === "date" ? "text" : "text"}
          className="hf-input"
          placeholder={placeholder}
          value={answers[no] ?? ""}
          onChange={setAnswer(no)}
        />
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          className="hf-input hf-textarea"
          placeholder={placeholder}
          value={answers[no] ?? ""}
          onChange={setAnswer(no)}
        />
      );
    }

    if (type === "radio") {
      return (
        <div className="hf-choices">
          {options?.map((opt) => (
            <label key={opt} className="hf-choice-label">
              <input
                type="radio"
                name={`q${no}`}
                className="hf-radio"
                checked={answers[no] === opt}
                onChange={() => setAnswers((prev) => ({ ...prev, [no]: opt }))}
              />
              <span>{opt}</span>
            </label>
          ))}
          {hasOther && (
            <input
              type="text"
              className="hf-input hf-other-input"
              placeholder="その他の内容があればご記入ください"
              value={otherText[no] ?? ""}
              onChange={setOther(no)}
            />
          )}
        </div>
      );
    }

    if (type === "checkbox") {
      return (
        <div className="hf-choices">
          {options?.map((opt) => (
            <label key={opt} className="hf-choice-label">
              <input
                type="checkbox"
                className="hf-checkbox"
                checked={(checked[no] ?? []).includes(opt)}
                onChange={() => toggleCheckbox(no, opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
          {hasOther && (
            <input
              type="text"
              className="hf-input hf-other-input"
              placeholder="その他の内容があればご記入ください"
              value={otherText[no] ?? ""}
              onChange={setOther(no)}
            />
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <form className="hf-form" onSubmit={handleSubmit}>
      {SECTIONS.map((section) => (
        <div key={section.title} className="hf-section">
          <p className="hf-section-title">{section.title}</p>
          <div className="hf-table">
            {section.questions.map((question) => (
              <div key={question.no} className="hf-row">
                <div className="hf-label-cell">
                  <span className="hf-no">Q{question.no}</span>
                  <span>{question.q}</span>
                </div>
                <div className="hf-input-cell">{renderQuestion(question)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {status === "notice" && (
        <p className="hf-notice">
          ご入力ありがとうございます。現在この送信機能は準備中です。スプレッドシート連携の設定が完了次第、送信できるようになります。
        </p>
      )}

      <div className="hf-submit-wrap">
        <button type="submit" className="hf-submit">送信する</button>
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
          gap: 8px;
          padding-right: 24px;
          padding-top: 10px;
        }
        .hf-no {
          flex-shrink: 0;
          font-size: .72rem;
          font-weight: 700;
          color: rgba(21,38,59,0.5);
          padding-top: 1px;
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
        .hf-textarea { min-height: 110px; resize: vertical; }

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
        .hf-other-input { margin-top: 4px; max-width: 420px; }

        .hf-notice {
          text-align: center;
          font-size: .85rem;
          color: rgba(21,38,59,0.75);
          background: rgba(21,38,59,0.06);
          border: 1px solid rgba(21,38,59,0.2);
          border-radius: 4px;
          padding: 16px 20px;
          margin-bottom: 24px;
          line-height: 1.8;
        }

        .hf-submit-wrap { text-align: center; margin-bottom: 8px; }
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
          .hf-other-input { max-width: 100%; }
          .hf-submit { max-width: 80%; padding: 12px 0; font-size: .82rem; }
        }
      `}</style>
    </form>
  );
}
