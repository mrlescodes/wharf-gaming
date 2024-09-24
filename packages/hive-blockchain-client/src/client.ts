import { Client as HiveClient, PrivateKey } from '@hiveio/dhive';

export interface BlockchainOperation {
  id: string;
  json: string;
  required_auths: string[];
  required_posting_auths: string[];
}

export type BlockchainTransactionConfirmation = {
  id: string;
  block_num: number;
  trx_num: number;
  expired: boolean;
};

export type BlockchainError =
  | { type: 'BLOCKCHAIN_ERROR'; error: Error }
  | { type: 'TRANSACTION_ERROR'; error: Error; details?: any };

export interface BlockchainClient {
  broadcastOperation(
    operation: BlockchainOperation,
    privateKey: string,
    errMsg: string,
  ): Promise<BlockchainTransactionConfirmation | BlockchainError>;
}

export const createBlockchainClient = (client: HiveClient) => {
  return {
    broadcastOperation: async (
      operation: BlockchainOperation,
      keyString: string,
      errMsg: string,
    ): Promise<BlockchainTransactionConfirmation | BlockchainError> => {
      try {
        const privateKey = PrivateKey.fromString(keyString);

        return await client.broadcast.json(operation, privateKey);
      } catch (error) {
        return {
          type: 'TRANSACTION_ERROR',
          error: error as Error,
          details: errMsg,
        };
      }
    },
  };
};

const hiveClient = new HiveClient([
  'https://api.hive.blog',
  'https://api.hivekings.com',
  'https://anyx.io',
  'https://api.openhive.network',
]);

export const blockchainClient = createBlockchainClient(hiveClient);
