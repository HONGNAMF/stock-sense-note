export type EvidenceLink = {
  title: string;
  summary: string;
  url: string;
  source: string;
};

const commonLinks: EvidenceLink[] = [
  {
    title: "KRX 정보데이터시스템",
    summary: "시세, 거래대금, 시가총액 같은 원천 지표를 확인하는 공식 경로입니다.",
    source: "KRX",
    url: "https://data.krx.co.kr/"
  },
  {
    title: "DART 전자공시",
    summary: "실적, 주요 계약, 투자 판단에 필요한 공시를 확인하는 공식 경로입니다.",
    source: "DART",
    url: "https://dart.fss.or.kr/"
  }
];

const linksByTicker: Record<string, EvidenceLink[]> = {
  "000660.KS": [
    {
      title: "서울 증시, AI 수요 기대 속 사상 최고치",
      summary: "AI 붐 회복 기대와 반도체 수요 전망이 SK하이닉스·삼성전자 흐름에 영향을 줬다는 기사입니다.",
      source: "Yonhap",
      url: "https://en.yna.co.kr/view/AEN20260429007552320"
    },
    {
      title: "SK하이닉스 EUV 장비 대규모 투자",
      summary: "AI 메모리 수요 대응을 위한 설비투자 맥락을 볼 수 있습니다.",
      source: "Tom's Hardware",
      url: "https://www.tomshardware.com/tech-industry/semiconductors/sk-hynix-places-record-8-billion-order-for-asml-euv-lithography-machines"
    }
  ],
  "005930.KS": [
    {
      title: "삼성전자·SK하이닉스 실적 기대",
      summary: "메모리 가격 상승과 AI 수요가 두 대형 반도체 기업의 실적 기대를 키운다는 내용입니다.",
      source: "AJU Press",
      url: "https://www.ajupress.com/view/20260424170570104"
    },
    {
      title: "삼성전자 노조와 보상 갈등",
      summary: "AI 수혜와 별개로 인건비·노조 갈등이 리스크가 될 수 있음을 보여줍니다.",
      source: "AP",
      url: "https://apnews.com/article/38e7a5030d3688850d3e8d8baf240f58"
    }
  ],
  "000250.KQ": [
    {
      title: "삼천당제약 S-PASS와 특허 논란",
      summary: "기술 기대와 신뢰도 이슈가 동시에 주가 변동성을 키울 수 있다는 맥락입니다.",
      source: "AJU Press",
      url: "https://www.ajupress.com/view/20260408173470109"
    },
    {
      title: "삼천당제약 급락과 IR 논란",
      summary: "바이오 종목은 공시와 IR 자료 검증이 먼저 필요하다는 예시입니다.",
      source: "Pharm Edaily",
      url: "https://pharm.edaily.co.kr/News/Read?mediaCodeNo=257&newsId=05270966645418744"
    }
  ],
  "267260.KS": [
    {
      title: "AI 인프라와 전력 섹터 순환매",
      summary: "반도체 이후 전력·인프라 섹터로 관심이 확산되는 배경을 설명합니다.",
      source: "Korea Business Hub",
      url: "https://www.koreabusinesshub.kr/blog/korea-kospi-sector-rotation-2026"
    }
  ],
  "108490.KQ": [
    {
      title: "피지컬 AI와 로봇 테마",
      summary: "AI가 로봇·자동화 섹터로 확산되는 시장 테마를 확인할 수 있습니다.",
      source: "Korean Stocks",
      url: "https://korean-stocks.com/2026/01/18/from-semiconductors-to-robotics-and-bio/"
    }
  ]
};

export function getEvidenceLinks(ticker: string) {
  return [...(linksByTicker[ticker] ?? []), ...commonLinks];
}

const analysisEvidenceByKey: Record<string, EvidenceLink[]> = {
  buyNow: [
    {
      title: "KRX 시세·거래대금 확인",
      summary: "지금 매수 판단은 가격 자체보다 최근 거래대금, 급등 여부, 외국인 수급을 함께 확인해야 합니다.",
      source: "KRX",
      url: "https://data.krx.co.kr/"
    },
    {
      title: "DART 최근 공시 확인",
      summary: "실적 발표, 투자 계획, 주요 계약, 리스크 공시는 매수 판단 전에 반드시 확인해야 합니다.",
      source: "DART",
      url: "https://dart.fss.or.kr/"
    }
  ],
  risks: [
    {
      title: "공시에서 리스크 확인",
      summary: "소송, 공급계약, 투자, 실적 변동 같은 공식 리스크는 DART 공시에서 확인하는 편이 안전합니다.",
      source: "DART",
      url: "https://dart.fss.or.kr/"
    }
  ],
  earnings: [
    {
      title: "최근 실적 공시 확인",
      summary: "실적 흐름은 기사보다 분기보고서와 잠정실적 공시를 먼저 확인해야 합니다.",
      source: "DART",
      url: "https://dart.fss.or.kr/"
    }
  ],
  valuation: [
    {
      title: "시가총액과 재무지표 확인",
      summary: "비싼지 싼지는 PER 하나보다 시가총액, 이익 전망, 업황 사이클을 함께 봐야 합니다.",
      source: "KRX",
      url: "https://data.krx.co.kr/"
    }
  ],
  trend: [
    {
      title: "최근 가격 흐름 확인",
      summary: "상승·횡보·하락 판단은 최근 가격과 거래대금 변화가 함께 움직이는지 확인해야 합니다.",
      source: "KRX",
      url: "https://data.krx.co.kr/"
    }
  ]
};

export function getAnalysisEvidence(ticker: string, key: string) {
  const tickerLinks = linksByTicker[ticker] ?? [];
  const sectionLinks = analysisEvidenceByKey[key] ?? [];
  return [...tickerLinks.slice(0, 2), ...sectionLinks].slice(0, 4);
}
