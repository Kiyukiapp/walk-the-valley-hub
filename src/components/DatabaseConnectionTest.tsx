import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const DatabaseConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'failed'>('testing');
  const [functionTests, setFunctionTests] = useState<Record<string, boolean>>({});

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  const testDatabaseConnection = async () => {
    console.log('Testing database connection and functions...');
    
    const results: Record<string, boolean> = {};

    try {
      // Test basic connection
      const { error: connectionError } = await supabase.from('prospects').select('count', { count: 'exact', head: true });
      
      if (connectionError) {
        console.error('Database connection failed:', connectionError);
        setConnectionStatus('failed');
        return;
      }

      // Test each function individually
      try {
        const { error: passwordError } = await supabase.rpc('validate_page_password', { 
          p_page_name: 'test', 
          p_password: 'test' 
        });
        results['validate_page_password'] = !passwordError;
      } catch (err) {
        results['validate_page_password'] = false;
      }

      try {
        const { error: prospectsError } = await supabase.rpc('get_prospects_for_crm');
        results['get_prospects_for_crm'] = !prospectsError;
      } catch (err) {
        results['get_prospects_for_crm'] = false;
      }

      try {
        const { error: subscribersError } = await supabase.rpc('get_subscribers_for_crm');
        results['get_subscribers_for_crm'] = !subscribersError;
      } catch (err) {
        results['get_subscribers_for_crm'] = false;
      }

      try {
        const { error: messagesError } = await supabase.rpc('get_contact_messages_for_crm');
        results['get_contact_messages_for_crm'] = !messagesError;
      } catch (err) {
        results['get_contact_messages_for_crm'] = false;
      }

      setFunctionTests(results);
      setConnectionStatus('connected');
      console.log('Database connection tests completed:', results);
    } catch (error) {
      console.error('Database connection test failed:', error);
      setConnectionStatus('failed');
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          {connectionStatus === 'testing' && <Clock className="h-4 w-4 animate-spin" />}
          {connectionStatus === 'connected' && <CheckCircle className="h-4 w-4 text-green-600" />}
          {connectionStatus === 'failed' && <XCircle className="h-4 w-4 text-red-600" />}
          Database Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">Connection:</span>
          <Badge variant={connectionStatus === 'connected' ? 'default' : connectionStatus === 'failed' ? 'destructive' : 'secondary'}>
            {connectionStatus === 'testing' ? 'Testing...' : connectionStatus === 'connected' ? 'Connected' : 'Failed'}
          </Badge>
        </div>
        
        {Object.entries(functionTests).length > 0 && (
          <div className="space-y-1">
            <span className="text-sm font-medium">Functions:</span>
            {Object.entries(functionTests).map(([func, success]) => (
              <div key={func} className="flex items-center gap-2 text-xs">
                {success ? <CheckCircle className="h-3 w-3 text-green-600" /> : <XCircle className="h-3 w-3 text-red-600" />}
                <span>{func}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseConnectionTest;