"use client";

import { AddressCard } from "./NftCardValue/AddressCard";
import { AttributesCard } from "./NftCardValue/AttributesCard";
import { CollectionNameCard } from "./NftCardValue/CollectionNameCard";
import { CollectionSymbolCard } from "./NftCardValue/CollectionSymbolCard";
import { DescriptionCard } from "./NftCardValue/DescriptionCard";
import { IdCard } from "./NftCardValue/IdCard";
import { ImageCard } from "./NftCardValue/ImageCard";
import { NameCard } from "./NftCardValue/NameCard";

type Props = {
  token?: {
    contract?: any;
    collectionName?: string;
    collectionSymbol?: string;
    id?: bigint;
    uri?: string;
    metadata?: {
      name?: string;
      description?: string;
      image?: string;
      attributes?: any[];
    };
  };
  prettyLoad?: {
    card?: boolean;
    values?: {
      name?: boolean;
      description?: boolean;
      image?: boolean;
      attributes?: boolean;
      collectionName?: boolean;
      collectionSymbol?: boolean;
      id?: boolean;
    };
  };
  renderOrder?: (
    | "Image"
    | "Name"
    | "Description"
    | "Attributes"
    | "Address"
    | "CollectionName"
    | "CollectionSymbol"
    | "Id"
  )[];
  size?: "base";
  showComponentDescriptors?: {
    image?: boolean;
    name?: boolean;
    description?: boolean;
    attributes?: boolean;
    address?: boolean;
    collectionName?: boolean;
    collectionSymbol?: boolean;
    id?: boolean;
  };
};

const loadingSizeMap = {
  base: "text-8xl",
};

// const sizeMap = {
//   base: "w-[700px] h-[700px]",
// };

export const NftCard = ({
  token,
  prettyLoad,
  renderOrder = ["Image", "Name", "Description", "Attributes", "CollectionName", "CollectionSymbol", "Id", "Address"],
  size = "base",
  showComponentDescriptors = {
    image: false,
    name: true,
    description: true,
    attributes: true,
    address: true,
    collectionName: true,
    collectionSymbol: true,
    id: true,
  },
}: Props) => {
  const components = [];

  for (let i = 0; i < renderOrder.length; i++) {
    if (renderOrder[i] === "Image") {
      components.push(
        <div key={i}>
          <ImageCard
            value={token?.metadata?.image}
            prettyLoad={prettyLoad?.values?.image}
            showDescriptor={showComponentDescriptors.image}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Name") {
      components.push(
        <div key={i}>
          <NameCard
            value={token?.metadata?.name}
            prettyLoad={prettyLoad?.values?.name}
            showDescriptor={showComponentDescriptors.name}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Description") {
      components.push(
        <div key={i}>
          <DescriptionCard
            value={token?.metadata?.description}
            prettyLoad={prettyLoad?.values?.description}
            showDescriptor={showComponentDescriptors.description}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Attributes") {
      components.push(
        <div key={i}>
          <AttributesCard
            value={token?.metadata?.attributes}
            prettyLoad={prettyLoad?.values?.attributes}
            showDescriptor={showComponentDescriptors.attributes}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Address") {
      components.push(
        <div key={i}>
          <AddressCard value={token?.contract?.address} showDescriptor={showComponentDescriptors.address} />
        </div>,
      );
    }

    if (renderOrder[i] === "CollectionName") {
      components.push(
        <div key={i}>
          <CollectionNameCard
            value={token?.collectionName}
            prettyLoad={prettyLoad?.values?.collectionName}
            showDescriptor={showComponentDescriptors.collectionName}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "CollectionSymbol") {
      components.push(
        <div key={i}>
          <CollectionSymbolCard
            value={token?.collectionSymbol}
            prettyLoad={prettyLoad?.values?.collectionSymbol}
            showDescriptor={showComponentDescriptors.collectionSymbol}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Id") {
      components.push(
        <div key={i}>
          <IdCard
            value={token?.id}
            uri={token?.uri}
            prettyLoad={prettyLoad?.values?.id}
            showDescriptor={showComponentDescriptors.id}
          />
        </div>,
      );
    }
  }

  let cardContent;

  if (prettyLoad?.card) {
    if (
      token?.metadata?.image === undefined ||
      token?.metadata?.name === undefined ||
      token?.metadata?.description === undefined ||
      token?.metadata?.attributes === undefined ||
      token?.collectionName === undefined ||
      token?.collectionSymbol === undefined ||
      token?.contract === undefined ||
      token?.id === undefined
    ) {
      cardContent = <p className={`${loadingSizeMap[size]}`}>Loading NFT...</p>;
    } else {
      cardContent = components;
    }
  } else {
    cardContent = components;
  }

  return <div className="flex flex-col items-center bg-base-300">{cardContent}</div>;

  //   return (
  //     <div
  //       className={`flex flex-col items-center align-top justify-center rounded-2xl bg-base-300 ${/*sizeMap[size]*/ ""}`}
  //     >
  //       {cardContent}
  //     </div>
  //   );
};
