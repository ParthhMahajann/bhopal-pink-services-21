import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Phone, MessageCircle, MapPin, Star, Clock } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  rating: number;
  availability: string;
  image: string;
  verified: boolean;
  phone: string;
}

const ServiceCard = ({
  title,
  description,
  location,
  price,
  rating,
  availability,
  image,
  verified,
  phone,
}: ServiceCardProps) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm interested in your service: ${title}`);
    window.open(`https://wa.me/91${phone}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.open(`tel:+91${phone}`, "_blank");
  };

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <div className="relative">
        <img
          src={image}
          alt={`${title} - Real meet services in Bhopal, genuine dating profile with verified contact`}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {verified && (
          <Badge className="absolute top-3 left-3 bg-green-500 text-white">
            ✓ Verified
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {rating}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {location}
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {availability}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-primary">₹{price}</span>
          <span className="text-sm text-muted-foreground">per hour</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="whatsapp"
            size="sm"
            onClick={handleWhatsApp}
            className="flex-1 text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
          <Button
            variant="call"
            size="sm"
            onClick={handleCall}
            className="flex-1 text-sm"
          >
            <Phone className="h-4 w-4" />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;