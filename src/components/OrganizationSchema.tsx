import { Helmet } from "react-helmet-async";

export const OrganizationSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://tangguhev.com/#organization",
    name: "Tangguh Electric Vehicle",
    alternateName: "Tangguh EV",
    url: "https://tangguhev.com",
    logo: {
      "@type": "ImageObject",
      url: "https://tangguhev.com/logo-tangguh.png",
      width: 200,
      height: 200,
    },
    image: "https://tangguhev.com/images/hero-bike.jpg",
    description:
      "Perusahaan profesional di bidang Kendaraan Listrik Kreatif. Produsen motor trail listrik dan penyedia layanan konversi motor BBM ke listrik di Indonesia.",
    slogan: "Unlimited Adventure",
    foundingDate: "2020",
    foundingLocation: {
      "@type": "Place",
      name: "Indonesia",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Raya Industri No. 123",
      addressLocality: "Bandung",
      addressRegion: "Jawa Barat",
      postalCode: "40123",
      addressCountry: "ID",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+62-812-3456-7890",
        contactType: "sales",
        availableLanguage: ["Indonesian", "English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+62-812-3456-7890",
        contactType: "customer service",
        availableLanguage: ["Indonesian", "English"],
      },
    ],
    email: "info@tangguhev.com",
    sameAs: [
      "https://www.instagram.com/tangguhev",
      "https://www.facebook.com/tangguhev",
      "https://www.youtube.com/@tangguhev",
      "https://www.tiktok.com/@tangguhev",
    ],
    knowsAbout: [
      "Motor Trail Listrik",
      "Electric Motorcycle",
      "Konversi Motor Listrik",
      "Electric Vehicle Conversion",
      "Kendaraan Listrik",
      "Green Technology",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Tangguh ST3",
          description: "Motor trail listrik dual purpose",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Tangguh DX4",
          description: "Motor trail listrik racing performance",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Tangguh SP5",
          description: "Motor supermoto listrik",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Konversi Motor Listrik",
          description: "Layanan konversi motor BBM ke motor listrik",
        },
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://tangguhev.com/#localbusiness",
    name: "Tangguh Electric Vehicle",
    image: "https://tangguhev.com/images/hero-bike.jpg",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Raya Industri No. 123",
      addressLocality: "Bandung",
      addressRegion: "Jawa Barat",
      postalCode: "40123",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.9175,
      longitude: 107.6191,
    },
    url: "https://tangguhev.com",
    telephone: "+62-812-3456-7890",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://tangguhev.com/#website",
    url: "https://tangguhev.com",
    name: "Tangguh Electric Vehicle",
    description: "Motor Trail Listrik Indonesia - Unlimited Adventure",
    publisher: {
      "@id": "https://tangguhev.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://tangguhev.com/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["id", "en"],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};
