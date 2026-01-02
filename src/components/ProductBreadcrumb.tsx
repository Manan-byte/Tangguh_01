import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductBreadcrumbProps {
  productName: string;
  productSlug: string;
}

export const ProductBreadcrumb = ({ productName, productSlug }: ProductBreadcrumbProps) => {
  const { language } = useLanguage();
  
  const baseUrl = "https://tangguhev.com";
  
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": language === "id" ? "Beranda" : "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": language === "id" ? "Produk" : "Products",
        "item": `${baseUrl}/#produk`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": productName,
        "item": `${baseUrl}/produk/${productSlug}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      </Helmet>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Home className="w-4 h-4" />
                <span>{language === "id" ? "Beranda" : "Home"}</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/#produk" className="hover:text-primary transition-colors">
                {language === "id" ? "Produk" : "Products"}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary font-medium">{productName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
