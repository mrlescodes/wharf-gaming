import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from '@effect/platform';
import { Context, Effect, Layer } from 'effect';

import {
  CardDetailsResponse,
  PlayerCardCollectionResponse,
  transformCardDetailsResponse,
  transformPlayerCardCollectionResponse,
} from '.';

const makeSplinterlandsAPIService = Effect.gen(function* (_) {
  const defaultClient = yield* _(HttpClient.HttpClient);

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
        const response = yield* _(client.get('/cards/get_details'));

        const validatedResponse = yield* _(
          HttpClientResponse.schemaBodyJson(CardDetailsResponse)(response),
        );

        return transformCardDetailsResponse(validatedResponse);
      }).pipe(Effect.scoped),

    /**
     * Undocumented
     */
    getPlayerCardCollection: (player: string) =>
      Effect.gen(function* () {
        const response = yield* _(client.get(`/cards/collection/${player}`));

        const validatedResponse = yield* _(
          HttpClientResponse.schemaBodyJson(PlayerCardCollectionResponse)(
            response,
          ),
        );

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
