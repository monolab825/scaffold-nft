"use client";

import { ComponentType } from "react";
import { CollectionDetails, CollectionDetailsProps } from "./CollectionDetails";
import { AddressCard, AddressCardProps } from "./NftCardValue/AddressCard";
import { AttributesCard, AttributesCardProps } from "./NftCardValue/AttributesCard";
import { CollectionNameCard, CollectionNameCardProps } from "./NftCardValue/CollectionNameCard";
import { CollectionSymbolCard, CollectionSymbolCardProps } from "./NftCardValue/CollectionSymbolCard";
import { DescriptionCard, DescriptionCardProps } from "./NftCardValue/DescriptionCard";
import { IdCard, IdCardProps } from "./NftCardValue/IdCard";
import { ImageCard, ImageCardProps } from "./NftCardValue/ImageCard";
import { NameCard, NameCardProps } from "./NftCardValue/NameCard";
import { Style, styleMap } from "./NftCardValue/Types";
import { ScaffoldToken } from "~~/types/ScaffoldToken";

export enum CollectionLoadType {
  Individual,
  Together,
}

const loadingSizeMap = {
  base: "text-8xl",
};

type Props = {
  token?: ScaffoldToken;
  NameCard?: ComponentType<NameCardProps>;
  ImageCard?: ComponentType<ImageCardProps>;
  DescriptionCard?: ComponentType<DescriptionCardProps>;
  AttributesCard?: ComponentType<AttributesCardProps>;
  AddressCard?: ComponentType<AddressCardProps>;
  CollectionNameCard?: ComponentType<CollectionNameCardProps>;
  CollectionSymbolCard?: ComponentType<CollectionSymbolCardProps>;
  IdCard?: ComponentType<IdCardProps>;
  CollectionDetailsCard?: ComponentType<CollectionDetailsProps>;

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
  collectionDataLoadType?: "Together" | "Individual";
  size?: "base";
  prettyLoad?: boolean;
  style?: Style;
};

// const sizeMap = {
//   base: "w-[700px] h-[700px]",
// };

const NameCardComponent = (props: NameCardProps) => {
  return <NameCard {...props} />;
};

const ImageCardComponent = (props: ImageCardProps) => {
  return <ImageCard {...props} />;
};

const DescriptionCardComponent = (props: DescriptionCardProps) => {
  return <DescriptionCard {...props} />;
};

const AttributesCardComponent = (props: AttributesCardProps) => {
  return <AttributesCard {...props} />;
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

const IdCardComponent = (props: IdCardProps) => {
  return <IdCard {...props} />;
};

const CollectionDetailsCardComponent = (props: CollectionDetailsProps) => {
  return <CollectionDetails {...props} />;
};

export const NftCard = ({
  token,
  NameCard = NameCardComponent,
  ImageCard = ImageCardComponent,
  DescriptionCard = DescriptionCardComponent,
  AttributesCard = AttributesCardComponent,
  AddressCard = AddressCardComponent,
  CollectionNameCard = CollectionNameCardComponent,
  CollectionSymbolCard = CollectionSymbolCardComponent,
  IdCard = IdCardComponent,
  CollectionDetailsCard = CollectionDetailsCardComponent,
  collectionDataLoadType = "Together",
  renderOrder = ["Image", "Name", "Description", "Attributes", "Address", "CollectionName", "CollectionSymbol", "Id"],
  prettyLoad = true,
  size = "base",
  style = "rounded",
}: Props) => {
  const renderedComponents: any = [];
  const collectionComponents: any = [];

  for (let i = 0; i < renderOrder.length; i++) {
    if (renderOrder[i] === "Image") {
      renderedComponents.push(
        <ImageCard key={i} value={token?.metadata?.image} showDescriptor={false} style={style} />,
      );
    }

    if (renderOrder[i] === "Name") {
      renderedComponents.push(<NameCard key={i} value={token?.metadata?.name} showDescriptor={true} style={style} />);
    }

    if (renderOrder[i] === "Description") {
      renderedComponents.push(
        <DescriptionCard key={i} value={token?.metadata?.description} showDescriptor={true} style={style} />,
      );
    }

    if (renderOrder[i] === "Attributes") {
      renderedComponents.push(
        <AttributesCard key={i} value={token?.metadata?.attributes} showDescriptor={true} style={style} />,
      );
    }

    if (renderOrder[i] === "Id") {
      renderedComponents.push(<IdCard key={i} value={token?.id} showDescriptor={true} style={style} />);
    }

    if (renderOrder[i] === "Address" || renderOrder[i] === "CollectionName" || renderOrder[i] === "CollectionSymbol") {
      collectionComponents.push(renderOrder[i]);
    }
  }

  if (collectionComponents.length > 0) {
    if (collectionDataLoadType === "Together") {
      renderedComponents.push(
        <CollectionDetailsCard
          key={renderedComponents.length}
          token={token}
          showDescriptor={true}
          style={style}
          renderOrder={collectionComponents}
          AddressCard={props => {
            return <AddressCard {...props} value={token?.contract?.address} showDescriptor={true} style={style} />;
          }}
          CollectionNameCard={props => {
            return <CollectionNameCard {...props} value={token?.collectionName} showDescriptor={true} style={style} />;
          }}
          CollectionSymbolCard={props => {
            return (
              <CollectionSymbolCard {...props} value={token?.collectionSymbol} showDescriptor={true} style={style} />
            );
          }}
        />,
      );
    } else if (collectionDataLoadType === "Individual") {
      for (let i = 0; i < collectionComponents.length; i++) {
        if (collectionComponents[i] === "Address") {
          renderedComponents.push(<AddressCard value={token?.contract?.address} showDescriptor={true} style={style} />);
        }

        if (collectionComponents[i] === "CollectionName") {
          renderedComponents.push(
            <CollectionNameCard value={token?.collectionName} showDescriptor={true} style={style} />,
          );
        }
        if (collectionComponents[i] === "CollectionSymbol") {
          renderedComponents.push(
            <CollectionSymbolCard value={token?.collectionSymbol} showDescriptor={true} style={style} />,
          );
        }
      }
    }
  }

  let cardContent: any;

  if (prettyLoad) {
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
      cardContent = <p className={`text-center ${loadingSizeMap[size]}`}>Loading NFT...</p>;
    } else {
      cardContent = renderedComponents;
    }
  } else {
    cardContent = renderedComponents;
  }

  return <div className={`flex flex-col items-center bg-base-300 m-4 ${styleMap[style]}`}>{cardContent}</div>;
};
