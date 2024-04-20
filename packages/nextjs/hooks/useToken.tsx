"use client";

import { useFetch } from "usehooks-ts";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const replacement = {
  ipfs: "https://ipfs.io/ipfs/",
  nftstorage: "https://nftstorage.link/ipfs/",
};

export const useToken = (tokenId: bigint, replacementType: "ipfs" | "nftstorage" = "ipfs") => {
  const { data: tokenURI } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "tokenURI",
    args: [tokenId],
  });

  const formattedURI = tokenURI?.replace("ipfs://", replacement[replacementType]);

  const { data: result } = useFetch<any>(formattedURI);

  result ? (result.image = result?.image?.replace("ipfs://", replacement[replacementType])) : <></>;

  return result;
};
