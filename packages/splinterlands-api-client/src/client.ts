import {
  type HttpClient,
  type HttpError,
  httpClient,
} from '@wharf-gaming/http-client';
import { type Card } from '@wharf-gaming/splinterlands-models';

// Swagger docs https://api2.splinterlands.com/doc/#/
export const splinterlandsApiBase = 'https://api2.splinterlands.com';

export const enum SplinterlandsApiRoutes {
  // https://api2.splinterlands.com/doc/#/default/get_cards_get_details
  cardDetails = '/cards/get_details',

  // https://api2.splinterlands.com/doc/#/default/get_market_for_sale_grouped
  marketForSaleGrouped = '/market/for_sale_grouped',

  // https://api2.splinterlands.com/doc/#/default/get_market_for_rent_grouped
  marketForRentGrouped = '/market/for_rent_grouped',

  // https://api2.splinterlands.com/doc/#/default/get_market_market_query_by_card
  marketQueryByCard = '/market/market_query_by_card',

  // https://api2.splinterlands.com/doc/#/default/get_market_active_rentals
  marketActiveRentals = '/market/active_rentals',

  // Undocumented endpoint
  playerCardCollection = '/cards/collection',
}

export interface SplinterlandsApiClient {
  getCardDetails(): Promise<Card[] | HttpError>;
}

export function createSplinterlandsApiClient(
  httpClient: HttpClient,
): SplinterlandsApiClient {
  return {
    getCardDetails: async (): Promise<Card[] | HttpError> => {
      const path = SplinterlandsApiRoutes.cardDetails;
      try {
        const response = await httpClient.request({
          method: 'GET',
          url: `${splinterlandsApiBase}${path}`,
        });

        return response as Card[];
      } catch (error) {
        return error as HttpError;
      }
    },
  };
}

export const splinterlandsApiClient = createSplinterlandsApiClient(httpClient);
