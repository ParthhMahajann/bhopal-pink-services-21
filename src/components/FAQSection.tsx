import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I verify if a profile is real on BhopalGenuineServices?",
    answer: "All profiles on our platform go through a verification process. Look for the verified badge, check multiple photos, and use our video call feature before meeting. Real profiles will have detailed information and be willing to verify their identity through video chat."
  },
  {
    question: "Is it safe to meet people from BhopalGenuineServices in Bhopal?",
    answer: "Yes, when you follow safety guidelines. Always meet in public places like DB City Mall, MP Nagar restaurants, or popular cafes. Inform friends about your plans, use verified profiles only, and trust your instincts. We provide safety tips and 24/7 support."
  },
  {
    question: "What makes BhopalGenuineServices different from other dating platforms?",
    answer: "We focus exclusively on genuine, verified profiles for real meetings in Bhopal and across India. Our platform ensures 100% profile verification, provides local safety guidance, and maintains strict quality standards for authentic connections."
  },
  {
    question: "How quickly can I start connecting with verified profiles?",
    answer: "Once you complete your profile verification (usually within 24 hours), you can immediately start browsing and connecting with verified members. Our instant messaging and video call features help you connect safely and quickly."
  },
  {
    question: "What safety measures does BhopalGenuineServices provide?",
    answer: "We offer comprehensive safety features including profile verification, video call capabilities, safety tips for offline meetings, 24/7 customer support, and detailed guides for safe dating in Bhopal. All members must be 18+ and verified."
  },
  {
    question: "Can I find genuine dating opportunities in Bhopal through this platform?",
    answer: "Absolutely! Our platform specializes in connecting people for genuine dating and real meetings in Bhopal. We have verified members across MP Nagar, Arera Colony, New Market, and other prime locations in Bhopal."
  },
  {
    question: "How do I report suspicious or fake profiles?",
    answer: "Use the report button on any profile or contact our support team immediately. We take fake profiles seriously and investigate all reports within 24 hours. Our verification system helps prevent fake profiles from joining."
  },
  {
    question: "What are the best places in Bhopal for safe first meetings?",
    answer: "We recommend popular public venues like Wind n Waves restaurant, Marriott Hotel, DB City Mall food court, or cafes in MP Nagar. These locations are safe, well-lit, and have good security for comfortable first meetings."
  }
];

const FAQSection = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 bg-gradient-to-br from-secondary/20 to-background">
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about genuine dating and real meet services in Bhopal
            </p>
          </CardHeader>
          
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQSection;