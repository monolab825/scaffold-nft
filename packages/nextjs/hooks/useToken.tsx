"use client";

import { useFetch } from "usehooks-ts";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const replacement = {
  ipfs: "https://ipfs.io/ipfs/",
  nftstorage: "https://nftstorage.link/ipfs/",
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
  token.collectionName = collectionName;
  token.collectionSymbol = collectionSymbol;
  return token;
};
