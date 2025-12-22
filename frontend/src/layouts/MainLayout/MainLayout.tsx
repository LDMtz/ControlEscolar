import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 bg-slate-900 p-6 text-slate-100">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
