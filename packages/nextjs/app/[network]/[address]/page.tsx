"use client";

export default function Collection({ params }: { params: { id: string } }) {
  console.log(params);

  return (
    <div>
      <p>Hello 2</p>
    </div>
  );
}
