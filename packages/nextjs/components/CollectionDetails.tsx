"use client";

import { ComponentType } from "react";
import { AddressCard } from "./NftCardValue/AddressCard";
import { AddressCardProps } from "./NftCardValue/AddressCard";
import { CollectionNameCard } from "./NftCardValue/CollectionNameCard";
import { CollectionNameCardProps } from "./NftCardValue/CollectionNameCard";
import { CollectionSymbolCard } from "./NftCardValue/CollectionSymbolCard";
import { CollectionSymbolCardProps } from "./NftCardValue/CollectionSymbolCard";
import { Style, styleMap } from "./NftCardValue/Types";
import { ScaffoldToken } from "~~/types/ScaffoldToken";

export type CollectionDetailsProps = {
  token?: ScaffoldToken;
  value?: string;
  prettyLoad?: boolean;
  style?: Style;
  showDescriptor?: boolean;
  renderOrder?: ("Address" | "CollectionName" | "CollectionSymbol")[];
  AddressCard?: ComponentType<AddressCardProps>;
  CollectionNameCard?: ComponentType<CollectionNameCardProps>;
  CollectionSymbolCard?: ComponentType<CollectionSymbolCardProps>;

  showDescriptors?: {
    detailsDescriptor?: boolean;
    componentsDescriptor?: {
      address?: boolean;
      collectionName?: boolean;
      collectionSymbol?: boolean;
    };
  };
};

const AddressCardComponent = (props: AddressCardProps) => {
  return <AddressCard {...props} />;
};

const CollectionNameCardComponent = (props: CollectionNameCardProps) => {
  return <CollectionNameCard {...props} />;
};

const CollectionSymbolCardComponent = (props: CollectionSymbolCardProps) => {
  return <CollectionSymbolCard {...props} />;
};

export const CollectionDetails = ({
  token,
  prettyLoad,
  style = "rounded",
  showDescriptor,

  renderOrder = ["Address", "CollectionName", "CollectionSymbol"],
  AddressCard = AddressCardComponent,
  CollectionNameCard = CollectionNameCardComponent,
  CollectionSymbolCard = CollectionSymbolCardComponent,
}: CollectionDetailsProps) => {
  const renderedComponents: any = [];

  for (let i = 0; i < renderOrder.length; i++) {
    if (renderOrder[i] === "Address") {
      renderedComponents.push(
        <AddressCard key={i} value={token?.contract?.address} showDescriptor={true} bgColor="bg-base-100" />,
      );
    } else if (renderOrder[i] === "CollectionName") {
      renderedComponents.push(
        <CollectionNameCard
          key={i}
          value={token?.collectionName}
          showDescriptor={true}
          bgColor="bg-base-100"
          descriptorText="Name"
        />,
      );
    } else if (renderOrder[i] === "CollectionSymbol") {
      renderedComponents.push(
        <CollectionSymbolCard
          key={i}
          value={token?.collectionSymbol}
          showDescriptor={true}
          bgColor="bg-base-100"
          descriptorText="Symbol"
        />,
      );
    }
  }

  const component = (
    <>
      {showDescriptor ? <p className="text-center">Collection Details</p> : <></>}
      <div className="flex flex-wrap justify-center">{renderedComponents}</div>
    </>
  );

  let output;

  if (prettyLoad) {
    output =
      token?.collectionName !== undefined &&
      token?.collectionSymbol !== undefined &&
      token?.contract?.address !== undefined ? (
        component
      ) : (
        <p>Loading...</p>
      );
  } else {
    output = component;
  }

  console.log(style);

  return <div className={`bg-base-200 ${styleMap[style]} p-2 m-2 max-w-3xl`}>{output}</div>;
};
