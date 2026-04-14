"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocale } from "next-intl";

interface navLink {
  title: string;
  href: string;
}

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const locale = useLocale();
  console.log(locale);
  console.log(pathname);

  const links: navLink[] = [
    { title: t("home"), href: `/` },
    { title: t("movies"), href: `/movies` },
    { title: t("series"), href: `/series` },
    { title: t("myList"), href: `/myList` },
  ];

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-emerald-950/70 backdrop-blur-xl shadow-[0_20_40px_rgba(0,0,0,0.4)] no-border">
      <div className="flex justify-between items-center max-w-full mx-auto px-8 py-4">
        <div className="flex items-center gap-3 text-primary text-2xl font-bold">
          <Image
            src="/images/logo.png"
            width={48}
            height={48}
            alt="Logo"
            className="h-full w-full no-repeat bg-cover"
            loading="lazy"
          />
          {t("title")}
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link, i) => (
            <Link
              className={`${pathname === link.href ? "text-primary border-b-2 border-primary font-bold" : "text-emerald-100/60 hover:text-emerald-50"} pb-1`}
              href={`/${locale}/${link.href}`}
              key={i}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative hidden lg:block">
            <input
              className="w-64 px-4 py-2 bg-input text-sm rounded-lg focus:border-primary focus:ring-0 transition-all duration-300"
              placeholder={t("searchPlaceholder")}
              type="text"
            />
            <SearchIcon className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-text" />
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="text-text hover:text-primary transition-all scale-95 active:scale-90 duration-200"
              onClick={() => changeLanguage(locale == "en" ? "ar" : "en")}
            >
              {locale == "en" ? "AR" : "الأنجليزية"}
            </button>

            <NotificationsActiveIcon className="text-text hover:text-primary transition-all scale-95 active:scale-90 duration-200" />
            <AccountCircleIcon className="text-text hover:text-primary transition-all scale-95 active:scale-90 duration-200" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
