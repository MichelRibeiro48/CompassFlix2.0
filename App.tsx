import { PaperProvider } from 'react-native-paper';
import Routes from './src/Routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </QueryClientProvider>
  );
}
export default App;
