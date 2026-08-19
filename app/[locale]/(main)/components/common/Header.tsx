"use client";
import { useEffect, useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import Link from "next/link";
import Image from "next/image";
import { user } from "@/types/user";
import dynamic from "next/dynamic";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MobileNavBar from "./MobileNavBar";

interface navLink {
    title: string;
    href: string;
}

const SearchResults = dynamic(() => import("./SearchResults"), {
    ssr: false,
});

const Header = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const t = useTranslations("common.Header");

    // ---- STATE ----
    const [currentUser, setCurrentUser] = useState<user | null>(null);
    const [userProfileMenu, setUserProfileMenu] = useState(false);
    const [mobileAuthMenu, setMobileAuthMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLDivElement | null>(null);

    const links: navLink[] = [
        { title: t("home"), href: `/` },
        { title: t("movies"), href: `/movies` },
        { title: t("series"), href: `/series` },
        { title: t("myList"), href: `/myList` },
    ];

    const changeLanguage = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (user) setCurrentUser(user);
    }, []);

    function handleUserProfileMenu() {
        if (currentUser) setUserProfileMenu((prev) => !prev);
    }

    function handleMobileAuthMenu() {
        setMobileAuthMenu((prev) => !prev);
    }

    // ---- CLOSE MENUS (when click outside) ----------------------------------
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setUserProfileMenu(false);
            }
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setMobileAuthMenu(false);
            }
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setSearchFocused(false);
            }
        };

        if (userProfileMenu || mobileAuthMenu || searchFocused) {
            window.addEventListener("click", handleClickOutside);
        }

        return () => window.removeEventListener("click", handleClickOutside);
    }, [userProfileMenu, mobileAuthMenu, searchFocused]);

    // ---- LOG OUT -------------------------------------------------------
    function handleLogOut() {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        setUserProfileMenu(false);
        setMobileAuthMenu(false);
        router.push("/login");
    }

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-emerald-950/70 backdrop-blur-xl shadow-[0_20_40px_rgba(0,0,0,0.4)] no-border">
                <div className="flex justify-between items-center max-w-full mx-auto px-8 py-4">
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-primary text-2xl font-bold"
                    >
                        <Image
                            src="/images/logo.png"
                            width={14}
                            height={14}
                            alt="Logo"
                            className="h-full w-full no-repeat bg-cover"
                            priority
                        />
                        <h2 className="whitespace-nowrap">{t("title")}</h2>
                    </Link>
                    {/* LINKS */}
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
                        {/* SEARCH (with menu) */}
                        <div
                            className="relative hidden lg:block"
                            ref={searchRef}
                        >
                            <input
                                className="w-64 px-4 py-2 bg-input text-sm rounded-lg focus:border-primary focus:ring-0 transition-all duration-300"
                                placeholder={t("searchPlaceholder")}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                            />
                            <SearchIcon className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-text" />

                            {/* SEARCH RESULTS */}
                            {searchFocused && searchQuery.trim().length > 0 && (
                                <div className="absolute top-full mt-2 ltr:left-0 rtl:right-0 w-96 max-h-[70vh] overflow-y-auto bg-[#101412] border border-[#3e4944]/30 shadow-[0px_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl z-[60] py-3">
                                    <SearchResults
                                        query={searchQuery}
                                        locale={locale}
                                        onSelect={() => {
                                            setSearchQuery("");
                                            setSearchFocused(false);
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                className="text-text hover:text-primary transition-all scale-95 active:scale-90 duration-200"
                                onClick={() =>
                                    changeLanguage(locale == "en" ? "ar" : "en")
                                }
                            >
                                {locale == "en" ? "AR" : "الأنجليزية"}
                            </button>

                            {/* LG */}
                            {currentUser ? (
                                <div
                                    className="hidden lg:block relative"
                                    ref={menuRef}
                                >
                                    <AccountCircleIcon
                                        className="text-primary transition-all scale-95 active:scale-90 duration-200 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUserProfileMenu();
                                        }}
                                    />
                                    {userProfileMenu && (
                                        <div className="fixed top-full ltr:right-8 rtl:left-8 z-[60] w-80">
                                            <div className="bg-[#101412]  border border-[#3e4944]/30 shadow-[0px_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl overflow-hidden transform animate-in fade-in slide-in-from-top-4 duration-300">
                                                <div className="bg-[#181d1a] p-6 border-b border-[#3e4944]/20">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 border-2 border-primary-container rounded-full ring-4 ring-primary-container/10 overflow-hidden">
                                                            <Image
                                                                width={56}
                                                                height={56}
                                                                alt="Your Image Profile"
                                                                className="w-full h-full object-cover"
                                                                src="/images/profile.png"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2 className="font-title text-on-surface text-lg leading-none mb-1">
                                                                {
                                                                    currentUser.username
                                                                }
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-4 px-2 space-y-1">
                                                    <a
                                                        className="flex items-center gap-4 px-4 py-3 text-[#dfe4df]/60 rounded-lg hover:bg-[#313633] hover:text-[#6edab3] transition-all duration-200 group"
                                                        href="#"
                                                    >
                                                        <PersonIcon className="text-xl group-hover:scale-110 transition-transform" />
                                                        <span className="text-sm tracking-wide">
                                                            {t("myProfile")}
                                                        </span>
                                                    </a>
                                                    <a
                                                        className="flex items-center gap-4 px-4 py-3 text-[#dfe4df]/60 rounded-lg hover:bg-[#313633] hover:text-[#6edab3] transition-all duration-200 group"
                                                        href="#"
                                                    >
                                                        <BookmarkIcon className="text-xl group-hover:scale-110 transition-transform" />
                                                        <span className="text-sm tracking-wide">
                                                            {t("watchlist")}
                                                        </span>
                                                    </a>
                                                    <a
                                                        className="flex items-center gap-4 px-4 py-3 text-[#dfe4df]/60 rounded-lg hover:bg-[#313633] hover:text-[#6edab3] transition-all duration-200 group"
                                                        href="#"
                                                    >
                                                        <SettingsIcon className="text-xl group-hover:scale-110 transition-transform" />
                                                        <span className="text-sm tracking-wide">
                                                            {t(
                                                                "archivalSettings",
                                                            )}
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="mt-2 p-2 border-t border-[#3e4944]/20">
                                                    <p
                                                        className="flex items-center gap-4 px-4 py-4 text-error/80 rounded-lg hover:bg-error-container/20 hover:text-error transition-all duration-200 group cursor-pointer"
                                                        onClick={handleLogOut}
                                                    >
                                                        <LogoutIcon className="text-xl group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
                                                        <span className="text-sm font-bold tracking-wide">
                                                            {t("signOut")}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden lg:flex items-center gap-3">
                                    <Link
                                        href={`/${locale}/login`}
                                        className="px-5 py-2 text-sm font-semibold text-text border border-text rounded-sm hover:bg-text hover:text-emerald-950 transition-colors duration-200"
                                    >
                                        {t("login")}
                                    </Link>
                                    <Link
                                        href={`/${locale}/signup`}
                                        className="px-5 py-2 text-sm font-semibold bg-text text-emerald-950 rounded-sm hover:bg-primary hover:text-on-primary transition-colors duration-200"
                                    >
                                        {t("signup")}
                                    </Link>
                                </div>
                            )}

                            {/* SM & MD */}
                            <div
                                className="relative lg:hidden"
                                ref={mobileMenuRef}
                            >
                                <button
                                    className="text-text hover:text-primary transition-all scale-95 active:scale-90 duration-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMobileAuthMenu();
                                    }}
                                    aria-label="menu"
                                >
                                    {mobileAuthMenu ? (
                                        <CloseIcon />
                                    ) : currentUser ? (
                                        <AccountCircleIcon className="text-primary" />
                                    ) : (
                                        <MenuIcon />
                                    )}
                                </button>

                                {mobileAuthMenu && (
                                    <div className="fixed top-full ltr:right-4 rtl:left-4 z-[60] w-64">
                                        <div className="bg-[#101412] border border-[#3e4944]/30 shadow-[0px_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl overflow-hidden transform animate-in fade-in slide-in-from-top-4 duration-300">
                                            {currentUser ? (
                                                <>
                                                    <div className="bg-[#181d1a] p-6 border-b border-[#3e4944]/20">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 border-2 border-primary-container rounded-full ring-4 ring-primary-container/10 overflow-hidden">
                                                                <Image
                                                                    width={56}
                                                                    height={56}
                                                                    alt="Your Image Profile"
                                                                    className="w-full h-full object-cover"
                                                                    src="/images/profile.png"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h2 className="font-title text-on-surface text-lg leading-none mb-1">
                                                                    {
                                                                        currentUser.username
                                                                    }
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="py-2 px-2 space-y-1">
                                                        <a
                                                            className="flex items-center gap-4 px-4 py-3 text-[#dfe4df]/60 rounded-lg hover:bg-[#313633] hover:text-[#6edab3] transition-all duration-200"
                                                            href="#"
                                                        >
                                                            <PersonIcon className="text-lg" />
                                                            <span className="text-sm tracking-wide">
                                                                {t("myProfile")}
                                                            </span>
                                                        </a>
                                                        <a
                                                            className="flex items-center gap-4 px-4 py-3 text-[#dfe4df]/60 rounded-lg hover:bg-[#313633] hover:text-[#6edab3] transition-all duration-200"
                                                            href="#"
                                                        >
                                                            <BookmarkIcon className="text-lg" />
                                                            <span className="text-sm tracking-wide">
                                                                {t("watchlist")}
                                                            </span>
                                                        </a>
                                                        <p
                                                            className="flex items-center gap-4 px-4 py-3 text-error/80 rounded-lg hover:bg-error-container/20 hover:text-error transition-all duration-200 cursor-pointer"
                                                            onClick={
                                                                handleLogOut
                                                            }
                                                        >
                                                            <LogoutIcon className="text-lg" />
                                                            <span className="text-sm font-bold tracking-wide">
                                                                {t("signOut")}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="p-4 flex flex-col gap-3">
                                                    <Link
                                                        href={`/${locale}/login`}
                                                        onClick={() =>
                                                            setMobileAuthMenu(
                                                                false,
                                                            )
                                                        }
                                                        className="w-full text-center px-5 py-2 text-sm font-semibold text-text border border-text rounded-sm hover:bg-text hover:text-emerald-950 transition-colors duration-200"
                                                    >
                                                        {t("login")}
                                                    </Link>
                                                    <Link
                                                        href={`/${locale}/signup`}
                                                        onClick={() =>
                                                            setMobileAuthMenu(
                                                                false,
                                                            )
                                                        }
                                                        className="w-full text-center px-5 py-2 text-sm font-semibold bg-text text-emerald-950 rounded-sm hover:bg-primary hover:text-on-primary transition-colors duration-200"
                                                    >
                                                        {t("signup")}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* MOBILE BOTTOM NAV */}
            <MobileNavBar />
        </>
    );
};

export default Header;
