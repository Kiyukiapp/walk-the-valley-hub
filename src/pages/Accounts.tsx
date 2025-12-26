import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ProspectsTable from "@/components/ProspectsTable";
import SubscribersTable from "@/components/SubscribersTable";
import ContactMessagesTable from "@/components/ContactMessagesTable";
import KanbanView from "@/components/KanbanView";
import { LogOut, Users, Mail, MessageSquare, LayoutDashboard } from "lucide-react";
import { Session, User } from "@supabase/supabase-js";

const Accounts = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
          return;
        }

        // Check if user is admin
        const { data: isAdminResult } = await supabase.rpc('is_current_user_admin');
        setIsAdmin(isAdminResult ?? false);
        setLoading(false);
      }
    );

    // Check existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      const { data: isAdminResult } = await supabase.rpc('is_current_user_admin');
      setIsAdmin(isAdminResult ?? false);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              You don't have permission to access this page.
            </p>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">CRM Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button onClick={handleSignOut} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="kanban" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="prospects" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Prospects
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban">
            <KanbanView />
          </TabsContent>

          <TabsContent value="prospects">
            <ProspectsTable />
          </TabsContent>

          <TabsContent value="subscribers">
            <SubscribersTable />
          </TabsContent>

          <TabsContent value="messages">
            <ContactMessagesTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Accounts;
