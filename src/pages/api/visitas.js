import { getStore } from "@netlify/blobs";

// Configuración manual para entorno local
const siteID = import.meta.env.NETLIFY_SITE_ID;
const token = import.meta.env.NETLIFY_TOKEN;
const environment = import.meta.env.NODE_ENV;

const blobStore =
  environment === "development"
    ? getStore({
        name: "visitas-store",
        siteID: siteID,
        token: token,
      })
    : getStore("visitas-store");

const STORAGE_KEY = "visitas";

export async function GET() {
  console.log(environment);
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
