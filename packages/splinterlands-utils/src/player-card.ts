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
 * Checks if there are any cards listed for rent but no cards rented out.
 */
export const hasCardsListedNoneRented = (cards: PlayerCard[]) => {
  const listedCards = cards.filter(
    (card) => card.marketRentalStatus === MarketRentalStatus.LISTED,
  );
  const rentedCards = cards.filter(
    (card) => card.marketRentalStatus === MarketRentalStatus.RENTED,
  );

  return listedCards.length > 0 && rentedCards.length === 0;
};

/**
 * Checks if there are cards listed for rent and at least some of them are rented out.
 */
export const hasCardsListedSomeRented = (cards: PlayerCard[]) => {
  const listedCards = cards.filter(
    (card) => card.marketRentalStatus === MarketRentalStatus.LISTED,
  );
  const rentedCards = cards.filter(
    (card) => card.marketRentalStatus === MarketRentalStatus.RENTED,
  );

  return listedCards.length > 0 && rentedCards.length > 0;
};

/**
 * Checks if all listed cards are rented.
 */
export const allListedCardsRented = (cards: PlayerCard[]) => {
  const listedCards = cards.filter(
    (card) => card.marketRentalStatus === MarketRentalStatus.LISTED,
  );
  const rentedCards = cards.filter(
    (card) => card.marketRentalStatus === MarketRentalStatus.RENTED,
  );

  return listedCards.length === 0 && rentedCards.length > 0;
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
 * Checks if there are any cards rented at a specific price.
 */
export const hasRentedCardAtPrice = (cards: PlayerCard[], price: number) => {
  return cards.some(
    (card) =>
      card.marketListingPrice === price &&
      card.marketRentalStatus === MarketRentalStatus.RENTED,
  );
};

/**
 * Get the highest rented card price.
 */
export const getHighestRentedCardPrice = (cards: PlayerCard[]) => {
  return cards
    .filter((card) => card.marketRentalStatus === MarketRentalStatus.RENTED)
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
    .filter((card) => card.marketRentalStatus === MarketRentalStatus.LISTED)
    .reduce(
      (maxPrice, card) => Math.max(maxPrice, card.marketListingPrice || 0),
      0,
    );
};
