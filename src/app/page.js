"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => router.push("/products")} className="px-4 py-2 bg-black text-white rounded-md">
        See products
      </button>{" "}
    </div>
  );
}
