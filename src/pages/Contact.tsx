import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Users, Podcast } from "lucide-react";
import ContactDialog from "@/components/ContactDialog";
import valleyBg from "@/assets/images/backgrounds/valley-background.jpg";

const Contact = () => {
  const contactReasons = [
    {
      icon: Podcast,
      title: "Be a Guest",
      description: "Share your healthcare innovation journey with our audience",
      action: "Apply as Guest"
    },
    {
      icon: Users,
      title: "Partnership Opportunities", 
      description: "Explore collaboration and partnership possibilities",
      action: "Discuss Partnership"
    },
    {
      icon: MessageSquare,
      title: "Media Inquiries",
      description: "Press, interviews, and media-related requests",
      action: "Media Contact"
    },
    {
      icon: Mail,
      title: "General Inquiries",
      description: "Questions, feedback, or other general inquiries",
      action: "Send Message"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us | Walk the Valley Podcast</title>
        <meta name="description" content="Contact Walk the Valley. Apply as a guest, explore partnerships, or send healthcare innovation inquiries. Response within 2-3 business days." />
        <link rel="canonical" href="https://www.walkthevalley.lovable.app/contact" />
        <meta property="og:title" content="Contact Us | Walk the Valley Podcast" />
        <meta property="og:description" content="Get in touch with Walk the Valley. Apply as a guest or explore partnership opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.walkthevalley.lovable.app/contact" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${valleyBg})` }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Have a story to share? Want to be a guest? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              How Can We Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactReasons.map((reason, index) => (
                <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-left">
                    <div className="inline-flex items-center justify-start w-12 h-12 bg-primary/10 rounded-full mb-4">
                      <reason.icon className="h-6 w-6 text-primary ml-3" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {reason.description}
                    </p>
                    <ContactDialog
                      trigger={
                        <Button 
                          variant="cta" 
                          size="sm" 
                          className="w-full"
                        >
                          {reason.action}
                        </Button>
                      }
                      title={`${reason.title} - Contact Us`}
                      description={reason.description}
                      type={index + 1}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-gradient-card shadow-elegant">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Have a specific question or want to get in touch directly? Use the button below.
                  </p>
                </div>

                <ContactDialog
                  trigger={
                    <Button variant="cta" size="lg" className="w-full">
                      Send Message
                    </Button>
                  }
                  title="Contact Walk The Valley"
                  description="Fill out the form and we'll get back to you as soon as possible."
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Contact Info */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Other Ways to Connect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    For Guest Applications
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We're always looking for healthcare innovation experts to share their stories.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    Please include your background and the topic you'd like to discuss.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Response Time
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We typically respond to inquiries within 2-3 business days.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    For urgent matters, please mention it in your subject line.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;