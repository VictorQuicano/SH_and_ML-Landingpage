import rss from "@astrojs/rss";
import { config } from "../config";

// Importa todos los JSON de servicios
import arquitectura from "../constants/arquitectura.json";
import ingenierias from "../constants/ingenierias.json";
import mecanica from "../constants/mecanica.json";
import saneamiento from "../constants/saneamiento.json";
import topografia from "../constants/topografia.json";

// Datos generales de la empresa
const empresa = {
  nombre: "INGENIERIASOLUCIONES SHYML_SRL",
  descripcion:
    "Empresa especializada en el desarrollo de proyectos de infraestructura civil e industrial, y la ejecución de obras. Con amplia experiencia en el sector público y privado, brindando soluciones integrales y seguras.",
  direccion: "CALLE CORBACHO 116 – DPTO 1 – CERCADO – AREQUIPA",
  telefonos: "958 225 370",
  correos: ["SHYML_SRL@HOTMAIL.COM", "EDWINMLEON@HOTMAIL.COM"],
};

export async function GET(context) {
  // Combina todos los servicios de los JSON
  const categorias = [
    {
      nombre: "Arquitectura",
      data: arquitectura.services,
      url: "arquitectura",
      descripcion:
        "Servicios de diseño arquitectónico integral en Arequipa y a nivel nacional. Incluye viviendas unifamiliares y multifamiliares, edificaciones comerciales e industriales, oficinas, diseño de interiores y remodelaciones. Incorporamos enfoques sostenibles, modelado 3D y control de calidad en la ejecución de obras.",
    },
    {
      nombre: "Servicio de Ingeniería para Obras",
      data: ingenierias.services,
      url: "ingenierias-para-obras",
      descripcion:
        "Supervisión, elaboración de expedientes técnicos, ejecución de obras y diseño estructural en concreto, acero y madera. Trabajamos proyectos de pavimentos, control de calidad y estudios de mecánica de suelos. Operamos en Arequipa y en todo el territorio nacional.",
    },
    {
      nombre: "Estudio de Mecánica de Suelos",
      data: mecanica.services,
      url: "mecanica-de-suelos",
      descripcion:
        "Realizamos estudios de mecánica de suelos, geotecnia y concreto para edificaciones, puentes, carreteras y pavimentos en Arequipa y otras regiones del Perú. Incluye ensayos de laboratorio y campo, cálculos geotécnicos, análisis de estabilidad de taludes y determinación de cimentaciones óptimas.",
    },
    {
      nombre: "Saneamiento Físico Legal",
      data: saneamiento.services,
      url: "saneamiento",
      descripcion:
        "Asesoría y ejecución de procesos de saneamiento físico legal de predios urbanos, rurales y eriazos, con cobertura en Arequipa y a nivel nacional. Contamos con arquitectos, ingenieros y abogados especializados en trámites de licencias, regularización y documentación técnica.",
    },
    {
      nombre: "Topografía Profesional",
      data: topografia.services,
      url: "topografia",
      descripcion:
        "Servicios topográficos con tecnología avanzada (drones, GPS, LIDAR) para levantamientos, replanteos y control de obra en Arequipa y en cualquier región del país. Incluye certificación de puntos IGN, informes técnicos y asistencia en proyectos de ingeniería y construcción.",
    },
  ];

  // Convertir cada servicio en un "item" de RSS
  const items = categorias.flatMap((categoria) =>
    categoria.data.map((servicio) => ({
      title: `${categoria.nombre} - ${servicio}`,
      description: categoria.descripcion,
      pubDate: new Date(), // Podrías poner una fecha real si la tienes en el JSON
      link: `/servicios/${categoria.url}/`,
    }))
  );

  return rss({
    title: empresa.nombre,
    description: empresa.descripcion,
    site: context.site,
    items,
    customData: `
      <language>es-pe</language>
      <managingEditor>${empresa.correos.join(", ")}</managingEditor>
    `,
  });
}
