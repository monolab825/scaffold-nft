"use client";

import { AddressCard } from "./NftCardValue/AddressCard";
import { CollectionNameCard } from "./NftCardValue/CollectionNameCard";
import { CollectionSymbolCard } from "./NftCardValue/CollectionSymbolCard";
import { ScaffoldToken } from "~~/types/ScaffoldToken";

type Props = {
  token?: ScaffoldToken;
  value?: string;
  prettyLoad?: {
    collection?: boolean;
    components?: {
      collectionName?: boolean;
      collectionSymbol?: boolean;
    };
  };
  style?: "rounded";
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

export const CollectionDetails = ({ token, prettyLoad, style = "rounded", showDescriptors }: Props) => {
  const component = (
    <>
      {showDescriptors?.detailsDescriptor ? <p className="text-center">Collection Details</p> : <></>}

      <div className="flex flex-wrap justify-center">
        <AddressCard
          value={token?.contract?.address}
          showDescriptor={showDescriptors?.componentsDescriptor?.address}
          bgColor="bg-base-100"
        />
        <CollectionNameCard
          value={token?.collectionName}
          prettyLoad={prettyLoad?.components?.collectionName}
          showDescriptor={showDescriptors?.componentsDescriptor?.collectionName}
          descriptorText="Name"
          bgColor="bg-base-100"
        />
        <CollectionSymbolCard
          value={token?.collectionSymbol}
          prettyLoad={prettyLoad?.components?.collectionSymbol}
          showDescriptor={showDescriptors?.componentsDescriptor?.collectionSymbol}
          descriptorText="Symbol"
          bgColor="bg-base-100"
        />
        <CollectionSymbolCard />
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
