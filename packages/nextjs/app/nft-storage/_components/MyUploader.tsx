import { useState } from "react";
import { CIDDisplayer } from "../CIDDisplayer";
import { DescriptionInput } from "../DescriptionInput";
import { NameInput } from "../NameInput";
import { ImageInputWithPreview } from "./ImageInputWithPreview";
import { useW3 } from "@w3ui/react";
import { NftCard } from "~~/components/nft-card/NftCard";

export function MyUploader() {
  const [{ client }] = useW3();

  const [isLoading, setIsLoading] = useState(false);
  const [jsonCID, setJsonCID] = useState<string>();
  const [dirCID, setDirCID] = useState<string>();
  const [imageCID, setImageCID] = useState<string>();

  const [toggleAdvanced, setToggledAdvanced] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedName, setSelectedName] = useState<File | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<File | null>(null);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (selectedImage === null) return;

    setIsLoading(true);

    const imageCID = await client?.uploadFile(selectedImage);
    setImageCID(imageCID?.toString());

    const obj = { name: selectedName, image: "ipfs://" + imageCID?.toString(), description: selectedDescription };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const nftFile = new File([blob], "1");

    const jsonCID = await client?.uploadFile(nftFile);

    const files = [nftFile];

    const dirCID = await client?.uploadDirectory(files);

    setDirCID(dirCID?.toString() + "/");
    setJsonCID(jsonCID?.toString());
    setIsLoading(false);
  };

  const token = {
    metadata: {
      name: "",
      description: "",
      image: "",
    },
  } as any;
  token.metadata.name = selectedName;
  token.metadata.description = selectedDescription;
  token.metadata.image = "https://w3s.link/ipfs/" + imageCID?.toString();
  token.collectionName = "Test";
  token.collectionSymbol = "T";
  token.address === "0x";
  token.id = 1;

  return (
    <div className="w-96 justify-center bg-secondary rounded-lg">
      <p className="text-xl text-center">{isLoading ? "Uploading..." : "Metadata Uploader"}</p>

      {jsonCID ? (
        <div className="flex flex-col">
          <button
            onClick={() => {
              setToggledAdvanced(!toggleAdvanced);
            }}
            className="btn btn-primary m-1"
          >
            Toggle Advanced View
          </button>

          <p className="text-center text-2xl">Json</p>

          {toggleAdvanced ? (
            <div>
              <CIDDisplayer cid={jsonCID} showAdvanced={toggleAdvanced} />
              <p className="text-center text-2xl">Directory</p>
              <CIDDisplayer cid={dirCID} showAdvanced={toggleAdvanced} />
              <p className="text-center text-2xl">Image</p>
              <CIDDisplayer cid={imageCID} showAdvanced={toggleAdvanced} />
            </div>
          ) : (
            <div>
              <CIDDisplayer cid={jsonCID} showAdvanced={toggleAdvanced} />
              <p className="text-center text-2xl">Directory</p>
              <CIDDisplayer cid={dirCID} showAdvanced={toggleAdvanced} />
            </div>
          )}

          <div className="flex flex-col items-center">
            <p className="text-2xl">Preview</p>
            <NftCard token={token} renderOrder={["Image", "Name", "Description"]} prettyLoad={false} />
          </div>

          <button
            onClick={() => {
              setJsonCID(undefined);
            }}
            className="btn btn-primary m-1 mt-5"
          >
            Restart
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5 m-1 flex flex-col items-center">
          <NameInput
            onChange={(value: any) => {
              setSelectedName(value);
            }}
          />
          <DescriptionInput
            onChange={(value: any) => {
              setSelectedDescription(value);
            }}
          />
          <ImageInputWithPreview
            onChange={(value: any) => {
              setSelectedImage(value);
            }}
          />
          <button type="submit" className="btn btn-primary m-1">
            Upload
          </button>
        </form>
      )}
    </div>
  );
}
