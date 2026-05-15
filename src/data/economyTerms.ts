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
