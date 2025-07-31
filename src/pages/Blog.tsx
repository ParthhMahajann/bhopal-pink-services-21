import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";

const blogPosts = [
  {
    id: 1,
    slug: "safe-offline-meetings",
    title: "How to Meet Safely Offline: Essential Tips for Real Dates",
    excerpt: "Complete guide to staying safe when meeting someone from online dating platforms. Learn the red flags, safety protocols, and best practices.",
    content: `
      <h2>Safety First: Your Complete Guide to Offline Meetings</h2>
      <p>Meeting someone offline for the first time can be exciting but requires careful planning. Here's your comprehensive safety guide.</p>
      
      <h3>Before the Meeting</h3>
      <ul>
        <li>Verify their identity through video calls</li>
        <li>Choose public venues for first meetings</li>
        <li>Inform trusted friends about your plans</li>
        <li>Share location with emergency contacts</li>
      </ul>
      
      <h3>During the Meeting</h3>
      <ul>
        <li>Trust your instincts</li>
        <li>Stay in public areas</li>
        <li>Keep conversations appropriate</li>
        <li>Have an exit strategy ready</li>
      </ul>
      
      <h3>Red Flags to Watch For</h3>
      <ul>
        <li>Refusing to meet in public</li>
        <li>Pressuring for immediate meetings</li>
        <li>Avoiding video verification</li>
        <li>Inconsistent information</li>
      </ul>
    `,
    author: "Safety Team",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Safety",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    slug: "real-vs-fake-profiles",
    title: "Signs of Real vs Fake Profiles: How to Spot Authentic People",
    excerpt: "Learn to identify genuine profiles from fake ones. Essential tips to avoid scams and connect with real people on dating platforms.",
    content: `
      <h2>Identifying Authentic Profiles</h2>
      <p>In the world of online dating, distinguishing real profiles from fake ones is crucial for your safety and success.</p>
      
      <h3>Signs of Real Profiles</h3>
      <ul>
        <li>Multiple genuine photos from different angles</li>
        <li>Detailed, personal bio information</li>
        <li>Verified contact information</li>
        <li>Natural conversation style</li>
        <li>Willing to video chat before meeting</li>
      </ul>
      
      <h3>Red Flags of Fake Profiles</h3>
      <ul>
        <li>Professional model-quality photos only</li>
        <li>Limited or generic bio information</li>
        <li>Immediate requests for money</li>
        <li>Avoiding phone or video calls</li>
        <li>Poor grammar or copy-paste messages</li>
      </ul>
      
      <h3>Verification Tips</h3>
      <ul>
        <li>Ask for live photos with specific poses</li>
        <li>Use reverse image search on photos</li>
        <li>Request video verification</li>
        <li>Check social media presence</li>
      </ul>
    `,
    author: "Verification Team",
    date: "2024-01-10",
    readTime: "4 min read",
    category: "Tips",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    slug: "bhopal-night-dating-guide",
    title: "Bhopal Night Dating Guide: Best Places and Safety Tips",
    excerpt: "Discover the best nightlife spots in Bhopal for safe and enjoyable dates. Local insights and recommendations for memorable evenings.",
    content: `
      <h2>Bhopal's Best Night Dating Spots</h2>
      <p>Bhopal offers numerous safe and romantic venues for evening dates. Here's your complete guide to the city's nightlife.</p>
      
      <h3>Top Restaurants for Dinner Dates</h3>
      <ul>
        <li>Wind n Waves - Lake view dining with ambiance</li>
        <li>Marriott Hotel restaurants - Premium dining experience</li>
        <li>Jehan Numa Palace - Heritage luxury dining</li>
        <li>DB City Mall food courts - Casual and safe options</li>
      </ul>
      
      <h3>Coffee Shops for Late Evening Meetings</h3>
      <ul>
        <li>Café Coffee Day outlets - Multiple locations</li>
        <li>Starbucks at DB City - Modern and comfortable</li>
        <li>Local cafés in MP Nagar - Cozy atmosphere</li>
      </ul>
      
      <h3>Entertainment Options</h3>
      <ul>
        <li>Multiplexes for movie dates</li>
        <li>Upper Lake boat rides (evening hours)</li>
        <li>Van Vihar evening walks</li>
        <li>Regional Science Centre events</li>
      </ul>
      
      <h3>Safety Tips for Night Dating in Bhopal</h3>
      <ul>
        <li>Choose well-lit, populated areas</li>
        <li>Use reliable transportation (Uber/Ola)</li>
        <li>Keep emergency contacts handy</li>
        <li>Inform someone about your location</li>
      </ul>
    `,
    author: "Local Guide",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Local Guide",
    image: "/placeholder.svg"
  }
];

const Blog = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "BhopalGenuineServices Blog",
    "description": "Dating safety tips, profile verification guides, and local Bhopal dating advice",
    "url": "https://bhopalgenuineservices.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "BhopalGenuineServices",
      "url": "https://bhopalgenuineservices.com"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://bhopalgenuineservices.com/blog/${post.slug}`,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Dating Safety Blog - Tips for Real Meet Services | BhopalGenuineServices"
        description="Expert dating advice, safety tips for offline meetings, and Bhopal dating guide. Learn to identify real profiles and stay safe while dating online."
        keywords="dating safety tips, Bhopal dating guide, real profile verification, safe offline meetings, online dating advice, Bhopal nightlife"
        url="https://bhopalgenuineservices.com/blog"
        schemaData={schemaData}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Dating Safety & Tips Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert advice on safe dating, profile verification, and making genuine connections in Bhopal
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                    <Calendar className="h-3 w-3 ml-2" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1"
                  >
                    Read More
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;