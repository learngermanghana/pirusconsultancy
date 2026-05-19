import { NextResponse } from "next/server";
import { getSedifexProducts } from "@/lib/sedifex";

export async function GET() {
  const products = await getSedifexProducts();

  return NextResponse.json({
    ok: true,
    services: products,
  });
}
