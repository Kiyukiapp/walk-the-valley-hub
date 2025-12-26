import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EpisodeCard from "@/components/EpisodeCard";
import { allEpisodes, categories } from "@/data/episodes";
import { Button } from "@/components/ui/button";
import valleyBg from "@/assets/images/backgrounds/valley-background.jpg";

const Episodes = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEpisodes = selectedCategory === "All" 
    ? allEpisodes 
    : allEpisodes.filter(ep => ep.category === selectedCategory);

  // Sort episodes by date (newest first)
  const sortedEpisodes = [...filteredEpisodes].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Episodes | Walk the Valley Podcast</title>
        <meta name="description" content="Browse all Walk the Valley podcast episodes. Real-world advice from healthcare innovation entrepreneurs on medtech, clinical trials, funding, and more." />
        <link rel="canonical" href="https://www.walkthevalley.lovable.app/episodes" />
        <meta property="og:title" content="Episodes | Walk the Valley Podcast" />
        <meta property="og:description" content="Browse all episodes featuring healthcare innovation experts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.walkthevalley.lovable.app/episodes" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${valleyBg})` }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              All Episodes
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Explore our collection of conversations with healthcare innovation leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-muted-foreground text-center">
              Showing {sortedEpisodes.length} episode{sortedEpisodes.length !== 1 ? 's' : ''}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
          
          {sortedEpisodes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No episodes found in this category.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSelectedCategory("All")}
              >
                View All Episodes
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Episodes;
