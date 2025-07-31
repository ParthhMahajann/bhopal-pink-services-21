import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schemaData?: object;
}

const SEOHead = ({
  title = "BhopalGenuineServices.com - Premium Real Meet Services | 18+ Genuine Dating Bhopal",
  description = "India's most trusted platform for real meet services in Bhopal. Genuine dating profiles, verified 18+ contacts, and safe offline meetings. Connect with authentic people today!",
  keywords = "real meet services Bhopal, genuine dating Bhopal, 18+ real profile contacts, Bhopal escort services, verified dating profiles, safe offline meetings, adult services Bhopal",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://bhopalgenuineservices.com",
  type = "website",
  schemaData
}: SEOHeadProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="BhopalGenuineServices" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="en" />
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Bhopal" />
      <meta name="geo.position" content="23.2599;77.4126" />
      <meta name="ICBM" content="23.2599, 77.4126" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BhopalGenuineServices" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@bhopalgenuine" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Schema.org JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;