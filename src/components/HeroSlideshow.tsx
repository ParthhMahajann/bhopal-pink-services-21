import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Phone, MessageCircle } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    id: 1,
    title: "Premium Genuine Services in Bhopal",
    subtitle: "Connect with verified and authentic service providers",
    description: "Experience the best companionship services with complete privacy and safety",
    image: hero1,
  },
  {
    id: 2,
    title: "Safe & Secure Platform",
    subtitle: "Your privacy is our priority",
    description: "All profiles are verified for your safety and peace of mind",
    image: hero2,
  },
  {
    id: 3,
    title: "24/7 Available Services",
    subtitle: "Always here when you need us",
    description: "Round the clock availability for your convenience",
    image: hero3,
  },
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919893805168", "_blank");
  };

  const handleCall = () => {
    window.open("tel:+919893805168", "_blank");
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-hero">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <h2 className="text-xl md:text-2xl mb-4 text-pink-200">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/90">
                  {slide.description}
                </p>
                
                {/* Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    variant="whatsapp"
                    size="lg"
                    onClick={handleWhatsApp}
                    className="flex items-center gap-2 text-lg px-8 py-3"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="call"
                    size="lg"
                    onClick={handleCall}
                    className="flex items-center gap-2 text-lg px-8 py-3"
                  >
                    <Phone className="h-5 w-5" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;