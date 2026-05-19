import type { Etf } from "@/types/investment";

type EtfProfile = Pick<Etf, "holdings" | "sectors" | "countries" | "easyExplanation" | "comparison" | "risks">;

const defaultProfile: EtfProfile = {
  easyExplanation:
    "ETF는 여러 종목을 한 바구니에 담아 한 번에 분산해서 보는 상품입니다. MVP 구성 비중은 예시 데이터이며, 실제 서비스에서는 운용사·거래소 API로 교체하는 구조입니다.",
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

function makeEtf(symbol: string, name: string, market: "KR" | "US", issuer: string, character: Etf["character"], risk: Etf["risk"], oneLine: string): Etf {
  const isDividend = character === "배당형";
  const isTheme = character === "테마형";
  const profile = etfProfiles[symbol] ?? defaultProfile;
  return {
    symbol,
    name,
    market,
    issuer,
    expenseRatio: market === "KR" ? "약 0.05%~0.45%" : "약 0.03%~0.35%",
    recentReturn: isTheme ? "+8.4% / 최근 1개월 예시" : isDividend ? "+2.1% / 최근 1개월 예시" : "+4.3% / 최근 1개월 예시",
    dividend: isDividend ? "배당 있음" : "상품별 상이",
    character,
    risk,
    oneLine,
    easyExplanation: profile.easyExplanation,
    holdings: profile.holdings,
    sectors: profile.sectors,
    countries: profile.countries,
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
