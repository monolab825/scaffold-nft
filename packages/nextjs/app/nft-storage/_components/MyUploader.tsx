import { useState } from "react";
import { useW3 } from "@w3ui/react";

export function MyUploader() {
  const [{ client }] = useW3();

  const [isLoading, setIsLoading] = useState(false);
  const [jsonCID, setJsonCID] = useState<string>();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
  const w3sJsonCID = "w3s.link/ipfs/" + jsonCID?.toString();

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
        <div className="w-full">
          <label htmlFor="first_name" className="text-center block text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Scaffold NFT"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="first_name" className="text-center block text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Scaffold NFTs are great! Get up and running in minutes and deploy your own collection or view any other collection on a variety of chains!"
            required
          />
        </div>
        {selectedImage && (
          <div className="flex flex-col items-center">
            <img alt="not found" width={"256px"} src={URL.createObjectURL(selectedImage)} />
            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedImage(null);
              }}
            >
              Remove
            </button>
          </div>
        )}
        {!selectedImage && (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              Image
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(event: any) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </label>
          </div>
        )}

        <button type="submit" className="btn btn-primary m-1">
          Upload
        </button>
      </form>
    </div>
  );
}
