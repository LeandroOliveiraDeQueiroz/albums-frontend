import { Outlet } from 'react-router';
import Header from './components/header/Header';
import { AuthProvider } from './context/auth/auth';
import { SnackbarProvider } from 'notistack';

const Layout = () => {
  return (
    <div>
      <AuthProvider>
        <SnackbarProvider>
          <Header />
          <main className="mt-3.5">
            <Outlet />
          </main>
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
};

export default Layout;
