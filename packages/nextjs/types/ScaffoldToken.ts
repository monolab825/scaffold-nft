export type ScaffoldToken = {
  address?: string;
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
