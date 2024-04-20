"use client";

type Props = {
  value?: string;
  prettyLoad?: boolean;
  style?: "rounded";
  showDescriptor?: boolean;
};

const styleMap = {
  rounded: "rounded-lg",
};

export const CollectionSymbolCard = ({ value, prettyLoad = false, style = "rounded", showDescriptor }: Props) => {
  const component = <p className={`text-4xl text-center`}>{value}</p>;

  let output;

  if (prettyLoad) {
    output = value ? component : <p>Loading...</p>;
  } else {
    output = component;
  }

  return (
    <div className={`bg-base-200 ${styleMap[style]} p-2 m-2 max-w-3xl`}>
      {showDescriptor ? <p className="text-center">Collection Symbol</p> : <></>}

      {output}
    </div>
  );
};
