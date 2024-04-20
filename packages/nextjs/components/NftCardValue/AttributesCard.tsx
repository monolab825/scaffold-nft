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
    output = value ? components : <p>Loading</p>;
  } else {
    output = components;
  }

  return (
    <div className={`m-2 bg-base-200 rounded-lg p-2 max-w-3xl`}>
      <p className="text-center">Attributes</p>
      <div className="flex flex-wrap justify-center">{output}</div>
    </div>
  );
};
