import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Award, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import valleyBg from "@/assets/images/backgrounds/valley-background.jpg";
import kataImage from "@/assets/images/people/01-Kata-1.png";
import willImage from "@/assets/images/people/05-Will-1.png";

const About = () => {
  const hosts = [
    {
      name: "Kata",
      role: "Co-host & Innovation leader",
      image: kataImage,
      bio: "With a robust background in healthcare research, mental health tech, and life science innovation, I am dedicated to transforming research into real-world health solutions. My goal is to bridge the gap between cutting-edge scientific advancements and practical applications that improve everyday health care.",
      note: "Please note: My work on \"Walk the Valley\" is a personal passion project and is independent of my professional role at Medicon Valley Alliance.",
      linkedin: "https://www.linkedin.com/in/katalinvikuk/"
    },
    {
      name: "Will",
      role: "Co-host & entrepreneur",
      image: willImage,
      bio: "Accomplished entrepreneur and business leader with proven success in developing companies. Expertise in sales leadership, business development, and talent management. Strong track record of creating innovative strategies and coaching leaders to drive organizational success and align teams with company vision.",
      linkedin: "https://www.linkedin.com/in/willgray81/"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Real-World Insights",
      description: "We share practical advice from entrepreneurs who have walked the path from discovery to commercialization."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Building a supportive community of healthcare innovators who learn from each other's experiences."
    },
    {
      icon: Heart,
      title: "Patient-Centered",
      description: "Every innovation we discuss has one ultimate goal: improving patient outcomes and healthcare delivery."
    },
    {
      icon: Award,
      title: "Excellence in Innovation",
      description: "Celebrating the entrepreneurs and researchers pushing the boundaries of what's possible in healthcare."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Us | Walk the Valley Podcast</title>
        <meta name="description" content="Meet the hosts of Walk the Valley podcast. Learn about our mission to share real-world healthcare innovation insights from discovery to commercialization." />
        <link rel="canonical" href="https://www.walkthevalley.lovable.app/about" />
        <meta property="og:title" content="About Us | Walk the Valley Podcast" />
        <meta property="og:description" content="Meet the hosts and learn about our mission to share healthcare innovation insights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.walkthevalley.lovable.app/about" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${valleyBg})` }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              About Walk The Valley
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Sharing the stories and lessons from healthcare innovation entrepreneurs 
              navigating the challenging journey from discovery to commercialization.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Walk the Valley is a bi-monthly podcast dedicated to sharing real-world advice 
              from healthcare innovation entrepreneurs. We believe that the path from scientific 
              discovery to commercial success is filled with invaluable lessons—lessons that 
              are too often learned the hard way. Our mission is to illuminate this journey, 
              helping the next generation of innovators navigate the challenges of bringing 
              healthcare innovations to market.
            </p>
          </div>
        </div>
      </section>

      {/* Hosts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Your Hosts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Two passionate advocates for healthcare innovation with firsthand experience 
              in the challenges of bringing new medical technologies to market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {hosts.map((host, index) => (
              <Card key={index} className="bg-card border border-border shadow-lg overflow-hidden">
                <CardContent className="p-8 flex gap-6">
                  {/* Circular Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                      <img
                        src={host.image}
                        alt={host.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-foreground mb-1">Introducing {host.name}</h3>
                    <p className="text-primary font-medium mb-4">{host.role}</p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{host.bio}</p>
                    
                    {host.note && (
                      <p className="text-sm text-muted-foreground italic mb-4">{host.note}</p>
                    )}
                    
                    <Button 
                      asChild
                      className="w-fit bg-[#22c55e] hover:bg-[#16a34a] text-white mt-auto"
                    >
                      <a href={host.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        Connect on LinkedIn
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Stand For</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
