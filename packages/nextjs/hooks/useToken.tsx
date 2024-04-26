"use client";

import { useCallback, useEffect, useState } from "react";
import { useFetch } from "usehooks-ts";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const replacement = {
  ipfs: "https://ipfs.io/ipfs/",
  nftstorage: "https://nftstorage.link/ipfs/",
};

function useFetches(uris: string[]) {
  const [responses, setResponses] = useState<any[]>([]);

  const refetch = useCallback(async () => {
    const arr = [];
    for (let i = 0; i < uris.length; i++) {
      const response = await fetch(uris[i]);
      const responseJson = await response.json();
      arr.push(responseJson);
    }

    setResponses([...arr]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uris.length]);

  useEffect(() => {
    async function get() {
      await refetch();
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uris.length, refetch]);

  return { responses, refetch };
}

export function useUris(contract: any, tokenIds: bigint[]) {
  const [uris, setUris] = useState<string[]>([]);

  const refetch = useCallback(async () => {
    if (!contract) return;

    const arr = [];
    for (let i = 0; i < tokenIds.length; i++) {
      const result = await contract.read.tokenURI([tokenIds[i]]);
      arr.push(result);
    }

    setUris([...arr]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.address, tokenIds.length, uris.length]);

  useEffect(() => {
    async function get() {
      await refetch();
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.address, tokenIds.length, uris.length, refetch]);

  return { uris, setUris, refetch };
}

export const useTokens = (tokenIds: bigint[], replacementType: "ipfs" | "nftstorage" = "ipfs") => {
  const { data: scaffoldErc721 } = useScaffoldContract({ contractName: "ScaffoldERC721" });

  const { data: collectionName } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "name",
  });

  const { data: collectionSymbol } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "symbol",
  });

  const { uris } = useUris(scaffoldErc721, tokenIds);

  for (let i = 0; i < uris.length; i++) {
    uris[i] = uris[i].replace("ipfs://", replacement[replacementType]);
  }

  const { responses } = useFetches(uris);

  const tokens: any[] = [];
  for (let i = 0; i < responses.length; i++) {
    responses[i] ? (responses[i].image = responses[i].image.replace("ipfs://", replacement[replacementType])) : <></>;

    const token = {} as any;
    token.contract = scaffoldErc721;
    token.metadata = responses[i];
    token.id = tokenIds[i];
    token.uri = uris[i];
    token.collectionName = collectionName;
    token.collectionSymbol = collectionSymbol;
    tokens.push(token);
  }

  return tokens;
};

export const useToken = (tokenId: bigint, replacementType: "ipfs" | "nftstorage" = "ipfs") => {
  const { data: scaffoldErc721 } = useScaffoldContract({ contractName: "ScaffoldERC721" });

  const { data: tokenURI } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "tokenURI",
    args: [tokenId],
  });

  const { data: collectionName } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "name",
  });

  const { data: collectionSymbol } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "symbol",
  });

  const formattedURI = tokenURI?.replace("ipfs://", replacement[replacementType]);

  const { data: result } = useFetch<any>(formattedURI);

  result ? (result.image = result?.image?.replace("ipfs://", replacement[replacementType])) : <></>;

  const token = {} as any;
  token.contract = scaffoldErc721;
  token.metadata = result;
  token.id = tokenId;
  token.uri = formattedURI;
  token.collectionName = collectionName;
  token.collectionSymbol = collectionSymbol;

  return token;
};
