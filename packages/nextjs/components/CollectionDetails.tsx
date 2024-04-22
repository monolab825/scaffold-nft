"use client";

import { ComponentType } from "react";
import { AddressCard } from "./NftCardValue/AddressCard";
import { AddressCardProps } from "./NftCardValue/AddressCard";
import { CollectionNameCard } from "./NftCardValue/CollectionNameCard";
import { CollectionNameCardProps } from "./NftCardValue/CollectionNameCard";
import { CollectionSymbolCard } from "./NftCardValue/CollectionSymbolCard";
import { CollectionSymbolCardProps } from "./NftCardValue/CollectionSymbolCard";
import { ScaffoldToken } from "~~/types/ScaffoldToken";

export type CollectionDetailsProps = {
  token?: ScaffoldToken;
  value?: string;
  prettyLoad?: boolean;
  style?: "rounded";
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

const styleMap = {
  rounded: "rounded-lg",
};

const AddressCardComponent = (props: AddressCardProps) => {
  return <AddressCard {...props} showDescriptor={true} bgColor="bg-base-100" />;
};

const CollectionNameCardComponent = (props: CollectionNameCardProps) => {
  return <CollectionNameCard {...props} showDescriptor={true} bgColor="bg-base-100" descriptorText="Name" />;
};

const CollectionSymbolCardComponent = (props: CollectionSymbolCardProps) => {
  return <CollectionSymbolCard {...props} showDescriptor={true} bgColor="bg-base-100" descriptorText="Symbol" />;
};

export const CollectionDetails = ({
  token,
  prettyLoad,
  style = "rounded",
  showDescriptors,
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
        <AddressCard
          value={token?.contract?.address}
          showDescriptor={showDescriptors?.componentsDescriptor?.address}
          bgColor="bg-base-100"
        />,
      );
    } else if (renderOrder[i] === "CollectionName") {
      renderedComponents.push(
        <CollectionNameCard
          value={token?.collectionName}
          // prettyLoad={prettyLoad?.components?.collectionName}
          showDescriptor={showDescriptors?.componentsDescriptor?.collectionName}
          descriptorText="Name"
          bgColor="bg-base-100"
        />,
      );
    } else if (renderOrder[i] === "CollectionSymbol") {
      renderedComponents.push(
        <CollectionSymbolCard
          value={token?.collectionSymbol}
          // prettyLoad={prettyLoad?.components?.collectionSymbol}
          showDescriptor={showDescriptors?.componentsDescriptor?.collectionSymbol}
          descriptorText="Symbol"
          bgColor="bg-base-100"
        />,
      );
    }
  }

  const component = (
    <>
      {showDescriptor ? <p className="text-center">Collection Details</p> : <></>}

      <div className="flex flex-wrap justify-center">
        {renderedComponents}
        {/* <AddressCard
          value={token?.contract?.address}
          showDescriptor={showDescriptors?.componentsDescriptor?.address}
          bgColor="bg-base-100"
        />
        <CollectionNameCard
          value={token?.collectionName}
          // prettyLoad={prettyLoad?.components?.collectionName}
          showDescriptor={showDescriptors?.componentsDescriptor?.collectionName}
          descriptorText="Name"
          bgColor="bg-base-100"
        />
        <CollectionSymbolCard
          value={token?.collectionSymbol}
          // prettyLoad={prettyLoad?.components?.collectionSymbol}
          showDescriptor={showDescriptors?.componentsDescriptor?.collectionSymbol}
          descriptorText="Symbol"
          bgColor="bg-base-100"
        /> */}
      </div>
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

  console.log(showDescriptors);

  return <div className={`bg-base-200 ${styleMap[style]} p-2 m-2 max-w-3xl`}>{output}</div>;
};
