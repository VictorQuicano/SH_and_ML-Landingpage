import { getStore } from "@netlify/blobs";

// Configuración manual para entorno local
const siteID = "2aa9e5d2-fc93-4b37-939f-9a7a833b0141";
const token = "nfp_FbGs9B7G421zvx8WssfGfmbYbR3Y21fj42a0";
// const environment = import.meta.env.NODE_ENV;
//
const STORAGE_KEY = "visitas";
export async function GET() {
  const blobStore = getStore("visitas-store", {
    siteID: siteID,
    token: token,
  });
  try {
    const currentValue = await blobStore.get(STORAGE_KEY);
    let currentCount = parseInt(currentValue || "0", 10);
    currentCount++;

    await blobStore.set(STORAGE_KEY, currentCount.toString());

    return new Response(JSON.stringify({ visitas: currentCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar visitas" }),
      { status: 500 }
    );
  }
}
