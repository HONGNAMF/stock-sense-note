import type { Horizon, Interest, LossTolerance, NewsFrequency, Volatility, WatchTag } from "@/types";

export const interests: Interest[] = ["음악", "영화", "애니", "게임", "콘텐츠", "커뮤니티", "AI", "의료", "기타"];
export const volatilityOptions: Volatility[] = ["낮음", "중간", "높음"];
export const horizonOptions: Horizon[] = ["단기", "중기", "장기"];
export const newsFrequencyOptions: NewsFrequency[] = ["거의 안 봄", "가끔", "자주"];
export const lossToleranceOptions: LossTolerance[] = ["-5%", "-10%", "-20%", "상관없음"];
export const watchTags: WatchTag[] = ["공부중", "장기보유", "고위험", "취향주"];

export const termDescriptions: Record<string, string> = {
  PER: "주가가 회사 이익의 몇 배인지 보는 지표예요. 낮다고 무조건 싼 것은 아니고 성장성도 함께 봐야 합니다.",
  PBR: "주가가 회사 순자산 대비 몇 배인지 보는 지표예요. 자산이 많은 기업을 볼 때 참고하기 좋습니다.",
  EPS: "주식 1주당 벌어들인 이익입니다. 꾸준히 늘면 이익 체력이 좋아진다고 볼 수 있어요.",
  ROE: "자기자본으로 얼마나 효율적으로 이익을 냈는지 보는 지표예요. 높을수록 자본 효율이 좋다는 뜻입니다."
};
