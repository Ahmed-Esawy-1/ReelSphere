import Header from "./components/Header";
import Footer from "./components/Footer";
import { MyListProvider } from "./contexts/MyListItems";
import { ToastProvider } from "./contexts/Toast";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastProvider>
        <MyListProvider>
          <Header />
          {children}
          <Footer />
        </MyListProvider>
      </ToastProvider>
    </>
  );
}
