import { getStore } from "@netlify/blobs";

const STORAGE_KEY = "visitas";

export async function GET() {
  // Verificar si estamos en el proceso de build
  if (import.meta.env.NETLIFY_BUILD || !import.meta.env.NETLIFY) {
    return new Response(JSON.stringify({ visitas: 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // En producción Netlify, usar configuración automática
    const blobStore = getStore("visitas-store", {
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
    console.error("Error:", error);

    return new Response(
      JSON.stringify({
        error: "Error al actualizar visitas",
        message: error?.message || "Sin mensaje",
        name: error?.name || "Error",
        stack: error?.stack || null,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
