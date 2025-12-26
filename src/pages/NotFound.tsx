import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Page Not Found | Walk the Valley</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Oops! The page you're looking for seems to have wandered off the path. 
              Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="default" size="lg">
                  <Home className="h-5 w-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
