import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { MyListProvider } from "@/contexts/MyListItems";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <MyListProvider>
                <Header />
                {children}
                <Footer />
            </MyListProvider>
        </>
    );
}
