import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ProductsPage() {
  // Fetch produkter fra Supabase
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_sold", false) // Kun varer der ikke er solgt
    .order("created_at", { ascending: false });

  if (error) {
    console.log("ERROR:", error);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>All Products</h1>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products?.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            style={{
              display: "block",
              border: "1px solid #eee",
              borderRadius: "12px",
              padding: "16px",
              textDecoration: "none",
              color: "black",
            }}
          >
            <img
              src={product.image_url}
              alt={product.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />

            <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>{product.title}</h3>

            <p style={{ fontWeight: "bold" }}>{product.price} kr</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
