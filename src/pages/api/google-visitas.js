import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: import.meta.env.FIREBASE_PROJECT_ID,
      clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
      privateKey: import.meta.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export async function GET() {
  try {
    const ref = db.collection("stats").doc("visitas");
    await db.runTransaction(async (t) => {
      const doc = await t.get(ref);
      if (!doc.exists) {
        t.set(ref, { count: 1 });
      } else {
        t.update(ref, { count: doc.data().count + 1 });
      }
    });

    const updatedDoc = await ref.get();
    const count = updatedDoc.data().count;

    return new Response(JSON.stringify({ visitas: count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error contando visitas:", error);
    return new Response(
      JSON.stringify({ error: "No se pudo contar visitas" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
