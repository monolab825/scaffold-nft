"use client";

type Props = {
  value?: { trait_type: string; value: string }[];
  prettyLoad?: boolean;
};

export const AttributesCard = ({ value, prettyLoad = false }: Props) => {
  const allAttributes = value?.map((attribute: any, index: number) => {
    return (
      <div key={index} className="flex rounded-lg bg-base-100 p-2 space-x-1">
        <p className="rounded-lg bg-base-200 text-xl p-1">{attribute["trait_type"]}:</p>
        <p className="rounded-lg bg-base-200 text-xl p-1">{attribute["value"]}</p>
      </div>
    );
  });

  const component = <div className="flex flex-wrap items-center justify-center">{allAttributes}</div>;

  let output;

  if (prettyLoad) {
    output = allAttributes ? component : <p>Loading Attributes...</p>;
  } else {
    output = component;
  }

  return <>{output}</>;
};
