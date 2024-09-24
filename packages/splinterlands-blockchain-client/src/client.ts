import {
  BlockchainTransactionConfirmation,
  BlockchainError,
  BlockchainClient,
  blockchainClient,
} from '@wharf-gaming/hive-blockchain-client';

interface PurchaseCardsParams {
  items: string[];
  price: number;
  username: string;
  activeKey: string;
}

interface ListCardsForSaleParams {
  cards: string[];
  price: number;
  username: string;
  activeKey: string;
}

interface CancelSaleListingsParams {
  items: string[];
  username: string;
  activeKey: string;
}

interface ListCardsForRentParams {
  cards: [string, number][];
  username: string;
  postingKey: string;
}

interface UpdateRentalPricesParams {
  items: [string, number][];
  username: string;
  postingKey: string;
}

interface CancelRentalListingsParams {
  items: string[];
  username: string;
  postingKey: string;
}

export interface SplinterlandsBlockchainClient {
  purchaseCards(
    params: PurchaseCardsParams,
  ): Promise<BlockchainTransactionConfirmation | BlockchainError>;

  listCardsForSale(
    params: ListCardsForSaleParams,
  ): Promise<BlockchainTransactionConfirmation | BlockchainError>;

  cancelSaleListings(
    params: CancelSaleListingsParams,
  ): Promise<BlockchainTransactionConfirmation | BlockchainError>;

  listCardsForRent(
    params: ListCardsForRentParams,
  ): Promise<BlockchainTransactionConfirmation | BlockchainError>;

  updateRentalPrices(
    params: UpdateRentalPricesParams,
  ): Promise<BlockchainTransactionConfirmation | BlockchainError>;

  cancelRentalListings(
    params: CancelRentalListingsParams,
  ): Promise<BlockchainTransactionConfirmation | BlockchainError>;
}

export function createSplinterlandsBlockchainClient(client: BlockchainClient) {
  return {
    purchaseCards: async ({ items, price, username, activeKey }) => {
      const operation = {
        id: 'sm_market_purchase',
        json: JSON.stringify({
          items,
          price,
          currency: 'DEC',
          market: 'wharf-gaming',
          app: 'wharf-gaming',
        }),
        required_auths: [username],
        required_posting_auths: [],
      };

      return client.broadcastOperation(
        operation,
        activeKey,
        'Failed to purchase card',
      );
    },

    listCardsForSale: async ({ cards, price, username, activeKey }) => {
      const operation = {
        id: 'sm_sell_cards',
        json: JSON.stringify({
          cards,
          price,
          currency: 'USD',
          list_fee: 1,
          list_fee_token: 'DEC',
        }),
        required_auths: [username],
        required_posting_auths: [],
      };

      return client.broadcastOperation(
        operation,
        activeKey,
        'Failed to list cards for sale',
      );
    },

    cancelSaleListings: async ({ items, username, activeKey }) => {
      const operation = {
        id: 'sm_cancel_sell',
        json: JSON.stringify({ trx_ids: items }),
        required_auths: [username],
        required_posting_auths: [],
      };

      return client.broadcastOperation(
        operation,
        activeKey,
        'Failed to cancel sell listings',
      );
    },

    listCardsForRent: async ({ cards, username, postingKey }) => {
      const operation = {
        id: 'sm_market_list',
        json: JSON.stringify({
          cards,
          type: 'rent',
          fee: 500,
          list_fee: 1,
          list_fee_token: 'DEC',
        }),
        required_auths: [],
        required_posting_auths: [username],
      };

      return client.broadcastOperation(
        operation,
        postingKey,
        'Failed to list cards for rent',
      );
    },

    updateRentalPrices: async ({ items, username, postingKey }) => {
      const operation = {
        id: 'sm_update_rental_price',
        json: JSON.stringify({
          items,
          list_fee: 1,
          list_fee_token: 'DEC',
        }),
        required_auths: [],
        required_posting_auths: [username],
      };

      return client.broadcastOperation(
        operation,
        postingKey,
        'Failed to update rental prices',
      );
    },

    cancelRentalListings: async ({ items, username, postingKey }) => {
      const operation = {
        id: 'sm_market_cancel_rental',
        json: JSON.stringify({ items }),
        required_auths: [],
        required_posting_auths: [username],
      };

      return client.broadcastOperation(
        operation,
        postingKey,
        'Failed to cancel rental listings',
      );
    },
  } satisfies SplinterlandsBlockchainClient;
}

export const splinterlandsBlockchainClient =
  createSplinterlandsBlockchainClient(blockchainClient);
