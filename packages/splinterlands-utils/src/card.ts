import {
  CardGroupDetails,
  CardRarity,
} from '@wharf-gaming/splinterlands-models';

export const alphaCardCombineRates = {
  1: [1, 2, 4, 9, 19, 39, 79, 129, 229, 379],
  2: [1, 2, 4, 8, 16, 26, 46, 86],
  3: [1, 2, 4, 8, 16, 32],
  4: [1, 2, 4, 8],
} satisfies Record<CardRarity, number[]>;

export const alphaGoldCardCombineRates = {
  1: [0, 0, 0, 1, 2, 4, 7, 11, 19, 31],
  2: [0, 0, 1, 2, 3, 5, 9, 17],
  3: [0, 0, 1, 2, 4, 8],
  4: [0, 1, 2, 3],
} satisfies Record<CardRarity, number[]>;

export const betaCardCombineRates = {
  1: [1, 3, 5, 12, 25, 52, 105, 172, 305, 505],
  2: [1, 3, 5, 11, 21, 35, 61, 115],
  3: [1, 3, 6, 11, 23, 46],
  4: [1, 3, 5, 11],
} satisfies Record<CardRarity, number[]>;

export const betaGoldCardCombineRates = {
  1: [0, 0, 0, 1, 2, 4, 8, 13, 23, 38],
  2: [0, 0, 1, 2, 4, 7, 12, 22],
  3: [0, 0, 1, 3, 5, 10],
  4: [0, 1, 2, 4],
} satisfies Record<CardRarity, number[]>;

// XP System changes with Untamed (224 is first untamed card). Untamed and onwards use
// the below rates with the exception of Halfling Alchemist & Mighty Dricken
export const cardCombineRates = {
  1: [1, 5, 14, 30, 60, 100, 150, 220, 300, 400],
  2: [1, 5, 14, 25, 40, 60, 85, 115],
  3: [1, 4, 10, 20, 32, 46],
  4: [1, 3, 6, 11],
} satisfies Record<CardRarity, number[]>;

export const goldCardCombineRates = {
  1: [0, 0, 1, 2, 5, 9, 14, 20, 27, 38],
  2: [0, 1, 2, 4, 7, 11, 16, 22],
  3: [0, 1, 2, 4, 7, 10],
  4: [0, 1, 2, 4],
} satisfies Record<CardRarity, number[]>;

// Alpha Promo Cards: 75 - "Dragon Whelp", 76 - "Royal Dragon Archer", 77 - "Shin-Lo", 78 - "Neb Seni",
function usesAlphaCombineRates(cardGroupDetails: CardGroupDetails) {
  return (
    cardGroupDetails.edition === 0 ||
    (cardGroupDetails.edition === 2 && cardGroupDetails.cardDetailId <= 77)
  );
}

// Beta Cards Start at 79 - "Highland Archer"
function usesBetaCombineRates(cardGroupDetails: CardGroupDetails) {
  // Halfling Alchemist || Mighty Dricken
  if (
    cardGroupDetails.cardDetailId === 237 ||
    cardGroupDetails.cardDetailId === 238
  ) {
    return true;
  }

  return (
    cardGroupDetails.edition === 1 ||
    (cardGroupDetails.edition === 2 && cardGroupDetails.cardDetailId <= 223) ||
    (cardGroupDetails.edition === 3 && cardGroupDetails.cardDetailId <= 223)
  );
}

/**
 * Determine which card combine rates to use
 */
function determineCardCombineRates(cardGroupDetails: CardGroupDetails) {
  if (usesAlphaCombineRates(cardGroupDetails)) {
    return cardGroupDetails.gold
      ? alphaGoldCardCombineRates
      : alphaCardCombineRates;
  }

  if (usesBetaCombineRates(cardGroupDetails)) {
    return cardGroupDetails.gold
      ? betaGoldCardCombineRates
      : betaCardCombineRates;
  }

  return cardGroupDetails.gold ? goldCardCombineRates : cardCombineRates;
}

/**
 * Calculates the level of a card
 */
export const calculateCardLevel = (cardGroupDetails: CardGroupDetails) => {
  const combineRates = determineCardCombineRates(cardGroupDetails);

  // Get the combine rates for the given rarity
  const rates = combineRates[cardGroupDetails.rarity];

  return rates.filter((r) => r <= cardGroupDetails.bcx).length;
};

/**
 * Checks if a card is an exact combine. An exact combine
 * is where the BCX matches one of the possible card combination
 * levels for its rarity.
 */
export const cardIsExactCombine = (cardGroupDetails: CardGroupDetails) => {
  const combineRates = determineCardCombineRates(cardGroupDetails);

  // Get the combine rates for the given rarity
  const rates = combineRates[cardGroupDetails.rarity];

  // Check if BCX matches any of the combine rates
  return rates.includes(cardGroupDetails.bcx);
};
