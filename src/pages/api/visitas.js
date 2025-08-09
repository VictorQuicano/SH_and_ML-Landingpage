import { getStore } from "@netlify/blobs";

// Configuración manual para entorno local
const siteID = import.meta.env.NETLIFY_SITE_ID;
const token = import.meta.env.NETLIFY_TOKEN;

const blobStore = getStore({
  name: "visitas-store",
  siteID: siteID,
  token: token,
});

const STORAGE_KEY = "visitas";

export async function GET() {
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
  //console.log(token, siteID);
  //if (process.env.NODE_ENV !== "development") {
  //  fakeBlobs[STORAGE_KEY] = (fakeBlobs[STORAGE_KEY] || 0) + 1;
  //  return new Response(JSON.stringify({ visitas: fakeBlobs[STORAGE_KEY] }), {
  //    status: 200,
  //  });
  //} else {
  //}
}
