import { AppProvider } from '../providers/AppProvider';
import { AppRouter } from '../routes';

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
