import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductSchemaProps {
  name: string;
  slug: string;
  description: string;
  price: number;
  image?: string;
  specs: {
    topSpeed: string;
    range: string;
    power: string;
  };
  warranty: string;
}

// Sample reviews data for each product
const productReviews: Record<string, { rating: number; ratingCount: number; reviews: { author: string; rating: number; reviewBody: string; datePublished: string }[] }> = {
  st3: {
    rating: 4.7,
    ratingCount: 32,
    reviews: [
      {
        author: "Budi Santoso",
        rating: 5,
        reviewBody: "Motor listrik terbaik untuk pemula! Sangat mudah dikendarai dan baterainya awet. Sudah 6 bulan pakai tanpa masalah.",
        datePublished: "2025-10-15"
      },
      {
        author: "Rina Wijaya",
        rating: 5,
        reviewBody: "Dual purpose yang benar-benar bisa diandalkan. Saya pakai untuk off-road weekend dan daily commute. Hemat banget!",
        datePublished: "2025-09-22"
      },
      {
        author: "Ahmad Fadli",
        rating: 4,
        reviewBody: "Performa bagus untuk harga segini. Charging cepat dan service center responsif. Recommended!",
        datePublished: "2025-08-10"
      }
    ]
  },
  dx4: {
    rating: 4.9,
    ratingCount: 18,
    reviews: [
      {
        author: "Dimas Prasetyo",
        rating: 5,
        reviewBody: "Beast mode! Akselerasi gila, handling presisi. Untuk yang serius mau racing, DX4 jawabannya.",
        datePublished: "2025-11-05"
      },
      {
        author: "Kevin Hartono",
        rating: 5,
        reviewBody: "Investasi terbaik untuk hobi trail. Tenaga 10kW terasa banget di medan berat. Build quality premium.",
        datePublished: "2025-10-28"
      },
      {
        author: "Rizky Maulana",
        rating: 5,
        reviewBody: "Sudah ikut 3 event grasstrack dengan DX4, selalu podium. Motor ini memang dirancang untuk menang!",
        datePublished: "2025-09-15"
      }
    ]
  },
  sp5: {
    rating: 4.8,
    ratingCount: 25,
    reviews: [
      {
        author: "Yoga Permana",
        rating: 5,
        reviewBody: "Range 120km itu bukan kaleng-kaleng. Jakarta-Bandung PP tanpa charging. Supermoto sejati!",
        datePublished: "2025-11-12"
      },
      {
        author: "Sari Indah",
        rating: 5,
        reviewBody: "Nyaman banget untuk touring. Mode Eco sangat efisien, Sport untuk seru-seruan. Versatile!",
        datePublished: "2025-10-01"
      },
      {
        author: "Hendra Gunawan",
        rating: 4,
        reviewBody: "ABS-nya kerasa banget di jalan basah. Safety first! Design juga keren, banyak yang nanya.",
        datePublished: "2025-08-25"
      }
    ]
  }
};

export const ProductSchema = ({
  name,
  slug,
  description,
  price,
  image,
  specs,
  warranty,
}: ProductSchemaProps) => {
  const { language } = useLanguage();
  
  const baseUrl = "https://tangguhev.com";
  const reviewData = productReviews[slug] || productReviews.st3;
  
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Tangguh ${name} - Motor Trail Listrik`,
    "description": description,
    "image": image || `${baseUrl}/images/${slug}.jpg`,
    "url": `${baseUrl}/produk/${slug}`,
    "sku": `TANGGUH-${name.toUpperCase()}`,
    "mpn": `TEV-${name.toUpperCase()}-2025`,
    "brand": {
      "@type": "Brand",
      "name": "Tangguh Electric Vehicle"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Tangguh Electric Vehicle",
      "url": baseUrl
    },
    "category": language === "id" ? "Motor Listrik" : "Electric Motorcycle",
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/produk/${slug}`,
      "priceCurrency": "IDR",
      "price": price,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Tangguh Electric Vehicle"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "ID"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 7,
            "unitCode": "d"
          }
        }
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": language === "id" ? "Kecepatan Maksimal" : "Top Speed",
        "value": specs.topSpeed
      },
      {
        "@type": "PropertyValue",
        "name": language === "id" ? "Jarak Tempuh" : "Range",
        "value": specs.range
      },
      {
        "@type": "PropertyValue",
        "name": language === "id" ? "Tenaga" : "Power",
        "value": specs.power
      }
    ],
    "hasWarranty": {
      "@type": "WarrantyPromise",
      "durationOfWarranty": {
        "@type": "QuantitativeValue",
        "value": warranty,
        "unitCode": "ANN"
      },
      "warrantyScope": {
        "@type": "WarrantyScope",
        "name": language === "id" ? "Garansi Resmi" : "Official Warranty"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviewData.rating.toString(),
      "reviewCount": reviewData.ratingCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviewData.reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished,
      "publisher": {
        "@type": "Organization",
        "name": "Tangguh Electric Vehicle"
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productJsonLd)}
      </script>
    </Helmet>
  );
};
