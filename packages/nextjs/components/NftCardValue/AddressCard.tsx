"use client";

import { Address } from "../scaffold-eth";

type Props = {
  value?: string;
  prettyLoad?: boolean;
  style?: "rounded";
  showDescriptor?: boolean;
  descriptorText?: string;
  bgColor?: string;
};

const styleMap = {
  rounded: "rounded-lg",
};

export const AddressCard = ({
  value,
  style = "rounded",
  showDescriptor,
  descriptorText = "Contract Address",
  bgColor = "bg-base-200",
}: Props) => {
  const component = <Address address={value} />;

  return (
    <div className={`${bgColor} ${styleMap[style]} p-2 m-2 max-w-3xl`}>
      {showDescriptor ? <p className="text-center">{descriptorText}</p> : <></>}
      {component}
    </div>
  );
};
