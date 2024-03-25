'use client'
import { Home } from "@/pages/Home";
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
export default function Page() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div>
        <Home/>
      </div>
    </QueryClientProvider>
  
  );
}
