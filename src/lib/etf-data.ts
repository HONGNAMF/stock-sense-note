import type { Etf } from "@/types/investment";

type EtfProfile = Pick<Etf, "holdings" | "sectors" | "countries" | "easyExplanation" | "comparison" | "risks">;

const defaultProfile: EtfProfile = {
  easyExplanation:
    "ETF는 여러 종목을 한 바구니에 담아 한 번에 분산해서 보는 상품입니다. 구성과 시세 흐름은 제공처 기준으로 달라질 수 있어 실제 거래 전 운용사와 증권사 화면을 함께 확인하는 편이 좋습니다.",
  holdings: [
    { name: "구성 정보 확인 필요", symbol: "TBD", weight: 100 }
  ],
  sectors: [
    { name: "구성 정보 확인 필요", weight: 100 }
  ],
  countries: [
    { name: "확인 필요", weight: 100 }
  ],
  comparison: "ETF는 개별주보다 한 회사 리스크는 낮지만, 담긴 산업이나 국가가 흔들리면 ETF도 함께 움직일 수 있습니다.",
  risks: ["구성 종목이 비슷하면 분산 효과가 약해질 수 있습니다.", "테마 ETF는 유행이 꺾이면 함께 조정받을 수 있습니다.", "환율과 보수가 실제 수익률에 영향을 줍니다."]
};

const etfProfiles: Record<string, EtfProfile> = {
  "069500.KS": {
    easyExplanation: "KODEX 200은 한국 코스피200 대표 대형주를 넓게 담는 기본형 ETF입니다. 국내 시장 전체 분위기를 볼 때 출발점으로 보기 좋습니다.",
    holdings: [
      { name: "삼성전자", symbol: "005930.KS", weight: 22.4 },
      { name: "SK하이닉스", symbol: "000660.KS", weight: 9.8 },
      { name: "LG에너지솔루션", symbol: "373220.KS", weight: 3.6 },
      { name: "현대차", symbol: "005380.KS", weight: 3.2 },
      { name: "기아", symbol: "000270.KS", weight: 2.7 },
      { name: "셀트리온", symbol: "068270.KS", weight: 2.4 },
      { name: "NAVER", symbol: "035420.KS", weight: 2.1 },
      { name: "삼성바이오로직스", symbol: "207940.KS", weight: 2.0 },
      { name: "KB금융", symbol: "105560.KS", weight: 1.9 },
      { name: "POSCO홀딩스", symbol: "005490.KS", weight: 1.8 }
    ],
    sectors: [
      { name: "반도체/IT", weight: 34 },
      { name: "자동차", weight: 11 },
      { name: "금융", weight: 10 },
      { name: "바이오/헬스케어", weight: 9 },
      { name: "소재/산업재", weight: 8 }
    ],
    countries: [{ name: "한국", weight: 100 }],
    comparison: "개별 대형주 하나보다 분산되지만 삼성전자와 SK하이닉스 비중이 커서 반도체 흐름의 영향을 많이 받습니다.",
    risks: ["반도체 대형주 비중이 높아 업황 둔화에 민감합니다.", "국내 증시와 원화 흐름에 영향을 받습니다.", "코스피200 전체가 약하면 함께 조정될 수 있습니다."]
  },
  "360750.KS": {
    easyExplanation: "TIGER 미국S&P500은 미국 대표 500개 기업에 분산 투자하는 국내 상장 ETF입니다. 미국 시장 전체를 공부하기 좋은 기본형입니다.",
    holdings: [
      { name: "Microsoft", symbol: "MSFT", weight: 7.1 },
      { name: "Apple", symbol: "AAPL", weight: 6.4 },
      { name: "NVIDIA", symbol: "NVDA", weight: 6.1 },
      { name: "Amazon", symbol: "AMZN", weight: 3.8 },
      { name: "Meta Platforms", symbol: "META", weight: 2.6 },
      { name: "Alphabet Class A", symbol: "GOOGL", weight: 2.1 },
      { name: "Broadcom", symbol: "AVGO", weight: 1.9 },
      { name: "Berkshire Hathaway", symbol: "BRK.B", weight: 1.8 },
      { name: "Eli Lilly", symbol: "LLY", weight: 1.5 },
      { name: "JPMorgan Chase", symbol: "JPM", weight: 1.3 }
    ],
    sectors: [
      { name: "기술", weight: 31 },
      { name: "금융", weight: 13 },
      { name: "헬스케어", weight: 12 },
      { name: "소비", weight: 11 },
      { name: "커뮤니케이션", weight: 9 }
    ],
    countries: [
      { name: "미국", weight: 96 },
      { name: "기타", weight: 4 }
    ],
    comparison: "개별 미국주 하나보다 안정적이지만, 미국 대형 기술주 비중이 높아 금리와 AI 기대에 영향을 받습니다.",
    risks: ["원/달러 환율이 수익률에 영향을 줍니다.", "미국 대형 기술주 조정 시 함께 흔들릴 수 있습니다.", "장기 투자에 적합하지만 단기 변동은 피할 수 없습니다."]
  },
  "133690.KS": {
    easyExplanation: "TIGER 미국나스닥100은 미국 기술 성장주 비중이 높은 국내 상장 ETF입니다. AI, 클라우드, 플랫폼 기업 흐름을 크게 반영합니다.",
    holdings: [
      { name: "NVIDIA", symbol: "NVDA", weight: 8.7 },
      { name: "Microsoft", symbol: "MSFT", weight: 8.1 },
      { name: "Apple", symbol: "AAPL", weight: 7.4 },
      { name: "Broadcom", symbol: "AVGO", weight: 5.0 },
      { name: "Amazon", symbol: "AMZN", weight: 4.9 },
      { name: "Meta Platforms", symbol: "META", weight: 4.3 },
      { name: "Tesla", symbol: "TSLA", weight: 3.2 },
      { name: "Alphabet Class A", symbol: "GOOGL", weight: 2.9 },
      { name: "Costco", symbol: "COST", weight: 2.4 },
      { name: "Netflix", symbol: "NFLX", weight: 1.8 }
    ],
    sectors: [
      { name: "기술", weight: 52 },
      { name: "커뮤니케이션", weight: 16 },
      { name: "소비", weight: 15 },
      { name: "헬스케어", weight: 6 },
      { name: "기타", weight: 11 }
    ],
    countries: [
      { name: "미국", weight: 97 },
      { name: "기타", weight: 3 }
    ],
    comparison: "S&P500보다 성장주 색깔이 강해 상승장에서는 탄력이 있지만 금리 상승과 기술주 조정에는 더 민감합니다.",
    risks: ["상위 기술주 집중도가 높습니다.", "금리와 밸류에이션 부담에 민감합니다.", "AI 기대가 과열되면 조정 폭이 커질 수 있습니다."]
  },
  "091160.KS": {
    easyExplanation: "KODEX 반도체는 국내 반도체 장비, 소재, 부품 기업을 묶어 보는 테마 ETF입니다.",
    holdings: [
      { name: "SK하이닉스", symbol: "000660.KS", weight: 18.5 },
      { name: "삼성전자", symbol: "005930.KS", weight: 16.2 },
      { name: "한미반도체", symbol: "042700.KS", weight: 8.4 },
      { name: "리노공업", symbol: "058470.KS", weight: 5.2 },
      { name: "HPSP", symbol: "403870.KS", weight: 4.8 },
      { name: "DB하이텍", symbol: "000990.KS", weight: 4.1 },
      { name: "동진쎄미켐", symbol: "005290.KS", weight: 3.7 },
      { name: "ISC", symbol: "095340.KS", weight: 3.4 },
      { name: "원익IPS", symbol: "240810.KS", weight: 3.0 },
      { name: "솔브레인", symbol: "357780.KS", weight: 2.8 }
    ],
    sectors: [
      { name: "메모리 반도체", weight: 35 },
      { name: "장비", weight: 25 },
      { name: "소재", weight: 16 },
      { name: "부품/테스트", weight: 14 },
      { name: "파운드리", weight: 10 }
    ],
    countries: [{ name: "한국", weight: 100 }],
    comparison: "삼성전자나 SK하이닉스 단일 종목보다 밸류체인 전체를 볼 수 있지만, 반도체 업황 하락에는 같이 흔들립니다.",
    risks: ["반도체 사이클에 민감합니다.", "HBM 기대가 높아진 구간에서는 과열을 조심해야 합니다.", "장비·소재주는 수주 변동성이 큽니다."]
  },
  "396500.KS": {
    easyExplanation: "TIGER 반도체TOP10은 국내 반도체 주요 종목에 더 집중하는 ETF입니다. 분산보다 핵심 종목 노출이 큰 편입니다.",
    holdings: [
      { name: "SK하이닉스", symbol: "000660.KS", weight: 24.8 },
      { name: "삼성전자", symbol: "005930.KS", weight: 21.5 },
      { name: "한미반도체", symbol: "042700.KS", weight: 10.6 },
      { name: "리노공업", symbol: "058470.KS", weight: 6.7 },
      { name: "HPSP", symbol: "403870.KS", weight: 6.0 },
      { name: "ISC", symbol: "095340.KS", weight: 5.3 },
      { name: "DB하이텍", symbol: "000990.KS", weight: 4.5 },
      { name: "동진쎄미켐", symbol: "005290.KS", weight: 3.9 },
      { name: "원익IPS", symbol: "240810.KS", weight: 3.5 },
      { name: "주성엔지니어링", symbol: "036930.KS", weight: 3.2 }
    ],
    sectors: [
      { name: "메모리", weight: 46 },
      { name: "장비", weight: 24 },
      { name: "부품/검사", weight: 17 },
      { name: "소재", weight: 8 },
      { name: "기타", weight: 5 }
    ],
    countries: [{ name: "한국", weight: 100 }],
    comparison: "KODEX 반도체보다 상위 종목 집중도가 높아 핵심주 흐름을 더 크게 따라갈 수 있습니다.",
    risks: ["상위 2개 종목 비중이 높습니다.", "AI 메모리 기대가 낮아지면 변동성이 커질 수 있습니다.", "테마 ETF라 장기 보유 전 사이클 확인이 필요합니다."]
  },
  "402970.KS": {
    easyExplanation: "ACE 미국배당다우존스는 미국 배당 성장주를 국내 상장 상품으로 볼 수 있는 ETF입니다.",
    holdings: [
      { name: "Texas Instruments", symbol: "TXN", weight: 4.4 },
      { name: "Home Depot", symbol: "HD", weight: 4.2 },
      { name: "Verizon", symbol: "VZ", weight: 4.0 },
      { name: "Chevron", symbol: "CVX", weight: 3.9 },
      { name: "Lockheed Martin", symbol: "LMT", weight: 3.8 },
      { name: "Coca-Cola", symbol: "KO", weight: 3.7 },
      { name: "PepsiCo", symbol: "PEP", weight: 3.6 },
      { name: "Cisco", symbol: "CSCO", weight: 3.4 },
      { name: "BlackRock", symbol: "BLK", weight: 3.2 },
      { name: "Pfizer", symbol: "PFE", weight: 3.0 }
    ],
    sectors: [
      { name: "금융", weight: 18 },
      { name: "산업재", weight: 17 },
      { name: "소비재", weight: 16 },
      { name: "헬스케어", weight: 14 },
      { name: "기술", weight: 12 }
    ],
    countries: [
      { name: "미국", weight: 98 },
      { name: "기타", weight: 2 }
    ],
    comparison: "성장주 ETF보다 변동성이 낮을 수 있지만, 강한 상승장에서는 수익률이 덜할 수 있습니다.",
    risks: ["배당이 높아 보여도 주가 하락을 상쇄하지 못할 수 있습니다.", "환율 영향을 받습니다.", "배당 정책은 기업 상황에 따라 바뀔 수 있습니다."]
  },
  "458730.KS": {
    easyExplanation: "TIGER 미국배당다우존스는 미국 배당주를 국내에서 접근하는 ETF입니다. 현금흐름과 배당 성향을 공부하기 좋습니다.",
    holdings: [
      { name: "Broadcom", symbol: "AVGO", weight: 4.3 },
      { name: "AbbVie", symbol: "ABBV", weight: 4.1 },
      { name: "Texas Instruments", symbol: "TXN", weight: 4.0 },
      { name: "Coca-Cola", symbol: "KO", weight: 3.8 },
      { name: "PepsiCo", symbol: "PEP", weight: 3.6 },
      { name: "Amgen", symbol: "AMGN", weight: 3.4 },
      { name: "Verizon", symbol: "VZ", weight: 3.3 },
      { name: "Cisco", symbol: "CSCO", weight: 3.2 },
      { name: "Chevron", symbol: "CVX", weight: 3.1 },
      { name: "Pfizer", symbol: "PFE", weight: 2.9 }
    ],
    sectors: [
      { name: "헬스케어", weight: 19 },
      { name: "금융", weight: 17 },
      { name: "소비재", weight: 16 },
      { name: "기술", weight: 15 },
      { name: "에너지", weight: 10 }
    ],
    countries: [
      { name: "미국", weight: 98 },
      { name: "기타", weight: 2 }
    ],
    comparison: "개별 배당주보다 분산되어 있지만, 배당 ETF끼리는 구성 종목이 비슷할 수 있어 중복 보유를 확인해야 합니다.",
    risks: ["금리 상승기에는 배당주의 매력이 낮아질 수 있습니다.", "월배당 이미지와 실제 총수익률은 다를 수 있습니다.", "환율 변동을 함께 봐야 합니다."]
  },
  "465350.KS": {
    easyExplanation: "TIGER 코리아휴머노이드로봇산업은 로봇, 자동화, 부품, AI 응용 기업을 묶어 보는 테마 ETF입니다.",
    holdings: [
      { name: "두산로보틱스", symbol: "454910.KS", weight: 12.8 },
      { name: "로보티즈", symbol: "108490.KS", weight: 10.7 },
      { name: "레인보우로보틱스", symbol: "277810.KS", weight: 10.2 },
      { name: "에스피지", symbol: "058610.KS", weight: 7.9 },
      { name: "뉴로메카", symbol: "348340.KS", weight: 7.1 },
      { name: "티로보틱스", symbol: "117730.KS", weight: 6.6 },
      { name: "유진로봇", symbol: "056080.KS", weight: 5.8 },
      { name: "현대오토에버", symbol: "307950.KS", weight: 5.2 },
      { name: "고영", symbol: "098460.KS", weight: 4.8 },
      { name: "에스비비테크", symbol: "389500.KS", weight: 4.1 }
    ],
    sectors: [
      { name: "로봇 완성/서비스", weight: 35 },
      { name: "부품/감속기", weight: 24 },
      { name: "자동화 장비", weight: 19 },
      { name: "AI/소프트웨어", weight: 12 },
      { name: "기타", weight: 10 }
    ],
    countries: [{ name: "한국", weight: 100 }],
    comparison: "로봇 테마를 여러 종목으로 나눠 볼 수 있지만, 아직 실적보다 기대가 앞선 기업도 많습니다.",
    risks: ["테마 과열 시 조정이 큽니다.", "실제 매출 연결까지 시간이 걸릴 수 있습니다.", "중소형주 비중이 높아 유동성 리스크가 있습니다."]
  },
  VOO: {
    easyExplanation: "VOO는 미국 S&P500을 낮은 보수로 추종하는 대표 ETF입니다. 미국 대형주 전체에 분산 투자하는 기본 도구로 자주 쓰입니다.",
    holdings: [
      { name: "Microsoft", symbol: "MSFT", weight: 7.1 },
      { name: "Apple", symbol: "AAPL", weight: 6.4 },
      { name: "NVIDIA", symbol: "NVDA", weight: 6.1 },
      { name: "Amazon", symbol: "AMZN", weight: 3.8 },
      { name: "Meta Platforms", symbol: "META", weight: 2.6 },
      { name: "Alphabet Class A", symbol: "GOOGL", weight: 2.1 },
      { name: "Berkshire Hathaway", symbol: "BRK.B", weight: 1.8 },
      { name: "Eli Lilly", symbol: "LLY", weight: 1.5 },
      { name: "JPMorgan Chase", symbol: "JPM", weight: 1.3 },
      { name: "Exxon Mobil", symbol: "XOM", weight: 1.2 }
    ],
    sectors: [
      { name: "기술", weight: 31 },
      { name: "금융", weight: 13 },
      { name: "헬스케어", weight: 12 },
      { name: "소비", weight: 11 },
      { name: "산업재", weight: 8 }
    ],
    countries: [{ name: "미국", weight: 100 }],
    comparison: "QQQ보다 넓고 SCHD보다 성장주 비중이 높습니다. 미국 시장 전체를 보는 기준점에 가깝습니다.",
    risks: ["미국 대형 기술주 비중이 큽니다.", "달러 환율 영향을 받습니다.", "미국 시장 전체 조정에는 방어가 어렵습니다."]
  },
  VTI: {
    easyExplanation: "VTI는 미국 대형주뿐 아니라 중소형주까지 포함해 미국 전체 주식시장에 넓게 투자하는 ETF입니다.",
    holdings: [
      { name: "Microsoft", symbol: "MSFT", weight: 6.1 },
      { name: "Apple", symbol: "AAPL", weight: 5.6 },
      { name: "NVIDIA", symbol: "NVDA", weight: 5.2 },
      { name: "Amazon", symbol: "AMZN", weight: 3.1 },
      { name: "Meta Platforms", symbol: "META", weight: 2.2 },
      { name: "Alphabet Class A", symbol: "GOOGL", weight: 1.8 },
      { name: "Berkshire Hathaway", symbol: "BRK.B", weight: 1.6 },
      { name: "Eli Lilly", symbol: "LLY", weight: 1.3 },
      { name: "Broadcom", symbol: "AVGO", weight: 1.2 },
      { name: "Tesla", symbol: "TSLA", weight: 1.1 }
    ],
    sectors: [
      { name: "기술", weight: 29 },
      { name: "금융", weight: 12 },
      { name: "헬스케어", weight: 11 },
      { name: "소비", weight: 11 },
      { name: "중소형/기타", weight: 18 }
    ],
    countries: [{ name: "미국", weight: 100 }],
    comparison: "VOO보다 더 넓게 분산되지만 상위 대형 기술주의 영향은 여전히 큽니다.",
    risks: ["미국 경기 전체에 민감합니다.", "중소형주가 포함되어 금리 부담 영향을 받을 수 있습니다.", "환율 변동을 함께 봐야 합니다."]
  },
  QQQ: {
    easyExplanation: "QQQ는 나스닥100을 추종하는 대표 성장형 ETF입니다. 기술주와 AI 관련 대형주 비중이 높습니다.",
    holdings: [
      { name: "NVIDIA", symbol: "NVDA", weight: 8.7 },
      { name: "Microsoft", symbol: "MSFT", weight: 8.1 },
      { name: "Apple", symbol: "AAPL", weight: 7.4 },
      { name: "Broadcom", symbol: "AVGO", weight: 5.0 },
      { name: "Amazon", symbol: "AMZN", weight: 4.9 },
      { name: "Meta Platforms", symbol: "META", weight: 4.3 },
      { name: "Tesla", symbol: "TSLA", weight: 3.2 },
      { name: "Alphabet Class A", symbol: "GOOGL", weight: 2.9 },
      { name: "Costco", symbol: "COST", weight: 2.4 },
      { name: "Adobe", symbol: "ADBE", weight: 1.7 }
    ],
    sectors: [
      { name: "기술", weight: 52 },
      { name: "커뮤니케이션", weight: 16 },
      { name: "소비", weight: 15 },
      { name: "헬스케어", weight: 6 },
      { name: "기타", weight: 11 }
    ],
    countries: [{ name: "미국", weight: 100 }],
    comparison: "VOO보다 기술 성장주 색깔이 강해 상승 탄력과 하락 변동성이 모두 더 클 수 있습니다.",
    risks: ["상위 빅테크 집중도가 높습니다.", "금리 상승기에 부담이 커질 수 있습니다.", "AI 기대가 과열되면 조정이 큽니다."]
  },
  SCHD: {
    easyExplanation: "SCHD는 배당과 현금흐름이 비교적 안정적인 미국 기업을 중심으로 담는 ETF입니다.",
    holdings: [
      { name: "Texas Instruments", symbol: "TXN", weight: 4.4 },
      { name: "Chevron", symbol: "CVX", weight: 4.2 },
      { name: "Coca-Cola", symbol: "KO", weight: 4.0 },
      { name: "PepsiCo", symbol: "PEP", weight: 3.8 },
      { name: "Verizon", symbol: "VZ", weight: 3.6 },
      { name: "Amgen", symbol: "AMGN", weight: 3.4 },
      { name: "Cisco", symbol: "CSCO", weight: 3.2 },
      { name: "Home Depot", symbol: "HD", weight: 3.1 },
      { name: "BlackRock", symbol: "BLK", weight: 2.9 },
      { name: "Lockheed Martin", symbol: "LMT", weight: 2.8 }
    ],
    sectors: [
      { name: "금융", weight: 18 },
      { name: "헬스케어", weight: 16 },
      { name: "소비재", weight: 15 },
      { name: "산업재", weight: 14 },
      { name: "기술", weight: 12 }
    ],
    countries: [{ name: "미국", weight: 100 }],
    comparison: "QQQ보다 방어적이고 배당 중심이지만, 기술 성장주 랠리에서는 상대적으로 덜 오를 수 있습니다.",
    risks: ["배당주도 주가 하락은 피할 수 없습니다.", "금리 상승 시 배당 매력이 낮아질 수 있습니다.", "환율 영향을 받습니다."]
  },
  SMH: {
    easyExplanation: "SMH는 글로벌 반도체 대표 기업을 담는 ETF입니다. AI 반도체와 파운드리, 장비 기업을 함께 볼 수 있습니다.",
    holdings: [
      { name: "NVIDIA", symbol: "NVDA", weight: 20.3 },
      { name: "TSMC", symbol: "TSM", weight: 12.5 },
      { name: "Broadcom", symbol: "AVGO", weight: 7.8 },
      { name: "ASML", symbol: "ASML", weight: 5.4 },
      { name: "AMD", symbol: "AMD", weight: 4.9 },
      { name: "Qualcomm", symbol: "QCOM", weight: 4.5 },
      { name: "Texas Instruments", symbol: "TXN", weight: 4.1 },
      { name: "Applied Materials", symbol: "AMAT", weight: 3.9 },
      { name: "Lam Research", symbol: "LRCX", weight: 3.5 },
      { name: "Micron", symbol: "MU", weight: 3.1 }
    ],
    sectors: [
      { name: "AI 반도체", weight: 30 },
      { name: "파운드리", weight: 16 },
      { name: "장비", weight: 15 },
      { name: "통신칩/아날로그", weight: 14 },
      { name: "메모리", weight: 8 }
    ],
    countries: [
      { name: "미국", weight: 72 },
      { name: "대만", weight: 13 },
      { name: "네덜란드", weight: 6 },
      { name: "기타", weight: 9 }
    ],
    comparison: "개별 반도체주보다 넓지만 NVIDIA 비중이 높아 AI 반도체 기대에 크게 반응합니다.",
    risks: ["NVIDIA 비중이 높습니다.", "반도체 사이클과 지정학 리스크에 민감합니다.", "테마 과열 시 변동성이 큽니다."]
  },
  BOTZ: {
    easyExplanation: "BOTZ는 글로벌 로봇, 자동화, AI 응용 기업을 담는 테마 ETF입니다.",
    holdings: [
      { name: "NVIDIA", symbol: "NVDA", weight: 12.4 },
      { name: "Intuitive Surgical", symbol: "ISRG", weight: 9.6 },
      { name: "ABB", symbol: "ABB", weight: 8.5 },
      { name: "Keyence", symbol: "6861.T", weight: 7.8 },
      { name: "Fanuc", symbol: "6954.T", weight: 7.1 },
      { name: "Yaskawa Electric", symbol: "6506.T", weight: 5.8 },
      { name: "Daifuku", symbol: "6383.T", weight: 4.6 },
      { name: "SMC", symbol: "6273.T", weight: 4.0 },
      { name: "Cognex", symbol: "CGNX", weight: 3.6 },
      { name: "Omron", symbol: "6645.T", weight: 3.2 }
    ],
    sectors: [
      { name: "산업 자동화", weight: 34 },
      { name: "로봇/부품", weight: 26 },
      { name: "의료 로봇", weight: 13 },
      { name: "AI 반도체", weight: 12 },
      { name: "물류 자동화", weight: 9 }
    ],
    countries: [
      { name: "일본", weight: 42 },
      { name: "미국", weight: 36 },
      { name: "스위스", weight: 8 },
      { name: "기타", weight: 14 }
    ],
    comparison: "국내 로봇 테마보다 글로벌 자동화 기업이 섞여 있지만, 테마형이라 변동성이 있습니다.",
    risks: ["로봇 테마 기대가 과열될 수 있습니다.", "일본·미국 비중이 높아 환율 영향을 받습니다.", "실제 매출 성장 속도를 확인해야 합니다."]
  },
  IHI: {
    easyExplanation: "IHI는 미국 의료기기 기업을 담는 헬스케어 ETF입니다. 신약보다 장비와 소모품, 수술기기 쪽에 가깝습니다.",
    holdings: [
      { name: "Abbott Laboratories", symbol: "ABT", weight: 13.1 },
      { name: "Intuitive Surgical", symbol: "ISRG", weight: 12.4 },
      { name: "Stryker", symbol: "SYK", weight: 10.2 },
      { name: "Boston Scientific", symbol: "BSX", weight: 9.1 },
      { name: "Medtronic", symbol: "MDT", weight: 8.4 },
      { name: "Edwards Lifesciences", symbol: "EW", weight: 5.6 },
      { name: "Dexcom", symbol: "DXCM", weight: 4.2 },
      { name: "Zimmer Biomet", symbol: "ZBH", weight: 3.8 },
      { name: "ResMed", symbol: "RMD", weight: 3.5 },
      { name: "Insulet", symbol: "PODD", weight: 3.1 }
    ],
    sectors: [
      { name: "의료기기", weight: 47 },
      { name: "수술 로봇/장비", weight: 18 },
      { name: "진단/모니터링", weight: 15 },
      { name: "소모품", weight: 12 },
      { name: "기타", weight: 8 }
    ],
    countries: [{ name: "미국", weight: 100 }],
    comparison: "바이오 신약보다 실적 안정성이 높을 수 있지만, 규제와 병원 투자 사이클을 봐야 합니다.",
    risks: ["미국 의료 규제와 보험 정책 영향을 받습니다.", "밸류에이션이 높아질 수 있습니다.", "달러 환율 영향을 받습니다."]
  },
  GLD: {
    easyExplanation: "GLD는 금 가격 흐름을 따라가도록 설계된 ETF입니다. 주식과 다른 성격의 방어형 자산으로 자주 언급됩니다.",
    holdings: [
      { name: "금 현물", symbol: "GOLD", weight: 99.5 },
      { name: "현금 및 기타", symbol: "CASH", weight: 0.5 }
    ],
    sectors: [
      { name: "금", weight: 99.5 },
      { name: "현금/기타", weight: 0.5 }
    ],
    countries: [
      { name: "글로벌 금 현물", weight: 100 }
    ],
    comparison: "주식 ETF와 달리 기업 실적보다 금리, 달러, 위험 회피 심리에 더 크게 반응합니다.",
    risks: ["배당이 없습니다.", "달러와 실질금리 변화에 민감합니다.", "장기적으로 주식처럼 성장하는 자산은 아닙니다."]
  }
};

const profileTemplates: Record<string, EtfProfile> = {
  usBroad: etfProfiles["360750.KS"],
  usTech: etfProfiles["133690.KS"],
  koreaSemi: etfProfiles["091160.KS"],
  globalSemi: etfProfiles.SMH,
  dividend: etfProfiles["458730.KS"],
  robot: etfProfiles["465350.KS"],
  gold: etfProfiles.GLD,
  bond: {
    easyExplanation: "채권 ETF는 주식보다 변동성이 낮을 수 있지만, 금리 변화에 따라 가격이 움직입니다. 금리가 내려가면 채권 가격이 좋아질 수 있고, 금리가 오르면 부담이 될 수 있습니다.",
    holdings: [
      { name: "미국 국채 10년물", symbol: "UST10Y", weight: 31.5 },
      { name: "미국 국채 7년물", symbol: "UST7Y", weight: 18.3 },
      { name: "미국 국채 20년물", symbol: "UST20Y", weight: 16.7 },
      { name: "미국 국채 30년물", symbol: "UST30Y", weight: 12.2 },
      { name: "미국 국채 5년물", symbol: "UST5Y", weight: 9.8 },
      { name: "현금성 자산", symbol: "CASH", weight: 4.5 },
      { name: "미국 단기국채", symbol: "USTB", weight: 3.9 },
      { name: "국채 선물", symbol: "FUT", weight: 1.6 },
      { name: "환헤지 포지션", symbol: "FXH", weight: 0.9 },
      { name: "기타", symbol: "ETC", weight: 0.6 }
    ],
    sectors: [
      { name: "국채", weight: 88 },
      { name: "현금성", weight: 7 },
      { name: "파생/헤지", weight: 5 }
    ],
    countries: [
      { name: "미국", weight: 92 },
      { name: "기타", weight: 8 }
    ],
    comparison: "주식 ETF와 달리 기업 성장보다 금리 방향과 만기가 중요합니다.",
    risks: ["금리가 오르면 채권 가격이 하락할 수 있습니다.", "장기채일수록 금리 변동에 더 민감합니다.", "환노출 상품은 환율 영향도 함께 봐야 합니다."]
  },
  battery: {
    easyExplanation: "2차전지 ETF는 배터리 소재, 셀, 장비, 전기차 밸류체인 기업을 묶어 보는 테마 ETF입니다.",
    holdings: [
      { name: "LG에너지솔루션", symbol: "373220.KS", weight: 17.4 },
      { name: "삼성SDI", symbol: "006400.KS", weight: 13.2 },
      { name: "POSCO홀딩스", symbol: "005490.KS", weight: 9.7 },
      { name: "에코프로비엠", symbol: "247540.KS", weight: 8.6 },
      { name: "엘앤에프", symbol: "066970.KS", weight: 6.2 },
      { name: "포스코퓨처엠", symbol: "003670.KS", weight: 5.9 },
      { name: "SK이노베이션", symbol: "096770.KS", weight: 5.5 },
      { name: "나노신소재", symbol: "121600.KS", weight: 3.8 },
      { name: "천보", symbol: "278280.KS", weight: 3.1 },
      { name: "피엔티", symbol: "137400.KS", weight: 2.9 }
    ],
    sectors: [
      { name: "배터리 셀", weight: 35 },
      { name: "양극재/소재", weight: 32 },
      { name: "장비", weight: 13 },
      { name: "전기차/부품", weight: 10 },
      { name: "기타", weight: 10 }
    ],
    countries: [{ name: "한국", weight: 100 }],
    comparison: "개별 배터리주보다 넓지만 전기차 수요와 원자재 가격에 같이 흔들립니다.",
    risks: ["전기차 수요 둔화에 민감합니다.", "리튬·니켈 가격과 재고 사이클을 봐야 합니다.", "테마 과열 후 조정이 클 수 있습니다."]
  },
  power: {
    easyExplanation: "전력 인프라 ETF는 AI 데이터센터, 전력망 투자, 변압기·전선 수요와 연결되는 기업을 묶어 봅니다.",
    holdings: [
      { name: "HD현대일렉트릭", symbol: "267260.KS", weight: 14.8 },
      { name: "LS ELECTRIC", symbol: "010120.KS", weight: 13.1 },
      { name: "효성중공업", symbol: "298040.KS", weight: 10.6 },
      { name: "LS", symbol: "006260.KS", weight: 8.8 },
      { name: "일진전기", symbol: "103590.KS", weight: 7.4 },
      { name: "대한전선", symbol: "001440.KS", weight: 6.2 },
      { name: "가온전선", symbol: "000500.KS", weight: 5.1 },
      { name: "제룡전기", symbol: "033100.KS", weight: 4.6 },
      { name: "서전기전", symbol: "189860.KS", weight: 3.5 },
      { name: "비츠로테크", symbol: "042370.KS", weight: 3.0 }
    ],
    sectors: [
      { name: "변압기/전력기기", weight: 42 },
      { name: "전선", weight: 24 },
      { name: "전력망 장비", weight: 18 },
      { name: "자동화/제어", weight: 9 },
      { name: "기타", weight: 7 }
    ],
    countries: [{ name: "한국", weight: 100 }],
    comparison: "AI 반도체 ETF와 달리 데이터센터 전력 수요를 뒤에서 받치는 인프라 기업을 보는 성격입니다.",
    risks: ["수주 기대가 이미 반영되면 변동성이 커질 수 있습니다.", "원자재 가격과 환율 영향을 받습니다.", "전력 투자 사이클 둔화에 주의해야 합니다."]
  },
  healthcare: {
    easyExplanation: "헬스케어 ETF는 제약, 바이오, 의료기기, 진단 기업을 묶어 보는 상품입니다.",
    holdings: [
      { name: "셀트리온", symbol: "068270.KS", weight: 16.8 },
      { name: "삼성바이오로직스", symbol: "207940.KS", weight: 15.6 },
      { name: "유한양행", symbol: "000100.KS", weight: 7.8 },
      { name: "SK바이오팜", symbol: "326030.KS", weight: 5.9 },
      { name: "한미약품", symbol: "128940.KS", weight: 5.5 },
      { name: "HLB", symbol: "028300.KS", weight: 5.1 },
      { name: "알테오젠", symbol: "196170.KS", weight: 4.8 },
      { name: "인바디", symbol: "041830.KQ", weight: 3.2 },
      { name: "클래시스", symbol: "214150.KQ", weight: 3.0 },
      { name: "오스템임플란트", symbol: "048260.KQ", weight: 2.6 }
    ],
    sectors: [
      { name: "바이오시밀러/CDMO", weight: 33 },
      { name: "제약", weight: 24 },
      { name: "바이오 신약", weight: 20 },
      { name: "의료기기", weight: 13 },
      { name: "진단/기타", weight: 10 }
    ],
    countries: [{ name: "한국", weight: 100 }],
    comparison: "개별 바이오주보다 분산되지만 임상·허가 뉴스에 따른 변동성은 남아 있습니다.",
    risks: ["임상 결과와 규제 이슈에 민감합니다.", "적자 성장 기업 비중을 확인해야 합니다.", "개별 기업 뉴스가 ETF에도 영향을 줄 수 있습니다."]
  },
  bank: {
    easyExplanation: "은행 ETF는 국내 금융지주와 은행주를 묶어 금리, 배당, 주주환원 흐름을 보는 상품입니다.",
    holdings: [
      { name: "KB금융", symbol: "105560.KS", weight: 21.3 },
      { name: "신한지주", symbol: "055550.KS", weight: 18.6 },
      { name: "하나금융지주", symbol: "086790.KS", weight: 15.7 },
      { name: "우리금융지주", symbol: "316140.KS", weight: 12.4 },
      { name: "기업은행", symbol: "024110.KS", weight: 8.3 },
      { name: "BNK금융지주", symbol: "138930.KS", weight: 6.1 },
      { name: "DGB금융지주", symbol: "139130.KS", weight: 4.8 },
      { name: "JB금융지주", symbol: "175330.KS", weight: 4.1 },
      { name: "카카오뱅크", symbol: "323410.KS", weight: 3.7 },
      { name: "제주은행", symbol: "006220.KS", weight: 1.5 }
    ],
    sectors: [
      { name: "금융지주", weight: 68 },
      { name: "은행", weight: 22 },
      { name: "인터넷은행", weight: 6 },
      { name: "기타", weight: 4 }
    ],
    countries: [{ name: "한국", weight: 100 }],
    comparison: "개별 은행주보다 분산되지만 금리, 대손비용, 주주환원 정책에 함께 영향을 받습니다.",
    risks: ["부동산 PF와 대손비용을 확인해야 합니다.", "금리 하락기에는 순이자마진이 부담될 수 있습니다.", "규제와 배당 정책 변화에 민감합니다."]
  },
  auto: {
    easyExplanation: "자동차 ETF는 완성차, 부품, 전장, 전기차 전환과 연결된 기업을 묶어 보는 상품입니다.",
    holdings: [
      { name: "현대차", symbol: "005380.KS", weight: 22.1 },
      { name: "기아", symbol: "000270.KS", weight: 19.4 },
      { name: "현대모비스", symbol: "012330.KS", weight: 10.2 },
      { name: "HL만도", symbol: "204320.KS", weight: 6.8 },
      { name: "한온시스템", symbol: "018880.KS", weight: 5.9 },
      { name: "한국타이어앤테크놀로지", symbol: "161390.KS", weight: 5.1 },
      { name: "성우하이텍", symbol: "015750.KS", weight: 4.4 },
      { name: "화신", symbol: "010690.KS", weight: 3.9 },
      { name: "상신브레이크", symbol: "041650.KS", weight: 3.2 },
      { name: "에스엘", symbol: "005850.KS", weight: 2.8 }
    ],
    sectors: [
      { name: "완성차", weight: 44 },
      { name: "부품", weight: 28 },
      { name: "전장/전기차", weight: 14 },
      { name: "타이어", weight: 7 },
      { name: "기타", weight: 7 }
    ],
    countries: [{ name: "한국", weight: 100 }],
    comparison: "개별 완성차보다 부품사를 함께 볼 수 있지만 환율, 미국 판매, 전기차 전환 속도에 민감합니다.",
    risks: ["환율과 관세 이슈에 영향을 받습니다.", "전기차 수요 둔화에 민감할 수 있습니다.", "완성차 비중이 커서 특정 대형주 영향이 큽니다."]
  },
  energy: {
    easyExplanation: "에너지 ETF는 정유, 석유·가스 생산, 에너지 인프라 기업을 담아 유가 흐름과 연결해 보는 상품입니다.",
    holdings: [
      { name: "Exxon Mobil", symbol: "XOM", weight: 22.4 },
      { name: "Chevron", symbol: "CVX", weight: 17.8 },
      { name: "ConocoPhillips", symbol: "COP", weight: 8.4 },
      { name: "EOG Resources", symbol: "EOG", weight: 4.9 },
      { name: "Schlumberger", symbol: "SLB", weight: 4.4 },
      { name: "Marathon Petroleum", symbol: "MPC", weight: 4.1 },
      { name: "Phillips 66", symbol: "PSX", weight: 3.8 },
      { name: "Williams", symbol: "WMB", weight: 3.2 },
      { name: "Kinder Morgan", symbol: "KMI", weight: 2.8 },
      { name: "Valero Energy", symbol: "VLO", weight: 2.6 }
    ],
    sectors: [
      { name: "석유/가스 생산", weight: 42 },
      { name: "정유", weight: 22 },
      { name: "에너지 장비", weight: 14 },
      { name: "파이프라인", weight: 12 },
      { name: "기타", weight: 10 }
    ],
    countries: [{ name: "미국", weight: 100 }],
    comparison: "주식시장 성장주와 다른 유가 민감 자산으로 볼 수 있지만 원자재 가격 변동이 큽니다.",
    risks: ["유가 급락 시 수익성이 흔들릴 수 있습니다.", "정책과 지정학 리스크에 민감합니다.", "배당이 있어도 주가 변동이 큽니다."]
  },
  reit: {
    easyExplanation: "리츠 ETF는 상업용 부동산, 물류센터, 데이터센터, 임대형 자산에 분산 투자하는 상품입니다.",
    holdings: [
      { name: "Prologis", symbol: "PLD", weight: 7.5 },
      { name: "American Tower", symbol: "AMT", weight: 6.8 },
      { name: "Equinix", symbol: "EQIX", weight: 5.9 },
      { name: "Welltower", symbol: "WELL", weight: 5.2 },
      { name: "Simon Property", symbol: "SPG", weight: 4.4 },
      { name: "Realty Income", symbol: "O", weight: 4.1 },
      { name: "Digital Realty", symbol: "DLR", weight: 3.9 },
      { name: "Public Storage", symbol: "PSA", weight: 3.6 },
      { name: "AvalonBay", symbol: "AVB", weight: 3.0 },
      { name: "VICI Properties", symbol: "VICI", weight: 2.8 }
    ],
    sectors: [
      { name: "물류/산업 리츠", weight: 22 },
      { name: "통신/데이터센터", weight: 21 },
      { name: "헬스케어 리츠", weight: 13 },
      { name: "상업시설", weight: 12 },
      { name: "주거/기타", weight: 32 }
    ],
    countries: [{ name: "미국", weight: 100 }],
    comparison: "채권과 주식의 중간 성격처럼 볼 수 있지만 금리와 부동산 공실률에 민감합니다.",
    risks: ["금리 상승기에 부담이 커질 수 있습니다.", "상업용 부동산 침체에 주의해야 합니다.", "배당만 보고 접근하면 주가 변동을 놓칠 수 있습니다."]
  }
};

function profileFor(symbol: string, name: string, character: Etf["character"], market: Etf["market"]) {
  if (etfProfiles[symbol]) return etfProfiles[symbol];
  if (name.includes("S&P500") || name.includes("S&P 500") || ["SPY", "IVV"].includes(symbol)) return profileTemplates.usBroad;
  if (name.includes("나스닥") || name.includes("테크") || ["VGT", "XLK"].includes(symbol)) return profileTemplates.usTech;
  if (["SOXX"].includes(symbol)) return profileTemplates.globalSemi;
  if (name.includes("반도체")) return profileTemplates.koreaSemi;
  if (name.includes("배당") || character === "배당형") return profileTemplates.dividend;
  if (name.includes("로봇") || name.includes("자동화")) return profileTemplates.robot;
  if (name.includes("2차전지") || name.includes("배터리")) return profileTemplates.battery;
  if (name.includes("전력") || name.includes("인프라")) return profileTemplates.power;
  if (name.includes("헬스") || name.includes("의료") || ["XLV"].includes(symbol)) return profileTemplates.healthcare;
  if (name.includes("은행") || ["XLF"].includes(symbol)) return profileTemplates.bank;
  if (name.includes("자동차")) return profileTemplates.auto;
  if (name.includes("에너지") || ["XLE"].includes(symbol)) return profileTemplates.energy;
  if (name.includes("리츠") || name.includes("부동산") || ["VNQ"].includes(symbol)) return profileTemplates.reit;
  if (name.includes("채권") || ["TLT", "BND"].includes(symbol)) return profileTemplates.bond;
  if (name.includes("금") || ["GLD", "IAU"].includes(symbol)) return profileTemplates.gold;
  if (market === "US" && character === "지수형") return profileTemplates.usBroad;
  return defaultProfile;
}

function makeMockPrice(symbol: string, market: Etf["market"]) {
  const seed = [...symbol].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const base = market === "KR" ? 8000 + (seed % 42000) : 35 + (seed % 480);
  const change = ((seed % 71) - 28) / 10;
  const status = change > 2.5 ? "강한 상승" : change > 0.4 ? "상승" : change < -2.5 ? "조정" : change < -0.4 ? "약세" : "횡보";
  return {
    currentPrice: market === "KR" ? `현재가 흐름 ${base.toLocaleString("ko-KR")}원대` : `현재가 흐름 $${base.toLocaleString("en-US")}대`,
    changeRate: `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
    status
  };
}

function makeMockChart(symbol: string) {
  const seed = [...symbol].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return Array.from({ length: 10 }, (_, index) => {
    const wave = Math.sin((seed + index * 13) / 10) * 5;
    const drift = (seed % 17) - 8 + index * ((seed % 5) - 1) * 0.5;
    return { label: `${index + 1}주`, value: Math.max(70, Math.min(130, Math.round(100 + wave + drift))) };
  });
}

function makeEtf(symbol: string, name: string, market: "KR" | "US", issuer: string, character: Etf["character"], risk: Etf["risk"], oneLine: string): Etf {
  const isDividend = character === "배당형";
  const isTheme = character === "테마형";
  const profile = profileFor(symbol, name, character, market);
  const price = makeMockPrice(symbol, market);
  return {
    symbol,
    name,
    market,
    issuer,
    expenseRatio: market === "KR" ? "약 0.05%~0.45%" : "약 0.03%~0.35%",
    currentPrice: price.currentPrice,
    changeRate: price.changeRate,
    status: price.status,
    recentReturn: isTheme ? "+8.4% / 최근 1개월 흐름" : isDividend ? "+2.1% / 최근 1개월 흐름" : "+4.3% / 최근 1개월 흐름",
    dividend: isDividend ? "배당 있음" : "상품별 상이",
    character,
    risk,
    oneLine,
    easyExplanation: profile.easyExplanation,
    holdings: profile.holdings,
    sectors: profile.sectors,
    countries: profile.countries,
    chart: makeMockChart(symbol),
    comparison: profile.comparison,
    risks: profile.risks,
    news: [
      { title: "월간 ETF 자금 흐름 점검", source: "Market Context Mock", url: "https://www.krx.co.kr/", summary: ["MVP 예시 뉴스입니다.", "본문을 복제하지 않고 링크와 자체 요약만 표시합니다."], sentiment: "중립" }
    ]
  };
}

export const etfs: Etf[] = [
  makeEtf("069500.KS", "KODEX 200", "KR", "삼성자산운용", "지수형", "낮음", "한국 대표 대형주를 넓게 담는 기본형 ETF입니다."),
  makeEtf("360750.KS", "TIGER 미국S&P500", "KR", "미래에셋자산운용", "지수형", "낮음", "미국 대표 500개 기업에 분산 투자하는 ETF입니다."),
  makeEtf("133690.KS", "TIGER 미국나스닥100", "KR", "미래에셋자산운용", "성장형", "중간", "미국 기술 성장주 비중이 높은 ETF입니다."),
  makeEtf("091160.KS", "KODEX 반도체", "KR", "삼성자산운용", "테마형", "중간", "국내 반도체 밸류체인을 묶어 보는 ETF입니다."),
  makeEtf("396500.KS", "TIGER 반도체TOP10", "KR", "미래에셋자산운용", "테마형", "중간", "국내 반도체 주요 종목에 집중하는 ETF입니다."),
  makeEtf("402970.KS", "ACE 미국배당다우존스", "KR", "한국투자신탁운용", "배당형", "낮음", "미국 배당 성장주를 중심으로 보는 ETF입니다."),
  makeEtf("458730.KS", "TIGER 미국배당다우존스", "KR", "미래에셋자산운용", "배당형", "낮음", "미국 배당주 흐름을 국내 상장 상품으로 보는 ETF입니다."),
  makeEtf("465350.KS", "TIGER 코리아휴머노이드로봇산업", "KR", "미래에셋자산운용", "테마형", "높음", "로봇 산업 기대를 담은 테마형 ETF입니다."),
  makeEtf("VOO", "VOO", "US", "Vanguard", "지수형", "낮음", "미국 S&P500을 낮은 보수로 따라가는 대표 ETF입니다."),
  makeEtf("VTI", "VTI", "US", "Vanguard", "지수형", "낮음", "미국 전체 주식시장에 넓게 분산하는 ETF입니다."),
  makeEtf("QQQ", "QQQ", "US", "Invesco", "성장형", "중간", "나스닥100 중심의 기술 성장 ETF입니다."),
  makeEtf("SCHD", "SCHD", "US", "Schwab", "배당형", "낮음", "배당과 현금흐름을 중시하는 미국 ETF입니다."),
  makeEtf("SMH", "SMH", "US", "VanEck", "테마형", "중간", "글로벌 반도체 대표 기업을 담는 ETF입니다."),
  makeEtf("BOTZ", "BOTZ", "US", "Global X", "테마형", "높음", "로봇과 자동화 산업을 보는 테마 ETF입니다."),
  makeEtf("IHI", "IHI", "US", "iShares", "방어형", "중간", "미국 의료기기 기업을 담는 헬스케어 ETF입니다."),
  makeEtf("GLD", "GLD", "US", "State Street", "방어형", "중간", "금 가격 흐름을 따라가는 방어형 자산 ETF입니다.")
  ,
  makeEtf("379800.KS", "KODEX 미국S&P500TR", "KR", "삼성자산운용", "지수형", "낮음", "미국 S&P500 지수를 국내 상장 상품으로 보는 ETF입니다."),
  makeEtf("379810.KS", "KODEX 미국나스닥100TR", "KR", "삼성자산운용", "성장형", "중간", "미국 나스닥100 기술 성장주를 국내에서 보는 ETF입니다."),
  makeEtf("381170.KS", "TIGER 미국테크TOP10 INDXX", "KR", "미래에셋자산운용", "성장형", "중간", "미국 대형 기술주 10개에 집중하는 ETF입니다."),
  makeEtf("305540.KS", "TIGER 2차전지테마", "KR", "미래에셋자산운용", "테마형", "높음", "국내 2차전지 밸류체인을 묶어 보는 ETF입니다."),
  makeEtf("091180.KS", "KODEX 자동차", "KR", "삼성자산운용", "테마형", "중간", "국내 완성차와 자동차 부품 흐름을 보는 ETF입니다."),
  makeEtf("091170.KS", "KODEX 은행", "KR", "삼성자산운용", "배당형", "중간", "국내 은행주와 금융지주를 묶어 보는 ETF입니다."),
  makeEtf("266420.KS", "KODEX 헬스케어", "KR", "삼성자산운용", "테마형", "중간", "국내 제약·바이오·의료기기 흐름을 보는 ETF입니다."),
  makeEtf("211900.KS", "KODEX 배당성장", "KR", "삼성자산운용", "배당형", "낮음", "배당 성장 성격의 국내 종목을 담는 ETF입니다."),
  makeEtf("487230.KS", "KODEX AI전력핵심설비", "KR", "삼성자산운용", "테마형", "높음", "AI 데이터센터와 전력 인프라 흐름을 보는 테마 ETF입니다."),
  makeEtf("481180.KS", "SOL 미국AI전력인프라", "KR", "신한자산운용", "테마형", "높음", "미국 AI 전력 인프라 관련 기업을 보는 ETF입니다."),
  makeEtf("148070.KS", "KOSEF 국고채10년", "KR", "키움투자자산운용", "방어형", "낮음", "국내 장기 국채 흐름을 보는 채권 ETF입니다."),
  makeEtf("SPY", "SPY", "US", "State Street", "지수형", "낮음", "미국 S&P500을 추종하는 대표 초대형 ETF입니다."),
  makeEtf("IVV", "IVV", "US", "iShares", "지수형", "낮음", "미국 S&P500에 낮은 보수로 분산 투자하는 ETF입니다."),
  makeEtf("VGT", "VGT", "US", "Vanguard", "성장형", "중간", "미국 정보기술 섹터에 집중하는 ETF입니다."),
  makeEtf("XLK", "XLK", "US", "State Street", "성장형", "중간", "미국 기술주 섹터 흐름을 보는 ETF입니다."),
  makeEtf("SOXX", "SOXX", "US", "iShares", "테마형", "중간", "미국 상장 반도체 기업을 묶어 보는 ETF입니다."),
  makeEtf("XLV", "XLV", "US", "State Street", "방어형", "중간", "미국 헬스케어 섹터를 보는 ETF입니다."),
  makeEtf("XLF", "XLF", "US", "State Street", "배당형", "중간", "미국 금융 섹터를 보는 ETF입니다."),
  makeEtf("XLE", "XLE", "US", "State Street", "방어형", "중간", "미국 에너지 섹터와 유가 흐름을 보는 ETF입니다."),
  makeEtf("VNQ", "VNQ", "US", "Vanguard", "배당형", "중간", "미국 리츠와 부동산 흐름을 보는 ETF입니다."),
  makeEtf("TLT", "TLT", "US", "iShares", "방어형", "중간", "미국 장기 국채 흐름을 보는 ETF입니다."),
  makeEtf("BND", "BND", "US", "Vanguard", "방어형", "낮음", "미국 채권시장 전체에 분산하는 ETF입니다."),
  makeEtf("IAU", "IAU", "US", "iShares", "방어형", "중간", "금 가격 흐름을 낮은 보수로 보는 ETF입니다.")
];

export function getEtf(symbol: string) {
  const decoded = decodeURIComponent(symbol);
  return etfs.find((etf) => etf.symbol === decoded);
}

export function createFallbackEtf(symbol: string, meta?: { name?: string; issuer?: string; character?: Etf["character"] }): Etf {
  const decoded = decodeURIComponent(symbol);
  return makeEtf(
    decoded,
    meta?.name?.trim() || decoded,
    decoded.includes(".KS") || /^\d{6}$/.test(decoded) ? "KR" : "US",
    meta?.issuer?.trim() || "운용사 확인 필요",
    meta?.character || "지수형",
    "중간",
    "검색에서 선택한 ETF입니다. 실제 구성 종목과 수익률은 API 연결 후 교체하는 구조입니다."
  );
}
