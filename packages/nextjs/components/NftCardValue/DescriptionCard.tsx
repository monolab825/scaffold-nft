"use client";

type Props = {
  value?: string;
  prettyLoad?: boolean;
};

export const DescriptionCard = ({ value, prettyLoad = false }: Props) => {
  const component = <p className="text-center bg-base-100 rounded-lg text-xl p-2">{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading Description...</p>;
  } else {
    output = component;
  }

  return <>{output}</>;
};
