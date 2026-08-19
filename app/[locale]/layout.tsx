import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { ToastProvider } from "@/contexts/Toast";

// META DATA
export const metadata = {
    title: "Reel Sphere",
    description: "Built with Next.js 15 and next-intl",
    icons: {
        icon: "/images/logo.png",
    },
};

// Static Export/Optimization
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) notFound();

    setRequestLocale(locale);

    const messages = await getMessages();
    const direction = locale === "ar" ? "rtl" : "ltr";

    return (
        <html lang={locale} dir={direction} className="h-full antialiased">
            <body className="selection:bg-primary selection:text-on-primary">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ToastProvider>{children}</ToastProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
