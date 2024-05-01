import { useState } from "react";

export function ImageInputWithPreview({ onChange }: any) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  let output;
  if (selectedImage) {
    output = (
      <div className="flex flex-col items-center">
        {/* eslint-disable-next-line*/}
        <img alt="not found" width={"256px"} src={URL.createObjectURL(selectedImage)} />
        <button
          className="btn btn-primary btn-sm font-light hover:border-transparent"
          onClick={() => {
            setSelectedImage(null);
          }}
        >
          Remove
        </button>
      </div>
    );
  } else {
    output = (
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
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF.</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(event: any) => {
              setSelectedImage(event.target.files[0]);
              onChange(event.target.files[0]);
            }}
          />
        </label>
      </div>
    );
  }

  return <>{output}</>;
}
