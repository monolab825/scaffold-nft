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
  collectionDataLoadType?: CollectionLoadType;
  size?: "base";
  prettyLoad?: boolean;

  // components?: {
  //   value?: any;
  //   prettyLoad?: any;
  //   showDescriptor?: any;
  // }[];

  // prettyLoad?: {
  //   card?: boolean;
  //   values?: {
  //     name?: boolean;
  //     description?: boolean;
  //     image?: boolean;
  //     attributes?: boolean;
  //     collectionName?: boolean;
  //     collectionSymbol?: boolean;
  //     collectionDetails?: boolean;
  //     id?: boolean;
  //   };
  // };
  // nameCard?: ReactElement<NameCardProps>;

  // Imae
  // renderOrder?: (
  //   | "Image"
  //   | "Name"
  //   | "Description"
  //   | "Attributes"
  //   | "Address"
  //   | "CollectionName"
  //   | "CollectionSymbol"
  //   | "CollectionDetails"
  //   | "Id"
  // )[];
  // showComponentDescriptors?: {
  //   image?: boolean;
  //   name?: boolean;
  //   description?: boolean;
  //   attributes?: boolean;
  //   address?: boolean;
  //   collectionName?: boolean;
  //   collectionSymbol?: boolean;
  //   collectionDetails?: {
  //     detailsDescriptor?: boolean;
  //     componentsDescriptor?: {
  //       address?: boolean;
  //       collectionName?: boolean;
  //       collectionSymbol?: boolean;
  //     };
  //   };
  //   id?: boolean;
  // };
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
  collectionDataLoadType = CollectionLoadType.Together,
  prettyLoad = true,
  size = "base",
}: // components = [
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
// prettyLoad,
// renderOrder = ["Image", "Name", "Description", "Attributes", "CollectionName", "CollectionSymbol", "Id", "Address"],
// showComponentDescriptors = {
//   image: false,
//   name: true,
//   description: true,
//   attributes: true,
//   address: true,
//   collectionName: true,
//   collectionSymbol: true,
//   collectionDetails: {
//     detailsDescriptor: true,
//     componentsDescriptor: {
//       address: true,
//       collectionName: true,
//       collectionSymbol: true,
//     },
//   },
//   id: true,
// },
Props) => {
  // const renderedComponents: any = [];

  //   renderedComponents.push(<div key={99}>{nameCard}</div>);

  // for (let i = 0; i < renderOrder.length; i++) {
  //   if (renderOrder[i] === "Image") {
  //     renderedComponents.push(
  //       <div key={i}>
  //         <ImageCard
  //           value={token?.metadata?.image}
  //           prettyLoad={prettyLoad?.values?.image}
  //           showDescriptor={showComponentDescriptors?.image}
  //         />
  //       </div>,
  //     );
  //   }

  //   if (renderOrder[i] === "Name") {
  //     renderedComponents.push(
  //       <div key={i}>
  //         <NameCard
  //           value={token?.metadata?.name}
  //           prettyLoad={prettyLoad?.values?.name}
  //           showDescriptor={showComponentDescriptors?.name}
  //         />
  //       </div>,
  //     );
  //   }

  //   if (renderOrder[i] === "Description") {
  //     renderedComponents.push(
  //       <div key={i}>
  //         <DescriptionCard
  //           value={token?.metadata?.description}
  //           prettyLoad={prettyLoad?.values?.description}
  //           showDescriptor={showComponentDescriptors?.description}
  //         />
  //       </div>,
  //     );
  //   }

  //   if (renderOrder[i] === "Attributes") {
  //     renderedComponents.push(
  //       <div key={i}>
  //         <AttributesCard
  //           value={token?.metadata?.attributes}
  //           prettyLoad={prettyLoad?.values?.attributes}
  //           showDescriptor={showComponentDescriptors?.attributes}
  //         />
  //       </div>,
  //     );
  //   }

  //   if (renderOrder[i] === "Id") {
  //     renderedComponents.push(
  //       <div key={i}>
  //         <IdCard
  //           value={token?.id}
  //           uri={token?.uri}
  //           prettyLoad={prettyLoad?.values?.id}
  //           showDescriptor={showComponentDescriptors?.id}
  //         />
  //       </div>,
  //     );
  //   }

  //   if (renderOrder[i] === "CollectionDetails") {
  //     renderedComponents.push(
  //       <div key={i}>
  //         <CollectionDetails
  //           token={token}
  //           prettyLoad={prettyLoad?.values?.collectionDetails}
  //           showDescriptors={showComponentDescriptors?.collectionDetails}
  //         />
  //       </div>,
  //     );
  //   }

  //   if (renderOrder[i] === "Address") {
  //     renderedComponents.push(
  //       <div key={i}>
  //         <AddressCard value={token?.contract?.address} showDescriptor={showComponentDescriptors?.address} />
  //       </div>,
  //     );
  //   }

  //   if (renderOrder[i] === "CollectionName") {
  //     renderedComponents.push(
  //       <div key={i}>
  //         <CollectionNameCard
  //           value={token?.collectionName}
  //           prettyLoad={prettyLoad?.values?.collectionName}
  //           showDescriptor={showComponentDescriptors?.collectionName}
  //         />
  //       </div>,
  //     );
  //   }

  //   if (renderOrder[i] === "CollectionSymbol") {
  //     renderedComponents.push(
  //       <div key={i}>
  //         <CollectionSymbolCard
  //           value={token?.collectionSymbol}
  //           prettyLoad={prettyLoad?.values?.collectionSymbol}
  //           showDescriptor={showComponentDescriptors?.collectionSymbol}
  //         />
  //       </div>,
  //     );
  //   }
  // }

  let collectionOutput;

  if (collectionDataLoadType === CollectionLoadType.Together) {
    collectionOutput = <CollectionDetailsCard token={token} showDescriptor={true} />;
  } else if (collectionDataLoadType === CollectionLoadType.Individual) {
    collectionOutput = (
      <>
        <AddressCard value={token?.contract?.address} showDescriptor={true} />
        <CollectionNameCard value={token?.collectionName} showDescriptor={true} />
        <CollectionSymbolCard value={token?.collectionSymbol} showDescriptor={true} />
      </>
    );
  }

  const componentsOutput = (
    <>
      <NameCard value={token?.metadata?.name} showDescriptor={true} />
      <ImageCard value={token?.metadata?.image} showDescriptor={true} />
      <DescriptionCard value={token?.metadata?.description} showDescriptor={true} />
      <AttributesCard value={token?.metadata?.attributes} showDescriptor={true} />
      <IdCard value={token?.id} showDescriptor={true} />
      {collectionOutput}
    </>
  );

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
      cardContent = componentsOutput;
    }
  } else {
    cardContent = componentsOutput;
  }

  return <div className="flex flex-col items-center bg-base-300 m-4">{cardContent}</div>;

  //   return (
  //     <div
  //       className={`flex flex-col items-center align-top justify-center rounded-2xl bg-base-300 ${/*sizeMap[size]*/ ""}`}
  //     >
  //       {cardContent}
  //     </div>
  //   );
};
