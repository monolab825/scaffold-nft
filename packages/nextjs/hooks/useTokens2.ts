import { useEffect } from "react";
import { useState } from "react";
import { erc721Abi } from "viem";
import * as allChains from "viem/chains";
import { usePublicClient } from "wagmi";

export type replacementType = "ipfs" | "nftstorage" | "w3s";

const replacement = {
  ipfs: "https://ipfs.io/ipfs/",
  nftstorage: "https://nftstorage.link/ipfs/",
  w3s: "https://w3s.link/ipfs/",
};

export const useTokens = (chainName: string, address: string, tokenIds: bigint[], replacementType: string) => {
  const chain = allChains[chainName as keyof typeof allChains];
  const selectedChain = chain;
  const publicClient = usePublicClient({ chainId: selectedChain?.id });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [collection, setCollection] = useState<any>(undefined);

  useEffect(() => {
    async function get() {
      setIsLoading(true);
      setIsError(false);

      try {
        const collectionName = await publicClient?.readContract({
          address,
          abi: erc721Abi,
          functionName: "name",
        });

        const collectionSymbol = await publicClient?.readContract({
          address,
          abi: erc721Abi,
          functionName: "symbol",
        });

        const arr = [];

        for (let i = 0; i < tokenIds.length; i++) {
          const tokenURI = await publicClient?.readContract({
            address,
            abi: erc721Abi,
            functionName: "tokenURI",
            args: [tokenIds[i]],
          });

          console.log(tokenURI);

          const tokenURIFormatted = tokenURI?.replace("ipfs://", replacement[replacementType as replacementType]);

          const metadata = await fetch(tokenURIFormatted!);
          const metadataJson = await metadata.json();
          metadataJson.image = metadataJson.image.replace("ipfs://", replacement[replacementType as replacementType]);

          const token = {} as any;
          token.address = address;
          token.metadata = metadataJson;
          token.id = tokenIds[i];
          token.uri = tokenURIFormatted;
          token.collectionName = collectionName;
          token.collectionSymbol = collectionSymbol;
          arr.push(token);
        }

        const collection = {} as any;
        collection.tokens = arr;
        collection.address = address;
        collection.symbol = collectionSymbol;
        collection.name = collectionName;

        setCollection(collection);
      } catch (e) {
        console.log(e);
        setIsError(true);
      }

      setIsLoading(false);
    }
    get();
  }, [publicClient?.account, tokenIds]);

  return { collection, isLoading, isError };
};
