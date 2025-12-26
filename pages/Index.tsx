import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EpisodeCard from "@/components/EpisodeCard";
import SubscriptionDialog from "@/components/SubscriptionDialog";
import { getRandomEpisodes } from "@/data/episodes";
import { ArrowRight, Podcast, Users, Globe, Mail } from "lucide-react";
import valleyBg from "@/assets/images/backgrounds/valley-hero-bg.jpg";
import wtvLogoWhite from "@/assets/images/branding/wtv-logo-white.png";

const Index = () => {
  // Get the 3 latest episodes dynamically
  const latestEpisodes = getRandomEpisodes(3);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Walk the Valley | Healthcare Innovation Podcast</title>
        <meta name="description" content="Healthcare innovation podcast with real-world advice from 50+ medtech experts navigating from discovery to commercialization. 25+ episodes." />
        <link rel="canonical" href="https://www.walkthevalley.lovable.app/" />
        <meta property="og:title" content="Walk the Valley | Healthcare Innovation Podcast" />
        <meta property="og:description" content="Real-world advice from healthcare innovation entrepreneurs navigating from discovery to commercialization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.walkthevalley.lovable.app/" />
        <meta property="og:image" content="https://www.walkthevalley.lovable.app/assets/images/og/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Walk the Valley | Healthcare Innovation Podcast" />
        <meta name="twitter:description" content="Real-world advice from healthcare innovation entrepreneurs navigating from discovery to commercialization." />
        <meta name="twitter:image" content="https://walkthevalley.lovable.app/assets/images/og/preview.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PodcastSeries",
            "name": "Walk the Valley",
            "description": "Real-world advice from healthcare innovation entrepreneurs navigating the challenging journey from discovery to commercialization.",
            "url": "https://walkthevalley.lovable.app/",
            "genre": ["Healthcare", "Business", "Innovation", "Medtech"],
            "inLanguage": "en"
          })}
        </script>
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${valleyBg})` }}
        />
        {/* Minimal overlay for text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Subtle gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src={wtvLogoWhite} 
                alt="Walk The Valley Logo" 
                className="w-32 h-32 mx-auto mb-4 drop-shadow-lg"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Walk The
              <span className="text-white"> Valley</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Real-world advice from healthcare innovation entrepreneurs navigating 
              the challenging journey from discovery to commercialization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/episodes">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  <Podcast className="h-5 w-5 mr-2" />
                  Listen Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="professional" size="lg" className="text-lg px-8 py-4">
                  Learn More
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            {[
                { icon: Podcast, label: "Bi-Monthly Episodes", value: "25+" },
                { icon: Users, label: "Health & Medtech Experts", value: "50+" },
                { icon: Globe, label: "EU Focused", value: "15+" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-lg font-semibold text-white">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Episodes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover insights from healthcare innovation leaders sharing their journey 
              through the valley of death.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {latestEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/episodes">
              <Button variant="gradient" size="lg">
                View All Episodes
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto bg-gradient-card shadow-elegant">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Never Miss an Episode
              </h3>
              <p className="text-muted-foreground mb-6">
                Get notified about new episodes and exclusive insights from healthcare 
                innovation leaders.
              </p>
              <SubscriptionDialog
                trigger={
                  <Button variant="cta" size="lg" className="w-full">
                    Subscribe Now
                  </Button>
                }
                source="newsletter"
                title="Subscribe to Walk The Valley"
                description="Get notified when new episodes are released. We'll never spam you."
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;