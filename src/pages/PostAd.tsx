import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, MapPin, Phone, MessageCircle, X, Eye, Edit, Save } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

// India cities and states data
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Jammu and Kashmir", "Ladakh"
];

const cities = [
  "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna", 
  "Ratlam", "Rewa", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
  "Pune", "Ahmedabad", "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam",
  "Agra", "Meerut", "Nashik", "Faridabad", "Patna", "Ghaziabad", "Ludhiana", "Coimbatore"
];

const categories = ["Call Girls", "Massage", "Dating", "Companionship", "Entertainment"];
const subcategories = ["Female", "Male", "Couple", "Trans", "Other"];
const genders = ["Male", "Female", "Trans", "Couple", "Other"];
const orientations = ["Straight", "Gay", "Bi", "Other"];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)", "Night (12AM-6AM)"];

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().min(1, "Please select a subcategory"),
  city: z.string().min(1, "Please select a city"),
  state: z.string().min(1, "Please select a state"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  age: z.string().min(1, "Please enter age"),
  gender: z.string().min(1, "Please select gender"),
  orientation: z.string().min(1, "Please select orientation"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  description: z.string().min(50, "Description must be at least 50 characters"),
  pricing: z.string().optional(),
  availableDays: z.array(z.string()).min(1, "Please select at least one day"),
  availableTime: z.array(z.string()).min(1, "Please select at least one time slot"),
  whatsappEnabled: z.boolean(),
  showPhone: z.boolean(),
  emailVerification: z.boolean(),
  phoneVerification: z.boolean(),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept terms and conditions")
});

type FormData = z.infer<typeof formSchema>;

const PostAd = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      subcategory: "",
      city: "",
      state: "",
      displayName: "",
      age: "",
      gender: "",
      orientation: "",
      phone: "",
      email: "",
      description: "",
      pricing: "",
      availableDays: [],
      availableTime: [],
      whatsappEnabled: false,
      showPhone: true,
      emailVerification: false,
      phoneVerification: false,
      termsAccepted: false
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (uploadedImages.length + files.length > 8) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 8 images",
        variant: "destructive"
      });
      return;
    }
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    if (uploadedImages.length === 0) {
      toast({
        title: "No images uploaded",
        description: "Please upload at least one image",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert images to base64 for persistence
      const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      };

      const imageBase64s = await Promise.all(
        uploadedImages.map(img => convertToBase64(img))
      );

      // Create new ad object
      const newAd = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        location: `${data.city}, ${data.state}`,
        price: data.pricing || "Contact for rates",
        rating: 5.0,
        availability: `${data.availableDays.join(", ")} - ${data.availableTime.join(", ")}`,
        image: imageBase64s[0],
        verified: data.phoneVerification || data.emailVerification,
        phone: data.phone,
        displayName: data.displayName,
        age: data.age,
        gender: data.gender,
        category: data.category,
        subcategory: data.subcategory,
        whatsappEnabled: data.whatsappEnabled,
        showPhone: data.showPhone,
        images: imageBase64s
      };

      // Enhanced Safari-compatible localStorage save
      const existingAdsString = localStorage.getItem("postedAds");
      const existingAds = existingAdsString ? JSON.parse(existingAdsString) : [];
      existingAds.unshift(newAd); // Add to beginning for latest first
      
      // Save to localStorage with multiple Safari-specific techniques
      localStorage.setItem("postedAds", JSON.stringify(existingAds));
      
      // Force Safari to flush localStorage
      const verification = localStorage.getItem("postedAds");
      console.log("Ad saved, verification:", verification ? "SUCCESS" : "FAILED");
      
      // Multiple event dispatch techniques for Safari
      setTimeout(() => {
        // Custom event
        window.dispatchEvent(new CustomEvent('postedAdsUpdated', { 
          detail: { newAd, totalAds: existingAds.length } 
        }));
        
        // Storage event simulation
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'postedAds',
          newValue: JSON.stringify(existingAds),
          oldValue: existingAdsString,
          storageArea: localStorage,
          url: window.location.href
        }));
        
        // Force focus events for Safari
        window.dispatchEvent(new Event('focus'));
        window.dispatchEvent(new Event('pageshow'));
        
        console.log("All events dispatched for Safari compatibility");
      }, 10);
      
      // Success feedback
      toast({
        title: "🎉 Ad Posted Successfully!",
        description: `Your ad "${data.title}" is now live and visible to users. It will appear at the top of the homepage.`,
        duration: 5000,
      });

      // Reset form
      form.reset();
      setUploadedImages([]);
      
      console.log("Ad posting process completed successfully");
      
    } catch (error) {
      console.error("Error saving ad:", error);
      toast({
        title: "Error posting ad",
        description: "There was an error posting your ad. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Ad Preview</h1>
              <Button onClick={() => setIsPreview(false)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Ad
              </Button>
            </div>
            
            <Card className="shadow-glow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">{form.getValues("title")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={uploadedImages[0] ? URL.createObjectURL(uploadedImages[0]) : "/placeholder.svg"} 
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <p><strong>Category:</strong> {form.getValues("category")} - {form.getValues("subcategory")}</p>
                    <p><strong>Location:</strong> {form.getValues("city")}, {form.getValues("state")}</p>
                    <p><strong>Age:</strong> {form.getValues("age")}</p>
                    <p><strong>Contact:</strong> {form.getValues("showPhone") ? form.getValues("phone") : "Hidden"}</p>
                    <div className="flex gap-2">
                      <Button variant="whatsapp" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button variant="call" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{form.getValues("description")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Post Your Service Ad
            </h1>
            <p className="text-muted-foreground text-lg">
              Create an attractive listing to connect with genuine clients
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Section 1: Basic Info */}
              <Card className="shadow-glow border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">🔹 Section 1: Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Row 1: Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title of Ad *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Premium Companionship Service in Bhopal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Row 2 & 3: Category and Subcategory */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover border-border">
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subcategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategory *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover border-border">
                              {subcategories.map((sub) => (
                                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 4: Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover border-border max-h-60">
                              {cities.map((city) => (
                                <SelectItem key={city} value={city}>{city}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover border-border max-h-60">
                              {states.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 5 & 6: Name and Age */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Priya, Raj, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 25" min="18" max="65" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 7 & 8: Gender and Orientation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover border-border">
                              {genders.map((gender) => (
                                <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="orientation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Orientation *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select orientation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover border-border">
                              {orientations.map((orientation) => (
                                <SelectItem key={orientation} value={orientation}>{orientation}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 9: Contact Number with WhatsApp */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="tel" 
                              placeholder="e.g., 9893805168" 
                              className="pl-10"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <div className="flex items-center space-x-2 mt-2">
                          <FormField
                            control={form.control}
                            name="whatsappEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm">WhatsApp Available</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Row 10: Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Section 2: Ad Details */}
              <Card className="shadow-glow border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">🔹 Section 2: Ad Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Row 11: Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your service in detail. Be professional and clear about what you offer..."
                            rows={6}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Row 12: Pricing */}
                  <FormField
                    control={form.control}
                    name="pricing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pricing / Rate Details (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., ₹5000/hour, ₹30000/night, Package deals available..."
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Row 13: Availability */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Availability *</Label>
                    
                    <FormField
                      control={form.control}
                      name="availableDays"
                      render={() => (
                        <FormItem>
                          <FormLabel>Available Days</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {days.map((day) => (
                              <FormField
                                key={day}
                                control={form.control}
                                name="availableDays"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(day)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, day])
                                            : field.onChange(field.value?.filter((value) => value !== day))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer">
                                      {day}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availableTime"
                      render={() => (
                        <FormItem>
                          <FormLabel>Time Slots</FormLabel>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {timeSlots.map((slot) => (
                              <FormField
                                key={slot}
                                control={form.control}
                                name="availableTime"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(slot)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, slot])
                                            : field.onChange(field.value?.filter((value) => value !== slot))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer">
                                      {slot}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Media Upload */}
              <Card className="shadow-glow border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">🔹 Section 3: Media Upload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Row 14-15: Photo Upload */}
                  <div className="space-y-4">
                    <Label>Upload Photos (Max 8) *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-2">
                        Click to upload or drag and drop images
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        PNG, JPG up to 5MB each (Max 8 images)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button type="button" variant="outline" asChild>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          Choose Images
                        </label>
                      </Button>
                    </div>
                    
                    {/* Image Preview */}
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </CardContent>
              </Card>

              {/* Section 4: Privacy & Verification */}
              <Card className="shadow-glow border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">🔹 Section 4: Privacy & Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Row 16: Show/Hide Phone */}
                  <FormField
                    control={form.control}
                    name="showPhone"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Show Phone Number in Ad</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            When disabled, clients can only contact via contact buttons
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Row 17: Verification Options */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Verification Options</Label>
                    
                    <FormField
                      control={form.control}
                      name="phoneVerification"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Phone Verification (Recommended)
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emailVerification"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Email Verification
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 18: Terms & Conditions */}
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          I accept the Terms & Conditions and confirm I am 18+ years old *
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Section 5: Post Ad */}
              <Card className="shadow-glow border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">🔹 Section 5: Post Ad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Row 19: Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="hero" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {isSubmitting ? "Posting Your Ad..." : "Post My Ad"}
                  </Button>
                  
                  {/* Row 20: Preview Button */}
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => setIsPreview(true)}
                    disabled={isSubmitting}
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    Preview Ad
                  </Button>
                  
                  {/* Row 21: Edit Later Option */}
                  <p className="text-center text-sm text-muted-foreground">
                    You can edit your ad later from your dashboard after posting
                  </p>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By posting this ad, you confirm that you are 18+ and agree to our terms of service
                  </p>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostAd;
