import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from '@effect/platform';
import { Context, Effect, Layer } from 'effect';

import {
  MarketListingType,
  MarketRentalType,
} from '@wharf-gaming/splinterlands-models';

import {
  buildQueryString,
  CardDetailsResponse,
  MarketQueryByCardResponse,
  PlayerCardCollectionResponse,
  transformCardDetailsResponse,
  transformMarketQueryByCardResponse,
  transformPlayerCardCollectionResponse,
} from '.';

const makeSplinterlandsAPIService = Effect.gen(function* () {
  const defaultClient = yield* HttpClient.HttpClient;

  const client = defaultClient.pipe(
    HttpClient.mapRequest(
      HttpClientRequest.prependUrl('https://api2.splinterlands.com'),
    ),
  );

  return {
    /**
     * Documentation
     *
     * @see https://api2.splinterlands.com/doc/#/default/get_cards_get_details
     */
    getCardDetails: () =>
      Effect.gen(function* () {
        const response = yield* client.get('/cards/get_details');

        const validatedResponse =
          yield* HttpClientResponse.schemaBodyJson(CardDetailsResponse)(
            response,
          );

        return transformCardDetailsResponse(validatedResponse);
      }).pipe(Effect.scoped),

    /**
     * Documentation
     *
     * @see https://api2.splinterlands.com/doc/#/default/get_market_market_query_by_card
     */
    getMarketQueryByCard: (requestParams: {
      cardDetailId: number;
      level?: number;
      gold?: boolean;
      type?: MarketListingType;
      rentalType?: MarketRentalType;
    }) =>
      Effect.gen(function* () {
        const paramMapping = {
          cardDetailId: 'card_detail_id',
          rentalType: 'rental_type',
        };

        const queryString = buildQueryString(requestParams, paramMapping);

        const response = yield* client.get(
          `/market/market_query_by_card?${queryString.toString()}`,
        );

        const validatedResponse = yield* HttpClientResponse.schemaBodyJson(
          MarketQueryByCardResponse,
        )(response);

        return transformMarketQueryByCardResponse(validatedResponse);
      }).pipe(Effect.scoped),

    /**
     * Undocumented
     */
    getPlayerCardCollection: (player: string) =>
      Effect.gen(function* () {
        const response = yield* client.get(`/cards/collection/${player}`);

        const validatedResponse = yield* HttpClientResponse.schemaBodyJson(
          PlayerCardCollectionResponse,
        )(response);

        return transformPlayerCardCollectionResponse(validatedResponse);
      }).pipe(Effect.scoped),
  };
});

export class SplinterlandsAPIService extends Context.Tag(
  'SplinterlandsAPIService',
)<
  SplinterlandsAPIService,
  Effect.Effect.Success<typeof makeSplinterlandsAPIService>
>() {
  static readonly Live = Layer.effect(
    SplinterlandsAPIService,
    makeSplinterlandsAPIService,
  ).pipe(Layer.provide(FetchHttpClient.layer));
}
