import { getStore } from "@netlify/blobs";

const STORAGE_KEY = "visitas";

export async function GET() {
  // Configuración para producción en Netlify
  const isNetlifyProduction =
    import.meta.env.NETLIFY && !import.meta.env.NETLIFY_BUILD;

  // Si no estamos en producción Netlify, devolver un valor por defecto
  if (!isNetlifyProduction) {
    return new Response(JSON.stringify({ visitas: 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Configuración del store
    const blobStore = getStore({
      name: "visitas-store",
      siteID: import.meta.env.NETLIFY_SITE_ID,
      token: import.meta.env.NETLIFY_TOKEN,
    });

    const currentValue = await blobStore.get(STORAGE_KEY);
    let currentCount = parseInt(currentValue || "0", 10);
    currentCount++;

    await blobStore.set(STORAGE_KEY, currentCount.toString());

    return new Response(JSON.stringify({ visitas: currentCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al actualizar visitas:", error);
    return new Response(
      JSON.stringify({
        error: "Error al actualizar visitas",
        message: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
