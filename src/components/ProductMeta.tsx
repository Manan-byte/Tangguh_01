import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductMetaProps {
  name: string;
  slug: string;
  description: string;
  price: string;
  image?: string;
}

export const ProductMeta = ({
  name,
  slug,
  description,
  price,
  image,
}: ProductMetaProps) => {
  const { language } = useLanguage();
  
  const baseUrl = "https://tangguhev.com";
  const productUrl = `${baseUrl}/produk/${slug}`;
  const productImage = image || `${baseUrl}/images/${slug}.jpg`;
  
  const title = language === "id" 
    ? `${name} - Motor Trail Listrik | Tangguh EV`
    : `${name} - Electric Trail Bike | Tangguh EV`;
    
  const metaDescription = language === "id"
    ? `${name} dari Tangguh Electric Vehicle. ${description} Harga mulai ${price}. Pesan sekarang!`
    : `${name} from Tangguh Electric Vehicle. ${description} Starting from ${price}. Order now!`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={productUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="product" />
      <meta property="og:url" content={productUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={productImage} />
      <meta property="og:locale" content={language === "id" ? "id_ID" : "en_US"} />
      <meta property="og:site_name" content="Tangguh Electric Vehicle" />
      
      {/* Product specific OG tags */}
      <meta property="product:price:amount" content={price.replace(/[^0-9]/g, '')} />
      <meta property="product:price:currency" content="IDR" />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:brand" content="Tangguh Electric Vehicle" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={productUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={productImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content={`${name}, motor listrik, motor trail listrik, electric motorcycle, Tangguh EV, kendaraan listrik Indonesia`} />
    </Helmet>
  );
};
