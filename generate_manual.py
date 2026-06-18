#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
NEXT BRINO お問い合わせシステム 完全実装マニュアル PDF生成スクリプト
フォント: Noto Sans JP (Regular / Bold)
"""

import os
import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether, ListFlowable, ListItem
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── フォント登録 ──────────────────────────────
BASE = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.join(BASE, ".build-assets")
pdfmetrics.registerFont(TTFont('JA',   os.path.join(FONT_DIR, 'NotoSansJP-Regular.ttf')))
pdfmetrics.registerFont(TTFont('JA-B', os.path.join(FONT_DIR, 'NotoSansJP-Bold.ttf')))
pdfmetrics.registerFont(TTFont('SYM',  os.path.join(FONT_DIR, 'SymbolFallback.ttf')))
registerFontFamily('JA', normal='JA', bold='JA-B', italic='JA', boldItalic='JA-B')

# Noto Sans JP（japaneseサブセット）に無い記号を Arial Unicode で補う
from fontTools.ttLib import TTFont as _FT
_JA_CMAP = set(_FT(os.path.join(FONT_DIR, 'NotoSansJP-Regular.ttf')).getBestCmap().keys())

def fb(text):
    """欠落グリフだけ <font name='SYM'> で囲む（HTMLエスケープ済み文字列に適用）"""
    out, run, in_sym = [], [], False
    def flush():
        if run:
            seg = ''.join(run)
            out.append(f'<font name="SYM">{seg}</font>' if in_sym else seg)
            run.clear()
    i = 0
    # タグを壊さないよう、<...> はそのまま通す
    while i < len(text):
        ch = text[i]
        if ch == '<':
            j = text.find('>', i)
            if j != -1:
                flush()
                out.append(text[i:j+1])
                i = j + 1
                continue
        if ch in ('&',):
            # エンティティ（&amp; 等）はそのまま
            j = text.find(';', i)
            if j != -1 and j - i <= 6:
                flush()
                out.append(text[i:j+1])
                i = j + 1
                continue
        need_sym = (ord(ch) > 0x2000 and ch not in '　〜・｜「」『』【】、。') and (ord(ch) not in _JA_CMAP)
        if need_sym != in_sym:
            flush()
            in_sym = need_sym
        run.append(ch)
        i += 1
    flush()
    return ''.join(out)

# ── カラー ────────────────────────────────────
NAVY      = colors.HexColor('#15263b')
NAVY_DARK = colors.HexColor('#0d1e33')
NAVY_LT   = colors.HexColor('#1d3560')
GOLD      = colors.HexColor('#9d8c56')
GOLD_LT   = colors.HexColor('#c4b07a')
BG_LIGHT  = colors.HexColor('#f4f5f3')
BG_BLUE   = colors.HexColor('#eef2f7')
BG_CODE   = colors.HexColor('#11202f')
TEXT_MAIN = colors.HexColor('#222222')
TEXT_SUB  = colors.HexColor('#5a5a5a')
WHITE     = colors.white
GREEN_BG  = colors.HexColor('#e3f3e8')
GREEN_TX  = colors.HexColor('#1a5c32')
WARN_BG   = colors.HexColor('#fff4d6')
WARN_TX   = colors.HexColor('#7a4a00')
BLUE_BG   = colors.HexColor('#e4eefb')
BLUE_TX   = colors.HexColor('#1a3a66')

W, H = A4
CONTENT_W = W - 40*mm

# ── スタイル ──────────────────────────────────
_Paragraph = Paragraph
def Paragraph(text, style=None, **kw):  # noqa: F811  欠落記号を自動フォールバック
    return _Paragraph(fb(text), style, **kw)

def P(name, **kw):
    base = dict(fontName='JA', textColor=TEXT_MAIN)
    base.update(kw)
    return ParagraphStyle(name, **base)

ST = {
    'h1':    P('h1', fontName='JA-B', fontSize=21, leading=28, textColor=WHITE),
    'h1sub': P('h1sub', fontSize=9.5, leading=14, textColor=colors.HexColor('#9fb3c9')),
    'h2':    P('h2', fontName='JA-B', fontSize=14.5, leading=21, textColor=NAVY, spaceAfter=2, spaceBefore=14),
    'h3':    P('h3', fontName='JA-B', fontSize=11.5, leading=18, textColor=NAVY_DARK, spaceAfter=2, spaceBefore=8),
    'body':  P('body', fontSize=9.5, leading=16.5, spaceAfter=4),
    'bodyc': P('bodyc', fontSize=9.5, leading=16.5, spaceAfter=4),  # in-table body
    'small': P('small', fontSize=8.5, leading=14, textColor=TEXT_SUB, spaceAfter=2),
    'lead':  P('lead', fontSize=10, leading=18, textColor=TEXT_MAIN, spaceAfter=6),
    'code':  P('code', fontName='Courier', fontSize=8, leading=12.5,
               textColor=colors.HexColor('#e6f0ff'), backColor=BG_CODE,
               leftIndent=10, rightIndent=8, borderPad=8, spaceAfter=7, spaceBefore=0),
    'codelbl': P('codelbl', fontSize=7.5, leading=12, fontName='JA-B',
               textColor=NAVY_DARK, backColor=GOLD_LT,
               leftIndent=8, borderPad=4, spaceBefore=6, spaceAfter=0),
    'th':    P('th', fontName='JA-B', fontSize=9, leading=13, textColor=WHITE),
    'td':    P('td', fontSize=8.8, leading=14, textColor=TEXT_MAIN),
    'tdc':   P('tdc', fontName='Courier', fontSize=8, leading=13, textColor=TEXT_MAIN),
    'stepT': P('stepT', fontName='JA-B', fontSize=10.5, leading=16, textColor=NAVY, spaceAfter=3),
    'stepB': P('stepB', fontSize=9.3, leading=15.5, textColor=TEXT_MAIN, spaceAfter=2),
    'num':   P('num', fontName='JA-B', fontSize=22, leading=26, textColor=GOLD),
}

def callout(text, kind='tip'):
    cfg = {
        'tip':  ('✓', GREEN_BG, GREEN_TX),
        'warn': ('!', WARN_BG, WARN_TX),
        'info': ('i', BLUE_BG, BLUE_TX),
    }[kind]
    icon, bg, tx = cfg
    badge = Paragraph(f'<b>{icon}</b>', P('cb', fontName='JA-B', fontSize=12, textColor=tx, alignment=1))
    body  = Paragraph(text, P('cbody', fontSize=9, leading=15, textColor=tx))
    t = Table([[badge, body]], colWidths=[9*mm, CONTENT_W - 9*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (0,0), 4),
        ('LEFTPADDING', (1,0), (1,0), 6),
        ('RIGHTPADDING', (-1,0), (-1,0), 10),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LINEBEFORE', (0,0), (0,0), 3, tx),
    ]))
    return t

# ── ヘルパー ──────────────────────────────────
def section_header(title, subtitle=''):
    inner = [Paragraph(title, ST['h1'])]
    if subtitle:
        inner.append(Paragraph(subtitle, ST['h1sub']))
    t = Table([[inner]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), NAVY),
        ('LEFTPADDING', (0,0), (-1,-1), 16),
        ('RIGHTPADDING', (0,0), (-1,-1), 16),
        ('TOPPADDING', (0,0), (-1,-1), 13),
        ('BOTTOMPADDING', (0,0), (-1,-1), 13),
        ('LINEBEFORE', (0,0), (0,0), 4, GOLD),
    ]))
    return t

def gold_line(sa=8):
    return HRFlowable(width='100%', thickness=1.4, color=GOLD, spaceAfter=sa, spaceBefore=2)

def thin_line(sa=6):
    return HRFlowable(width='100%', thickness=0.6, color=colors.HexColor('#d8d8d8'), spaceAfter=sa, spaceBefore=2)

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def code_block(label, code_text):
    out = []
    if label:
        out.append(Paragraph('▍ ' + esc(label), ST['codelbl']))
    lines = code_text.split('\n')
    # 先頭・末尾の空行除去
    while lines and lines[0].strip() == '': lines.pop(0)
    while lines and lines[-1].strip() == '': lines.pop()

    def render_line(l):
        # 非ASCII（日本語等）は等幅フォントに無いので JA フォントで囲む
        res, buf, in_ja = [], [], False
        def flush():
            if buf:
                seg = esc(''.join(buf)).replace(' ', '&nbsp;')
                res.append(f'<font name="JA">{seg}</font>' if in_ja else seg)
                buf.clear()
        for ch in l:
            is_ja = ord(ch) > 0x7F
            if is_ja != in_ja:
                flush(); in_ja = is_ja
            buf.append(ch)
        flush()
        return ''.join(res)

    body = '<br/>'.join(render_line(l) for l in lines)
    out.append(Paragraph(body, ST['code']))
    return out

def numbered_step(n, title, body_lines):
    num = Paragraph(str(n).zfill(2), ST['num'])
    right = [Paragraph(title, ST['stepT'])]
    for b in body_lines:
        right.append(Paragraph(b, ST['stepB']))
    t = Table([[num, right]], colWidths=[14*mm, CONTENT_W - 14*mm])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (0,0), 2),
        ('RIGHTPADDING', (0,0), (0,0), 8),
        ('LEFTPADDING', (1,0), (1,0), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LINEAFTER', (0,0), (0,0), 1.5, GOLD),
    ]))
    return t

def data_table(headers, rows, col_widths):
    data = [[Paragraph(h, ST['th']) for h in headers]]
    for row in rows:
        data.append([Paragraph(c, ST['td']) for c in row])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), NAVY),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, BG_LIGHT]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cfcfcf')),
        ('LINEABOVE', (0,0), (-1,0), 0, NAVY),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    return t

def code_table(headers, rows, col_widths):
    """値がコード（等幅）のテーブル"""
    data = [[Paragraph(h, ST['th']) for h in headers]]
    for row in rows:
        cells = []
        for i, c in enumerate(row):
            style = ST['tdc'] if i == len(row)-1 else ST['td']
            cells.append(Paragraph(c, style))
        data.append(cells)
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), NAVY),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, BG_LIGHT]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cfcfcf')),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    return t

def diagram_box(html_text):
    p = Paragraph(html_text, P('dia', fontName='JA', fontSize=9.3,
                  textColor=colors.HexColor('#dce8f5'), leading=17))
    t = Table([[p]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CODE),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LINEBEFORE', (0,0), (0,0), 3, GOLD),
    ]))
    return t

# ── ページ装飾 ────────────────────────────────
def on_page(canvas, doc):
    canvas.saveState()
    # ヘッダー帯
    canvas.setFillColor(NAVY)
    canvas.rect(0, H - 8*mm, W, 8*mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD)
    canvas.rect(0, H - 8.6*mm, W, 0.6*mm, fill=1, stroke=0)
    # フッター
    canvas.setFont('JA', 7.5)
    canvas.setFillColor(TEXT_SUB)
    canvas.drawString(20*mm, 9*mm, 'NEXT BRINO ｜ お問い合わせシステム完全実装マニュアル')
    canvas.drawRightString(W - 20*mm, 9*mm, f'p. {doc.page}')
    canvas.setStrokeColor(colors.HexColor('#dddddd'))
    canvas.setLineWidth(0.5)
    canvas.line(20*mm, 12*mm, W - 20*mm, 12*mm)
    canvas.restoreState()

def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY_DARK)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # 上部�the gold accent lines
    canvas.setFillColor(GOLD)
    canvas.rect(0, H - 6*mm, W, 6*mm, fill=1, stroke=0)
    canvas.rect(0, 0, W, 6*mm, fill=1, stroke=0)
    # 同心円アーク（右上）
    canvas.setStrokeColor(colors.Color(0.616, 0.549, 0.337, alpha=0.18))
    for r in range(60, 260, 30):
        canvas.setLineWidth(0.8)
        canvas.circle(W, H, r, fill=0, stroke=1)
    canvas.restoreState()

# ── 表紙 ──────────────────────────────────────
def cover_page():
    e = []
    e.append(Spacer(1, 48*mm))
    e.append(Paragraph('NEXT BRINO',
        P('cv0', fontName='JA-B', fontSize=14, textColor=GOLD_LT, leading=20)))
    e.append(Spacer(1, 4*mm))
    e.append(Paragraph('お問い合わせシステム',
        P('cv1', fontName='JA-B', fontSize=30, textColor=WHITE, leading=40)))
    e.append(Paragraph('完全実装マニュアル',
        P('cv2', fontName='JA-B', fontSize=23, textColor=colors.HexColor('#aabbd0'), leading=34)))
    e.append(Spacer(1, 6*mm))
    e.append(HRFlowable(width='62%', thickness=2, color=GOLD, spaceAfter=10, hAlign='LEFT'))
    e.append(Paragraph(
        'Next.js + Resend + Notion で構築する、安全で無料の問い合わせ受付・自動返信・一覧管理システム',
        P('cv3', fontSize=10.5, textColor=colors.HexColor('#c8d4e0'), leading=18)))
    e.append(Spacer(1, 16*mm))

    items = [
        'クロードコードでのコーディング → GitHub → Vercel 公開という現行フロー前提',
        'Resend によるメール送信・自動返信の設定',
        'Notion データベースへの問い合わせ自動記録・一覧管理',
        'Honeypot / Rate Limiting / reCAPTCHA v3 / SPF・DKIM のセキュリティ実装',
        'コード全文・画面操作・チェックリストを収録（他の検索不要）',
    ]
    for it in items:
        e.append(Paragraph('▸ &nbsp;' + it,
            P('cvi', fontSize=10, textColor=WHITE, leading=20, leftIndent=6)))
    e.append(Spacer(1, 22*mm))
    date_str = datetime.date.today().strftime('%Y年%m月%d日')
    e.append(Paragraph(f'作成日：{date_str}',
        P('cvd', fontSize=9, textColor=colors.HexColor('#8fa0b5'), leading=15)))
    e.append(Paragraph('対象環境：Next.js 16（App Router）/ React 19 / Vercel / Resend / Notion API',
        P('cvd2', fontSize=9, textColor=colors.HexColor('#8fa0b5'), leading=15)))
    e.append(PageBreak())
    return e

# ── 目次 ──────────────────────────────────────
def toc_page():
    e = []
    e.append(section_header('目次', 'Table of Contents'))
    e.append(Spacer(1, 6*mm))
    chapters = [
        ('はじめに', 'このサイトの制作・公開の仕組み（現行フロー）'),
        ('第1章', 'システム全体構成を理解する'),
        ('第2章', '【準備①】Resend アカウントと API キー'),
        ('第3章', '【準備②】DNS 設定（SPF / DKIM / DMARC）'),
        ('第4章', '【準備③】Notion データベースの作成'),
        ('第5章', '【準備④】Google reCAPTCHA の取得'),
        ('第6章', '【実装①】フォームページのコーディング'),
        ('第7章', '【実装②】API（メール送信・自動返信・Notion 記録）'),
        ('第8章', '【実装③】セキュリティ対策の組み込み'),
        ('第9章', '環境変数の設定（ローカル & Vercel）'),
        ('第10章', 'GitHub へのプッシュと Vercel デプロイ'),
        ('第11章', '動作確認・テストチェックリスト'),
        ('第12章', '日常運用・問い合わせ管理フロー'),
        ('付録 A', 'よくあるエラーと対処法'),
        ('付録 B', '取得物チェックシート / 用語集'),
    ]
    rows = []
    for ch, title in chapters:
        rows.append([
            Paragraph(ch, P('tc', fontName='JA-B', fontSize=9.5, textColor=GOLD, leading=15)),
            Paragraph(title, P('tt', fontSize=9.5, textColor=TEXT_MAIN, leading=15)),
        ])
    t = Table(rows, colWidths=[26*mm, CONTENT_W - 26*mm])
    t.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [WHITE, BG_LIGHT]),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LINEBELOW', (0,0), (-1,-1), 0.3, colors.HexColor('#e0e0e0')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    e.append(t)
    e.append(Spacer(1, 6*mm))
    e.append(callout('本マニュアルは「これ一冊で実装完了」を目指して作成しています。コードは全文掲載しているため、上から順に進めれば動くようになります。', 'info'))
    e.append(PageBreak())
    return e

# ── はじめに ──────────────────────────────────
def intro():
    e = []
    e.append(section_header('はじめに　このサイトの制作・公開の仕組み',
        'How this website is built & published'))
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph(
        '本題に入る前に、現在の NEXT BRINO サイトが「どうやって作られ・公開されているか」を整理します。'
        'お問い合わせシステムも、この同じ流れの中に組み込みます。', ST['lead']))

    e.append(Paragraph('① 制作・公開の全体フロー', ST['h2']))
    e.append(gold_line())
    e.append(diagram_box(
        '<b>【1】 MacBook（ローカル環境）</b>　…　あなたのパソコン内にサイトのソースコードを保存<br/>'
        '　　　　　　↓<br/>'
        '<b>【2】 Claude Code でコーディング</b>　…　ターミナル上の AI でコードを編集・追加<br/>'
        '　　　　　　↓<br/>'
        '<b>【3】 ローカルで動作確認</b>　…　npm run dev で http://localhost:3000 を表示して確認<br/>'
        '　　　　　　↓<br/>'
        '<b>【4】 GitHub へ push</b>　…　git でコードをクラウド（GitHub）に保存・バージョン管理<br/>'
        '　　　　　　↓<br/>'
        '<b>【5】 Vercel が自動デプロイ</b>　…　GitHub の変更を検知して自動でビルド & 本番公開<br/>'
        '　　　　　　↓<br/>'
        '<b>【6】 https://nextbrino.com で公開</b>　…　世界中から閲覧可能に'
    ))
    e.append(Spacer(1, 4*mm))

    e.append(Paragraph('② 各ツールの役割', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['ツール / 場所', '役割', '今回の作業での使い方'],
        [
            ['MacBook（ローカル）', 'ソースコードの保存・編集場所', 'フォーム/APIファイルをここに作成'],
            ['Claude Code', 'ターミナル上の AI コーディング', 'コードの生成・修正を指示'],
            ['Git / GitHub', 'コードの保存・履歴管理', 'add → commit → push で公開反映'],
            ['Vercel', 'サーバー・自動デプロイ・公開', '環境変数の設定・本番ビルド'],
            ['Resend', 'メール送信サービス（外部）', 'メール通知・自動返信の送信'],
            ['Notion', '問い合わせ一覧データベース', '届いた問い合わせの記録・管理'],
        ],
        [40*mm, 48*mm, CONTENT_W - 88*mm]
    ))
    e.append(Spacer(1, 4*mm))

    e.append(Paragraph('③ 今回追加するもの（このフローのどこに入るか）', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph(
        '上記フローの【2】〜【5】の中で、以下の<b>2つのファイルを新規追加</b>し、'
        '外部サービス（Resend・Notion・reCAPTCHA）と連携させます。'
        'トップページの「お問合せはこちら」ボタンのデザインや遷移先（/contact）は<b>変更しません</b>。', ST['body']))
    e.append(Spacer(1, 2*mm))
    e.append(data_table(
        ['追加するファイル', '役割'],
        [
            ['app/contact/page.tsx', 'お問い合わせフォームの画面（入力欄・送信ボタン）'],
            ['app/api/contact/route.ts', '送信時の処理（メール送信・自動返信・Notion記録・セキュリティ）'],
        ],
        [62*mm, CONTENT_W - 62*mm]
    ))
    e.append(Spacer(1, 4*mm))
    e.append(callout('既存のトップページ（app/page.tsx）の CONTACT セクションは現状のデザインのまま。'
        'ボタンのリンク先「/contact」に、今回作るフォームページが表示されるようになります。', 'tip'))
    e.append(PageBreak())
    return e

# ── 第1章 ─────────────────────────────────────
def chapter1():
    e = []
    e.append(section_header('第1章　システム全体構成を理解する',
        'Chapter 1: System Architecture'))
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph('1-1. このシステムで実現できること', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['機能', '説明'],
        [
            ['問い合わせフォーム', 'お客様が名前・メール・件名・本文を入力して送信できる'],
            ['担当者へメール通知', '送信と同時に、指定した会社アドレスへ内容がメールで届く'],
            ['自動返信メール', 'お客様にも「受け付けました」メールが自動で届く'],
            ['Notion へ自動記録', '問い合わせ内容が一覧データベースに自動保存される'],
            ['スパム対策', 'Honeypot・reCAPTCHA・回数制限で迷惑送信を遮断する'],
        ],
        [42*mm, CONTENT_W - 42*mm]
    ))
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph('1-2. 送信ボタンを押してから完了までの流れ', ST['h2']))
    e.append(gold_line())
    e.append(diagram_box(
        'お客様がフォームに入力 → 「送信」ボタンを押す<br/>'
        '　　　↓<br/>'
        '<b>① フロント（page.tsx）</b>：入力チェック・Honeypot・reCAPTCHAトークン取得<br/>'
        '　　　↓<br/>'
        '<b>② API（route.ts）</b>：reCAPTCHA検証・送信回数チェック・サーバー側で再バリデーション<br/>'
        '　　　↓　　　　　　　　　　↓　　　　　　　　　　↓<br/>'
        '<b>③ Resend</b>（会社宛）　<b>④ Resend</b>（自動返信）　<b>⑤ Notion</b>（記録）<br/>'
        '　　　↓<br/>'
        '<b>⑥ 画面に「送信完了」を表示</b>'
    ))
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph('1-3. 使用サービスと費用（すべて無料枠で運用可能）', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['サービス', '役割', '無料枠', '超過時の料金'],
        [
            ['Resend', 'メール送信', '月 3,000 通', '$20/月〜'],
            ['Notion API', '問い合わせ一覧DB', '実質無制限', '無料'],
            ['Vercel', 'ホスティング・実行', '個人利用で十分', '$20/月〜'],
            ['reCAPTCHA v3', 'bot 判定', '月 100万 件', '無料'],
            ['GitHub', 'コード管理', '無制限', '無料'],
        ],
        [32*mm, 46*mm, 38*mm, CONTENT_W - 116*mm]
    ))
    e.append(Spacer(1, 4*mm))
    e.append(callout('月3,000通を超えない限り完全無料です。中小規模サイトの問い合わせでは、まず無料枠で十分に収まります。', 'tip'))
    e.append(PageBreak())
    return e

# ── 第2章 ─────────────────────────────────────
def chapter2():
    e = []
    e.append(section_header('第2章　【準備①】Resend アカウントと API キー',
        'Chapter 2: Resend Setup'))
    e.append(Spacer(1, 5*mm))
    e.append(Paragraph(
        'Resend は、プログラムからメールを送るためのサービスです。'
        'まずアカウントを作り、プログラムが使う「API キー（合言葉）」を取得します。', ST['lead']))

    e.append(Paragraph('2-1. アカウント登録', ST['h2']))
    e.append(gold_line())
    for n, t, b in [
        (1, 'Resend にアクセス', ['ブラウザで <b>resend.com</b> を開く', '右上の「Get Started」をクリック']),
        (2, 'サインアップ', ['GitHub アカウント連携での登録が簡単（推奨）', 'メール登録の場合は確認メールのリンクをクリックして有効化']),
        (3, 'ダッシュボードへ', ['ログインすると管理画面が開く', '以降の操作は左側メニューから行う']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))

    e.append(Spacer(1, 2*mm))
    e.append(Paragraph('2-2. API キーの発行', ST['h2']))
    e.append(gold_line())
    for n, t, b in [
        (1, '「API Keys」を開く', ['左メニューの「API Keys」をクリック']),
        (2, 'キーを作成', [
            '右上「Create API Key」をクリック',
            'Name に <b>nextbrino-contact</b> と入力（任意の分かりやすい名前）',
            'Permission は <b>Sending access</b> を選択',
            '「Add」をクリック']),
        (3, 'キーをコピーして保管', [
            '<b>re_</b> から始まる文字列が表示される',
            'この画面でしか表示されないため、必ずメモ帳などにコピー保存',
            '後ほど環境変数（第9章）に貼り付けます']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))
    e.append(callout('API キーはパスワードと同じ機密情報です。コードに直接書かず、必ず環境変数で管理してください（第9章で設定）。', 'warn'))

    e.append(Spacer(1, 4*mm))
    e.append(Paragraph('2-3. ドメイン（nextbrino.com）の追加', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph(
        '自社ドメインからメールを送るために、ドメインを登録します。'
        '登録すると Resend が「DNS に設定すべき値」を表示するので、それを第3章で設定します。', ST['body']))
    e.append(Spacer(1, 2*mm))
    for n, t, b in [
        (1, '「Domains」を開く', ['左メニュー「Domains」→「Add Domain」をクリック']),
        (2, 'ドメインを入力', ['<b>nextbrino.com</b> を入力して「Add」']),
        (3, 'DNS レコードが表示される', ['SPF・DKIM・DMARC 用の値が表示される', 'この画面は開いたまま第3章に進む']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))
    e.append(PageBreak())
    return e

# ── 第3章 ─────────────────────────────────────
def chapter3():
    e = []
    e.append(section_header('第3章　【準備②】DNS 設定（SPF / DKIM / DMARC）',
        'Chapter 3: DNS Configuration'))
    e.append(Spacer(1, 5*mm))
    e.append(Paragraph(
        'メールの「なりすまし防止」設定です。これを行わないと、送ったメールが'
        '<b>迷惑メール扱い</b>になったり、届かないことがあります。少し手間ですが必須の作業です。', ST['lead']))

    e.append(Paragraph('3-1. 設定する3種類のレコード', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['種類', '役割（かんたんに）'],
        [
            ['SPF', '「このドメインから送ってよい送信元」を宣言してなりすましを防ぐ'],
            ['DKIM', 'メールに電子署名を付け、途中で改ざんされていないことを保証する'],
            ['DMARC', 'SPF/DKIM が失敗したメールをどう扱うかの方針を宣言する'],
        ],
        [24*mm, CONTENT_W - 24*mm]
    ))
    e.append(Spacer(1, 4*mm))

    e.append(Paragraph('3-2. 設定する値（Resend 画面の値を使う）', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph('以下は一般的な例です。<b>実際の値は必ず Resend の Domains 画面に表示されたものを使用</b>してください。', ST['body']))
    e.append(Spacer(1, 2*mm))
    e.append(code_table(
        ['タイプ', 'ホスト名', '値（Value）'],
        [
            ['TXT', '@（ドメイン直下）', 'v=spf1 include:amazonses.com ~all'],
            ['TXT', 'resend._domainkey', 'v=DKIM1; p=（Resend生成の文字列）'],
            ['TXT', '_dmarc', 'v=DMARC1; p=none; rua=mailto:...'],
        ],
        [16*mm, 42*mm, CONTENT_W - 58*mm]
    ))
    e.append(Spacer(1, 4*mm))

    e.append(Paragraph('3-3. ドメイン管理会社での設定手順（お名前.com 例）', ST['h2']))
    e.append(gold_line())
    for n, t, b in [
        (1, 'DNS設定画面を開く', ['onamae.com にログイン', '「ドメイン」→「DNS設定/転送設定」→ 対象ドメインを選択']),
        (2, 'レコードを追加', [
            '「DNSレコード設定を利用する」を選択',
            'タイプ「TXT」を選び、ホスト名と VALUE を入力',
            '3つのレコードすべてを追加']),
        (3, '保存', ['「確認画面へ進む」→「設定する」をクリック']),
        (4, '反映を待つ', ['Resend の Domains 画面のステータスが <b>Verified</b> になればOK', '通常30分〜数時間（最大48時間）']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))
    e.append(callout('Cloudflare を使う場合、TXTレコードはプロキシ（オレンジ雲）ではなく「DNS only（グレー雲）」で追加します。', 'info'))
    e.append(Spacer(1, 2*mm))
    e.append(callout('DNS変更の反映には時間差があります。すぐ Verified にならなくても、しばらく待ってから再確認してください。', 'warn'))
    e.append(PageBreak())
    return e

# ── 第4章 ─────────────────────────────────────
def chapter4():
    e = []
    e.append(section_header('第4章　【準備③】Notion データベースの作成',
        'Chapter 4: Notion Database'))
    e.append(Spacer(1, 5*mm))
    e.append(Paragraph('届いた問い合わせを一覧で管理するためのデータベースを Notion に作ります。', ST['lead']))

    e.append(Paragraph('4-1. インテグレーション（連携用トークン）の作成', ST['h2']))
    e.append(gold_line())
    for n, t, b in [
        (1, 'Notion Developers を開く', ['ブラウザで <b>notion.so/my-integrations</b> を開く（要ログイン）']),
        (2, '新規作成', [
            '「New integration」をクリック',
            'Name に <b>NEXTBRINO Contact Form</b> と入力',
            'ワークスペースを選び、Type は「Internal」のまま「Save」']),
        (3, 'シークレットを取得', [
            '「Internal Integration Secret」の <b>ntn_</b> で始まる文字列をコピー',
            'これが Notion の API トークン。メモ帳に保存']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))

    e.append(Spacer(1, 2*mm))
    e.append(Paragraph('4-2. データベースの作成と列（プロパティ）設定', ST['h2']))
    e.append(gold_line())
    for n, t, b in [
        (1, 'ページを作成', ['Notion で新規ページを作り、タイトルを「お問い合わせ一覧」にする']),
        (2, 'テーブルを挿入', ['本文で「/table」と入力し「Table - Full page」を選択']),
        (3, '列を設定', [
            '<b>名前</b>（Title・デフォルトのName列を改名）',
            '<b>メールアドレス</b>（Email タイプ）',
            '<b>件名</b>（Text タイプ）',
            '<b>メッセージ</b>（Text タイプ）',
            '<b>ステータス</b>（Select：未対応 / 対応中 / 完了）',
            '<b>送信日時</b>（Created time タイプ＝自動記録）']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))
    e.append(callout('列名はコード（route.ts）と完全一致させる必要があります。本マニュアルでは「名前/メールアドレス/件名/メッセージ/ステータス」を使用します。', 'warn'))

    e.append(Spacer(1, 3*mm))
    e.append(Paragraph('4-3. 連携の接続とデータベースIDの取得', ST['h2']))
    e.append(gold_line())
    for n, t, b in [
        (1, '連携を接続', [
            'データベース右上の「…」→「Connections」→「Connect to」',
            '「NEXTBRINO Contact Form」を選び「Confirm」']),
        (2, 'DB ID を取得', [
            'ブラウザのURLを見る：notion.so/<b>xxxx...xxxx</b>?v=...',
            '「?v=」より前の <b>32文字</b>の英数字がデータベースID',
            'この値をメモ帳に保存']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))
    e.append(callout('接続を忘れると「記録されない」原因No.1になります。必ず手順4-3①を実施してください。', 'info'))
    e.append(PageBreak())
    return e

# ── 第5章 ─────────────────────────────────────
def chapter5():
    e = []
    e.append(section_header('第5章　【準備④】Google reCAPTCHA の取得',
        'Chapter 5: reCAPTCHA Keys'))
    e.append(Spacer(1, 5*mm))
    e.append(Paragraph(
        'reCAPTCHA v3 は、画面に何も表示せず裏側で bot を判定する Google の無料サービスです。'
        'サイトキー（公開用）とシークレットキー（サーバー用）の2つを取得します。', ST['lead']))

    e.append(Paragraph('5-1. キーの取得手順', ST['h2']))
    e.append(gold_line())
    for n, t, b in [
        (1, '管理画面を開く', ['<b>google.com/recaptcha/admin/create</b> にアクセス']),
        (2, '情報を入力', [
            'ラベル：<b>nextbrino-contact</b>',
            'タイプ：<b>スコアベース（v3）</b> を選択',
            'ドメイン：<b>nextbrino.com</b> と <b>localhost</b> の両方を追加',
            '利用規約に同意して「送信」']),
        (3, '2つのキーを保存', [
            '<b>サイトキー</b>（公開してよい・フロント用）をコピー',
            '<b>シークレットキー</b>（非公開・サーバー用）をコピー',
            'どちらもメモ帳に保存']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))
    e.append(callout('localhost を登録しておくと、本番公開前にローカル（自分のPC）でもテストできます。', 'tip'))
    e.append(Spacer(1, 3*mm))
    e.append(Paragraph('5-2. ここまでで取得したものの確認', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['取得物', '形式の例', 'どこで使う'],
        [
            ['Resend API キー', 're_xxxx...', '環境変数 RESEND_API_KEY'],
            ['Notion トークン', 'ntn_xxxx...', '環境変数 NOTION_API_TOKEN'],
            ['Notion DB ID', '32文字の英数字', '環境変数 NOTION_DATABASE_ID'],
            ['reCAPTCHA サイトキー', '6Lxxxx...', '環境変数 NEXT_PUBLIC_RECAPTCHA_SITE_KEY'],
            ['reCAPTCHA シークレット', '6Lxxxx...', '環境変数 RECAPTCHA_SECRET_KEY'],
            ['受信用メールアドレス', 'info@nextbrino.com', '環境変数 CONTACT_RECEIVE_EMAIL'],
        ],
        [44*mm, 36*mm, CONTENT_W - 80*mm]
    ))
    e.append(PageBreak())
    return e

# ── 第6章 ─────────────────────────────────────
def chapter6():
    e = []
    e.append(section_header('第6章　【実装①】フォームページのコーディング',
        'Chapter 6: Form Page'))
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph('6-1. 必要なパッケージのインストール', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph('プロジェクトフォルダ内でターミナル（Claude Code）から実行します。', ST['body']))
    e += code_block('ターミナル（nextbrino-site フォルダ内）',
        'npm install resend @notionhq/client')
    e.append(Spacer(1, 3*mm))

    e.append(Paragraph('6-2. フォームページを作成', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph('<b>app/contact/page.tsx</b> を新規作成し、以下を貼り付けます。', ST['body']))
    e += code_block('app/contact/page.tsx',
'''"use client";
import { useState } from "react";

type FormState = {
  name: string; email: string;
  subject: string; message: string;
  honeypot: string; // bot対策（人間には見えない欄）
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", subject: "", message: "", honeypot: "",
  });
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;            // botは送信させない
    setStatus("loading");

    try {
      // reCAPTCHA トークン取得（第8章で有効化）
      const token = await getRecaptchaToken();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken: token }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "送信に失敗しました");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "エラーが発生しました");
    }
  };

  if (status === "success") {
    return (
      <main style={{ padding: "120px 24px", textAlign: "center" }}>
        <h2>お問い合わせを受け付けました</h2>
        <p>2〜5営業日以内にご返信いたします。</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "120px 24px", maxWidth: 640, margin: "0 auto" }}>
      <h1>CONTACT</h1>
      <p>お気軽にご連絡ください。</p>
      <form onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Honeypot：CSSで隠す。botだけが入力してしまう */}
        <input name="honeypot" value={form.honeypot}
          onChange={handleChange} tabIndex={-1} autoComplete="off"
          style={{ display: "none" }} />

        <input name="name" required placeholder="お名前 *"
          value={form.name} onChange={handleChange} />
        <input name="email" type="email" required placeholder="メールアドレス *"
          value={form.email} onChange={handleChange} />
        <input name="subject" required placeholder="件名 *"
          value={form.subject} onChange={handleChange} />
        <textarea name="message" required rows={6} placeholder="お問い合わせ内容 *"
          value={form.message} onChange={handleChange} />

        {status === "error" && <p style={{ color: "red" }}>{errorMsg}</p>}
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "送信中..." : "送信する"}
        </button>
      </form>
    </main>
  );
}''')
    e.append(callout('デザイン（色・レイアウト）は既存サイトに合わせて style 部分を後から調整できます。まずは「動く状態」を優先してください。', 'info'))
    e.append(PageBreak())
    return e

# ── 第7章 ─────────────────────────────────────
def chapter7():
    e = []
    e.append(section_header('第7章　【実装②】API（メール送信・自動返信・Notion 記録）',
        'Chapter 7: API Route'))
    e.append(Spacer(1, 5*mm))
    e.append(Paragraph(
        '<b>app/api/contact/route.ts</b> を新規作成します。'
        'これがフォーム送信時に裏で動く処理本体です。下記を貼り付けてください。', ST['body']))
    e += code_block('app/api/contact/route.ts',
'''import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Client as Notion } from "@notionhq/client";

const resend = new Resend(process.env.RESEND_API_KEY);
const notion = new Notion({ auth: process.env.NOTION_API_TOKEN });

// 簡易レート制限（同一IPの連続送信を制限）
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now(), windowMs = 60_000, max = 3;
  const arr = (hits.get(ip) || []).filter(t => now - t < windowMs);
  if (arr.length >= max) return true;
  hits.set(ip, [...arr, now]);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (rateLimited(ip))
      return NextResponse.json(
        { error: "しばらく時間をおいてお試しください。" }, { status: 429 });

    const { name, email, subject, message, honeypot, recaptchaToken }
      = await req.json();

    if (honeypot) return NextResponse.json({ ok: true }); // bot

    // サーバー側バリデーション
    if (!name || !email || !subject || !message)
      return NextResponse.json({ error: "必須項目が不足しています。" }, { status: 400 });
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email))
      return NextResponse.json({ error: "メール形式が不正です。" }, { status: 400 });
    if (message.length > 3000)
      return NextResponse.json({ error: "本文が長すぎます。" }, { status: 400 });

    // reCAPTCHA 検証（第8章）
    const rc = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      { method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
      }).then(r => r.json());
    if (!rc.success || rc.score < 0.5)
      return NextResponse.json({ error: "送信に失敗しました。" }, { status: 400 });

    // ① 会社宛メール
    await resend.emails.send({
      from: "NEXTBRINO <noreply@nextbrino.com>",
      to: [process.env.CONTACT_RECEIVE_EMAIL!],
      replyTo: email,
      subject: `【お問い合わせ】${subject}`,
      html: `<h2>新しいお問い合わせ</h2>
        <p>お名前：${name}</p><p>メール：${email}</p>
        <p>件名：${subject}</p>
        <p>内容：</p><p style="white-space:pre-wrap">${message}</p>`,
    });

    // ② 自動返信メール
    await resend.emails.send({
      from: "NEXT BRINO <noreply@nextbrino.com>",
      to: [email],
      subject: "【NEXT BRINO】お問い合わせを受け付けました",
      html: `<p>${name} 様</p>
        <p>お問い合わせありがとうございます。下記の内容で受け付けました。
        担当者より2〜5営業日以内にご連絡いたします。</p>
        <hr/><p>件名：${subject}</p>
        <p style="white-space:pre-wrap">${message}</p>
        <hr/><p>NEXT BRINO / https://nextbrino.com</p>`,
    });

    // ③ Notion に記録
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        名前: { title: [{ text: { content: name } }] },
        メールアドレス: { email },
        件名: { rich_text: [{ text: { content: subject } }] },
        メッセージ: { rich_text: [{ text: { content: message } }] },
        ステータス: { select: { name: "未対応" } },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact api error:", err);
    return NextResponse.json({ error: "サーバーエラーです。" }, { status: 500 });
  }
}''')
    e.append(callout('replyTo に送信者アドレスを入れているため、届いた通知メールで「返信」を押すとそのままお客様へ返信できます。', 'tip'))
    e.append(PageBreak())
    return e

# ── 第8章 ─────────────────────────────────────
def chapter8():
    e = []
    e.append(section_header('第8章　【実装③】セキュリティ対策の組み込み',
        'Chapter 8: Security'))
    e.append(Spacer(1, 5*mm))
    e.append(Paragraph('前章までのコードに含まれる対策と、追加で必要な reCAPTCHA の配線を説明します。', ST['lead']))

    e.append(Paragraph('8-1. 実装される5つの対策', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['対策', '場所', '内容'],
        [
            ['Honeypot', 'フロント+API', '見えない欄に入力があれば bot とみなし無視'],
            ['レート制限', 'API', '同一IPの1分間3回超を 429 で拒否'],
            ['サーバー検証', 'API', '必須・メール形式・文字数をサーバー側で再チェック'],
            ['reCAPTCHA v3', 'フロント+API', 'スコア0.5未満を bot として拒否'],
            ['環境変数', 'Vercel', '鍵をコードに書かず安全に管理（第9章）'],
        ],
        [30*mm, 30*mm, CONTENT_W - 60*mm]
    ))
    e.append(Spacer(1, 4*mm))

    e.append(Paragraph('8-2. reCAPTCHA スクリプトの読み込み（layout.tsx）', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph('<b>app/layout.tsx</b> に Google のスクリプトを追加します。', ST['body']))
    e += code_block('app/layout.tsx（import と <body> 内に追加）',
'''import Script from "next/script";

// <body> 内の末尾あたりに追加
<Script
  src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
  strategy="afterInteractive"
/>''')
    e.append(Spacer(1, 2*mm))
    e.append(Paragraph('8-3. トークン取得関数（page.tsx に追加）', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph('第6章の page.tsx で呼んでいる <b>getRecaptchaToken</b> を定義します。', ST['body']))
    e += code_block('app/contact/page.tsx（コンポーネント外に追加）',
'''declare global {
  interface Window { grecaptcha: any; }
}

async function getRecaptchaToken(): Promise<string> {
  return new Promise((resolve) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
                 { action: "contact" })
        .then(resolve);
    });
  });
}''')
    e.append(callout('reCAPTCHA がうまく動かないうちは、route.ts の検証ブロックを一時コメントアウトして他機能を先に確認すると切り分けが楽です（公開前に必ず戻す）。', 'info'))
    e.append(PageBreak())
    return e

# ── 第9章 ─────────────────────────────────────
def chapter9():
    e = []
    e.append(section_header('第9章　環境変数の設定（ローカル & Vercel）',
        'Chapter 9: Environment Variables'))
    e.append(Spacer(1, 5*mm))
    e.append(Paragraph('API キーなどの機密情報は、コードに書かず「環境変数」として設定します。', ST['lead']))

    e.append(Paragraph('9-1. 設定する6つの環境変数', ST['h2']))
    e.append(gold_line())
    e.append(code_table(
        ['変数名', '値の例'],
        [
            ['RESEND_API_KEY', 're_xxxxxxxx'],
            ['CONTACT_RECEIVE_EMAIL', 'info@nextbrino.com'],
            ['NOTION_API_TOKEN', 'ntn_xxxxxxxx'],
            ['NOTION_DATABASE_ID', 'abc123...（32文字）'],
            ['NEXT_PUBLIC_RECAPTCHA_SITE_KEY', '6Lxxxxxxxx'],
            ['RECAPTCHA_SECRET_KEY', '6Lxxxxxxxx'],
        ],
        [62*mm, CONTENT_W - 62*mm]
    ))
    e.append(Spacer(1, 3*mm))
    e.append(callout('NEXT_PUBLIC_ で始まる変数はブラウザからも読めます。シークレット系（RESEND/NOTION/RECAPTCHA_SECRET）には絶対に付けないでください。', 'warn'))

    e.append(Spacer(1, 3*mm))
    e.append(Paragraph('9-2. ローカル用 .env.local の作成', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph('自分のPCでテストするため、プロジェクト直下に <b>.env.local</b> を作成します。', ST['body']))
    e += code_block('nextbrino-site/.env.local（新規作成）',
'''RESEND_API_KEY=re_xxxxxxxx
CONTACT_RECEIVE_EMAIL=info@nextbrino.com
NOTION_API_TOKEN=ntn_xxxxxxxx
NOTION_DATABASE_ID=abc123def456...（32文字）
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lxxxxxxxx''')
    e.append(callout('.env.local は .gitignore に含まれており GitHub には上がりません（鍵が漏れない）。必ずローカルだけに置いてください。', 'tip'))

    e.append(Spacer(1, 3*mm))
    e.append(Paragraph('9-3. Vercel への登録（本番用）', ST['h2']))
    e.append(gold_line())
    for n, t, b in [
        (1, 'Vercel を開く', ['vercel.com にログイン → プロジェクト「nextbrino-site」を開く']),
        (2, '設定画面へ', ['「Settings」→「Environment Variables」を開く']),
        (3, '6つを追加', [
            '「Add New」で変数名と値を1つずつ入力',
            'Environment は Production / Preview / Development すべてにチェック',
            '6つすべて登録したら保存']),
        (4, '再デプロイ', ['環境変数追加後は「Deployments」から Redeploy すると反映される']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))
    e.append(PageBreak())
    return e

# ── 第10章 ────────────────────────────────────
def chapter10():
    e = []
    e.append(section_header('第10章　GitHub へのプッシュと Vercel デプロイ',
        'Chapter 10: Deploy'))
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph('10-1. GitHub へプッシュ', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph('Claude Code（ターミナル）から実行します。', ST['body']))
    e += code_block('ターミナル（nextbrino-site フォルダ内）',
'''git add app/contact/page.tsx app/api/contact/route.ts app/layout.tsx package.json
git commit -m "feat: お問い合わせフォーム（Resend + Notion + セキュリティ）"
git push origin main''')
    e.append(Spacer(1, 3*mm))

    e.append(Paragraph('10-2. Vercel の自動デプロイ', ST['h2']))
    e.append(gold_line())
    e.append(Paragraph('push すると Vercel が自動でビルド・公開します。', ST['body']))
    for n, t, b in [
        (1, 'ビルド確認', ['Vercel「Deployments」で最新が Building → <b>Ready</b> になるのを待つ',
                          'エラー時は「View Build Logs」で原因を確認']),
        (2, '公開確認', ['<b>https://nextbrino.com/contact</b> を開きフォーム表示を確認']),
    ]:
        e.append(numbered_step(n, t, b)); e.append(Spacer(1, 2.5*mm))
    e.append(Spacer(1, 3*mm))

    e.append(Paragraph('10-3. よくあるビルドエラー', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['エラー', '原因', '対処'],
        [
            ['Module not found: resend', 'パッケージ未導入', 'npm install して再 push'],
            ['environment variable undefined', '環境変数未設定', 'Vercelの設定を確認し再デプロイ'],
            ['Type error', '型エラー', 'ローカルで npm run build して確認'],
        ],
        [48*mm, 38*mm, CONTENT_W - 86*mm]
    ))
    e.append(PageBreak())
    return e

# ── 第11章 ────────────────────────────────────
def chapter11():
    e = []
    e.append(section_header('第11章　動作確認・テストチェックリスト',
        'Chapter 11: Testing'))
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph('11-1. ローカルでの確認', ST['h2']))
    e.append(gold_line())
    e += code_block('ターミナル',
'''npm run dev
# ブラウザで http://localhost:3000/contact を開く''')
    e.append(Spacer(1, 3*mm))
    e.append(Paragraph('11-2. 確認すべき項目', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['項目', '期待される結果'],
        [
            ['フォーム表示', '名前・メール・件名・本文の欄が表示される'],
            ['空欄で送信', '「必須項目が不足しています」が表示される'],
            ['不正メールで送信', '「メール形式が不正です」が表示される'],
            ['正常送信', '「お問い合わせを受け付けました」に切り替わる'],
            ['会社宛メール', '受信用アドレスに通知メールが届く'],
            ['自動返信', '送信者アドレスに自動返信が届く'],
            ['Notion 記録', '「お問い合わせ一覧」に新しい行が追加される'],
            ['連続送信', '1分に4回目以降は 429 エラーになる'],
        ],
        [44*mm, CONTENT_W - 44*mm]
    ))
    e.append(Spacer(1, 3*mm))
    e.append(callout('ローカルで全項目OKになってから push すると、本番でのトラブルを最小化できます。', 'tip'))
    e.append(PageBreak())
    return e

# ── 第12章 ────────────────────────────────────
def chapter12():
    e = []
    e.append(section_header('第12章　日常運用・問い合わせ管理フロー',
        'Chapter 12: Operations'))
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph('12-1. 問い合わせが来たときの流れ', ST['h2']))
    e.append(gold_line())
    e.append(diagram_box(
        '<b>① メール通知</b>：会社アドレスに届く（すぐ気づける）<br/>'
        '<b>② Notion で確認</b>：「お問い合わせ一覧」で内容を確認<br/>'
        '<b>③ 返信</b>：通知メールの「返信」でそのままお客様へ返信（replyTo設定済み）<br/>'
        '<b>④ ステータス更新</b>：Notion で 未対応 → 対応中 → 完了 に変更<br/>'
        '<b>⑤ 対応漏れ防止</b>：Notionで「未対応」フィルタをかけて残件を管理'
    ))
    e.append(Spacer(1, 4*mm))

    e.append(Paragraph('12-2. 修正したくなったときの参照表', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['やりたいこと', '変更する場所'],
        [
            ['フォームの見た目を変える', 'app/contact/page.tsx の style'],
            ['自動返信の文面を変える', 'app/api/contact/route.ts の②のhtml'],
            ['受信アドレスを変える', 'Vercel環境変数 CONTACT_RECEIVE_EMAIL'],
            ['Notionの項目を増やす', 'Notion列追加 + route.ts の properties'],
            ['送信回数制限を変える', 'route.ts の rateLimited の max 値'],
        ],
        [58*mm, CONTENT_W - 58*mm]
    ))
    e.append(Spacer(1, 4*mm))
    e.append(Paragraph('12-3. 月次チェック', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['項目', '確認場所'],
        [
            ['送信数（無料枠3,000通以内か）', 'Resend ダッシュボード'],
            ['到達率（Delivered 99%以上か）', 'Resend → Emails'],
            ['メール件数とNotion件数の一致', 'Resend と Notion を照合'],
        ],
        [58*mm, CONTENT_W - 58*mm]
    ))
    e.append(PageBreak())
    return e

# ── 付録A ─────────────────────────────────────
def appendixA():
    e = []
    e.append(section_header('付録 A　よくあるエラーと対処法',
        'Appendix A: Troubleshooting'))
    e.append(Spacer(1, 5*mm))
    e.append(data_table(
        ['症状', '原因', '対処'],
        [
            ['メールが全く届かない', 'DNS未設定/反映中', 'ResendのDomainsがVerifiedか確認（最大48h待つ）'],
            ['迷惑メールに入る', 'DMARC未設定', 'DNSにDMARCレコードを追加'],
            ['「送信に失敗」になる', 'APIキー誤り/未設定', 'Vercel環境変数を確認し再デプロイ'],
            ['Notionに記録されない', '連携未接続/列名不一致', '4-3①の接続と列名（名前/件名等）を確認'],
            ['Cannot find module', 'npm install未実行', 'npm install resend @notionhq/client'],
            ['reCAPTCHAエラー頻発', 'ドメイン未登録', 'reCAPTCHA管理画面でnextbrino.com/localhost確認'],
            ['自分のテストで429', '1分3回超送信', '1分待つ/閾値を一時的に上げる'],
            ['ローカルOK・本番NG', 'Vercel環境変数未設定', 'Vercelに6つ全て設定し再デプロイ'],
        ],
        [42*mm, 40*mm, CONTENT_W - 82*mm]
    ))
    e.append(PageBreak())
    return e

# ── 付録B ─────────────────────────────────────
def appendixB():
    e = []
    e.append(section_header('付録 B　取得物チェックシート / 用語集',
        'Appendix B: Checklist & Glossary'))
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph('B-1. 取得物チェックシート', ST['h2']))
    e.append(gold_line())
    rows = [
        ['Resend API キー', 'resend.com → API Keys'],
        ['Resend ドメイン認証（Verified）', 'resend.com → Domains'],
        ['DNS：SPF レコード', 'ドメイン管理会社'],
        ['DNS：DKIM レコード', 'ドメイン管理会社'],
        ['DNS：DMARC レコード', 'ドメイン管理会社'],
        ['Notion 連携トークン', 'notion.so/my-integrations'],
        ['Notion データベースID', 'Notion DB の URL'],
        ['Notion 連携の接続', 'Notion DB → Connections'],
        ['reCAPTCHA サイトキー', 'google.com/recaptcha'],
        ['reCAPTCHA シークレットキー', 'google.com/recaptcha'],
        ['Vercel 環境変数 6つ', 'Vercel → Settings'],
    ]
    data = [[Paragraph('☐', P('cbx', fontName='JA', fontSize=12, alignment=1)),
             Paragraph(r[0], ST['td']), Paragraph(r[1], ST['td'])] for r in rows]
    data.insert(0, [Paragraph('済', ST['th']), Paragraph('項目', ST['th']), Paragraph('取得元', ST['th'])])
    t = Table(data, colWidths=[10*mm, 75*mm, CONTENT_W - 85*mm], repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), NAVY),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, BG_LIGHT]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cfcfcf')),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
    ]))
    e.append(t)
    e.append(Spacer(1, 5*mm))

    e.append(Paragraph('B-2. 用語集（初心者向け）', ST['h2']))
    e.append(gold_line())
    e.append(data_table(
        ['用語', '意味'],
        [
            ['API キー', 'プログラムが外部サービスを使うための合言葉。機密情報。'],
            ['環境変数', '鍵などをコードと分けて安全に保持する仕組み。'],
            ['デプロイ', '書いたコードを本番サーバーに公開すること。'],
            ['DNS', 'ドメイン名と各種設定（メール認証含む）を管理する仕組み。'],
            ['SPF/DKIM/DMARC', 'メールのなりすまし・改ざんを防ぐ3種の認証設定。'],
            ['Honeypot', '人間に見えない罠の入力欄。botだけが反応する仕組み。'],
            ['レート制限', '短時間の大量送信を防ぐ制限。'],
            ['API Route', 'Next.js でサーバー側処理を書く仕組み（route.ts）。'],
        ],
        [40*mm, CONTENT_W - 40*mm]
    ))
    e.append(Spacer(1, 5*mm))
    e.append(callout('お疲れさまでした。このマニュアルの順に進めれば、安全で無料の問い合わせシステムが完成します。', 'tip'))
    return e

# ── ビルド ────────────────────────────────────
def main():
    out = "/Users/yutakuroki/Desktop/NEXTBRINO_お問い合わせシステム実装マニュアル.pdf"
    doc = SimpleDocTemplate(
        out, pagesize=A4,
        leftMargin=20*mm, rightMargin=20*mm,
        topMargin=16*mm, bottomMargin=16*mm,
        title="NEXT BRINO お問い合わせシステム完全実装マニュアル",
        author="NEXT BRINO",
    )
    story = []
    story += cover_page()
    story += toc_page()
    story += intro()
    story += chapter1()
    story += chapter2()
    story += chapter3()
    story += chapter4()
    story += chapter5()
    story += chapter6()
    story += chapter7()
    story += chapter8()
    story += chapter9()
    story += chapter10()
    story += chapter11()
    story += chapter12()
    story += appendixA()
    story += appendixB()

    def first(canvas, doc):
        cover(canvas, doc)
    doc.build(story, onFirstPage=first, onLaterPages=on_page)
    print("PDF生成完了:", out)

if __name__ == "__main__":
    main()
