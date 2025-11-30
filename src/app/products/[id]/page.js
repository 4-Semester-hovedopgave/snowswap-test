import { supabase } from "@/lib/supabase";

export default async function ProductPage({ params }) {
  const { id } = await params;

  // Fetch single produkt
  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (error || !product) {
    return <div style={{ padding: "40px" }}>Product not found.</div>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <img
        src={product.image_url}
        alt={product.title}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      />

      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>{product.title}</h1>

      <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>{product.price} kr</p>

      <p style={{ lineHeight: "1.6", fontSize: "18px" }}>{product.description}</p>

      {/* Hvis varen er solgt */}
      {product.is_sold && (
        <p
          style={{
            marginTop: "20px",
            color: "red",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          This item has already been sold.
        </p>
      )}

      {/* Kun vis knapper hvis varen ikke er solgt */}
      {!product.is_sold && (
        <div style={{ display: "flex", gap: "12px", marginTop: "30px" }}>
          {/* Contact seller */}
          <a
            href={`/messages/start?product=${product.id}`}
            style={{
              flex: 1,
              padding: "14px 0",
              background: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "bold",
              cursor: "pointer",
              display: "block",
            }}
          >
            Contact Seller
          </a>

          {/* Buy now */}
          <a
            href={`/checkout?product=${product.id}`}
            style={{
              flex: 1,
              padding: "14px 0",
              background: "black",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "bold",
              cursor: "pointer",
              display: "block",
            }}
          >
            Buy Now
          </a>
        </div>
      )}
    </div>
  );
}
