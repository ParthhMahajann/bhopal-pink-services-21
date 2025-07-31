import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin } from "lucide-react";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";
import service3 from "@/assets/service-3.jpg";

const cities = [
  "All Cities", "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Mumbai", "Delhi"
];

const mockServices = [
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

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [priceRange, setPriceRange] = useState("all");

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "All Cities" || 
                       service.location.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesPrice = priceRange === "all" ||
                        (priceRange === "low" && parseInt(service.price) < 4000) ||
                        (priceRange === "medium" && parseInt(service.price) >= 4000 && parseInt(service.price) < 6000) ||
                        (priceRange === "high" && parseInt(service.price) >= 6000);
    
    return matchesSearch && matchesCity && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Browse Services
          </h1>
          <p className="text-muted-foreground text-lg">
            Find genuine and verified service providers in your city
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-card rounded-lg shadow-card p-6 mb-8 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* City Filter */}
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under ₹4,000</SelectItem>
                <SelectItem value="medium">₹4,000 - ₹6,000</SelectItem>
                <SelectItem value="high">Above ₹6,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {filteredServices.length} Services Found
          </h2>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Service Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-card rounded-lg p-8 max-w-md mx-auto shadow-card">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Services Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all services
              </p>
              <Button
                variant="hero"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCity("All Cities");
                  setPriceRange("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Load More */}
        {filteredServices.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Services
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;