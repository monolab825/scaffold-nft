"use client";

type Props = {
  value?: { trait_type: string; value: string }[];
  prettyLoad?: boolean;
};

export const AttributesCard = ({ value, prettyLoad = false }: Props) => {
  const components = value?.map((attribute: any, index: number) => {
    return (
      <div key={index} className="bg-base-100 w-[115px] text-center m-2 rounded-lg">
        <p className="text-sm">{attribute["trait_type"]}</p>
        <p className="text-lg">{attribute["value"]}</p>
      </div>
    );
  });

  let output;

  if (prettyLoad) {
    output = value ? components : <p>Loading Attributes...</p>;
  } else {
    output = components;
  }

  return <div className="flex flex-wrap justify-center bg-base-200 rounded-lg m-2 max-w-3xl">{output}</div>;
};
