import { getStore } from "@netlify/blobs";

// Configuración manual para entorno local
const siteID = import.meta.env.NETLIFY_SITE_ID;
const token = import.meta.env.NETLIFY_TOKEN;
const environment = import.meta.env.NODE_ENV;

let blobStore;

const STORAGE_KEY = "visitas";

export async function GET() {
  if (process.env.NETLIFY) {
    blobStore = getStore("visitas-store");
  } else {
    blobStore = getStore({
      name: "visitas-store",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_TOKEN,
    });
  }
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
