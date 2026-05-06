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
  "005930.KS": [
    {
      title: "삼성전자 공시 확인",
      summary: "분기보고서와 사업보고서에서 반도체 실적, 투자, 리스크 문구를 확인할 수 있습니다.",
      source: "DART",
      url: "https://dart.fss.or.kr/"
    }
  ],
  "000660.KS": [
    {
      title: "SK하이닉스 공시 확인",
      summary: "HBM 투자, 메모리 업황, 설비투자 관련 내용을 공시에서 확인할 수 있습니다.",
      source: "DART",
      url: "https://dart.fss.or.kr/"
    }
  ],
  "000250.KQ": [
    {
      title: "삼천당제약 공시 확인",
      summary: "바이오 종목은 계약, 임상, IR, 지분 변동 공시를 먼저 확인하는 것이 중요합니다.",
      source: "DART",
      url: "https://dart.fss.or.kr/"
    }
  ]
};

export function getEvidenceLinks(ticker: string) {
  return [...(linksByTicker[ticker] ?? []), ...commonLinks];
}

export function getAnalysisEvidence(ticker: string, _analysisKey: string) {
  return getEvidenceLinks(ticker).slice(0, 3);
}
