export const priceService = {
  getThirtyDayMock: () => Array.from({ length: 30 }, (_, index) => ({ day: index + 1, value: 100 + Math.sin(index / 3) * 5 + index * 0.7 }))
};
