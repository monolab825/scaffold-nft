import { useEffect } from "react";
import { useState } from "react";
import { erc721Abi } from "viem";
import * as allChains from "viem/chains";
import { usePublicClient } from "wagmi";
import { createConfig, http } from "wagmi";

export type replacementType = "ipfs" | "nftstorage" | "w3s";

const replacement = {
  ipfs: "https://ipfs.io/ipfs/",
  nftstorage: "https://nftstorage.link/ipfs/",
  w3s: "https://w3s.link/ipfs/",
};

export const useTokens = (
  chainName: string,
  address: string,
  tokenIds: bigint[],
  replacementType: string,
  loadType = "link",
) => {
  const chain = allChains[chainName as keyof typeof allChains];

  const config = createConfig({
    chains: [chain],
    transports: {
      [chain.id]: http(),
    } as any,
  });

  console.log(chain.id);

  const publicClient = usePublicClient({ chainId: chain.id, config });

  console.log(publicClient);

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

        //const balanceOf =
        await publicClient?.readContract({
          address,
          abi: erc721Abi,
          functionName: "balanceOf",
          args: ["0xAD10ec43441927C72D0f55bD495fDc762802a2Bb"],
        });

        const arr = [];

        for (let i = 0; i < tokenIds.length; i++) {
          const tokenURI = await publicClient?.readContract({
            address,
            abi: erc721Abi,
            functionName: "tokenURI",
            args: [tokenIds[i]],
          });

          let jsonMetadata;
          let uri;

          if (loadType === "base64") {
            const data = Buffer.from(tokenURI!.substring(29), "base64").toString();
            const parsedJson = JSON.parse(data);
            jsonMetadata = parsedJson;
          } else if (loadType === "link") {
            const tokenURIFormatted = tokenURI?.replace("ipfs://", replacement[replacementType as replacementType]);
            const metadata = await fetch(tokenURIFormatted!);
            const metadataJson = await metadata.json();
            metadataJson.image = metadataJson.image.replace("ipfs://", replacement[replacementType as replacementType]);
            jsonMetadata = metadataJson;
            uri = tokenURIFormatted;
          }

          const token = {} as any;
          token.address = address;
          token.metadata = jsonMetadata;
          token.id = tokenIds[i];
          token.uri = uri;
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
