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

const broadEconomyTerms: EconomyTerm[] = [
  makeEconomyTerm({
    term: "양적완화",
    aliases: ["QE", "돈 풀기", "유동성 공급"],
    category: "금리",
    easyDescription: "중앙은행이 채권 등을 사들이며 시장에 돈을 공급하는 정책입니다.",
    marketImpact: "유동성이 늘면 주식과 부동산 같은 위험자산 심리가 좋아질 수 있지만, 물가 부담도 커질 수 있습니다.",
    relatedKeywords: ["양적긴축", "기준금리", "유동성", "인플레이션"]
  }),
  makeEconomyTerm({
    term: "양적긴축",
    aliases: ["QT", "유동성 회수", "돈줄 조이기"],
    category: "금리",
    easyDescription: "중앙은행이 보유 자산을 줄이며 시장의 유동성을 회수하는 정책입니다.",
    marketImpact: "시장에 도는 돈이 줄어들면 성장주와 고위험 자산에는 부담이 될 수 있습니다.",
    relatedKeywords: ["양적완화", "국채금리", "유동성", "성장주"]
  }),
  makeEconomyTerm({
    term: "스태그플레이션",
    aliases: ["경기침체 물가상승", "stagflation"],
    category: "물가",
    easyDescription: "경기는 좋지 않은데 물가는 계속 오르는 어려운 경제 상황입니다.",
    marketImpact: "기업 이익은 둔화되고 금리 부담은 남을 수 있어 주식시장에는 까다로운 환경입니다.",
    relatedKeywords: ["인플레이션", "경기침체", "고유가", "기준금리"]
  }),
  makeEconomyTerm({
    term: "경기침체",
    aliases: ["리세션", "recession", "경기 둔화"],
    category: "물가",
    easyDescription: "소비와 투자, 생산 활동이 전반적으로 약해지는 상태입니다.",
    marketImpact: "기업 실적 전망이 낮아지고 방어주, 현금흐름, 배당주가 상대적으로 주목받을 수 있습니다.",
    relatedKeywords: ["실적", "방어주", "금리인하", "디플레이션"]
  }),
  makeEconomyTerm({
    term: "소비심리지수",
    aliases: ["소비자심리지수", "CSI", "consumer sentiment"],
    category: "물가",
    easyDescription: "소비자가 앞으로 경기와 생활 형편을 어떻게 느끼는지 보여주는 지표입니다.",
    marketImpact: "소비심리가 좋아지면 유통, 여행, 외식, 콘텐츠 같은 소비 관련 업종에 긍정적일 수 있습니다.",
    relatedKeywords: ["소비", "매출", "리테일", "경기침체"]
  }),
  makeEconomyTerm({
    term: "PMI",
    aliases: ["구매관리자지수", "제조업 PMI", "서비스업 PMI"],
    category: "지수",
    easyDescription: "기업 구매 담당자 설문으로 경기 확장과 위축을 가늠하는 지표입니다.",
    marketImpact: "PMI가 50을 넘으면 확장, 50 아래면 위축으로 해석해 경기 민감주 흐름에 영향을 줄 수 있습니다.",
    relatedKeywords: ["경기침체", "제조업", "수출", "실적"]
  }),
  makeEconomyTerm({
    term: "다우존스",
    aliases: ["Dow Jones", "다우지수", "미국 우량주"],
    category: "지수",
    easyDescription: "미국 대표 우량 기업 30개로 구성된 오래된 주가지수입니다.",
    marketImpact: "전통 산업과 대형주의 분위기를 볼 때 참고하지만, 기술주 흐름은 나스닥과 함께 봐야 합니다.",
    relatedKeywords: ["S&P500", "나스닥", "미국주식", "ETF"]
  }),
  makeEconomyTerm({
    term: "러셀2000",
    aliases: ["Russell 2000", "미국 소형주", "소형주 지수"],
    category: "지수",
    easyDescription: "미국 소형주 흐름을 보여주는 대표 지수입니다.",
    marketImpact: "금리 부담이 낮아지고 경기 기대가 살아날 때 소형주 심리가 개선될 수 있습니다.",
    relatedKeywords: ["금리", "경기침체", "중소형주", "미국주식"]
  }),
  makeEconomyTerm({
    term: "니케이225",
    aliases: ["Nikkei 225", "일본 지수", "일본 주식"],
    category: "지수",
    easyDescription: "일본 대표 기업 225개로 구성된 주가지수입니다.",
    marketImpact: "엔화, 일본 금리, 반도체 장비 흐름과 함께 글로벌 자금 흐름을 볼 때 참고됩니다.",
    relatedKeywords: ["엔화", "환율", "반도체 장비", "글로벌 증시"]
  }),
  makeEconomyTerm({
    term: "VIX",
    aliases: ["공포지수", "변동성지수", "volatility index"],
    category: "지수",
    easyDescription: "미국 주식시장의 변동성 기대를 보여주는 지표로, 공포지수라고도 부릅니다.",
    marketImpact: "VIX가 급등하면 투자자 불안이 커졌다는 뜻일 수 있어 위험자산 조정과 함께 나타날 수 있습니다.",
    relatedKeywords: ["변동성", "S&P500", "안전자산", "금"]
  }),
  makeEconomyTerm({
    term: "밸류에이션",
    aliases: ["valuation", "가치평가", "비싼지 싼지"],
    category: "기업분석",
    easyDescription: "회사의 주가가 실적이나 성장성에 비해 비싼지 싼지 평가하는 과정입니다.",
    marketImpact: "금리가 높거나 실적 기대가 낮아지면 높은 밸류에이션을 받던 종목이 흔들릴 수 있습니다.",
    relatedKeywords: ["PER", "PBR", "ROE", "성장주"]
  }),
  makeEconomyTerm({
    term: "멀티플",
    aliases: ["multiple", "PER 배수", "평가 배수"],
    category: "기업분석",
    easyDescription: "이익, 매출, 자산 등에 몇 배의 가격을 붙여 평가하는지 보는 개념입니다.",
    marketImpact: "성장 기대가 커지면 멀티플이 높아질 수 있고, 기대가 꺾이면 빠르게 낮아질 수 있습니다.",
    relatedKeywords: ["PER", "밸류에이션", "성장성", "컨센서스"]
  }),
  makeEconomyTerm({
    term: "ROA",
    aliases: ["총자산이익률", "return on assets"],
    category: "기업분석",
    easyDescription: "회사가 가진 자산으로 얼마나 효율적으로 이익을 내는지 보는 지표입니다.",
    marketImpact: "자산을 많이 쓰는 업종에서는 ROA가 수익성과 효율성을 판단하는 데 도움이 됩니다.",
    relatedKeywords: ["ROE", "순이익", "자산", "수익성"]
  }),
  makeEconomyTerm({
    term: "EBITDA",
    aliases: ["상각전영업이익", "감가상각전 이익"],
    category: "기업분석",
    easyDescription: "영업이익에 감가상각비 등을 더해 실제 현금 창출력을 대략 보는 지표입니다.",
    marketImpact: "설비투자가 큰 기업이나 인수합병 평가에서 현금창출력을 비교할 때 자주 쓰입니다.",
    relatedKeywords: ["영업이익", "현금흐름", "CAPEX", "부채"]
  }),
  makeEconomyTerm({
    term: "감가상각",
    aliases: ["depreciation", "상각비", "설비 비용"],
    category: "기업분석",
    easyDescription: "기계나 설비의 가치가 시간이 지나며 줄어드는 것을 비용으로 나눠 반영하는 회계 처리입니다.",
    marketImpact: "설비투자가 큰 반도체, 제조업, 통신업은 감가상각이 이익에 큰 영향을 줄 수 있습니다.",
    relatedKeywords: ["CAPEX", "EBITDA", "영업이익", "반도체"]
  }),
  makeEconomyTerm({
    term: "재고자산",
    aliases: ["inventory", "재고", "재고 부담"],
    category: "기업분석",
    easyDescription: "아직 팔리지 않고 회사가 보유한 제품이나 원재료입니다.",
    marketImpact: "재고가 너무 많이 쌓이면 가격 인하와 이익률 하락으로 이어질 수 있습니다.",
    relatedKeywords: ["매출", "영업이익률", "반도체", "소비"]
  }),
  makeEconomyTerm({
    term: "매출채권",
    aliases: ["accounts receivable", "외상 매출", "받을 돈"],
    category: "기업분석",
    easyDescription: "제품이나 서비스를 팔았지만 아직 현금으로 받지 못한 돈입니다.",
    marketImpact: "매출채권이 과하게 늘면 매출의 질과 현금흐름을 함께 점검해야 합니다.",
    relatedKeywords: ["현금흐름", "매출", "재무 안정성", "부채비율"]
  }),
  makeEconomyTerm({
    term: "자사주 매입",
    aliases: ["buyback", "주주환원", "자사주"],
    category: "기업분석",
    easyDescription: "회사가 시장에서 자기 회사 주식을 사들이는 것입니다.",
    marketImpact: "주주환원 신호로 긍정적일 수 있지만, 실적 개선 없이 주가 방어 목적이면 한계가 있을 수 있습니다.",
    relatedKeywords: ["배당", "주주환원", "EPS", "현금흐름"]
  }),
  makeEconomyTerm({
    term: "유상증자",
    aliases: ["증자", "신주 발행", "paid-in capital increase"],
    category: "기업분석",
    easyDescription: "회사가 새 주식을 발행해 투자자에게 돈을 받고 자본을 늘리는 일입니다.",
    marketImpact: "자금 조달에는 도움이 되지만 기존 주주의 지분 가치가 희석될 수 있어 주가에 부담이 될 수 있습니다.",
    relatedKeywords: ["희석", "자금조달", "부채", "성장투자"]
  }),
  makeEconomyTerm({
    term: "무상증자",
    aliases: ["bonus issue", "무증"],
    category: "기업분석",
    easyDescription: "회사가 주주에게 돈을 받지 않고 새 주식을 나눠주는 일입니다.",
    marketImpact: "주식 수가 늘지만 회사 가치가 바로 커지는 것은 아니어서 단기 수급과 착시를 조심해야 합니다.",
    relatedKeywords: ["유상증자", "주식수", "거래량", "변동성"]
  }),
  makeEconomyTerm({
    term: "액면분할",
    aliases: ["stock split", "주식분할"],
    category: "기업분석",
    easyDescription: "주식 한 주의 액면가를 나눠 주식 수를 늘리고 한 주 가격을 낮추는 일입니다.",
    marketImpact: "거래 접근성은 좋아질 수 있지만 회사의 실제 가치가 바뀌는 것은 아닙니다.",
    relatedKeywords: ["거래량", "주가", "시가총액", "유동성"]
  }),
  makeEconomyTerm({
    term: "CB",
    aliases: ["전환사채", "convertible bond"],
    category: "기업분석",
    easyDescription: "채권이지만 일정 조건에서 주식으로 바꿀 수 있는 자금 조달 수단입니다.",
    marketImpact: "회사에는 자금 조달 수단이지만, 주식 전환 가능성이 커지면 희석 부담이 생길 수 있습니다.",
    relatedKeywords: ["BW", "유상증자", "희석", "부채"]
  }),
  makeEconomyTerm({
    term: "BW",
    aliases: ["신주인수권부사채", "bond with warrant"],
    category: "기업분석",
    easyDescription: "채권에 새 주식을 살 수 있는 권리가 붙은 자금 조달 수단입니다.",
    marketImpact: "향후 주식 수가 늘어날 수 있어 기존 주주 입장에서는 희석 가능성을 봐야 합니다.",
    relatedKeywords: ["CB", "유상증자", "희석", "자금조달"]
  }),
  makeEconomyTerm({
    term: "상장폐지",
    aliases: ["상폐", "delisting", "거래정지"],
    category: "기업분석",
    easyDescription: "거래소에서 주식 거래 자격을 잃는 것입니다.",
    marketImpact: "재무 부실, 감사의견 문제, 공시 위반 등이 연결될 수 있어 매우 큰 리스크입니다.",
    relatedKeywords: ["감사의견", "거래정지", "재무위험", "리스크"]
  }),
  makeEconomyTerm({
    term: "감사의견",
    aliases: ["회계감사", "감사보고서", "한정 의견"],
    category: "기업분석",
    easyDescription: "외부 감사인이 회사 재무제표를 얼마나 믿을 수 있는지 표시하는 의견입니다.",
    marketImpact: "비적정 의견이 나오면 신뢰도와 상장 유지에 큰 문제가 생길 수 있습니다.",
    relatedKeywords: ["상장폐지", "재무제표", "회계", "리스크"]
  }),
  makeEconomyTerm({
    term: "상한가",
    aliases: ["가격제한폭 상단", "급등", "상승 제한"],
    category: "기업분석",
    easyDescription: "하루에 오를 수 있는 최대 가격까지 주가가 오른 상태입니다.",
    marketImpact: "강한 수급 신호일 수 있지만, 다음 날 변동성이 커질 수 있어 이유 확인이 중요합니다.",
    relatedKeywords: ["하한가", "거래량", "테마주", "과열"]
  }),
  makeEconomyTerm({
    term: "하한가",
    aliases: ["가격제한폭 하단", "급락", "하락 제한"],
    category: "기업분석",
    easyDescription: "하루에 내릴 수 있는 최대 가격까지 주가가 떨어진 상태입니다.",
    marketImpact: "악재, 수급 붕괴, 신뢰도 문제일 수 있어 원인을 확인하기 전에는 조심해야 합니다.",
    relatedKeywords: ["상한가", "거래량", "리스크", "변동성"]
  }),
  makeEconomyTerm({
    term: "손절",
    aliases: ["손절매", "stop loss", "리스크 관리"],
    category: "기업분석",
    easyDescription: "손실이 더 커지기 전에 미리 정한 기준으로 매도하는 행동입니다.",
    marketImpact: "감정적 매도를 줄이고 투자 가설이 깨졌는지 확인하는 기준으로 활용할 수 있습니다.",
    relatedKeywords: ["매도 기준", "리스크", "변동성", "복기"]
  }),
  makeEconomyTerm({
    term: "분할매수",
    aliases: ["나눠 사기", "분산 매수", "averaging"],
    category: "기업분석",
    easyDescription: "한 번에 모두 사지 않고 여러 번 나눠 매수하는 방식입니다.",
    marketImpact: "가격 변동 부담을 줄일 수 있지만, 하락 이유가 악화되는 상황에서는 추가 위험이 될 수 있습니다.",
    relatedKeywords: ["평단가", "리스크 관리", "변동성", "매수 기준"]
  }),
  makeEconomyTerm({
    term: "평단가",
    aliases: ["평균 매입가", "average price", "매수 평균가"],
    category: "기업분석",
    easyDescription: "여러 번 산 주식의 평균 매수 가격입니다.",
    marketImpact: "현재가와 평단가 차이를 보면 평가손익을 이해할 수 있지만, 매수 이유 유지 여부가 더 중요합니다.",
    relatedKeywords: ["분할매수", "평가손익", "매수 기록", "복기"]
  }),
  makeEconomyTerm({
    term: "평가손익",
    aliases: ["미실현손익", "수익률", "손익률"],
    category: "기업분석",
    easyDescription: "아직 팔지 않은 상태에서 현재가 기준으로 계산한 이익이나 손실입니다.",
    marketImpact: "평가손익은 확정 손익이 아니므로, 감정 반응보다 보유 이유가 유지되는지 봐야 합니다.",
    relatedKeywords: ["평단가", "매도", "복기", "리스크"]
  }),
  makeEconomyTerm({
    term: "순환매",
    aliases: ["섹터 순환", "rotation", "업종 순환"],
    category: "기업분석",
    easyDescription: "시장 자금이 한 업종에서 다른 업종으로 이동하며 차례로 오르는 흐름입니다.",
    marketImpact: "이미 오른 업종보다 다음 관심 업종을 찾는 흐름이 생길 수 있지만, 늦게 따라가면 위험할 수 있습니다.",
    relatedKeywords: ["섹터", "수급", "거래량", "테마"]
  }),
  makeEconomyTerm({
    term: "수급",
    aliases: ["매수세", "매도세", "자금 흐름"],
    category: "기업분석",
    easyDescription: "주식을 사려는 힘과 팔려는 힘의 균형입니다.",
    marketImpact: "단기 주가에는 실적보다 수급이 크게 작용할 수 있어 거래량과 투자자별 매매를 함께 봅니다.",
    relatedKeywords: ["거래량", "외국인", "기관", "개인"]
  }),
  makeEconomyTerm({
    term: "숏커버링",
    aliases: ["short covering", "공매도 환매", "숏 청산"],
    category: "기업분석",
    easyDescription: "공매도한 투자자가 주식을 다시 사서 갚는 행동입니다.",
    marketImpact: "공매도가 많던 종목에서 좋은 뉴스가 나오면 숏커버링으로 주가가 빠르게 오를 수 있습니다.",
    relatedKeywords: ["공매도", "거래량", "급등", "변동성"]
  }),
  makeEconomyTerm({
    term: "액티브 ETF",
    aliases: ["active ETF", "능동형 ETF"],
    category: "ETF",
    easyDescription: "지수를 그대로 따라가기보다 운용사가 종목과 비중을 적극적으로 조정하는 ETF입니다.",
    marketImpact: "운용 능력에 따라 성과가 달라질 수 있어 보수, 운용 전략, 편입 종목을 확인해야 합니다.",
    relatedKeywords: ["ETF", "패시브 ETF", "총보수", "구성종목"]
  }),
  makeEconomyTerm({
    term: "패시브 ETF",
    aliases: ["passive ETF", "지수 추종 ETF"],
    category: "ETF",
    easyDescription: "특정 지수를 최대한 비슷하게 따라가도록 만든 ETF입니다.",
    marketImpact: "시장 전체나 특정 섹터 흐름을 낮은 비용으로 따라갈 때 많이 사용합니다.",
    relatedKeywords: ["ETF", "액티브 ETF", "S&P500", "코스피"]
  }),
  makeEconomyTerm({
    term: "레버리지 ETF",
    aliases: ["2배 ETF", "leveraged ETF", "레버리지"],
    category: "ETF",
    easyDescription: "기초지수 움직임의 2배 등 더 크게 움직이도록 설계된 ETF입니다.",
    marketImpact: "방향이 맞으면 수익이 커질 수 있지만, 변동성이 크고 장기 보유에는 불리할 수 있습니다.",
    relatedKeywords: ["인버스 ETF", "변동성", "ETF", "리스크"]
  }),
  makeEconomyTerm({
    term: "인버스 ETF",
    aliases: ["inverse ETF", "하락 베팅", "곱버스"],
    category: "ETF",
    easyDescription: "기초지수가 떨어질 때 오르도록 설계된 ETF입니다.",
    marketImpact: "단기 헤지에는 쓰일 수 있지만, 방향을 틀리면 손실이 커질 수 있어 주의가 필요합니다.",
    relatedKeywords: ["레버리지 ETF", "변동성", "헤지", "ETF"]
  }),
  makeEconomyTerm({
    term: "총보수",
    aliases: ["ETF 보수", "expense ratio", "운용보수"],
    category: "ETF",
    easyDescription: "ETF를 보유할 때 운용과 관리에 들어가는 연간 비용 비율입니다.",
    marketImpact: "장기 투자에서는 작은 보수 차이도 누적 성과에 영향을 줄 수 있습니다.",
    relatedKeywords: ["ETF", "장기투자", "패시브 ETF", "분산투자"]
  }),
  makeEconomyTerm({
    term: "괴리율",
    aliases: ["ETF 괴리", "시장가격 차이", "discount premium"],
    category: "ETF",
    easyDescription: "ETF 시장 가격과 실제 자산 가치가 얼마나 차이 나는지 보여주는 비율입니다.",
    marketImpact: "괴리율이 크면 ETF를 실제 가치보다 비싸거나 싸게 사고팔 수 있어 주의해야 합니다.",
    relatedKeywords: ["ETF", "NAV", "유동성", "총보수"]
  }),
  makeEconomyTerm({
    term: "NAV",
    aliases: ["순자산가치", "ETF 순자산", "net asset value"],
    category: "ETF",
    easyDescription: "ETF가 담고 있는 자산을 현재 가치로 계산한 기준 가격입니다.",
    marketImpact: "ETF 시장 가격이 NAV와 크게 차이 나면 괴리율을 확인해야 합니다.",
    relatedKeywords: ["ETF", "괴리율", "구성종목", "총보수"]
  }),
  makeEconomyTerm({
    term: "분배금",
    aliases: ["ETF 배당", "distribution", "월배당"],
    category: "ETF",
    easyDescription: "ETF가 보유 자산에서 나온 배당이나 이자를 투자자에게 나눠주는 돈입니다.",
    marketImpact: "분배금이 높아 보여도 원금 변동과 총수익률을 함께 봐야 합니다.",
    relatedKeywords: ["배당", "배당수익률", "ETF", "월배당 ETF"]
  }),
  makeEconomyTerm({
    term: "리밸런싱",
    aliases: ["rebalance", "비중 조정", "포트폴리오 조정"],
    category: "ETF",
    easyDescription: "포트폴리오나 ETF 구성 비중을 정해진 기준에 맞게 다시 조정하는 일입니다.",
    marketImpact: "정기 리밸런싱 때 특정 종목의 매수·매도 수급이 발생할 수 있습니다.",
    relatedKeywords: ["ETF", "포트폴리오", "구성종목", "비중"]
  }),
  makeEconomyTerm({
    term: "부동산 PF",
    aliases: ["PF", "프로젝트 파이낸싱", "건설 금융"],
    category: "부동산/대출",
    easyDescription: "부동산 개발 사업의 미래 수익을 바탕으로 자금을 빌리는 방식입니다.",
    marketImpact: "분양 부진과 금리 상승이 겹치면 건설사, 금융사, 저축은행 리스크로 번질 수 있습니다.",
    relatedKeywords: ["금리", "건설주", "은행", "부동산"]
  }),
  makeEconomyTerm({
    term: "전세가율",
    aliases: ["전세 가격 비율", "매매가 대비 전세가"],
    category: "부동산/대출",
    easyDescription: "집값 대비 전세가격이 어느 정도인지 나타내는 비율입니다.",
    marketImpact: "전세가율은 부동산 수요와 갭투자, 금융 리스크를 볼 때 참고됩니다.",
    relatedKeywords: ["부동산", "LTV", "DSR", "금리"]
  }),
  makeEconomyTerm({
    term: "가계부채",
    aliases: ["가계 대출", "household debt", "부채 부담"],
    category: "부동산/대출",
    easyDescription: "가계가 은행이나 금융기관에서 빌린 돈의 총량입니다.",
    marketImpact: "가계부채가 높으면 금리 상승기에 소비와 부동산 시장에 부담이 커질 수 있습니다.",
    relatedKeywords: ["DSR", "LTV", "금리", "소비"]
  }),
  makeEconomyTerm({
    term: "구리",
    aliases: ["copper", "닥터 코퍼", "전선 원자재"],
    category: "환율/원자재",
    easyDescription: "전기, 건설, 제조업에 널리 쓰이는 원자재로 경기 흐름을 보는 데 자주 언급됩니다.",
    marketImpact: "구리 가격 상승은 경기 회복 기대나 전력 인프라 투자 증가 신호로 해석될 수 있습니다.",
    relatedKeywords: ["전력 인프라", "원자재", "건설", "전선"]
  }),
  makeEconomyTerm({
    term: "천연가스",
    aliases: ["LNG", "natural gas", "가스 가격"],
    category: "환율/원자재",
    easyDescription: "발전과 난방, 산업용 에너지로 쓰이는 주요 에너지 원자재입니다.",
    marketImpact: "가격이 오르면 전력 비용과 화학·발전 업종 비용에 영향을 줄 수 있습니다.",
    relatedKeywords: ["고유가", "인플레이션", "에너지", "전력"]
  }),
  makeEconomyTerm({
    term: "리튬",
    aliases: ["lithium", "배터리 원자재", "2차전지 소재"],
    category: "환율/원자재",
    easyDescription: "전기차 배터리에 많이 쓰이는 핵심 원자재입니다.",
    marketImpact: "리튬 가격 변화는 배터리 소재 기업의 매출과 이익률 기대에 영향을 줄 수 있습니다.",
    relatedKeywords: ["배터리", "전기차", "양극재", "원자재"]
  }),
  makeEconomyTerm({
    term: "니켈",
    aliases: ["nickel", "배터리 원자재", "스테인리스"],
    category: "환율/원자재",
    easyDescription: "배터리와 스테인리스 등에 쓰이는 원자재입니다.",
    marketImpact: "니켈 가격 변동은 배터리 소재와 철강 관련 기업의 원가와 수익성에 영향을 줄 수 있습니다.",
    relatedKeywords: ["배터리", "전기차", "원자재", "양극재"]
  }),
  makeEconomyTerm({
    term: "2차전지",
    aliases: ["배터리", "이차전지", "전기차 배터리"],
    category: "산업/테마",
    easyDescription: "충전해서 반복 사용 가능한 배터리로, 전기차와 에너지저장장치에 쓰입니다.",
    marketImpact: "전기차 판매와 원자재 가격, 고객사 수주에 따라 관련 기업의 실적 기대가 크게 바뀝니다.",
    relatedKeywords: ["전기차", "리튬", "양극재", "음극재"]
  }),
  makeEconomyTerm({
    term: "양극재",
    aliases: ["cathode", "배터리 소재", "하이니켈"],
    category: "산업/테마",
    easyDescription: "배터리 성능과 가격에 큰 영향을 주는 핵심 소재입니다.",
    marketImpact: "전기차 수요와 리튬·니켈 가격에 따라 양극재 기업의 실적 기대가 움직일 수 있습니다.",
    relatedKeywords: ["2차전지", "리튬", "니켈", "전기차"]
  }),
  makeEconomyTerm({
    term: "음극재",
    aliases: ["anode", "흑연", "실리콘 음극재"],
    category: "산업/테마",
    easyDescription: "배터리에서 전기를 저장하고 내보내는 역할을 하는 핵심 소재입니다.",
    marketImpact: "충전 속도와 배터리 성능 개선 기대가 커질 때 관련 소재 기업이 주목받을 수 있습니다.",
    relatedKeywords: ["2차전지", "전기차", "흑연", "소재"]
  }),
  makeEconomyTerm({
    term: "전고체 배터리",
    aliases: ["solid state battery", "차세대 배터리"],
    category: "산업/테마",
    easyDescription: "액체 전해질 대신 고체 전해질을 쓰는 차세대 배터리 기술입니다.",
    marketImpact: "상용화 기대는 크지만 개발 단계와 양산 시점을 확인해야 하는 테마입니다.",
    relatedKeywords: ["2차전지", "전기차", "소재", "테마주"]
  }),
  makeEconomyTerm({
    term: "전기차",
    aliases: ["EV", "electric vehicle", "친환경차"],
    category: "산업/테마",
    easyDescription: "배터리와 전기모터로 움직이는 자동차입니다.",
    marketImpact: "판매 성장률, 보조금, 배터리 가격, 충전 인프라가 관련 기업 실적 기대를 좌우합니다.",
    relatedKeywords: ["2차전지", "배터리", "충전인프라", "리튬"]
  }),
  makeEconomyTerm({
    term: "자율주행",
    aliases: ["autonomous driving", "ADAS", "로보택시"],
    category: "산업/테마",
    easyDescription: "차가 센서와 소프트웨어로 스스로 주행하도록 만드는 기술입니다.",
    marketImpact: "센서, 반도체, 소프트웨어, 자동차 부품 기업이 함께 연결되는 테마입니다.",
    relatedKeywords: ["전기차", "로봇", "AI", "반도체"]
  }),
  makeEconomyTerm({
    term: "로봇",
    aliases: ["robot", "휴머노이드", "서비스 로봇"],
    category: "산업/테마",
    easyDescription: "산업 현장이나 생활 서비스에서 사람의 일을 대신하거나 돕는 기계와 시스템입니다.",
    marketImpact: "AI와 자동화 기대가 커질 때 주목받지만, 실적보다 기대가 앞서면 변동성이 커질 수 있습니다.",
    relatedKeywords: ["AI 관련주", "휴머노이드", "자동화", "테마주"]
  }),
  makeEconomyTerm({
    term: "휴머노이드",
    aliases: ["인간형 로봇", "humanoid", "로봇 테마"],
    category: "산업/테마",
    easyDescription: "사람과 비슷한 형태로 움직이는 로봇입니다.",
    marketImpact: "장기 성장 기대가 크지만 실제 양산과 매출 연결까지 시간이 걸릴 수 있습니다.",
    relatedKeywords: ["로봇", "AI", "감속기", "테마주"]
  }),
  makeEconomyTerm({
    term: "클라우드",
    aliases: ["cloud", "AWS", "Azure"],
    category: "산업/테마",
    easyDescription: "기업이 직접 서버를 갖추지 않고 인터넷 기반 인프라와 소프트웨어를 빌려 쓰는 방식입니다.",
    marketImpact: "클라우드 투자는 소프트웨어, 데이터센터, AI 서버 수요와 연결됩니다.",
    relatedKeywords: ["데이터센터", "AI 관련주", "소프트웨어", "SaaS"]
  }),
  makeEconomyTerm({
    term: "SaaS",
    aliases: ["서비스형 소프트웨어", "구독 소프트웨어", "software as a service"],
    category: "산업/테마",
    easyDescription: "소프트웨어를 설치하지 않고 구독 방식으로 사용하는 서비스입니다.",
    marketImpact: "반복 매출이 장점이지만 성장률 둔화와 고객 이탈률을 함께 봐야 합니다.",
    relatedKeywords: ["클라우드", "ARR", "구독", "소프트웨어"]
  }),
  makeEconomyTerm({
    term: "ARR",
    aliases: ["연간반복매출", "annual recurring revenue", "구독 매출"],
    category: "산업/테마",
    easyDescription: "구독형 서비스가 1년 동안 반복적으로 벌어들일 것으로 예상되는 매출입니다.",
    marketImpact: "SaaS 기업의 성장성과 안정적인 매출 기반을 판단할 때 중요합니다.",
    relatedKeywords: ["SaaS", "클라우드", "매출", "구독"]
  }),
  makeEconomyTerm({
    term: "바이오",
    aliases: ["biotech", "신약", "제약바이오"],
    category: "산업/테마",
    easyDescription: "신약 개발, 치료제, 진단 기술 등 생명과학 기반 산업입니다.",
    marketImpact: "임상 결과와 허가 뉴스에 따라 주가 변동성이 매우 커질 수 있습니다.",
    relatedKeywords: ["임상", "FDA", "기술수출", "헬스케어"]
  }),
  makeEconomyTerm({
    term: "임상",
    aliases: ["clinical trial", "임상시험", "1상 2상 3상"],
    category: "산업/테마",
    easyDescription: "신약이나 치료법의 안전성과 효과를 사람에게 시험하는 과정입니다.",
    marketImpact: "성공하면 가치가 크게 올라갈 수 있지만 실패하면 주가 충격도 클 수 있습니다.",
    relatedKeywords: ["바이오", "FDA", "신약", "리스크"]
  }),
  makeEconomyTerm({
    term: "FDA",
    aliases: ["미국 식품의약국", "미국 허가", "품목허가"],
    category: "산업/테마",
    easyDescription: "미국에서 의약품과 의료기기 허가를 담당하는 기관입니다.",
    marketImpact: "FDA 승인 여부는 제약·바이오 기업의 매출 가능성과 신뢰도에 큰 영향을 줄 수 있습니다.",
    relatedKeywords: ["바이오", "임상", "의료기기", "신약"]
  }),
  makeEconomyTerm({
    term: "기술수출",
    aliases: ["라이선스 아웃", "license out", "바이오 계약"],
    category: "산업/테마",
    easyDescription: "회사가 가진 기술이나 신약 후보를 다른 회사에 넘겨 계약금과 로열티를 받는 구조입니다.",
    marketImpact: "큰 계약은 긍정적이지만, 임상 실패나 계약 해지 가능성도 함께 봐야 합니다.",
    relatedKeywords: ["바이오", "임상", "로열티", "신약"]
  }),
  makeEconomyTerm({
    term: "의료기기",
    aliases: ["medical device", "진단기기", "헬스케어 장비"],
    category: "산업/테마",
    easyDescription: "진단, 치료, 건강관리에 쓰이는 장비와 기기를 말합니다.",
    marketImpact: "병원 수요, 해외 인증, 소모품 매출, 고령화 흐름과 연결됩니다.",
    relatedKeywords: ["헬스케어", "FDA", "인바디", "진단"]
  }),
  makeEconomyTerm({
    term: "방산",
    aliases: ["방위산업", "defense", "무기 수출"],
    category: "산업/테마",
    easyDescription: "국방에 필요한 장비, 무기, 시스템을 만드는 산업입니다.",
    marketImpact: "지정학 리스크와 수출 계약, 정부 예산에 따라 관련 기업이 주목받을 수 있습니다.",
    relatedKeywords: ["지정학 리스크", "수출", "정부 예산", "인프라"]
  }),
  makeEconomyTerm({
    term: "조선",
    aliases: ["선박", "LNG선", "조선주"],
    category: "산업/테마",
    easyDescription: "선박을 만들고 수리하는 산업입니다.",
    marketImpact: "수주잔고, 선가, 원자재 비용, 환율이 조선사 실적에 큰 영향을 줍니다.",
    relatedKeywords: ["수주", "환율", "LNG", "원자재"]
  }),
  makeEconomyTerm({
    term: "해운",
    aliases: ["shipping", "운임", "컨테이너"],
    category: "산업/테마",
    easyDescription: "배로 물건을 운송하는 산업입니다.",
    marketImpact: "운임, 유가, 글로벌 교역량에 따라 해운사 실적이 크게 달라질 수 있습니다.",
    relatedKeywords: ["운임", "고유가", "물류", "경기"]
  }),
  makeEconomyTerm({
    term: "운임",
    aliases: ["freight rate", "운송비", "SCFI"],
    category: "산업/테마",
    easyDescription: "물건을 운송할 때 받는 비용입니다.",
    marketImpact: "운임 상승은 해운사에는 긍정적이지만 수출입 기업에는 비용 부담이 될 수 있습니다.",
    relatedKeywords: ["해운", "물류", "고유가", "수출"]
  }),
  makeEconomyTerm({
    term: "리오프닝",
    aliases: ["경제 재개", "여행 재개", "소비 회복"],
    category: "산업/테마",
    easyDescription: "외부 활동과 소비가 다시 늘어나는 흐름입니다.",
    marketImpact: "여행, 항공, 화장품, 외식, 엔터 업종이 함께 주목받을 수 있습니다.",
    relatedKeywords: ["소비", "항공", "여행", "화장품"]
  }),
  makeEconomyTerm({
    term: "중국 소비주",
    aliases: ["중국 리오프닝", "화장품", "면세"],
    category: "산업/테마",
    easyDescription: "중국 소비 회복이나 관광객 증가에 영향을 받는 기업들입니다.",
    marketImpact: "중국 경기, 규제, 관광객 흐름에 따라 실적 기대가 크게 바뀔 수 있습니다.",
    relatedKeywords: ["리오프닝", "화장품", "면세", "중국 경기"]
  }),
  makeEconomyTerm({
    term: "스몰캡",
    aliases: ["소형주", "중소형주", "small cap"],
    category: "기업분석",
    easyDescription: "시가총액이 상대적으로 작은 기업을 말합니다.",
    marketImpact: "성장 여지는 클 수 있지만 거래량과 정보가 부족해 변동성이 커질 수 있습니다.",
    relatedKeywords: ["시가총액", "거래량", "코스닥", "리스크"]
  }),
  makeEconomyTerm({
    term: "대형주",
    aliases: ["large cap", "블루칩", "우량주"],
    category: "기업분석",
    easyDescription: "시가총액이 크고 시장에서 영향력이 큰 기업입니다.",
    marketImpact: "지수와 외국인 수급 영향을 크게 받으며, 안정성과 성장성을 함께 봐야 합니다.",
    relatedKeywords: ["시가총액", "코스피", "외국인", "ETF"]
  }),
  makeEconomyTerm({
    term: "우선주",
    aliases: ["preferred stock", "우선 배당", "삼성전자우"],
    category: "기업분석",
    easyDescription: "보통주보다 배당 등에서 우선권이 있지만 의결권이 제한될 수 있는 주식입니다.",
    marketImpact: "배당 목적 투자자에게 관심을 받을 수 있지만, 거래량과 보통주 대비 할인율을 봐야 합니다.",
    relatedKeywords: ["배당", "보통주", "거래량", "배당수익률"]
  })
];

economyTerms.push(...expandedEconomyTerms, ...broadEconomyTerms);

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
