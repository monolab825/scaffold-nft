import { useEffect } from "react";
import { useState } from "react";
import { erc721Abi } from "viem";
import * as allChains from "viem/chains";
import { usePublicClient } from "wagmi";

const replacement = {
  ipfs: "https://ipfs.io/ipfs/",
  nftstorage: "https://nftstorage.link/ipfs/",
  w3s: "https://w3s.link/ipfs/",
};

export const useTokens = (
  chainName: string,
  address: string,
  tokenIds: bigint[],
  replacementType: "ipfs" | "nftstorage" | "w3s" = "ipfs",
) => {
  const chain = allChains[chainName as keyof typeof allChains];
  const selectedChain = chain;
  const publicClient = usePublicClient({ chainId: selectedChain?.id });

  const [isLoading, setIsLoading] = useState(false);

  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    async function get() {
      setIsLoading(true);

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

          const tokenURIFormatted = tokenURI?.replace("ipfs://", replacement[replacementType]);
          const metadata = await fetch(tokenURIFormatted!);
          const metadataJson = await metadata.json();
          metadataJson.image = metadataJson.image.replace("ipfs://", replacement[replacementType]);

          const token = {} as any;
          token.address = address;
          token.metadata = metadataJson;
          token.id = tokenIds[i];
          token.uri = tokenURIFormatted;
          token.collectionName = collectionName;
          token.collectionSymbol = collectionSymbol;
          arr.push(token);
        }

        setTokens([...arr]);
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    }
    get();
  }, [publicClient?.account, tokenIds]);

  return { tokens, isLoading };
};
