"use client";

type Props = {
  value?: string;
  prettyLoad?: boolean;
  style?: "rounded";
};

const styleMap = {
  rounded: "rounded-lg",
};

export const DescriptionCard = ({ value, prettyLoad = false, style = "rounded" }: Props) => {
  const component = <p className={`text-2xl text-center`}>{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading Description...</p>;
  } else {
    output = component;
  }

  return <div className={`m-2 bg-base-200 ${styleMap[style]} p-2 max-w-3xl`}>{output}</div>;
};
