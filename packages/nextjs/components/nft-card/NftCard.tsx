"use client";

import { ComponentType } from "react";
import { Size, Style, beautyStyleMap } from "./types/Types";
import { AddressCard, AddressCardProps } from "./values/AddressCard";
import { AttributesCard, AttributesCardProps } from "./values/AttributesCard";
import { CollectionNameCard, CollectionNameCardProps } from "./values/CollectionNameCard";
import { CollectionSymbolCard, CollectionSymbolCardProps } from "./values/CollectionSymbolCard";
import { DescriptionCard, DescriptionCardProps } from "./values/DescriptionCard";
import { IdCard, IdCardProps } from "./values/IdCard";
import { ImageCard, ImageCardProps } from "./values/ImageCard";
import { NameCard, NameCardProps } from "./values/NameCard";
import { CollectionDetails, CollectionDetailsProps } from "./values/extensions/CollectionDetails";
import { ScaffoldToken } from "~~/types/ScaffoldToken";

type PrettyLoadType = "animated" | "text";

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
  prettyLoad?: boolean;
  prettyLoadType?: PrettyLoadType;
  size?: Size;
  style?: Style;
};

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
  prettyLoadType = "animated",
  size = "base",
  style = "rounded",
}: Props) => {
  const sizeMap = {
    base: "w-32 m-0.5",
    // base: "max-w-96 lg:max-w-max m-4",
  };

  const animatedLoadingSizeMap = {
    base: "h-80 w-32",
  };

  const textLoadingSizeMap = {
    base: "text-4xl",
  };

  const prettyLoadMap = {
    animated: (
      <div className="animate-pulse flex space-x-4">
        <div className="flex items-center space-y-6">
          <div className={`bg-slate-300 ${animatedLoadingSizeMap[size]}  ${beautyStyleMap[style]}`}></div>
        </div>
      </div>
    ),
    text: <p className={`text-center ${textLoadingSizeMap[size]}`}>Loading NFT...</p>,
  };

  const renderedComponents: any = [];
  const collectionComponents: any = [];

  for (let i = 0; i < renderOrder.length; i++) {
    if (renderOrder[i] === "Image") {
      renderedComponents.push(
        <ImageCard key={i} value={token?.metadata?.image} showDescriptor={false} style={style} size={size} />,
      );
    }

    if (renderOrder[i] === "Name") {
      renderedComponents.push(
        <NameCard key={i} value={token?.metadata?.name} showDescriptor={true} style={style} size={size} />,
      );
    }

    if (renderOrder[i] === "Description") {
      renderedComponents.push(
        <DescriptionCard
          key={i}
          value={token?.metadata?.description}
          showDescriptor={true}
          style={style}
          size={size}
        />,
      );
    }

    if (renderOrder[i] === "Attributes") {
      renderedComponents.push(
        <AttributesCard key={i} value={token?.metadata?.attributes} showDescriptor={true} style={style} />,
      );
    }

    if (renderOrder[i] === "Id") {
      renderedComponents.push(<IdCard key={i} value={token?.id} showDescriptor={true} style={style} size={size} />);
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
            return (
              <AddressCard
                {...props}
                value={token?.contract?.address}
                showDescriptor={true}
                style={style}
                size={size}
              />
            );
          }}
          CollectionNameCard={props => {
            return (
              <CollectionNameCard
                {...props}
                value={token?.collectionName}
                showDescriptor={true}
                style={style}
                size={size}
              />
            );
          }}
          CollectionSymbolCard={props => {
            return (
              <CollectionSymbolCard
                {...props}
                value={token?.collectionSymbol}
                showDescriptor={true}
                style={style}
                size={size}
              />
            );
          }}
        />,
      );
    } else if (collectionDataLoadType === "Individual") {
      for (let i = 0; i < collectionComponents.length; i++) {
        if (collectionComponents[i] === "Address") {
          renderedComponents.push(
            <AddressCard
              key={renderedComponents.length}
              value={token?.contract?.address}
              showDescriptor={true}
              style={style}
              size={size}
            />,
          );
        }

        if (collectionComponents[i] === "CollectionName") {
          renderedComponents.push(
            <CollectionNameCard
              key={renderedComponents.length}
              value={token?.collectionName}
              showDescriptor={true}
              style={style}
              size={size}
            />,
          );
        }
        if (collectionComponents[i] === "CollectionSymbol") {
          renderedComponents.push(
            <CollectionSymbolCard
              key={renderedComponents.length}
              value={token?.collectionSymbol}
              showDescriptor={true}
              style={style}
              size={size}
            />,
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
      cardContent = prettyLoadMap[prettyLoadType];
    } else {
      cardContent = renderedComponents;
    }
  } else {
    cardContent = renderedComponents;
  }

  return <div className={`flex flex-col bg-base-300 ${sizeMap[size]} ${beautyStyleMap[style]}`}>{cardContent}</div>;
};
