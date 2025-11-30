"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          SnowSwap
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/sell" className="hover:underline">
            Sell now
          </Link>

          <Link href="/notifications" className="hover:underline">
            Notifications
          </Link>

          <Link href="/messages" className="hover:underline">
            Messages
          </Link>

          <SignedOut>
            <SignInButton>
              <button className="bg-black text-white px-4 py-2 rounded-md">Login / Sign up</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open Menu">
          ☰
        </button>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">
          <Link href="/sell" className="hover:underline" onClick={() => setOpen(false)}>
            Sell now
          </Link>

          <Link href="/notifications" className="hover:underline" onClick={() => setOpen(false)}>
            Notifications
          </Link>

          <Link href="/messages" className="hover:underline" onClick={() => setOpen(false)}>
            Messages
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-black text-white px-4 py-2 rounded-md">Login / Sign up</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      )}
    </nav>
  );
}
