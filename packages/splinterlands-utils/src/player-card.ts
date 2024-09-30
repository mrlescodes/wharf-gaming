import {
  MarketRentalStatus,
  PlayerCard,
} from '@wharf-gaming/splinterlands-models';

/**
 * Checks if there are any unlisted cards.
 */
export const hasUnlistedCard = (cards: PlayerCard[]) => {
  return cards.some((card) => card.marketRentalStatus === null);
};

/**
 * Checks if all cards are unlisted.
 */
export const allCardsAreUnlisted = (cards: PlayerCard[]) => {
  return cards.every((card) => card.marketRentalStatus === null);
};

/**
 * Retrieve cards that are currently unlisted.
 */
export const getUnlistedCards = (cards: PlayerCard[]) => {
  return cards.filter((card) => card.marketRentalStatus === null);
};

/**
 * Checks if there are any cards listed at a specific price.
 */
export const hasListedCardAtPrice = (cards: PlayerCard[], price: number) => {
  return cards.some(
    (card) =>
      card.marketListingPrice === price &&
      card.marketRentalStatus === MarketRentalStatus.LISTED,
  );
};

/**
 * Checks if all the cards listed at a specific price are rented out.
 */
export const allListedCardsAtPriceRented = (
  cards: PlayerCard[],
  price: number,
) => {
  return cards
    .filter((card) => card.marketListingPrice === price)
    .every((card) => card.marketRentalStatus === MarketRentalStatus.RENTED);
};

/**
 * Sorts cards by their listing price in ascending order.
 */
export const sortPlayerCardsByPrice = (cards: PlayerCard[]) => {
  return cards.sort((a, b) => {
    // If both prices are not null, compare them directly
    if (a.marketListingPrice !== null && b.marketListingPrice !== null) {
      return a.marketListingPrice - b.marketListingPrice;
    }

    // If one price is null, the card with null should come after the one with a price
    if (a.marketListingPrice === null) return 1;
    if (b.marketListingPrice === null) return -1;

    // Should never reach this point, but added for safety
    return 0;
  });
};

/**
 * Determines the highest listing price among a set of cards.
 */
export const getHighestPrice = (cards: PlayerCard[]) => {
  const sortedCards = sortPlayerCardsByPrice(cards);

  // Get the last card in the sorted array (this will have the highest price)
  const highestPriceCard = sortedCards[sortedCards.length - 1];

  // Return the highest price or 0 if it's null
  return highestPriceCard?.marketListingPrice ?? 0;
};
