export type EconomyTerm = {
  term: string;
  aliases: string[];
  category: "금리" | "물가" | "지수" | "기업분석" | "부동산/대출" | "산업/테마" | "환율/원자재" | "ETF";
  easyDescription: string;
  whyImportant: string;
  whyMentionedRecently: string;
  marketImpact: string;
  portfolioHint: string;
  investorChecklist: string[];
  cautionPoint: string;
  relatedKeywords: string[];
  relatedContents: Array<{ title: string; description: string; href: string; type: "분석" | "뉴스" | "용어" | "종목" | "ETF" }>;
};

export const economyTerms: EconomyTerm[] = [
  {
    term: "기준금리",
    aliases: ["금리", "base rate", "policy rate"],
    category: "금리",
    easyDescription: "한국은행이나 중앙은행이 돈의 가격을 정할 때 기준으로 삼는 금리입니다.",
    whyImportant: "기준금리는 예금, 대출, 채권, 주식 밸류에이션에 모두 영향을 주는 출발점입니다.",
    whyMentionedRecently: "물가 둔화 속도와 경기 둔화 우려가 엇갈리면서 금리 인하 시점이 계속 시장의 관심사가 됩니다.",
    marketImpact: "금리 인하 기대가 커지면 성장주와 부동산 관련 자산 심리가 좋아질 수 있고, 금리 고점 우려가 커지면 주식 밸류에이션 부담이 커질 수 있습니다.",
    portfolioHint: "성장주 비중이 높다면 금리 변화에 민감할 수 있어 채권형 ETF, 배당주, 현금 비중을 함께 확인하면 좋습니다.",
    investorChecklist: ["중앙은행 발언", "CPI 흐름", "국채금리", "환율"],
    cautionPoint: "금리가 내려간다고 모든 주식이 바로 오르는 것은 아닙니다. 경기 둔화 때문에 내리는 금리라면 실적 우려도 같이 봐야 합니다.",
    relatedKeywords: ["CPI", "국채금리", "환율", "성장주"],
    relatedContents: [
      { title: "금리 관련 포트폴리오 힌트", description: "금리 변화가 성장주와 ETF에 주는 영향을 읽어봅니다.", href: "/reports", type: "분석" },
      { title: "오늘 시장", description: "금리 뉴스가 시장 심리에 어떤 영향을 주는지 확인합니다.", href: "/news", type: "뉴스" }
    ]
  },
  {
    term: "CPI",
    aliases: ["소비자물가지수", "물가", "consumer price index"],
    category: "물가",
    easyDescription: "소비자가 자주 사는 상품과 서비스 가격이 얼마나 올랐는지 보여주는 물가 지표입니다.",
    whyImportant: "CPI는 중앙은행의 금리 결정에 큰 영향을 주고, 금리는 다시 주식과 채권 가격에 영향을 줍니다.",
    whyMentionedRecently: "금리 인하 기대가 CPI 발표 때마다 바뀌기 때문에 시장이 민감하게 반응합니다.",
    marketImpact: "예상보다 높은 CPI는 금리 부담을 키워 성장주에 불리할 수 있고, 낮은 CPI는 투자 심리를 개선할 수 있습니다.",
    portfolioHint: "CPI 발표 전후에는 변동성이 커질 수 있어 단기 매수보다 보유 이유가 유지되는지 확인하는 편이 좋습니다.",
    investorChecklist: ["예상치 대비 실제치", "근원 CPI", "기준금리", "환율"],
    cautionPoint: "CPI 한 번으로 방향을 단정하지 말고 2~3개월 흐름을 함께 보는 것이 좋습니다.",
    relatedKeywords: ["기준금리", "인플레이션", "국채금리", "성장주"],
    relatedContents: [{ title: "월간 시장 흐름", description: "하루 지표보다 한 달 흐름으로 물가와 금리를 해석합니다.", href: "/reports", type: "분석" }]
  },
  {
    term: "코스피",
    aliases: ["KOSPI", "한국 증시", "국내 지수"],
    category: "지수",
    easyDescription: "한국 대표 기업들의 주가 흐름을 보여주는 국내 대표 주가지수입니다.",
    whyImportant: "국내 증시 분위기를 보여주는 대표 지표로, 외국인 수급과 대형주 흐름을 볼 때 자주 사용됩니다.",
    whyMentionedRecently: "반도체 흐름, 외국인 투자, 환율 변화가 코스피 방향에 큰 영향을 주기 때문입니다.",
    marketImpact: "코스피가 오르면 국내 투자 심리가 개선될 수 있고, 대형주 중심 ETF에도 긍정적으로 작용할 수 있습니다.",
    portfolioHint: "국내주 비중이 높다면 코스피 방향과 삼성전자·SK하이닉스 같은 대형주 흐름을 같이 보면 좋습니다.",
    investorChecklist: ["반도체", "외국인 매수", "환율", "KODEX 200"],
    cautionPoint: "코스피가 올라도 내가 가진 개별 종목이 반드시 오르는 것은 아닙니다. 업종과 종목별 이슈를 분리해서 봐야 합니다.",
    relatedKeywords: ["반도체", "외국인 매수", "환율", "ETF"],
    relatedContents: [
      { title: "KODEX 200", description: "코스피 대형주 흐름을 ETF로 넓게 보는 방법입니다.", href: "/etfs/069500.KS", type: "ETF" },
      { title: "삼성전자", description: "코스피 대표 대형주의 사업 구조와 지표를 봅니다.", href: "/stocks/005930.KS", type: "종목" }
    ]
  },
  {
    term: "ETF",
    aliases: ["상장지수펀드", "분산투자", "exchange traded fund"],
    category: "ETF",
    easyDescription: "여러 종목을 한 바구니에 담아 거래소에서 주식처럼 사고팔 수 있는 상품입니다.",
    whyImportant: "개별 기업을 고르기 어렵거나 산업 전체를 보고 싶을 때 분산해서 접근할 수 있습니다.",
    whyMentionedRecently: "미국 지수 ETF, 반도체 ETF, 월배당 ETF처럼 투자 목적별 상품이 많아지며 자주 언급됩니다.",
    marketImpact: "ETF 자금 유입은 특정 지수나 섹터에 힘을 줄 수 있고, 반대로 자금 유출은 관련 종목에 부담이 될 수 있습니다.",
    portfolioHint: "초보자나 신중형 투자자는 개별주와 ETF를 섞으면 한 회사 리스크를 줄일 수 있습니다.",
    investorChecklist: ["구성종목", "총보수", "섹터 비중", "국가 비중"],
    cautionPoint: "ETF도 테마가 좁으면 개별주처럼 크게 흔들릴 수 있습니다.",
    relatedKeywords: ["구성종목", "총보수", "S&P500", "반도체 ETF"],
    relatedContents: [{ title: "ETF 둘러보기", description: "구성 종목과 섹터 비중을 쉽게 확인합니다.", href: "/etfs", type: "ETF" }]
  },
  {
    term: "PER",
    aliases: ["주가수익비율", "price earnings ratio"],
    category: "기업분석",
    easyDescription: "주가가 회사 이익의 몇 배인지 보는 지표입니다.",
    whyImportant: "현재 주가에 기대가 얼마나 반영됐는지 가늠할 때 자주 쓰입니다.",
    whyMentionedRecently: "AI, 바이오, 로봇처럼 기대가 큰 업종은 이익보다 주가가 먼저 오르며 PER 논쟁이 생깁니다.",
    marketImpact: "PER이 높으면 작은 실적 실망에도 주가가 흔들릴 수 있고, 낮아도 성장성이 낮으면 오래 소외될 수 있습니다.",
    portfolioHint: "PER은 싸고 비싼지를 단정하는 숫자가 아니라, 기대와 실적을 비교하는 힌트로 쓰면 좋습니다.",
    investorChecklist: ["EPS", "실적 성장률", "업종 평균", "일회성 이익"],
    cautionPoint: "적자 기업은 PER이 의미 없을 수 있고, 업종마다 적정 PER이 다릅니다.",
    relatedKeywords: ["EPS", "PBR", "ROE", "영업이익"],
    relatedContents: [{ title: "종목 검색", description: "PER과 사업 구조를 함께 확인할 종목을 찾아봅니다.", href: "/search", type: "분석" }]
  },
  {
    term: "ROE",
    aliases: ["자기자본이익률", "return on equity"],
    category: "기업분석",
    easyDescription: "회사가 자기자본으로 이익을 얼마나 효율적으로 냈는지 보여주는 지표입니다.",
    whyImportant: "좋은 회사 체크에서 수익성과 자본 효율을 볼 때 중요한 힌트입니다.",
    whyMentionedRecently: "저성장 환경에서는 매출 성장뿐 아니라 돈을 효율적으로 버는 회사가 더 주목받기 때문입니다.",
    marketImpact: "ROE가 꾸준히 높으면 시장이 좋은 기업으로 평가할 가능성이 있지만, 부채로 만든 ROE는 조심해야 합니다.",
    portfolioHint: "장기 보유 후보를 볼 때 ROE, 부채비율, 영업이익 흐름을 같이 확인하면 좋습니다.",
    investorChecklist: ["부채비율", "PBR", "영업이익률", "순이익"],
    cautionPoint: "부채가 많아도 ROE가 높아질 수 있으므로 재무 안정성을 함께 봐야 합니다.",
    relatedKeywords: ["PBR", "부채비율", "영업이익", "순이익"],
    relatedContents: [{ title: "좋은 회사 체크", description: "종목 상세에서 수익성·성장성·부채를 함께 봅니다.", href: "/search", type: "분석" }]
  },
  {
    term: "영업이익",
    aliases: ["operating profit", "본업 이익"],
    category: "기업분석",
    easyDescription: "회사가 제품이나 서비스를 팔아 본업으로 번 돈입니다.",
    whyImportant: "회사가 실제 장사를 잘하고 있는지 보는 가장 기본적인 숫자입니다.",
    whyMentionedRecently: "경기 둔화나 비용 증가 속에서도 이익을 지키는 회사가 시장에서 더 주목받기 때문입니다.",
    marketImpact: "영업이익이 좋아지면 실적 기대가 커질 수 있고, 예상보다 나쁘면 주가가 조정받을 수 있습니다.",
    portfolioHint: "관심 종목의 매수 이유가 실적이라면 영업이익 흐름이 유지되는지 계속 확인해야 합니다.",
    investorChecklist: ["매출", "영업이익률", "순이익", "원가"],
    cautionPoint: "영업이익은 좋아도 이자비용이나 일회성 손실로 순이익이 나빠질 수 있습니다.",
    relatedKeywords: ["순이익", "매출", "영업이익률", "PER"],
    relatedContents: [{ title: "매수/매도 기록", description: "실적을 근거로 본 이유를 기록하고 나중에 복기합니다.", href: "/trades", type: "분석" }]
  },
  {
    term: "환율",
    aliases: ["달러원", "원달러", "USD/KRW"],
    category: "환율/원자재",
    easyDescription: "한 나라 돈과 다른 나라 돈의 교환 비율입니다. 국내 투자에서는 원·달러 환율을 자주 봅니다.",
    whyImportant: "수출기업, 원자재 가격, 해외주식 수익률에 영향을 줍니다.",
    whyMentionedRecently: "미국 금리, 달러 강세, 외국인 수급이 국내 증시에 영향을 주면서 자주 언급됩니다.",
    marketImpact: "원화 약세는 수출주에 긍정적일 수 있지만 외국인 자금 유출 부담을 키울 수 있습니다.",
    portfolioHint: "해외 ETF나 미국 주식이 있다면 주가뿐 아니라 환율 효과도 수익률에 반영됩니다.",
    investorChecklist: ["미국 금리", "외국인 수급", "수출주", "해외 ETF"],
    cautionPoint: "환율 방향을 정확히 맞히기 어렵기 때문에 환헤지 여부와 투자 기간을 함께 봐야 합니다.",
    relatedKeywords: ["기준금리", "외국인 매수", "수출주", "해외 ETF"],
    relatedContents: [{ title: "월간 시장 흐름", description: "환율과 외국인 수급을 한 달 흐름으로 봅니다.", href: "/reports", type: "분석" }]
  },
  {
    term: "고유가",
    aliases: ["유가", "WTI", "브렌트유", "oil price"],
    category: "환율/원자재",
    easyDescription: "국제 유가가 높은 수준을 유지하는 상황입니다.",
    whyImportant: "운송비, 원가, 물가, 항공·화학·정유 업종에 영향을 줍니다.",
    whyMentionedRecently: "지정학 리스크와 감산 이슈가 생기면 유가가 다시 시장 변동성 요인이 됩니다.",
    marketImpact: "정유주는 수혜 기대가 생길 수 있지만 항공, 화학, 소비재 기업에는 비용 부담이 될 수 있습니다.",
    portfolioHint: "원가 부담이 큰 기업을 보유했다면 유가 상승이 이익률에 주는 영향을 확인해야 합니다.",
    investorChecklist: ["인플레이션", "정유주", "항공주", "화학주"],
    cautionPoint: "유가 상승이 모든 에너지 관련주에 같은 호재는 아닙니다. 정제마진과 비용 구조를 같이 봐야 합니다.",
    relatedKeywords: ["인플레이션", "CPI", "정유", "항공"],
    relatedContents: [{ title: "고유가 관련 시장 해석", description: "유가가 비용과 물가에 미치는 영향을 확인합니다.", href: "/news", type: "뉴스" }]
  },
  {
    term: "반도체",
    aliases: ["메모리", "HBM", "DRAM", "파운드리"],
    category: "산업/테마",
    easyDescription: "전자기기와 AI 서버가 데이터를 처리하고 저장하는 데 필요한 핵심 부품 산업입니다.",
    whyImportant: "한국 증시에서 시가총액 비중이 크고, 코스피 방향에도 큰 영향을 줍니다.",
    whyMentionedRecently: "AI 서버 투자와 HBM 수요가 커지면서 삼성전자, SK하이닉스, 반도체 장비주가 함께 언급됩니다.",
    marketImpact: "업황 회복 기대가 커지면 관련주와 반도체 ETF가 강해질 수 있지만, 기대가 과하면 실적 발표 때 흔들릴 수 있습니다.",
    portfolioHint: "반도체주는 사이클 산업이라 가격보다 업황, 재고, 고객사 투자 흐름을 같이 봐야 합니다.",
    investorChecklist: ["HBM", "메모리 가격", "설비투자", "반도체 ETF"],
    cautionPoint: "좋은 산업이어도 이미 기대가 주가에 많이 반영됐다면 단기 변동성이 커질 수 있습니다.",
    relatedKeywords: ["AI 관련주", "HBM", "코스피", "KODEX 반도체"],
    relatedContents: [
      { title: "SK하이닉스", description: "AI 메모리 대표주의 흐름과 리스크를 봅니다.", href: "/stocks/000660.KS", type: "종목" },
      { title: "KODEX 반도체", description: "반도체 산업을 ETF로 넓게 봅니다.", href: "/etfs/091160.KS", type: "ETF" }
    ]
  },
  {
    term: "AI 관련주",
    aliases: ["AI", "인공지능", "AI 테마", "AI 수혜주"],
    category: "산업/테마",
    easyDescription: "AI 확산으로 수요 증가 기대를 받는 반도체, 데이터센터, 소프트웨어, 전력 인프라 관련 기업들입니다.",
    whyImportant: "AI는 여러 산업의 투자 흐름을 바꾸고 있어 시장에서 가장 많이 해석되는 테마 중 하나입니다.",
    whyMentionedRecently: "AI 서버, HBM, 전력 인프라, 클라우드 투자 뉴스가 이어지며 관련 기업들이 자주 언급됩니다.",
    marketImpact: "AI 투자 기대가 커지면 관련주가 강해질 수 있지만, 실적보다 기대가 앞서면 과열 위험도 커집니다.",
    portfolioHint: "AI 관련주는 한 회사가 아니라 반도체, 전력, 소프트웨어, ETF로 나눠서 보는 편이 덜 무섭습니다.",
    investorChecklist: ["실제 매출 연결", "고객사", "설비투자", "PER"],
    cautionPoint: "이름에 AI가 붙었다고 모두 수혜주는 아닙니다. 실제 매출과 제품 연결을 확인해야 합니다.",
    relatedKeywords: ["반도체", "전력 인프라", "데이터센터", "HBM"],
    relatedContents: [{ title: "최근 30일 주목 종목", description: "AI 흐름이 어떤 후보로 연결되는지 홈 추천에서 확인합니다.", href: "/", type: "분석" }]
  },
  {
    term: "DSR",
    aliases: ["총부채원리금상환비율", "대출 규제"],
    category: "부동산/대출",
    easyDescription: "내 소득 대비 모든 대출의 원금과 이자를 얼마나 갚아야 하는지 보는 비율입니다.",
    whyImportant: "가계대출, 부동산 시장, 은행·건설 관련주 해석에 영향을 줍니다.",
    whyMentionedRecently: "부동산 대출 규제와 금리 부담이 함께 시장 이슈가 되면서 자주 언급됩니다.",
    marketImpact: "DSR 규제가 강하면 부동산 거래와 대출 증가가 둔화될 수 있고, 건설·은행 업종 심리에 영향을 줄 수 있습니다.",
    portfolioHint: "금융주나 건설주를 볼 때 대출 규제와 부동산 거래량을 같이 확인하면 좋습니다.",
    investorChecklist: ["금리", "부동산 거래량", "은행주", "건설주"],
    cautionPoint: "DSR은 개인별 소득과 대출 구조에 따라 달라져 단순 평균으로 판단하기 어렵습니다.",
    relatedKeywords: ["LTV", "금리", "부동산", "은행"],
    relatedContents: [{ title: "금융/경제 관심 종목 찾기", description: "은행·건설 관련 후보를 직접 검색합니다.", href: "/search", type: "분석" }]
  },
  {
    term: "LTV",
    aliases: ["주택담보인정비율", "담보대출"],
    category: "부동산/대출",
    easyDescription: "집값 대비 대출을 얼마나 받을 수 있는지 보여주는 비율입니다.",
    whyImportant: "부동산 거래와 가계대출 흐름을 이해할 때 많이 쓰입니다.",
    whyMentionedRecently: "부동산 경기와 대출 규제가 바뀔 때 LTV 완화 또는 강화가 함께 언급됩니다.",
    marketImpact: "LTV 완화는 거래 심리에 긍정적일 수 있지만, 가계부채 우려를 키울 수도 있습니다.",
    portfolioHint: "은행·건설·리츠 관련 자산은 LTV, DSR, 금리 흐름을 함께 보는 것이 좋습니다.",
    investorChecklist: ["DSR", "기준금리", "부동산 거래량", "가계부채"],
    cautionPoint: "대출 규제 완화가 곧바로 집값이나 관련주 상승으로 이어진다고 단정하면 안 됩니다.",
    relatedKeywords: ["DSR", "금리", "은행", "건설"],
    relatedContents: [{ title: "금리 관련 포트폴리오 힌트", description: "대출 규제와 금리를 함께 해석합니다.", href: "/glossary?term=기준금리", type: "용어" }]
  }
];

const expandedEconomyTerms: EconomyTerm[] = [
  makeEconomyTerm({
    term: "국채금리",
    aliases: ["미국채금리", "10년물 금리", "채권금리", "bond yield"],
    category: "금리",
    easyDescription: "정부가 돈을 빌릴 때 투자자에게 주는 이자율입니다. 특히 미국 10년물 금리는 전 세계 자산 가격에 영향을 줍니다.",
    marketImpact: "국채금리가 오르면 성장주 밸류에이션 부담이 커질 수 있고, 금리가 내려가면 위험자산 선호가 살아날 수 있습니다.",
    relatedKeywords: ["기준금리", "CPI", "성장주", "환율"]
  }),
  makeEconomyTerm({
    term: "FOMC",
    aliases: ["연준 회의", "미국 금리 회의", "Federal Open Market Committee"],
    category: "금리",
    easyDescription: "미국 중앙은행이 기준금리와 통화정책 방향을 논의하는 회의입니다.",
    marketImpact: "금리 인하·동결·인상 힌트에 따라 주식, 채권, 환율이 동시에 흔들릴 수 있습니다.",
    relatedKeywords: ["기준금리", "파월", "CPI", "국채금리"]
  }),
  makeEconomyTerm({
    term: "인플레이션",
    aliases: ["물가상승", "inflation", "물가 상승"],
    category: "물가",
    easyDescription: "상품과 서비스 가격이 전반적으로 올라 돈의 구매력이 낮아지는 현상입니다.",
    marketImpact: "인플레이션이 높으면 금리 부담이 커지고, 원가 부담이 큰 기업의 이익률이 흔들릴 수 있습니다.",
    relatedKeywords: ["CPI", "기준금리", "고유가", "영업이익률"]
  }),
  makeEconomyTerm({
    term: "디플레이션",
    aliases: ["물가하락", "deflation", "경기침체 우려"],
    category: "물가",
    easyDescription: "가격이 전반적으로 내려가는 현상입니다. 좋아 보일 수 있지만 수요 부진 신호일 때가 많습니다.",
    marketImpact: "소비와 투자가 위축되면 기업 실적 기대가 낮아져 주식시장에는 부담이 될 수 있습니다.",
    relatedKeywords: ["경기침체", "CPI", "소비", "실적"]
  }),
  makeEconomyTerm({
    term: "코스닥",
    aliases: ["KOSDAQ", "성장주 시장", "중소형주"],
    category: "지수",
    easyDescription: "기술·바이오·중소형 성장 기업이 많이 포함된 국내 주가지수입니다.",
    marketImpact: "투자 심리가 좋아질 때 강하게 움직일 수 있지만, 테마와 변동성도 커질 수 있습니다.",
    relatedKeywords: ["코스피", "성장주", "바이오", "거래량"]
  }),
  makeEconomyTerm({
    term: "나스닥",
    aliases: ["NASDAQ", "미국 기술주 지수", "기술주"],
    category: "지수",
    easyDescription: "미국 기술주와 성장 기업 비중이 높은 대표 주가지수입니다.",
    marketImpact: "AI, 반도체, 소프트웨어 기대와 금리 변화에 민감하게 반응하는 편입니다.",
    relatedKeywords: ["S&P500", "AI 관련주", "반도체", "기준금리"]
  }),
  makeEconomyTerm({
    term: "S&P500",
    aliases: ["SP500", "미국 대표 지수", "미국 대형주"],
    category: "지수",
    easyDescription: "미국 대표 대형 기업 500개를 묶어 보는 주가지수입니다.",
    marketImpact: "미국 시장 전체 분위기를 보는 기준으로 자주 쓰이고, VOO 같은 ETF와 연결됩니다.",
    relatedKeywords: ["VOO", "ETF", "나스닥", "분산투자"]
  }),
  makeEconomyTerm({
    term: "시가총액",
    aliases: ["시총", "market cap", "기업가치"],
    category: "기업분석",
    easyDescription: "현재 주가에 발행 주식 수를 곱한 값으로, 시장이 평가하는 회사의 전체 가격입니다.",
    marketImpact: "시가총액이 클수록 지수 영향력이 크고, 작을수록 변동성이 커질 수 있습니다.",
    relatedKeywords: ["주가", "PER", "대형주", "중소형주"]
  }),
  makeEconomyTerm({
    term: "PBR",
    aliases: ["주가순자산비율", "book value"],
    category: "기업분석",
    easyDescription: "주가가 회사의 순자산에 비해 몇 배로 거래되는지 보는 지표입니다.",
    marketImpact: "금융주, 지주사, 자산주처럼 자산 가치가 중요한 회사를 볼 때 자주 사용됩니다.",
    relatedKeywords: ["PER", "ROE", "저평가", "자산주"]
  }),
  makeEconomyTerm({
    term: "EPS",
    aliases: ["주당순이익", "earnings per share"],
    category: "기업분석",
    easyDescription: "회사가 벌어들인 순이익을 주식 한 주당 얼마로 나눌 수 있는지 보여주는 숫자입니다.",
    marketImpact: "EPS가 늘면 이익 체력이 좋아지는 신호일 수 있고, PER 해석의 기준이 됩니다.",
    relatedKeywords: ["PER", "순이익", "실적", "어닝서프라이즈"]
  }),
  makeEconomyTerm({
    term: "매출",
    aliases: ["sales", "revenue", "매출액"],
    category: "기업분석",
    easyDescription: "회사가 제품이나 서비스를 팔아 벌어들인 총 금액입니다.",
    marketImpact: "매출 성장은 수요가 늘고 있다는 신호일 수 있지만, 이익까지 같이 봐야 합니다.",
    relatedKeywords: ["영업이익", "영업이익률", "성장성", "실적"]
  }),
  makeEconomyTerm({
    term: "순이익",
    aliases: ["net income", "당기순이익"],
    category: "기업분석",
    easyDescription: "매출에서 비용, 세금, 이자 등을 모두 뺀 뒤 최종적으로 남은 이익입니다.",
    marketImpact: "순이익이 꾸준히 늘면 배당, 재투자, 기업가치 평가에 긍정적인 근거가 될 수 있습니다.",
    relatedKeywords: ["EPS", "PER", "영업이익", "배당"]
  }),
  makeEconomyTerm({
    term: "영업이익률",
    aliases: ["operating margin", "마진", "수익성"],
    category: "기업분석",
    easyDescription: "매출에서 영업이익이 차지하는 비율로, 회사가 얼마나 효율적으로 돈을 버는지 보여줍니다.",
    marketImpact: "영업이익률이 개선되면 가격 경쟁력이나 원가 관리가 좋아졌다고 해석할 수 있습니다.",
    relatedKeywords: ["영업이익", "매출", "원가", "수익성"]
  }),
  makeEconomyTerm({
    term: "부채비율",
    aliases: ["debt ratio", "부채", "재무 안정성"],
    category: "기업분석",
    easyDescription: "회사가 가진 자기자본 대비 부채가 얼마나 많은지 보는 지표입니다.",
    marketImpact: "금리가 높거나 실적이 흔들릴 때 부채가 많은 회사는 부담이 커질 수 있습니다.",
    relatedKeywords: ["금리", "현금흐름", "재무구조", "리스크"]
  }),
  makeEconomyTerm({
    term: "현금흐름",
    aliases: ["cash flow", "영업현금흐름", "FCF"],
    category: "기업분석",
    easyDescription: "회사의 실제 현금이 얼마나 들어오고 나가는지 보여주는 흐름입니다.",
    marketImpact: "이익은 나는데 현금이 부족하면 재무 부담이 생길 수 있어 실적의 질을 볼 때 중요합니다.",
    relatedKeywords: ["순이익", "부채비율", "배당", "CAPEX"]
  }),
  makeEconomyTerm({
    term: "CAPEX",
    aliases: ["설비투자", "투자지출", "capital expenditure"],
    category: "기업분석",
    easyDescription: "공장, 장비, 데이터센터처럼 미래 생산 능력을 늘리기 위해 쓰는 투자 비용입니다.",
    marketImpact: "반도체, 배터리, 통신, 전력 업종에서는 CAPEX가 향후 성장과 비용 부담을 동시에 보여줍니다.",
    relatedKeywords: ["반도체", "데이터센터", "현금흐름", "설비투자"]
  }),
  makeEconomyTerm({
    term: "컨센서스",
    aliases: ["시장 예상치", "증권사 전망", "consensus"],
    category: "기업분석",
    easyDescription: "증권사 애널리스트들이 예상하는 실적이나 목표치의 평균적인 기대 수준입니다.",
    marketImpact: "실적이 좋아도 컨센서스보다 낮으면 주가가 실망할 수 있고, 예상보다 좋으면 긍정적으로 반응할 수 있습니다.",
    relatedKeywords: ["어닝서프라이즈", "어닝쇼크", "실적", "가이던스"]
  }),
  makeEconomyTerm({
    term: "가이던스",
    aliases: ["실적 전망", "회사 전망", "guidance"],
    category: "기업분석",
    easyDescription: "회사가 직접 제시하는 향후 실적이나 사업 전망입니다.",
    marketImpact: "현재 실적보다 앞으로의 전망이 더 중요하게 반영될 때 주가가 크게 움직일 수 있습니다.",
    relatedKeywords: ["컨센서스", "실적", "어닝서프라이즈", "매출"]
  }),
  makeEconomyTerm({
    term: "어닝서프라이즈",
    aliases: ["실적 서프라이즈", "깜짝 실적", "earnings surprise"],
    category: "기업분석",
    easyDescription: "회사의 실적이 시장 예상보다 좋게 나온 상황입니다.",
    marketImpact: "좋은 실적이 다음 분기 전망까지 이어질 때 주가에 긍정적일 수 있습니다.",
    relatedKeywords: ["컨센서스", "가이던스", "EPS", "영업이익"]
  }),
  makeEconomyTerm({
    term: "어닝쇼크",
    aliases: ["실적 쇼크", "실적 부진", "earnings shock"],
    category: "기업분석",
    easyDescription: "회사의 실적이 시장 예상보다 나쁘게 나온 상황입니다.",
    marketImpact: "실적 신뢰가 흔들리면 밸류에이션이 낮아질 수 있어 주가 변동성이 커집니다.",
    relatedKeywords: ["컨센서스", "가이던스", "영업이익", "리스크"]
  }),
  makeEconomyTerm({
    term: "배당",
    aliases: ["dividend", "현금배당", "주주환원"],
    category: "기업분석",
    easyDescription: "회사가 벌어들인 돈의 일부를 주주에게 나눠주는 것입니다.",
    marketImpact: "배당이 안정적인 기업은 방어적으로 볼 수 있지만, 성장 투자가 줄어드는 신호일 수도 있습니다.",
    relatedKeywords: ["배당수익률", "배당락", "현금흐름", "ETF"]
  }),
  makeEconomyTerm({
    term: "배당수익률",
    aliases: ["dividend yield", "배당률"],
    category: "기업분석",
    easyDescription: "현재 주가 대비 1년 배당금이 어느 정도 비율인지 보여주는 지표입니다.",
    marketImpact: "금리가 내려갈 때 안정적인 배당 자산의 매력이 커질 수 있습니다.",
    relatedKeywords: ["배당", "금리", "배당 ETF", "현금흐름"]
  }),
  makeEconomyTerm({
    term: "배당락",
    aliases: ["ex-dividend", "배당락일"],
    category: "기업분석",
    easyDescription: "배당 받을 권리가 사라지는 날 또는 그 영향으로 주가가 조정되는 현상입니다.",
    marketImpact: "배당락 전후에는 주가가 배당금만큼 움직이는 것처럼 보일 수 있어 착시를 조심해야 합니다.",
    relatedKeywords: ["배당", "배당수익률", "주주환원", "ETF"]
  }),
  makeEconomyTerm({
    term: "공매도",
    aliases: ["short selling", "숏", "대차거래"],
    category: "기업분석",
    easyDescription: "주식을 빌려서 먼저 팔고 나중에 다시 사서 갚는 거래 방식입니다.",
    marketImpact: "공매도 잔고가 많으면 악재에 민감할 수 있지만, 반대로 숏커버링 때 주가가 급반등할 수도 있습니다.",
    relatedKeywords: ["수급", "거래량", "변동성", "숏커버링"]
  }),
  makeEconomyTerm({
    term: "거래량",
    aliases: ["volume", "거래대금", "수급"],
    category: "기업분석",
    easyDescription: "특정 기간 동안 주식이 얼마나 많이 사고팔렸는지 보여주는 숫자입니다.",
    marketImpact: "거래량이 늘면 관심이 커졌다는 신호일 수 있지만, 과열이나 단기 이슈일 수도 있습니다.",
    relatedKeywords: ["수급", "외국인", "기관", "과열"]
  }),
  makeEconomyTerm({
    term: "외국인",
    aliases: ["외국인 매수", "외국인 수급", "foreign investors"],
    category: "기업분석",
    easyDescription: "국내 주식을 사고파는 해외 투자자 자금을 말합니다.",
    marketImpact: "대형주와 코스피 흐름에 큰 영향을 줄 수 있어 국내 시장 해석에서 자주 봅니다.",
    relatedKeywords: ["코스피", "환율", "수급", "반도체"]
  }),
  makeEconomyTerm({
    term: "기관",
    aliases: ["기관 투자자", "연기금", "투신"],
    category: "기업분석",
    easyDescription: "연기금, 자산운용사, 보험사처럼 큰 돈을 운용하는 전문 투자자입니다.",
    marketImpact: "기관 수급은 중장기 자금 흐름을 볼 때 참고하지만, 항상 정답은 아닙니다.",
    relatedKeywords: ["외국인", "개인", "수급", "거래량"]
  }),
  makeEconomyTerm({
    term: "환율",
    aliases: ["원달러", "원/달러", "달러", "exchange rate"],
    category: "환율/원자재",
    easyDescription: "한 나라 돈을 다른 나라 돈으로 바꿀 때의 가격입니다. 국내 시장에서는 원/달러 환율을 자주 봅니다.",
    marketImpact: "원화가 약하면 수출주에는 도움될 수 있지만, 외국인 수급과 수입 물가에는 부담이 될 수 있습니다.",
    relatedKeywords: ["원화강세", "원화약세", "외국인", "고유가"]
  }),
  makeEconomyTerm({
    term: "원화강세",
    aliases: ["원화 가치 상승", "환율 하락"],
    category: "환율/원자재",
    easyDescription: "원화 가치가 올라 같은 달러를 사는 데 필요한 원화가 줄어드는 상황입니다.",
    marketImpact: "수입 물가 부담은 줄 수 있지만, 수출 기업의 환산 이익에는 부담이 될 수 있습니다.",
    relatedKeywords: ["환율", "수출주", "외국인", "CPI"]
  }),
  makeEconomyTerm({
    term: "원화약세",
    aliases: ["원화 가치 하락", "환율 상승", "강달러"],
    category: "환율/원자재",
    easyDescription: "원화 가치가 내려 같은 달러를 사는 데 더 많은 원화가 필요한 상황입니다.",
    marketImpact: "수출주에는 일부 긍정적일 수 있지만, 외국인 자금 이탈과 수입 원가 부담을 키울 수 있습니다.",
    relatedKeywords: ["환율", "고유가", "외국인", "수입물가"]
  }),
  makeEconomyTerm({
    term: "달러인덱스",
    aliases: ["DXY", "달러 지수", "달러 강세"],
    category: "환율/원자재",
    easyDescription: "달러 가치가 주요 통화 대비 얼마나 강한지 보여주는 지표입니다.",
    marketImpact: "달러가 강하면 신흥국 증시와 원자재 가격, 환율에 부담이 될 수 있습니다.",
    relatedKeywords: ["환율", "원화약세", "금", "유가"]
  }),
  makeEconomyTerm({
    term: "WTI",
    aliases: ["서부텍사스유", "국제유가", "원유"],
    category: "환율/원자재",
    easyDescription: "국제 원유 가격을 볼 때 자주 쓰는 대표 유가 지표입니다.",
    marketImpact: "유가가 오르면 정유·에너지에는 긍정적일 수 있지만, 항공·화학·소비에는 비용 부담이 됩니다.",
    relatedKeywords: ["고유가", "인플레이션", "정유", "항공"]
  }),
  makeEconomyTerm({
    term: "금",
    aliases: ["골드", "gold", "안전자산", "GLD"],
    category: "환율/원자재",
    easyDescription: "불안한 시장에서 안전자산으로 자주 언급되는 대표 원자재입니다.",
    marketImpact: "금리 하락 기대나 지정학 리스크가 커질 때 금 가격이 주목받을 수 있습니다.",
    relatedKeywords: ["GLD", "달러인덱스", "금리", "안전자산"]
  }),
  makeEconomyTerm({
    term: "HBM",
    aliases: ["고대역폭메모리", "AI 메모리", "High Bandwidth Memory"],
    category: "산업/테마",
    easyDescription: "AI 반도체에 많이 쓰이는 고성능 메모리입니다.",
    marketImpact: "HBM 경쟁력은 삼성전자, SK하이닉스 같은 메모리 기업의 실적 기대에 큰 영향을 줍니다.",
    relatedKeywords: ["반도체", "AI 관련주", "SK하이닉스", "Nvidia"]
  }),
  makeEconomyTerm({
    term: "데이터센터",
    aliases: ["data center", "AI 서버", "클라우드 인프라"],
    category: "산업/테마",
    easyDescription: "AI, 클라우드, 인터넷 서비스가 돌아가도록 서버와 전력 설비를 모아둔 시설입니다.",
    marketImpact: "데이터센터 투자가 늘면 반도체, 전력 장비, 냉각, 통신 인프라 기업이 함께 주목받을 수 있습니다.",
    relatedKeywords: ["AI 관련주", "반도체", "전력 인프라", "클라우드"]
  }),
  makeEconomyTerm({
    term: "전력 인프라",
    aliases: ["전력망", "변압기", "전선", "전력기기"],
    category: "산업/테마",
    easyDescription: "전기를 만들고 보내고 나눠 쓰기 위한 설비와 장비를 말합니다.",
    marketImpact: "AI 데이터센터와 전기차 확산으로 전력 수요가 늘면 관련 기업이 시장의 관심을 받을 수 있습니다.",
    relatedKeywords: ["데이터센터", "AI 관련주", "변압기", "전선"]
  }),
  makeEconomyTerm({
    term: "리츠",
    aliases: ["REITs", "부동산투자회사", "부동산 배당"],
    category: "부동산/대출",
    easyDescription: "부동산에서 나오는 임대료나 매각 수익을 투자자에게 나눠주는 투자 상품입니다.",
    marketImpact: "금리가 내려가면 리츠의 배당 매력이 커질 수 있지만, 부동산 공실과 자금 조달 비용도 봐야 합니다.",
    relatedKeywords: ["금리", "배당", "부동산", "ETF"]
  })
];

economyTerms.push(...expandedEconomyTerms);

function makeEconomyTerm(input: {
  term: string;
  aliases: string[];
  category: EconomyTerm["category"];
  easyDescription: string;
  marketImpact: string;
  relatedKeywords: string[];
}): EconomyTerm {
  return {
    term: input.term,
    aliases: input.aliases,
    category: input.category,
    easyDescription: input.easyDescription,
    whyImportant: `${input.term}은 시장 뉴스와 종목 해석에서 자주 나오는 단어라서, 단어 뜻보다 "내 보유 종목과 어떤 연결이 있는지"를 보는 것이 중요합니다.`,
    whyMentionedRecently: "금리, 물가, AI 투자, 환율, 실적 발표처럼 시장의 큰 흐름이 바뀔 때 함께 언급되는 경우가 많습니다.",
    marketImpact: input.marketImpact,
    portfolioHint: `Sensefolio에서는 ${input.term}을 단독 신호로 보지 않고 관련 키워드, 업종, 실적 흐름과 함께 확인하는 힌트로 봅니다.`,
    investorChecklist: input.relatedKeywords.slice(0, 4),
    cautionPoint: "이 용어 하나만으로 매수·매도를 판단하지 말고, 회사가 실제로 돈을 버는 방식과 최근 30일 흐름을 같이 확인해보세요.",
    relatedKeywords: input.relatedKeywords,
    relatedContents: [
      { title: `${input.term} 관련 분석`, description: "이 키워드와 연결되는 시장 흐름을 월간 관점으로 확인합니다.", href: "/reports", type: "분석" },
      { title: "관련 종목 직접 검색", description: "회사명, 업종, 제품 키워드로 연결되는 종목을 찾아봅니다.", href: "/search", type: "종목" }
    ]
  };
}
