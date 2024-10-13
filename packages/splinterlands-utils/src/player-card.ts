import {
  MarketListingStatus,
  PlayerCard,
} from '@wharf-gaming/splinterlands-models';

// TODO: Account for SELL / RENT listing type

/**
 * Checks if there are any unlisted cards.
 */
export const hasUnlistedCard = (cards: PlayerCard[]) => {
  return cards.some((card) => card.marketListingStatus === null);
};

/**
 * Checks if all cards are unlisted.
 */
export const allCardsAreUnlisted = (cards: PlayerCard[]) => {
  return cards.every((card) => card.marketListingStatus === null);
};

/**
 * Checks if there are any cards listed for rent but no cards rented out.
 */
export const hasCardsListedNoneRented = (cards: PlayerCard[]) => {
  const listedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.LISTED,
  );
  const rentedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.RENTED,
  );

  return listedCards.length > 0 && rentedCards.length === 0;
};

/**
 * Checks if there are cards listed for rent and at least some of them are rented out.
 */
export const hasCardsListedSomeRented = (cards: PlayerCard[]) => {
  const listedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.LISTED,
  );
  const rentedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.RENTED,
  );

  return listedCards.length > 0 && rentedCards.length > 0;
};

/**
 * Checks if all listed cards are rented.
 */
export const allListedCardsRented = (cards: PlayerCard[]) => {
  const listedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.LISTED,
  );
  const rentedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.RENTED,
  );

  return listedCards.length === 0 && rentedCards.length > 0;
};

/**
 * Checks if all available cards are rented.
 */
export const allAvailableCardsRented = (cards: PlayerCard[]) => {
  return cards.every(
    (card) => card.marketListingStatus === MarketListingStatus.RENTED,
  );
};

/**
 * Retrieve cards that are currently unlisted.
 */
export const getUnlistedCards = (cards: PlayerCard[]) => {
  return cards.filter((card) => card.marketListingStatus === null);
};

/**
 * Checks if there are any cards listed at a specific price.
 */
export const hasListedCardAtPrice = (cards: PlayerCard[], price: number) => {
  return cards.some(
    (card) =>
      card.marketListingPrice === price &&
      card.marketListingStatus === MarketListingStatus.LISTED,
  );
};

/**
 * Checks if there are any cards rented at a specific price.
 */
export const hasRentedCardAtPrice = (cards: PlayerCard[], price: number) => {
  return cards.some(
    (card) =>
      card.marketListingPrice === price &&
      card.marketListingStatus === MarketListingStatus.RENTED,
  );
};

/**
 * Get the highest rented card price.
 */
export const getHighestRentedCardPrice = (cards: PlayerCard[]) => {
  return cards
    .filter((card) => card.marketListingStatus === MarketListingStatus.RENTED)
    .reduce(
      (maxPrice, card) => Math.max(maxPrice, card.marketListingPrice || 0),
      0,
    );
};

/**
 * Get the highest listed card price.
 */
export const getHighestListedCardPrice = (cards: PlayerCard[]) => {
  return cards
    .filter((card) => card.marketListingStatus === MarketListingStatus.LISTED)
    .reduce(
      (maxPrice, card) => Math.max(maxPrice, card.marketListingPrice || 0),
      0,
    );
};
