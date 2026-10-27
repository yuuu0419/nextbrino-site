import { NextRequest, NextResponse } from "next/server";

// 文字列長に依存しない定数時間比較（タイミング攻撃対策）
function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  }
  return diff === 0;
}

function isAuthorized(authHeader: string | null, user: string, pass: string): boolean {
  if (!authHeader?.startsWith("Basic ")) return false;
  let decoded: string;
  try {
    decoded = atob(authHeader.slice(6));
  } catch {
    return false;
  }
  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex < 0) return false;
  const inputUser = decoded.slice(0, separatorIndex);
  const inputPass = decoded.slice(separatorIndex + 1);
  // 両方を必ず評価して、どちらが誤りかを時間差で判別させない
  const userOk = safeEqual(inputUser, user);
  const passOk = safeEqual(inputPass, pass);
  return userOk && passOk;
}

export function proxy(req: NextRequest) {
  const user = process.env.HEARING_FORM_USER;
  const pass = process.env.HEARING_FORM_PASSWORD;

  // 環境変数が未設定の場合は誰も通さない
  if (user && pass && isAuthorized(req.headers.get("authorization"), user, pass)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: ["/hearing-form/:path*", "/api/hearing-form/:path*"],
};
