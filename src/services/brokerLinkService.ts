export const brokerLinkService = {
  brokerUrl: (broker: string) => {
    const urls: Record<string, string> = {
      한국투자: "https://securities.koreainvestment.com/",
      미래에셋: "https://securities.miraeasset.com/",
      토스증권: "https://tossinvest.com/",
      키움증권: "https://www.kiwoom.com/",
      삼성증권: "https://www.samsungpop.com/",
      NH투자증권: "https://www.nhqv.com/",
      미니스탁: "https://ministock.com/"
    };
    return urls[broker] ?? "https://finance.naver.com/";
  }
};
