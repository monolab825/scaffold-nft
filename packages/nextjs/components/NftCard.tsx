"use client";

import { ComponentType, ReactElement } from "react";
import { CollectionDetails } from "./CollectionDetails";
import { AddressCard } from "./NftCardValue/AddressCard";
import { AttributesCard } from "./NftCardValue/AttributesCard";
import { CollectionNameCard } from "./NftCardValue/CollectionNameCard";
import { CollectionSymbolCard } from "./NftCardValue/CollectionSymbolCard";
import { DescriptionCard } from "./NftCardValue/DescriptionCard";
import { IdCard } from "./NftCardValue/IdCard";
import { ImageCard } from "./NftCardValue/ImageCard";
import { NameCard, NameCardProps } from "./NftCardValue/NameCard";
import { ScaffoldToken } from "~~/types/ScaffoldToken";

type Props = {
  token?: ScaffoldToken;
  // components?: {
  //   value?: any;
  //   prettyLoad?: any;
  //   showDescriptor?: any;
  // }[];

  prettyLoad?: {
    card?: boolean;
    values?: {
      name?: boolean;
      description?: boolean;
      image?: boolean;
      attributes?: boolean;
      collectionName?: boolean;
      collectionSymbol?: boolean;
      collectionDetails?: {
        card?: boolean;
        components?: {
          collectionName?: boolean;
          collectionSymbol?: boolean;
        };
      };
      id?: boolean;
    };
  };
  nameCard?: ReactElement<NameCardProps>;
  NameCard2?: ComponentType<NameCardProps>;

  renderOrder?: (
    | "Image"
    | "Name"
    | "Description"
    | "Attributes"
    | "Address"
    | "CollectionName"
    | "CollectionSymbol"
    | "CollectionDetails"
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
    collectionDetails?: {
      detailsDescriptor?: boolean;
      componentsDescriptor?: {
        address?: boolean;
        collectionName?: boolean;
        collectionSymbol?: boolean;
      };
    };
    id?: boolean;
  };
};

const loadingSizeMap = {
  base: "text-8xl",
};

// const sizeMap = {
//   base: "w-[700px] h-[700px]",
// };

const NameCard3 = (props: NameCardProps) => {
  return <NameCard {...props} prettyLoad={true} />;
};

export const NftCard = ({
  token,
  nameCard = <NameCard value={token?.metadata?.name} prettyLoad={true} style="rounded" />,
  NameCard2 = NameCard3,
  // components = [
  //   {
  //     value: token?.metadata?.name,
  //     prettyLoad: true,
  //     showDescriptor: true,
  //   },
  //   {
  //     value: token?.metadata?.description,
  //     prettyLoad: true,
  //     showDescriptor: true,
  //   },
  //   {
  //     value: token?.metadata?.image,
  //     prettyLoad: true,
  //     showDescriptor: false,
  //   },
  // ],
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
    collectionDetails: {
      detailsDescriptor: true,
      componentsDescriptor: {
        address: true,
        collectionName: true,
        collectionSymbol: true,
      },
    },
    id: true,
  },
}: Props) => {
  const renderedComponents: any = [];

  //   renderedComponents.push(<div key={99}>{nameCard}</div>);

  for (let i = 0; i < renderOrder.length; i++) {
    if (renderOrder[i] === "Image") {
      renderedComponents.push(
        <div key={i}>
          <ImageCard
            value={token?.metadata?.image}
            prettyLoad={prettyLoad?.values?.image}
            showDescriptor={showComponentDescriptors?.image}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Name") {
      renderedComponents.push(
        <div key={i}>
          <NameCard
            value={token?.metadata?.name}
            prettyLoad={prettyLoad?.values?.name}
            showDescriptor={showComponentDescriptors?.name}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Description") {
      renderedComponents.push(
        <div key={i}>
          <DescriptionCard
            value={token?.metadata?.description}
            prettyLoad={prettyLoad?.values?.description}
            showDescriptor={showComponentDescriptors?.description}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Attributes") {
      renderedComponents.push(
        <div key={i}>
          <AttributesCard
            value={token?.metadata?.attributes}
            prettyLoad={prettyLoad?.values?.attributes}
            showDescriptor={showComponentDescriptors?.attributes}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Id") {
      renderedComponents.push(
        <div key={i}>
          <IdCard
            value={token?.id}
            uri={token?.uri}
            prettyLoad={prettyLoad?.values?.id}
            showDescriptor={showComponentDescriptors?.id}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "CollectionDetails") {
      renderedComponents.push(
        <div key={i}>
          <CollectionDetails
            token={token}
            prettyLoad={prettyLoad?.values?.collectionDetails}
            showDescriptors={showComponentDescriptors?.collectionDetails}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "Address") {
      renderedComponents.push(
        <div key={i}>
          <AddressCard value={token?.contract?.address} showDescriptor={showComponentDescriptors?.address} />
        </div>,
      );
    }

    if (renderOrder[i] === "CollectionName") {
      renderedComponents.push(
        <div key={i}>
          <CollectionNameCard
            value={token?.collectionName}
            prettyLoad={prettyLoad?.values?.collectionName}
            showDescriptor={showComponentDescriptors?.collectionName}
          />
        </div>,
      );
    }

    if (renderOrder[i] === "CollectionSymbol") {
      renderedComponents.push(
        <div key={i}>
          <CollectionSymbolCard
            value={token?.collectionSymbol}
            prettyLoad={prettyLoad?.values?.collectionSymbol}
            showDescriptor={showComponentDescriptors?.collectionSymbol}
          />
        </div>,
      );
    }
  }

  let cardContent: any;

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
      cardContent = renderedComponents;
    }
  } else {
    cardContent = renderedComponents;
  }

  return (
    <div className="flex flex-col items-center bg-base-300">
      {nameCard}
      {NameCard2 ? <NameCard2 value={token?.metadata?.name} /> : <></>}
      {cardContent}
    </div>
  );

  //   return (
  //     <div
  //       className={`flex flex-col items-center align-top justify-center rounded-2xl bg-base-300 ${/*sizeMap[size]*/ ""}`}
  //     >
  //       {cardContent}
  //     </div>
  //   );
};
