export type ScaffoldToken = {
  contract?: any;
  collectionName?: string;
  collectionSymbol?: string;
  id?: bigint;
  uri?: string;
  metadata?: {
    name?: string;
    description?: string;
    image?: string;
    attributes?: any[];
  };
};
