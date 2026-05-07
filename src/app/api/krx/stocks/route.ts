import { NextResponse } from "next/server";

export type KrxStockRow = {
  code: string;
  name: string;
  shortName: string;
  market: string;
  securityType: string;
};

const KRX_OTP_URL = "https://data.krx.co.kr/comm/fileDn/GenerateOTP/generate.cmd";
const KRX_DOWNLOAD_URL = "https://data.krx.co.kr/comm/fileDn/download_csv/download.cmd";

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current.trim());
  return values;
}

function parseKrxCsv(csv: string): KrxStockRow[] {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(lines[0] ?? "");
  const indexOf = (name: string) => headers.findIndex((header) => header.includes(name));
  const codeIndex = indexOf("단축코드");
  const nameIndex = indexOf("한글 종목명");
  const shortNameIndex = indexOf("한글 종목약명");
  const marketIndex = indexOf("시장구분");
  const securityIndex = indexOf("증권구분");

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    return {
      code: cols[codeIndex] ?? "",
      name: cols[nameIndex] ?? cols[shortNameIndex] ?? "",
      shortName: cols[shortNameIndex] ?? cols[nameIndex] ?? "",
      market: cols[marketIndex] ?? "KRX",
      securityType: cols[securityIndex] ?? "주식"
    };
  }).filter((row) => row.code && row.name);
}

export async function GET() {
  try {
    const form = new URLSearchParams({
      locale: "ko_KR",
      mktId: "ALL",
      share: "1",
      csvxls_isNo: "false",
      name: "fileDown",
      url: "dbms/MDC/STAT/standard/MDCSTAT01901"
    });

    const otpResponse = await fetch(KRX_OTP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Referer: "https://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201020101",
        "User-Agent": "Mozilla/5.0"
      },
      body: form,
      cache: "no-store"
    });

    if (!otpResponse.ok) throw new Error(`KRX OTP failed: ${otpResponse.status}`);
    const code = await otpResponse.text();

    const csvResponse = await fetch(KRX_DOWNLOAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Referer: "https://data.krx.co.kr/",
        "User-Agent": "Mozilla/5.0"
      },
      body: new URLSearchParams({ code }),
      cache: "no-store"
    });

    if (!csvResponse.ok) throw new Error(`KRX CSV failed: ${csvResponse.status}`);
    const buffer = await csvResponse.arrayBuffer();
    const csv = new TextDecoder("euc-kr").decode(buffer);

    return NextResponse.json({
      source: "KRX",
      fetchedAt: new Date().toISOString(),
      stocks: parseKrxCsv(csv)
    });
  } catch (error) {
    return NextResponse.json(
      {
        source: "KRX",
        stocks: [],
        message: error instanceof Error ? error.message : "KRX fetch failed"
      },
      { status: 200 }
    );
  }
}
