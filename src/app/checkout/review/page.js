import { supabase } from "@/lib/supabase";

export default async function ReviewPage({ searchParams }) {
  const params = await searchParams;

  const productId = params.product;
  const name = params.name;
  const address = params.address;
  const zip = params.zip;
  const phone = params.phone;

  // Fetch product from Supabase
  const { data: product } = await supabase.from("products").select("*").eq("id", productId).single();

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Review Your Order</h1>

      {/* Produkt */}
      <div style={{ marginBottom: "20px" }}>
        <strong>{product.title}</strong>
        <p>{product.price} kr</p>
      </div>

      {/* Leveringsinfo */}
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>ZIP:</strong> {zip}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
      </div>

      <a
        href={`/orderConfirmation?product=${productId}`}
        style={{
          display: "block",
          background: "black",
          color: "white",
          padding: "14px",
          borderRadius: "8px",
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Place Order
      </a>
    </div>
  );
}
