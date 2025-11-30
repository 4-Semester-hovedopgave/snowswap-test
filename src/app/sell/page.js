"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SellPage() {
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to sell a product.");
      return;
    }

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    setIsLoading(true);

    try {
      // 1) Upload image til Supabase Storage
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images") // HUSK: bucket-navn, se note nedenfor
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        alert("Could not upload image.");
        setIsLoading(false);
        return;
      }

      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;

      // 2) Insert produkt i Supabase
      const { error: insertError } = await supabase.from("products").insert({
        title,
        price: Number(price),
        description,
        image_url: imageUrl,
        user_id: user.id,
      });

      if (insertError) {
        console.error("Insert error:", insertError);
        alert("Could not save product.");
        setIsLoading(false);
        return;
      }

      // 3) Redirect til /products
      router.push("/products");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Sell a Product</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="number"
          placeholder="Price (DKK)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            height: "120px",
          }}
        />

        <label className="inline-block bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800">
          Choose Image
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required className="hidden" />
        </label>

        {imageFile && <p className="text-sm text-gray-600 mt-2">Selected: {imageFile.name}</p>}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "14px",
            borderRadius: "8px",
            background: isLoading ? "#555" : "black",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
}
