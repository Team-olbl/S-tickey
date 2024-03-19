import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
      <QueryClientProvider client={queryClient}>
        <div className='bg-Stickey_BGC min-h-[100vh]'>
        <App />
        </div>
      </QueryClientProvider>
);