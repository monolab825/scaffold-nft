"use client";

import { Address } from "../scaffold-eth";
import { Style, styleMap } from "./Types";

export type AddressCardProps = {
  value?: string;
  style?: Style;
  showDescriptor?: boolean;
  descriptorText?: string;
  bgColor?: string;
};

export const AddressCard = ({
  value,
  style = "rounded",
  showDescriptor,
  descriptorText = "Contract Address",
  bgColor = "bg-base-200",
}: AddressCardProps) => {
  const component = <Address address={value} />;

  return (
    <div className={`${bgColor} ${styleMap[style]} p-2 m-2 max-w-3xl`}>
      {showDescriptor ? <p className="text-center">{descriptorText}</p> : <></>}
      {component}
    </div>
  );
};
