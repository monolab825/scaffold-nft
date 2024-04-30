import { useState } from "react";
import { DescriptionInput } from "../DescriptionInput";
import { NameInput } from "../NameInput";
import { ImageInputWithPreview } from "./ImageInputWithPreview";
import { useW3 } from "@w3ui/react";

export function MyUploader() {
  const [{ client }] = useW3();

  const [isLoading, setIsLoading] = useState(false);
  const [jsonCID, setJsonCID] = useState<string>();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function onImageChange(value: any) {
    setSelectedImage(value);
  }

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (selectedImage === null) return;

    setIsLoading(true);
    const nameInput = event.target["0"] as any;
    const descriptionInput = event.target["1"] as any;

    const imageCID = await client?.uploadFile(selectedImage);
    console.log("Image CID: ", imageCID?.toString());

    const obj = { name: nameInput.value, image: "ipfs://" + imageCID?.toString(), description: descriptionInput.value };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const nftFile = new File([blob], "nft.json");

    const jsonCID = await client?.uploadFile(nftFile);

    console.log("Json CID: ", jsonCID?.toString());
    setJsonCID(jsonCID?.toString());

    setIsLoading(false);
  };

  const ipfsJsonCID = "ipfs://" + jsonCID?.toString();
  const w3sJsonCID = "https://w3s.link/ipfs/" + jsonCID?.toString();

  let jsonCIDOutput;

  if (jsonCID) {
    jsonCIDOutput = (
      <div>
        <p>Main URL</p>
        <a
          href={ipfsJsonCID}
          target="#"
          className="text-lg break-words font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {ipfsJsonCID}
        </a>

        <p>Fast URL</p>
        <a
          href={w3sJsonCID}
          target="#"
          className="text-lg break-words font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {w3sJsonCID}
        </a>
      </div>
    );
  }

  return (
    <div className="w-96 justify-center bg-secondary rounded-lg">
      <p className="text-xl text-center">{isLoading ? "Uploading..." : "Upload Metadata"}</p>
      {jsonCIDOutput}

      <form onSubmit={onSubmit} className="space-y-5 m-1 flex flex-col items-center">
        <NameInput />
        <DescriptionInput />
        <ImageInputWithPreview onChange={onImageChange} />
        <button type="submit" className="btn btn-primary m-1">
          Upload
        </button>
      </form>
    </div>
  );
}
