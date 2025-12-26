import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Play } from "lucide-react";

interface Episode {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  duration: string;
  thumbnailUrl: string;
  category: string;
  guest?: string;
  companyLogo?: string;
  season?: number;
}

interface EpisodeCardProps {
  episode: Episode;
  variant?: "default" | "featured";
}

const EpisodeCard = ({ episode, variant = "default" }: EpisodeCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <Card className={`group hover:shadow-elegant transition-all duration-300 transform hover:scale-105 bg-gradient-card border-border/50 ${
      isFeatured ? "md:flex md:flex-row" : ""
    }`}>
      <div className={`relative overflow-hidden ${
        isFeatured ? "md:w-1/2" : ""
      }`}>
        {/* Valley Background */}
        <img
          src={episode.thumbnailUrl}
          alt={episode.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            isFeatured ? "h-48 md:h-full" : "h-48"
          }`}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Company Logo Overlay */}
        {episode.companyLogo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={episode.companyLogo}
              alt={`${episode.guest} company logo`}
              className="w-[60%] h-auto object-contain transform transition-all duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        {/* Play button overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link to={`/episodes/${episode.id}`}>
            <div className="bg-primary/90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
          </Link>
        </div>
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground backdrop-blur-sm">
          {episode.category}
        </Badge>
        
        {/* Season Badge */}
        {episode.season && (
          <Badge className="absolute top-3 right-3 bg-secondary/90 text-secondary-foreground backdrop-blur-sm">
            S{episode.season}
          </Badge>
        )}
      </div>
      
      <div className={isFeatured ? "md:w-1/2" : ""}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(episode.publishDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{episode.duration}</span>
            </div>
          </div>
          
          <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 ${
            isFeatured ? "text-xl mb-3" : "text-lg mb-2"
          }`}>
            {episode.title}
          </h3>
          
          {episode.guest && (
            <p className="text-sm text-accent font-medium mb-2">
              Guest: {episode.guest}
            </p>
          )}
          
          <p className={`text-muted-foreground line-clamp-3 ${
            isFeatured ? "text-base mb-4" : "text-sm mb-4"
          }`}>
            {episode.description}
          </p>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <Link to={`/episodes/${episode.id}`} className="w-full">
            <Button variant="cta" className="w-full">
              Listen Now
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default EpisodeCard;