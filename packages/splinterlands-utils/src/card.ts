import { CardRarity } from '@wharf-gaming/splinterlands-models';

export const cardCombineRates = [
  [1, 5, 14, 30, 60, 100, 150, 220, 300, 400], // Common
  [1, 5, 14, 25, 40, 60, 85, 115], // Rare
  [1, 4, 10, 20, 32, 46], // Epic
  [1, 3, 6, 11], // Legendary
];

/**
 * Checks if a card is an exact combine. An exact combine
 * is where the BCX matches one of the possible card combination
 * levels for its rarity.
 */
export const cardIsExactCombine = (
  rarity: CardRarity,
  bcx: number,
): boolean => {
  // Get the combine rates for the given rarity
  const rates = cardCombineRates[rarity - 1];

  // Check if rates exist for the given rarity and if BCX matches any of the combine rates
  return rates ? rates.includes(bcx) : false;
};

/**
 * Computes the level of a card based on its bcx and rarity.
 *
 * TODO: This does not cover all of the possible card combine rates (Alpha, gold foil etc...)
 *
 * @see https://peakd.com/splinterlands/@bauloewe/programming-tutorial-renting-your-splinterlands-card-collection-with-python
 *
 * @param {CardRarity} rarity The rarity of the card (1-4).
 * @param {number} bcx The battle card experience of the card.
 * @returns {number} The level of the card.
 */
export const computeCardLevel = (rarity: CardRarity, bcx: number): number => {
  const rates = cardCombineRates[rarity - 1];

  let level = 1;

  // Ensure rates are defined and contain valid values
  if (!rates || rates.length === 0) {
    // TODO: LOG Invalid rarity or missing combine rates: ${rarity}
    return level;
  }

  // Loop through the rates to determine the card's level
  for (let i = 0; i < rates.length; i++) {
    const rate = rates[i];

    // Ensure rate is defined before comparison
    if (typeof rate !== 'number') {
      // TODO: LOG Error Invalid combine rate at level ${i + 1}
      return level;
    }

    if (bcx >= rate) {
      level = i + 1;
    } else {
      break;
    }
  }

  return level;
};
