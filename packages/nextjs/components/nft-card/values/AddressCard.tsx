"use client";

import { Address } from "../../scaffold-eth";
import { Size, Style, styleMap } from "../types/Types";

export type AddressCardProps = {
  value?: string;
  style?: Style;
  size?: Size;
  showDescriptor?: boolean;
  descriptorText?: string;
  bgColor?: string;
};

export const AddressCard = ({
  value,
  style = "rounded",
  size = "base",
  showDescriptor,
  descriptorText = "Contract Address",
  bgColor = "bg-base-200",
}: AddressCardProps) => {
  const sizeMap = {
    sm: "",
    base: "max-w-3xl",
  };

  const component = <Address address={value} />;

  return (
    <div className={`${bgColor} ${styleMap[style]} p-2 m-2 ${sizeMap[size]}`}>
      {showDescriptor ? <p className="text-center">{descriptorText}</p> : <></>}
      {component}
    </div>
  );
};
