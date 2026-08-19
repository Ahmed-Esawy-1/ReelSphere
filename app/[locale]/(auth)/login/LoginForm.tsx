"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations("auth.logIn");
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    // ---- SUBMIT ----------------------------------------------------------------------------
    function handleFormSubmit(e: any) {
        e.preventDefault();

        if (inputValue.email === "") {
            setErrors({
                email: t("errors.emailNotFound"),
                password: "",
            });
            return;
        }

        if (inputValue.password === "") {
            setErrors({
                email: "",
                password: t("errors.passwordIncorrect"),
            });
            return;
        }

        const users = JSON.parse(sessionStorage.getItem("users") || "[]");

        const existed = users.find(
            (user: any) =>
                inputValue.email === user.email &&
                inputValue.password === user.password,
        );

        if (existed) {
            localStorage.setItem("currentUser", JSON.stringify(existed));
            router.push("/");
        } else {
            setErrors({
                email: "",
                password: t("errors.passwordIncorrect"),
            });
        }
    }

    return (
        <form
            method="POST"
            className="space-y-6 sm:space-y-8"
            onSubmit={handleFormSubmit}
        >
            {/* EMAIL */}
            <div className="relative group">
                <label
                    className="block text-xs uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors"
                    htmlFor="email"
                >
                    {t("fields.email.label")}
                </label>
                <input
                    className="w-full py-4 px-0 text-on-surface outline-none border-0 border-b-2 border-outline-variant/40 focus:border-primary placeholder-on-surface-variant/40 transition-all"
                    id="email"
                    placeholder={t("fields.email.placeholder")}
                    type="email"
                    dir={locale === "en" ? "ltr" : "rtl"}
                    value={inputValue.email}
                    onChange={(e) => {
                        setInputValue((prev) => {
                            return {
                                ...prev,
                                email: e.target.value,
                            };
                        });
                    }}
                />
                {errors.email && (
                    <div className="text-sm text-red-600 mt-2">
                        {errors.email}
                    </div>
                )}
            </div>

            {/* PASSWORD */}
            <div className="relative group">
                <label
                    className="block text-xs uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors"
                    htmlFor="password"
                >
                    {t("fields.password.label")}
                </label>
                <div className="relative">
                    <input
                        className="w-full py-4 ltr:pr-8 rtl:pl-8 px-0 text-on-surface outline-none border-0 border-b-2 border-outline-variant/40 focus:border-primary placeholder-on-surface-variant/40 transition-all"
                        id="password"
                        placeholder={t("fields.password.placeholder")}
                        type={visible ? "text" : "password"}
                        dir={locale === "en" ? "ltr" : "rtl"}
                        value={inputValue.password}
                        onChange={(e) => {
                            setInputValue((prev) => {
                                return {
                                    ...prev,
                                    password: e.target.value,
                                };
                            });
                        }}
                    />
                    <button
                        type="button"
                        className="absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                        onClick={() => {
                            setVisible(!visible);
                        }}
                    >
                        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </button>
                </div>
                {errors.password && (
                    <div className="text-sm text-red-600 mt-2">
                        {errors.password}
                    </div>
                )}
            </div>
            <button
                className="block pt-4 w-full bg-gradient-to-r from-primary to-primary-container text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
                type="submit"
            >
                {t("submit")}
            </button>
        </form>
    );
};

export default LoginForm;
