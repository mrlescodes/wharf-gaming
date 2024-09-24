export interface PurchaseRecommendation {
  cardDetailId: number;
  level: number;
  gold: boolean;
  roi: number;
  lowestSellPriceBCX?: number;
  suggestedBuyPriceBCX?: number;
  details?: string;
}
