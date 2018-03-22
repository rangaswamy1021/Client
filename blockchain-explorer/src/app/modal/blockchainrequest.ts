export interface BlockChainRequest {
    bcVersion: string;
    gasPrice: string;
    hashRate: string;
    numBlocks: number;
    subscriberCount: number;
    transactionCount: number;
    account: string;
    balance: string;
}