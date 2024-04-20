"use client";

import { AttributesCard } from "./NftCardValue/AttributesCard";
import { DescriptionCard } from "./NftCardValue/DescriptionCard";
import { ImageCard } from "./NftCardValue/ImageCard";
import { NameCard } from "./NftCardValue/NameCard";

type Props = {
  token?: {
    name?: string;
    description?: string;
    image?: string;
    attributes?: any[];
  };
  prettyLoad?: {
    card?: boolean;
    values?: {
      name?: boolean;
      description?: boolean;
      image?: boolean;
      attributes?: boolean;
    };
  };
  renderOrder?: ("Image" | "Name" | "Description" | "Attributes")[];
  size?: "base";
};

const loadingSizeMap = {
  base: "text-8xl",
};

const sizeMap = {
  base: "w-[700px] h-[700px]",
};

export const NftCard = ({
  token,
  prettyLoad,
  renderOrder = ["Image", "Name", "Description", "Attributes"],
  size = "base",
}: Props) => {
  const components = [];

  for (let i = 0; i < renderOrder.length; i++) {
    if (renderOrder[i] === "Image") {
      components.push(
        <div key={i}>
          <ImageCard value={token?.image} prettyLoad={prettyLoad?.values?.image} />
        </div>,
      );
    }

    if (renderOrder[i] === "Name") {
      components.push(
        <div key={i}>
          <NameCard value={token?.name} prettyLoad={prettyLoad?.values?.name} />
        </div>,
      );
    }

    if (renderOrder[i] === "Description") {
      components.push(
        <div key={i}>
          <DescriptionCard value={token?.description} prettyLoad={prettyLoad?.values?.description} />
        </div>,
      );
    }

    if (renderOrder[i] === "Attributes") {
      components.push(
        <div key={i}>
          <AttributesCard value={token?.attributes} prettyLoad={prettyLoad?.values?.attributes} />
        </div>,
      );
    }
  }

  let cardContent;

  if (prettyLoad?.card) {
    if (token?.image === undefined || token?.name === undefined || token?.description === undefined) {
      cardContent = <p className={`${loadingSizeMap[size]}`}>Loading NFT...</p>;
    } else {
      cardContent = components;
    }
  } else {
    cardContent = components;
  }

  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl bg-base-300 ${sizeMap[size]}`}>
      {cardContent}
    </div>
  );
};
