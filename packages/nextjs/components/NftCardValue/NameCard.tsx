"use client";

type Props = {
  value?: string;
  prettyLoad?: boolean;
};

export const NameCard = ({ value, prettyLoad = false }: Props) => {
  const component = <p className="text-center font-bold bg-base-100 rounded-lg text-4xl p-2">{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading Name...</p>;
  } else {
    output = component;
  }

  return <>{output}</>;
};
