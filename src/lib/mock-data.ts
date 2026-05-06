import type { Stock } from "@/types";

export const marketContext = {
  lastUpdated: "2026-04-30",
  headline: "현 시점 국내 증시는 AI 반도체, 전력·인프라, 로봇, 바이오 변동성 종목이 번갈아 주목받는 흐름이에요.",
  sourceNotes: [
    "피드는 거래대금, 등락률, 뉴스 빈도, 공시, 섹터 확산, 개인 관심사를 함께 보고 종목을 고르는 구조입니다.",
    "삼성전자·SK하이닉스 같은 반도체 대형주, 삼천당제약 같은 고변동성 바이오주는 오늘의 신호가 강할 때만 노출되는 후보입니다.",
    "이 MVP의 가격·지표는 화면 동작용 mock입니다. 실제 서비스에서는 KRX·DART·뉴스·시세 API로 매일 교체해야 합니다."
  ],
  updatePolicy: "실서비스에서는 장 시작 전 후보 생성, 장중 15분~1시간 단위 랭킹 갱신, 장 마감 후 공시·뉴스 재해석으로 업데이트합니다."
};

export const stocks: Stock[] = [
  {
    ticker: "005930.KS",
    name: "삼성전자",
    market: "KR",
    lastUpdated: "2026-04-30",
    whyNow: "AI 서버 투자와 HBM 경쟁으로 한국 반도체 대표주가 다시 시장의 중심에 있어요.",
    riskNote: "삼성전자는 AI 메모리 수혜를 받는 대형주지만, 단기적으로는 세 가지를 나눠 봐야 합니다. 첫째, 노조 보상 갈등이 길어지면 생산 차질 우려나 비용 부담 이슈로 투자심리가 흔들릴 수 있습니다. 둘째, HBM 시장에서 SK하이닉스와 Micron을 얼마나 따라잡는지가 핵심입니다. AI 수요가 강해도 삼성전자의 HBM 납품·수율·고객사 인증 뉴스가 기대에 못 미치면 주가가 쉬어갈 수 있습니다. 셋째, 중동 분쟁, 환율, 반도체 소재 공급 같은 지정학 변수는 원가와 외국인 수급에 영향을 줄 수 있어 단기 변동성을 키울 수 있습니다.",
    updateRule: "메모리 가격, HBM 납품 뉴스, 외국인 수급, 실적 가이던스가 바뀌면 우선 업데이트",
    signalTags: ["AI 메모리", "대형주", "외국인 수급", "HBM"],
    currentPrice: "217,500원대",
    changeRate: 1.4,
    marketCap: "국내 대형주 최상위권",
    per: "추정치 필요",
    pbr: "추정치 필요",
    eps: "추정치 필요",
    roe: "추정치 필요",
    week52High: "신고가권",
    week52Low: "AI 랠리 전 저점권",
    status: "상승",
    category: "실시간 핫 종목",
    interests: ["AI", "기타"],
    aiBadge: "관망 구간",
    oneLine: "AI 메모리 기대는 강하지만 이미 많이 오른 구간이라 확인하면서 봐야 해요.",
    analysis: {
      business: "반도체, 스마트폰, 가전, 디스플레이 등 여러 사업을 가진 한국 대표 기술 기업입니다.",
      revenue: "메모리 반도체와 스마트폰이 핵심이며, AI 서버 확산은 고부가 메모리 수요와 연결됩니다.",
      earnings: "메모리 업황 회복과 가격 상승 기대가 실적 전망을 끌어올리는 구간입니다.",
      valuation: "대형주라 안정감은 있지만 AI 기대가 주가에 반영된 만큼 싸다고 단정하기 어렵습니다.",
      trend: "최근 흐름은 상승이지만, 급등 이후에는 실적 확인과 차익실현 압력을 함께 봐야 합니다.",
      buyNow: "참고용 분석 기준으로는 한 번에 들어가기보다 실적·수급 확인 후 분할 접근이 더 편안합니다.",
      longTerm: "반도체 사이클과 HBM 경쟁력 회복이 이어지면 장기 보유 논리는 있습니다.",
      risks: "HBM 경쟁 지연, 노조 이슈, 환율, 지정학 리스크, AI 투자 둔화 가능성이 있습니다.",
      peers: "SK하이닉스, Micron, TSMC와 비교하면 반도체 사이클 내 위치를 보기 좋습니다."
    },
    news: [
      {
        title: "AI 메모리 수요 속 삼성전자 실적 기대 확대",
        source: "Market Context Mock",
        url: "https://example.com/samsung-ai-memory",
        sentiment: "긍정",
        summary: ["AI 서버 투자가 메모리 수요를 자극하고 있습니다.", "HBM 경쟁력 확인이 핵심 체크포인트입니다.", "노조와 원가 이슈는 단기 리스크입니다."]
      }
    ]
  },
  {
    ticker: "000660.KS",
    name: "SK하이닉스",
    market: "KR",
    lastUpdated: "2026-04-30",
    whyNow: "HBM 시장 주도권과 AI 메모리 실적 기대 때문에 시장에서 가장 뜨거운 반도체주 중 하나예요.",
    riskNote: "SK하이닉스는 HBM 대표주로 좋은 이야기가 많지만, 그만큼 기대가 이미 가격에 반영됐을 가능성도 큽니다. 단기 리스크는 세 가지입니다. 첫째, Nvidia 등 대형 고객사 수요가 예상보다 약해지거나 HBM 단가가 흔들리면 실적 전망이 빠르게 낮아질 수 있습니다. 둘째, 주가가 급등한 뒤에는 좋은 실적이 나와도 차익실현 매물이 먼저 나올 수 있습니다. 셋째, 삼성전자와 Micron의 추격, 설비투자 확대에 따른 향후 공급 부담, 환율과 지정학 리스크가 함께 작용하면 변동성이 커질 수 있습니다.",
    updateRule: "HBM 점유율, Nvidia 공급 뉴스, 설비투자, 분기 실적 발표 시 즉시 업데이트",
    signalTags: ["HBM", "AI 인프라", "급등 후 변동성", "실적주"],
    currentPrice: "고가권",
    changeRate: 2.1,
    marketCap: "국내 대형주 최상위권",
    per: "추정치 필요",
    pbr: "추정치 필요",
    eps: "추정치 필요",
    roe: "추정치 필요",
    week52High: "신고가권",
    week52Low: "AI 랠리 전 저점권",
    status: "상승",
    category: "실시간 핫 종목",
    interests: ["AI"],
    aiBadge: "관망 구간",
    oneLine: "좋은 회사 이야기와 비싼 주가 이야기를 동시에 봐야 하는 AI 메모리 대표주예요.",
    analysis: {
      business: "DRAM, NAND, HBM 등 메모리 반도체를 만드는 기업입니다.",
      revenue: "AI 서버와 데이터센터에 들어가는 고성능 메모리 판매가 실적의 핵심입니다.",
      earnings: "HBM 수요가 강해 이익 체력이 크게 좋아졌다는 기대가 반영되고 있습니다.",
      valuation: "실적 성장 기대가 크지만 주가도 빠르게 올라 밸류에이션 부담을 확인해야 합니다.",
      trend: "상승 추세가 강하지만 단기적으로는 과열과 조정이 반복될 수 있습니다.",
      buyNow: "초보자라면 추격 매수보다 조정 구간과 실적 확인을 기다리는 방식이 더 적합합니다.",
      longTerm: "HBM 경쟁력이 유지되면 장기 성장 논리는 강합니다.",
      risks: "AI 투자 둔화, 경쟁사 추격, 고객사 집중, 메모리 가격 사이클 하락이 리스크입니다.",
      peers: "삼성전자, Micron과 HBM·DRAM 경쟁력을 비교하면 좋습니다."
    },
    news: [
      {
        title: "SK하이닉스, HBM 수요와 실적 기대가 주가를 견인",
        source: "Market Context Mock",
        url: "https://example.com/sk-hynix-hbm",
        sentiment: "긍정",
        summary: ["HBM 수요가 핵심 성장 동력입니다.", "AI 인프라 투자가 실적 기대를 키웁니다.", "급등 후 변동성은 주의해야 합니다."]
      }
    ]
  },
  {
    ticker: "000250.KQ",
    name: "삼천당제약",
    market: "KR",
    lastUpdated: "2026-04-30",
    whyNow: "바이오 기대감과 논란이 동시에 커져서 초보자가 특히 조심해야 할 위험 예시로 분류했어요.",
    riskNote: "삼천당제약 같은 고변동성 바이오주는 숫자보다 기대와 신뢰가 주가를 크게 움직일 수 있습니다. 임상, 특허, 플랫폼 기술, 기술수출 가능성처럼 확인이 어려운 이슈가 투자 포인트가 되기 때문에, IR 자료의 구체성이나 공시 내용이 시장 기대에 못 미치면 급락이 나올 수 있습니다. 또 블록딜이나 대주주·기관 물량 이슈는 수급 불안을 키웁니다. 이런 종목은 ‘좋아 보인다’보다 ‘공시로 확인됐는가’, ‘실제 매출로 이어지는가’, ‘손절 기준을 정했는가’를 먼저 봐야 합니다.",
    updateRule: "공시, IR 자료, 임상/특허 뉴스, 거래소 조회공시, 급등락 발생 시 즉시 업데이트",
    signalTags: ["바이오", "고변동성", "논란", "공시 확인"],
    currentPrice: "400,000원대",
    changeRate: -6.5,
    marketCap: "코스닥 대형 바이오주권",
    per: "추정 어려움",
    pbr: "추정 어려움",
    eps: "변동 큼",
    roe: "변동 큼",
    week52High: "급등 고점권",
    week52Low: "이슈 전 저점권",
    status: "과열",
    category: "위험 신호 종목",
    interests: ["의료"],
    aiBadge: "과열 상태",
    oneLine: "기대감보다 검증 자료와 공시를 먼저 봐야 하는 고변동성 바이오주예요.",
    analysis: {
      business: "제약·바이오 의약품 개발과 판매를 하는 기업입니다.",
      revenue: "의약품 판매와 신약·플랫폼 기술 기대가 투자 포인트로 연결됩니다.",
      earnings: "현재는 실적보다 기술·임상·계약 기대감이 주가에 크게 작용하는 성격이 강합니다.",
      valuation: "전통 지표만으로 비싸다/싸다를 판단하기 어렵고, 이벤트 리스크가 큽니다.",
      trend: "급등락이 반복되는 고변동성 구간으로 보는 편이 안전합니다.",
      buyNow: "참고용 분석 기준으로는 초보자에게 추격 매수보다 관찰·공시 확인이 더 적합합니다.",
      longTerm: "기술 검증과 계약 현실화가 확인되어야 장기 보유 논리가 강해집니다.",
      risks: "IR 신뢰도, 특허 범위, 임상 결과, 블록딜, 유동성, 기대감 소멸이 주요 리스크입니다.",
      peers: "다른 코스닥 바이오주와 비교하되, 공시와 임상 단계 차이를 먼저 확인해야 합니다."
    },
    news: [
      {
        title: "삼천당제약, 기술 논란과 급락 이슈로 변동성 확대",
        source: "Market Context Mock",
        url: "https://example.com/samchundang-risk",
        sentiment: "부정",
        summary: ["S-PASS와 특허 범위를 둘러싼 의문이 제기됐습니다.", "주가 급락으로 투자심리가 흔들렸습니다.", "공시와 IR 자료 검증이 먼저 필요합니다."]
      }
    ]
  },
  {
    ticker: "042700.KS",
    name: "한미반도체",
    market: "KR",
    lastUpdated: "2026-04-30",
    whyNow: "AI 반도체 투자가 커질 때 후공정 장비주로 함께 주목받는 종목이에요.",
    riskNote: "대형 고객 투자 사이클과 장비 발주 타이밍에 따라 실적 기대가 빠르게 바뀔 수 있어요.",
    updateRule: "수주 공시, HBM 장비 투자 뉴스, 반도체 장비주 수급 변화 시 업데이트",
    signalTags: ["반도체 장비", "HBM 후공정", "수주 민감"],
    currentPrice: "고가권",
    changeRate: 0.8,
    marketCap: "반도체 장비 대표주권",
    per: "높은 편",
    pbr: "높은 편",
    eps: "성장 기대",
    roe: "양호",
    week52High: "고점권",
    week52Low: "상승 전 저점권",
    status: "상승",
    category: "테마 확산 종목",
    interests: ["AI"],
    aiBadge: "분할 매수 가능",
    oneLine: "AI 메모리 투자의 주변 수혜를 보는 장비주지만 가격 부담은 확인해야 해요.",
    analysis: {
      business: "반도체 후공정 장비를 만드는 기업입니다.",
      revenue: "고객사의 설비투자와 장비 수주가 매출로 연결됩니다.",
      earnings: "HBM 투자 확대가 이어지면 실적 기대가 유지될 수 있습니다.",
      valuation: "성장 기대가 이미 반영되어 가격 부담이 생길 수 있습니다.",
      trend: "반도체 대형주가 강할 때 함께 움직이는 경향이 있습니다.",
      buyNow: "수주와 실적 확인을 기준으로 분할 접근하는 편이 적합합니다.",
      longTerm: "HBM 투자가 장기화되면 구조적 성장 논리가 있습니다.",
      risks: "수주 공백, 고객사 투자 지연, 고평가 부담이 리스크입니다.",
      peers: "ISC, 리노공업, 테크윙 등 반도체 장비·부품주와 비교할 수 있습니다."
    },
    news: [
      {
        title: "AI 반도체 투자 확산에 후공정 장비주 관심",
        source: "Market Context Mock",
        url: "https://example.com/hbm-equipment",
        sentiment: "중립",
        summary: ["HBM 투자가 장비주 관심으로 확산되고 있습니다.", "수주 공시가 핵심 확인 지표입니다.", "가격 부담은 함께 봐야 합니다."]
      }
    ]
  },
  {
    ticker: "095340.KQ",
    name: "ISC",
    market: "KR",
    lastUpdated: "2026-04-30",
    whyNow: "삼성전자·SK하이닉스 랠리 이후 반도체 소부장으로 관심이 번지는 흐름에 들어왔어요.",
    riskNote: "대형주보다 거래량과 실적 변동성이 커서 기대감만 보고 들어가면 흔들릴 수 있어요.",
    updateRule: "반도체 고객사 투자, 테스트 소켓 수요, 실적 추정치 변경 시 업데이트",
    signalTags: ["반도체 부품", "소부장", "AI 확산"],
    currentPrice: "관심권",
    changeRate: 1.2,
    marketCap: "코스닥 반도체 부품주권",
    per: "추정치 필요",
    pbr: "추정치 필요",
    eps: "성장 기대",
    roe: "양호",
    week52High: "고점 확인 필요",
    week52Low: "저점 확인 필요",
    status: "상승",
    category: "테마 확산 종목",
    interests: ["AI"],
    aiBadge: "분할 매수 가능",
    oneLine: "대형 반도체주 다음으로 관심이 번질 때 보는 소부장 후보예요.",
    analysis: {
      business: "반도체 테스트 관련 부품을 만드는 기업입니다.",
      revenue: "반도체 테스트 소켓과 부품 판매가 핵심입니다.",
      earnings: "AI 반도체 투자 확대가 테스트 부품 수요로 이어질 수 있습니다.",
      valuation: "성장 기대와 실적 확인 사이의 간격을 봐야 합니다.",
      trend: "반도체 대형주 강세 후 후속 순환매 후보로 볼 수 있습니다.",
      buyNow: "뉴스보다 실적 추정치와 수주 흐름을 확인하는 접근이 필요합니다.",
      longTerm: "테스트 수요가 구조적으로 늘면 장기 성장 가능성이 있습니다.",
      risks: "고객사 집중, 수요 둔화, 중소형주 변동성이 리스크입니다.",
      peers: "한미반도체, 리노공업, 테크윙과 비교할 수 있습니다."
    },
    news: [
      {
        title: "반도체 소부장, 대형주 랠리 이후 후속 관심",
        source: "Market Context Mock",
        url: "https://example.com/semiconductor-materials",
        sentiment: "중립",
        summary: ["반도체 대형주 강세가 소부장으로 확산될 수 있습니다.", "실적 확인이 중요합니다.", "중소형주는 변동성이 큽니다."]
      }
    ]
  },
  {
    ticker: "041830.KQ",
    name: "인바디",
    market: "KR",
    lastUpdated: "2026-04-30",
    whyNow: "급등 테마만 보기 부담스러운 사용자에게 비교적 실적 기반으로 볼 수 있는 헬스케어 종목이에요.",
    riskNote: "폭발적인 테마주는 아니어서 단기 수익 기대보다 실적 지속성을 봐야 해요.",
    updateRule: "분기 실적, 해외 매출, 의료기기 수출 데이터 변화 시 업데이트",
    signalTags: ["헬스케어", "실적형", "방어 후보"],
    currentPrice: "26,800원",
    changeRate: -1.1,
    marketCap: "약 3,600억원",
    per: "10.6",
    pbr: "1.4",
    eps: "2,528원",
    roe: "13.7%",
    week52High: "32,500원",
    week52Low: "22,100원",
    status: "안정",
    category: "비교 관찰 종목",
    interests: ["의료"],
    aiBadge: "장기 보유형",
    oneLine: "시장 과열이 부담스러울 때 비교 대상으로 볼 만한 헬스케어 실적주예요.",
    analysis: {
      business: "체성분 분석 장비와 헬스케어 솔루션을 판매합니다.",
      revenue: "병원, 피트니스, 공공기관, 해외 대리점 판매가 매출원입니다.",
      earnings: "큰 폭의 폭발 성장보다는 꾸준한 이익 체력이 장점입니다.",
      valuation: "실적 대비 과도하게 비싸다고 보기는 어렵지만 성장 속도 확인이 필요합니다.",
      trend: "완만한 박스권 흐름으로 안정형 투자자가 보기 편한 편입니다.",
      buyNow: "실적 발표와 해외 매출 추이를 확인하며 천천히 접근할 수 있습니다.",
      longTerm: "건강관리 수요가 커지는 흐름과 맞물리면 장기 보유 논리가 있습니다.",
      risks: "의료기기 경쟁, 환율, 성장 둔화가 주요 리스크입니다.",
      peers: "오므론, 헬스케어 장비 업체들과 비교할 수 있습니다."
    },
    news: [
      {
        title: "인바디, 급등 테마와 비교되는 실적형 헬스케어 후보",
        source: "Market Context Mock",
        url: "https://example.com/inbody",
        sentiment: "중립",
        summary: ["브랜드 신뢰도가 강점입니다.", "해외 매출 성장이 중요합니다.", "급등보다 꾸준함을 보는 종목입니다."]
      }
    ]
  }
  ,
  {
    ticker: "267260.KS",
    name: "HD현대일렉트릭",
    market: "KR",
    lastUpdated: "2026-04-30",
    whyNow: "AI 데이터센터와 전력 인프라 투자가 커지면서 전력기기 섹터가 반도체 다음 관심 축으로 묶이고 있어요.",
    riskNote: "수주 기대가 이미 가격에 반영되면 실적이 좋아도 주가가 쉬어갈 수 있어요.",
    updateRule: "수주 공시, 전력망 투자 뉴스, 북미 데이터센터 투자 변화 시 업데이트",
    signalTags: ["전력 인프라", "AI 데이터센터", "수주"],
    currentPrice: "고가권",
    changeRate: 1.7,
    marketCap: "전력기기 대표주권",
    per: "높아진 편",
    pbr: "높아진 편",
    eps: "성장 기대",
    roe: "양호",
    week52High: "고점권",
    week52Low: "상승 전 저점권",
    status: "상승",
    category: "테마 확산 종목",
    interests: ["AI", "기타"],
    aiBadge: "관망 구간",
    oneLine: "AI가 전력 수요로 번질 때 같이 보는 인프라 대표 후보예요.",
    analysis: {
      business: "변압기와 전력기기 등 전력 인프라 장비를 만듭니다.",
      revenue: "전력망 투자, 데이터센터 증설, 해외 수주가 매출로 이어집니다.",
      earnings: "수주 잔고와 납품 단가가 실적 흐름을 좌우합니다.",
      valuation: "좋은 업황 기대가 주가에 반영된 상태라 가격 부담을 확인해야 합니다.",
      trend: "전력 인프라 테마가 강할 때 함께 움직이는 흐름입니다.",
      buyNow: "추격보다 수주·실적 확인 후 분할 접근이 적합합니다.",
      longTerm: "전력망 교체와 데이터센터 투자가 이어지면 장기 논리는 있습니다.",
      risks: "수주 지연, 원가 상승, 고평가 부담이 리스크입니다.",
      peers: "효성중공업, LS ELECTRIC 등과 비교할 수 있습니다."
    },
    news: [
      {
        title: "AI 데이터센터 전력 수요가 전력기기 관심으로 확산",
        source: "Market Context Mock",
        url: "https://example.com/power-infra",
        sentiment: "긍정",
        summary: ["AI 인프라는 반도체뿐 아니라 전력 투자와도 연결됩니다.", "수주 잔고가 핵심 확인 지표입니다.", "고점권에서는 가격 부담도 봐야 합니다."]
      }
    ]
  },
  {
    ticker: "108490.KQ",
    name: "로보티즈",
    market: "KR",
    lastUpdated: "2026-04-30",
    whyNow: "피지컬 AI와 로봇 테마가 강해질 때 개인 투자자 관심이 빠르게 몰릴 수 있는 후보예요.",
    riskNote: "로봇주는 기대감이 먼저 움직이는 경우가 많아 실적 확인 전 급등락이 클 수 있어요.",
    updateRule: "로봇 정책, 대기업 투자, 제품 공급 계약, 테마 거래대금 급증 시 업데이트",
    signalTags: ["로봇", "피지컬 AI", "테마주"],
    currentPrice: "변동성 큼",
    changeRate: 3.4,
    marketCap: "코스닥 로봇 테마주권",
    per: "높거나 변동 큼",
    pbr: "높거나 변동 큼",
    eps: "확인 필요",
    roe: "확인 필요",
    week52High: "테마 고점권",
    week52Low: "테마 전 저점권",
    status: "과열",
    category: "위험 신호 종목",
    interests: ["AI", "게임", "기타"],
    aiBadge: "과열 상태",
    oneLine: "피지컬 AI 기대를 받지만 초보자는 특히 손실 기준이 먼저 필요한 테마주예요.",
    analysis: {
      business: "로봇 부품과 서비스 로봇 관련 제품을 개발합니다.",
      revenue: "로봇 부품, 플랫폼, 제품 공급이 매출로 연결됩니다.",
      earnings: "테마 기대가 실적보다 먼저 움직일 수 있어 실적 확인이 필요합니다.",
      valuation: "전통 지표보다 미래 기대가 크게 반영될 수 있습니다.",
      trend: "테마 장세에서 급등락이 커질 수 있습니다.",
      buyNow: "참고용 분석 기준으로는 추격 매수보다 관찰과 손절 기준 설정이 우선입니다.",
      longTerm: "실제 공급 계약과 매출 성장이 확인되면 장기 논리가 강해집니다.",
      risks: "테마 소멸, 실적 지연, 유동성 변동이 리스크입니다.",
      peers: "레인보우로보틱스, 두산로보틱스 등과 비교할 수 있습니다."
    },
    news: [
      {
        title: "로봇 테마, 피지컬 AI 기대와 함께 변동성 확대",
        source: "Market Context Mock",
        url: "https://example.com/robotics-theme",
        sentiment: "중립",
        summary: ["피지컬 AI 기대가 로봇주 관심으로 이어질 수 있습니다.", "실제 매출 확인이 중요합니다.", "테마주는 손실 기준이 먼저 필요합니다."]
      }
    ]
  }
];

export function getStock(ticker: string) {
  return stocks.find((stock) => stock.ticker === decodeURIComponent(ticker));
}

export const marketSummary = marketContext.headline;
