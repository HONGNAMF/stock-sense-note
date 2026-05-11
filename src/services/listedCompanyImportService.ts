import type { ListedCompany } from "@/types";

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (const char of line) {
    if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

export const listedCompanyImportService = {
  importCsv: (csv: string): ListedCompany[] => {
    const [headerLine, ...rows] = csv.trim().split(/\r?\n/);
    const headers = parseCsvLine(headerLine);
    const byCode = new Map<string, ListedCompany>();

    rows.forEach((row) => {
      const values = parseCsvLine(row);
      const record = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
      const stockCode = record.stock_code || record.stockCode;
      if (!stockCode) return;
      byCode.set(stockCode, {
        stockCode,
        companyName: record.company_name || record.companyName || stockCode,
        market: (record.market as ListedCompany["market"]) || "KOSPI",
        sector: record.sector || "업종 확인 필요",
        isEtf: String(record.is_etf || record.isEtf).toLowerCase() === "true",
        searchKeywords: [record.company_name, record.companyName, record.sector, record.market].filter(Boolean)
      });
    });

    return Array.from(byCode.values());
  },
  importJson: (json: string): ListedCompany[] => {
    const rows = JSON.parse(json) as ListedCompany[];
    const byCode = new Map<string, ListedCompany>();
    rows.forEach((row) => {
      if (row.stockCode) byCode.set(row.stockCode, row);
    });
    return Array.from(byCode.values());
  }
};
