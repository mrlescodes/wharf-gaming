import {
  type HttpClient,
  type HttpError,
  buildQueryString,
  httpClient,
} from '@wharf-gaming/http-client';
import {
  MarketListing,
  MarketListingGrouped,
  MarketListingType,
  MarketRental,
  MarketRentalType,
  PlayerCard,
  type Card,
} from '@wharf-gaming/splinterlands-models';

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

interface MarketQueryParams {
  cardDetailId: number;
  type?: MarketListingType;
  gold?: boolean;
  rentalType?: MarketRentalType;
  edition?: string;
  sort?: string;
  level?: number;
  limit?: number;
  minLevel?: number;
  maxLevel?: number;
}

interface MarketActiveRentalsParams {
  owner: string;
  offset?: number;
  limit?: number;
}

export interface SplinterlandsApiClient {
  getCardDetails(): Promise<Card[] | HttpError>;

  getMarketForSaleGrouped(): Promise<MarketListingGrouped[] | HttpError>;

  getMarketForRentGrouped(): Promise<MarketListingGrouped[] | HttpError>;

  getMarketQueryByCard(
    requestParams: MarketQueryParams,
  ): Promise<MarketListing[] | HttpError>;

  getMarketActiveRentals(
    requestParams: MarketActiveRentalsParams,
  ): Promise<MarketRental[] | HttpError>;

  getPlayerCardCollection(player: string): Promise<PlayerCard[] | HttpError>;
}

export function createSplinterlandsApiClient(
  httpClient: HttpClient,
): SplinterlandsApiClient {
  return {
    getCardDetails: async () => {
      try {
        const response = await httpClient.request<Card[]>({
          method: 'GET',
          url: `${splinterlandsApiBase}${SplinterlandsApiRoutes.cardDetails}`,
        });

        return response;
      } catch (error) {
        return error as HttpError;
      }
    },

    getMarketForSaleGrouped: async () => {
      try {
        const response = await httpClient.request<MarketListingGrouped[]>({
          method: 'GET',
          url: `${splinterlandsApiBase}${SplinterlandsApiRoutes.marketForSaleGrouped}`,
        });

        return response;
      } catch (error) {
        return error as HttpError;
      }
    },

    getMarketForRentGrouped: async () => {
      try {
        const response = await httpClient.request<MarketListingGrouped[]>({
          method: 'GET',
          url: `${splinterlandsApiBase}${SplinterlandsApiRoutes.marketForRentGrouped}`,
        });

        return response;
      } catch (error) {
        return error as HttpError;
      }
    },

    getMarketQueryByCard: async (requestParams) => {
      try {
        const queryString = buildQueryString(requestParams, {
          cardDetailId: 'card_detail_id',
          rentalType: 'rental_type',
          minLevel: 'min_level',
          maxLevel: 'max_level',
        });

        const response = await httpClient.request<MarketListing[]>({
          method: 'GET',
          url: `${splinterlandsApiBase}${SplinterlandsApiRoutes.marketQueryByCard}?${queryString}`,
        });

        return response;
      } catch (error) {
        return error as HttpError;
      }
    },

    getMarketActiveRentals: async (requestParams) => {
      try {
        const queryString = buildQueryString(requestParams);

        const response = await httpClient.request<MarketRental[]>({
          method: 'GET',
          url: `${splinterlandsApiBase}${SplinterlandsApiRoutes.marketActiveRentals}?${queryString}`,
        });

        return response;
      } catch (error) {
        return error as HttpError;
      }
    },

    getPlayerCardCollection: async (player) => {
      try {
        const response = await httpClient.request<PlayerCard[]>({
          method: 'GET',
          url: `${splinterlandsApiBase}${SplinterlandsApiRoutes.playerCardCollection}/${player}`,
        });

        return response;
      } catch (error) {
        return error as HttpError;
      }
    },
  };
}

export const splinterlandsApiClient = createSplinterlandsApiClient(httpClient);
