import { supabase } from "@/lib/supabase";

export default async function ConfirmationPage({ searchParams }) {
  // Unwrap searchParams (det er en Promise i Next.js 14)
  const { product } = await searchParams;

  const productId = product;

  // Fetch produktet fra Supabase
  const { data: productData, error } = await supabase.from("products").select("*").eq("id", productId).single();

  // Markér produktet som solgt
  await supabase.from("products").update({ is_sold: true }).eq("id", productId);

  const fakeOrderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Order Confirmed</h1>

      <p style={{ marginBottom: "10px" }}>Thank you for your purchase!</p>

      <p style={{ marginBottom: "10px" }}>
        <strong>Order number:</strong> #{fakeOrderNumber}
      </p>

      <p style={{ marginBottom: "30px" }}>
        You bought: <strong>{productData?.title}</strong> for {productData?.price} kr
      </p>

      <a href="/products" style={{ fontWeight: "bold", color: "black" }}>
        Back to products
      </a>
    </div>
  );
}
