import type { GlossaryTerm } from "@/types/investment";

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "PER",
    oneLine: "주가가 이익의 몇 배인지 보는 지표입니다.",
    simple: "회사가 1년에 버는 돈에 비해 주가가 얼마나 비싼지 보는 숫자예요.",
    caution: "낮다고 무조건 싸고, 높다고 무조건 비싼 것은 아닙니다. 성장 속도와 업종을 같이 봐야 해요.",
    related: ["EPS", "PBR", "ROE"]
  },
  {
    term: "PBR",
    oneLine: "주가가 회사 자본의 몇 배인지 보는 지표입니다.",
    simple: "회사의 순자산 대비 시장에서 어느 정도 가격을 받는지 보는 숫자예요.",
    caution: "브랜드나 기술처럼 장부에 잘 안 잡히는 가치가 큰 회사에는 해석이 달라질 수 있어요.",
    related: ["PER", "ROE", "시가총액"]
  },
  {
    term: "EPS",
    oneLine: "주식 1주당 벌어들인 이익입니다.",
    simple: "내가 가진 주식 1주에 얼마만큼 이익이 붙는지 보는 자료예요.",
    caution: "일회성 이익으로 갑자기 좋아질 수 있어 반복 가능한 이익인지 봐야 해요.",
    related: ["PER", "순이익"]
  },
  {
    term: "ROE",
    oneLine: "자기자본으로 이익을 얼마나 냈는지 보는 지표입니다.",
    simple: "회사가 가진 돈을 얼마나 효율적으로 굴렸는지 보는 숫자예요.",
    caution: "부채를 많이 써서 ROE가 높아질 수도 있어 부채비율과 함께 봐야 합니다.",
    related: ["PBR", "부채비율"]
  },
  {
    term: "영업이익",
    oneLine: "회사가 본업으로 번 돈입니다.",
    simple: "제품이나 서비스를 팔아서 실제 장사를 얼마나 잘했는지 보는 숫자예요.",
    caution: "영업이익은 좋아도 이자비용이나 일회성 손실이 있을 수 있어 순이익도 봐야 합니다.",
    related: ["순이익", "영업이익률"]
  },
  {
    term: "시가총액",
    oneLine: "시장에서 평가하는 회사 전체 가격입니다.",
    simple: "주가에 전체 주식 수를 곱한 값이에요.",
    caution: "주가만 보고 싸다 비싸다 판단하지 말고 시가총액과 이익 규모를 같이 봐야 합니다.",
    related: ["주가", "PER"]
  },
  {
    term: "ETF",
    oneLine: "여러 종목을 한 바구니에 담은 상장 펀드입니다.",
    simple: "개별 회사 하나를 고르기 어렵다면 여러 회사를 묶어서 사는 방식이에요.",
    caution: "ETF도 구성 종목이 한쪽으로 몰리면 변동성이 커질 수 있습니다.",
    related: ["구성종목", "총보수"]
  }
];
