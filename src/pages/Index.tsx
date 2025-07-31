import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock, Phone, MessageCircle, MapPin, Heart, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import ServiceCard from "@/components/ServiceCard";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";
import service3 from "@/assets/service-3.jpg";

const recentAds = [
  {
    id: "1",
    title: "Premium Companionship Service",
    description: "Elegant and sophisticated companion for social events and private meetings.",
    location: "MP Nagar, Bhopal",
    price: "5000",
    rating: 4.8,
    availability: "24/7 Available",
    image: service1,
    verified: true,
    phone: "9893805168",
  },
  {
    id: "2",
    title: "Professional Escort Service",
    description: "Discreet and professional service with complete privacy guaranteed.",
    location: "New Market, Bhopal",
    price: "4000",
    rating: 4.6,
    availability: "Evening/Night",
    image: service2,
    verified: true,
    phone: "9893805168",
  },
  {
    id: "3",
    title: "VIP Companion Service",
    description: "High-class companion service for business meetings and social gatherings.",
    location: "Arera Colony, Bhopal",
    price: "6000",
    rating: 4.9,
    availability: "By Appointment",
    image: service3,
    verified: true,
    phone: "9893805168",
  },
];

const features = [
  {
    icon: Shield,
    title: "100% Verified Profiles",
    description: "All service providers are thoroughly verified for your safety and peace of mind.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Services available round the clock to meet your convenience and schedule.",
  },
  {
    icon: Users,
    title: "Genuine Services",
    description: "Connect with authentic and professional service providers across India.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "High-quality services with complete discretion and professionalism.",
  },
];

const Index = () => {
  const [postedAds, setPostedAds] = useState([]);

  // Schema.org structured data for local business
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BhopalGenuineServices",
    "description": "India's most trusted platform for genuine adult services and real meet services in Bhopal",
    "url": "https://bhopalgenuineservices.com",
    "telephone": "+919893805168",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhopal",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.2599",
      "longitude": "77.4126"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "sameAs": [
      "https://wa.me/919893805168"
    ]
  };

  useEffect(() => {
    const loadAds = () => {
      try {
        const adsString = localStorage.getItem("postedAds");
        if (adsString) {
          const ads = JSON.parse(adsString);
          console.log("Loading ads:", ads.length, "items loaded");
          // Create new array to force React re-render in Safari
          setPostedAds([...ads]);
        } else {
          console.log("No ads found in localStorage");
          setPostedAds([]);
        }
      } catch (error) {
        console.error("Error loading ads:", error);
        setPostedAds([]);
      }
    };
    
    // Initial load
    loadAds();
    
    // Safari-compatible event handling with multiple fallbacks
    const handleStorageChange = (e?: StorageEvent) => {
      console.log("Storage event detected:", e?.key);
      if (!e || e.key === 'postedAds') {
        setTimeout(loadAds, 50); // Small delay for Safari
      }
    };
    
    const handleCustomEvent = () => {
      console.log("Custom postedAdsUpdated event detected");
      setTimeout(loadAds, 10); // Immediate reload
    };
    
    // Multiple event listeners for maximum compatibility
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('postedAdsUpdated', handleCustomEvent);
    
    // Aggressive polling specifically for Safari
    const safariPollInterval = setInterval(() => {
      try {
        const currentAdsString = localStorage.getItem("postedAds");
        const currentAds = currentAdsString ? JSON.parse(currentAdsString) : [];
        
        // Check if ads have changed
        if (currentAds.length !== postedAds.length) {
          console.log("Safari polling detected ads change:", currentAds.length, "vs", postedAds.length);
          setPostedAds([...currentAds]);
        }
      } catch (error) {
        console.error("Safari polling error:", error);
      }
    }, 200); // Very frequent polling for immediate updates
    
    // Additional visibility change handler for Safari
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(loadAds, 10);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('postedAdsUpdated', handleCustomEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(safariPollInterval);
    };
  }, []); // No dependencies to prevent infinite loops

  const allAds = [...postedAds, ...recentAds];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="BhopalGenuineServices.com - Real Meet Services in Bhopal | Genuine Dating | 18+ Verified Profiles"
        description="#1 platform for real meet services in Bhopal ✓ Genuine dating ✓ 18+ real profile contacts ✓ Verified members ✓ Safe offline meetings ✓ Premium adult services across India"
        keywords="real meet services in Bhopal, genuine dating Bhopal, 18+ real profile contacts, Bhopal escort services, verified dating profiles, safe offline meetings, adult services Bhopal, premium companionship Bhopal, real people dating, authentic profiles Bhopal"
        schemaData={schemaData}
      />
      <Header />
      
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Real Meet Services in Bhopal - Genuine Dating Platform
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              India's most trusted platform for 18+ real profile contacts and safe offline meetings in Bhopal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-glow transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="font-semibold text-lg mb-2">{feature.title}</h2>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Ads Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Latest Real Profile Contacts - Genuine Dating Bhopal
              </h2>
              <p className="text-muted-foreground">
                Recently verified 18+ real profile contacts and trusted service providers in Bhopal
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse">View All Verified Profiles</Link>
            </Button>
          </div>

          {allAds.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No ads available yet. Be the first to post!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allAds.map((ad) => (
                <ServiceCard key={ad.id} {...ad} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <Heart className="h-16 w-16 mx-auto mb-6 text-pink-200" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Connect?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of satisfied clients who trust BhopalGenuineServices for authentic connections
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/browse">Browse Services</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/post-ad">Post Your Ad</Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <p className="text-lg mb-4">Need Help? Contact Us</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="whatsapp"
                  onClick={() => window.open("https://wa.me/919893805168", "_blank")}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
                <Button
                  variant="call"
                  onClick={() => window.open("tel:+919893805168", "_blank")}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">BhopalGenuineServices</h3>
                  <p className="text-xs text-muted-foreground">.com</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                India's most trusted platform for genuine adult services with complete privacy and safety.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/browse" className="hover:text-primary">Browse Real Profiles</Link></li>
                <li><Link to="/post-ad" className="hover:text-primary">Post Your Ad</Link></li>
                <li><Link to="/blog" className="hover:text-primary">Dating Safety Blog</Link></li>
                <li><Link to="/login" className="hover:text-primary">Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Safety & Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/blog/safe-offline-meetings" className="hover:text-primary">Safety Tips</Link></li>
                <li><Link to="/blog/real-vs-fake-profiles" className="hover:text-primary">Profile Verification</Link></li>
                <li><Link to="/blog/bhopal-night-dating-guide" className="hover:text-primary">Bhopal Dating Guide</Link></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Support
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Support
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Bhopal, India
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 BhopalGenuineServices.com. All rights reserved. | 18+ Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
