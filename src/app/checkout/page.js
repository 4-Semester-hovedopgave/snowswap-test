"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();

  const productId = params.get("product");

  const [form, setForm] = useState({
    name: "",
    address: "",
    zip: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // SEND FORM DATA TIL REVIEW PAGE
    const query = new URLSearchParams({
      product: productId,
      name: form.name,
      address: form.address,
      zip: form.zip,
      phone: form.phone,
    }).toString();

    router.push(`/checkout/review?${query}`);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "26px" }}>Checkout</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
        <input placeholder="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />

        <input placeholder="Address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />

        <input placeholder="ZIP Code" required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />

        <input placeholder="Phone Number" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />

        <button
          type="submit"
          style={{
            padding: "14px",
            background: "black",
            color: "white",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
