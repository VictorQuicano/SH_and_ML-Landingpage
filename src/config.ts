export interface SiteConfig {
  title: string;
  description: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
  social: {
    facebook?: string;
    whatsapp?: string;
    linkedin?: string;
    email?: string;
  };
  siteUrl: string;
}

export const config: SiteConfig = {
  title: "Ingeniería Soluciones SH & ML S.R.L.",
  description:
    "Empresa dedicada a ingenieria y topografia en edificaciones, carreteras, canales, puentes, etc.",
  author: {
    name: "Edwin Miranda Leon",
    bio: "Ing Civil y Bach en Ing. Industrial.",
    // avatar: "/images/avatar.jpg" // Uncomment and add your avatar image to public/images/
  },
  social: {
    facebook: "https://www.facebook.com/shymlingenieriasoluciones",
    whatsapp: "https://wa.me/51958225370",
    linkedin:
      "https://www.linkedin.com/in/edwin-ismael-miranda-le%C3%B3n-0969552a1/?originalSubdomain=pe",
    email: "shyml_srl@hotmail.com",
  },
  siteUrl: "https://ingenieriasoluciones.com.pe/",
};

// Export constants for SEO component
export const SITE_TITLE = config.title;
export const SITE_DESCRIPTION = config.description;
