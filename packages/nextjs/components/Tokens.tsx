"use client";

import React from "react";
import "react-dropdown/style.css";
import { NftCard } from "~~/components/nft-card/NftCard";

type Props = {
  tokens: any;
  isLoading: any;
  isError: any;
  renderOrder: any;
};

export const Tokens = ({ tokens, isLoading, isError, renderOrder }: Props) => {
  const tokensComponents = tokens.map((token: any, index: number) => {
    return <NftCard key={index} token={token} renderOrder={renderOrder} />;
  });

  let mainContent;
  if (isLoading) {
    mainContent = <p>Loading...</p>;
  } else {
    if (isError) {
      mainContent = <p>There was an error. Please try changing the advanced settings.</p>;
    } else {
      mainContent = tokensComponents;
    }
  }
  return (
    <div className="flex flex-wrap justify-center m-1 p-1 bg-base-100 rounded lg:max-w-[1300px]">{mainContent}</div>
  );
};
