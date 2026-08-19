"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import useToast from "@/contexts/Toast";
import { useRouter } from "next/navigation";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

const initial_values = {
    name: "",
    email: "",
    password: "",
    confirm: "",
};

const SignForm = () => {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("auth.signUp");
    const [inputsValue, setInputsValue] = useState(initial_values);
    const [errors, setErrors] = useState(initial_values);
    const [visibile, setVisible] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const { notify } = useToast();

    // ---- FORM COMPLETION (enables submit button) -----------------------------------------------
    const isFormComplete =
        inputsValue.name.trim() !== "" &&
        inputsValue.email.trim() !== "" &&
        inputsValue.password.trim() !== "" &&
        inputsValue.confirm.trim() !== "" &&
        agreed;

    // ---- INPUT CHANGE ---------------------------------------------------------------------------------------
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setInputsValue((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // ---- VALIDATION --------------------------------------------------------------------------------
    function validate() {
        let newErrors = { ...initial_values };

        if (inputsValue.name.length < 5) {
            newErrors.name = t("errors.name");
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(inputsValue.email.trim())) {
            newErrors.email = t("errors.email");
        }
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        if (!passwordPattern.test(inputsValue.password.trim())) {
            newErrors.password = t("errors.password");
        }
        if (inputsValue.password !== inputsValue.confirm) {
            newErrors.confirm = t("errors.confirm");
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((e) => e == "");
    }

    // ---- SUBMIT ----------------------------------------------------------------------------------
    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!validate()) return;

        const users = JSON.parse(sessionStorage.getItem("users") || "[]");

        // Check Email Exist
        const emailTaken = users.some(
            (user: any) =>
                user.email.toLowerCase() ===
                inputsValue.email.trim().toLowerCase(),
        );
        if (emailTaken) {
            setErrors((prev) => ({
                ...prev,
                email: t("errors.emailExists"),
            }));
            return;
        }

        const newUser = {
            username: inputsValue.name,
            email: inputsValue.email,
            password: inputsValue.password,
        };

        users.push(newUser);

        sessionStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        notify(t("successMessage"), "success");
        router.push("/");
    }
    return (
        <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmitForm}>
            <div className="relative">
                {/* NAME */}
                <label
                    className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                    htmlFor="name"
                >
                    {t("fields.name.label")}
                </label>
                <div className="relative group">
                    <input
                        className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 ltr:pr-8 rtl:pl-8 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                        id="name"
                        name="name"
                        placeholder={t("fields.name.placeholder")}
                        type="text"
                        autoComplete="off"
                        value={inputsValue.name}
                        onChange={handleInputChange}
                    />
                    <PersonIcon className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors" />
                </div>
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            </div>

            {/* EMAIL */}
            <div className="relative">
                <label
                    className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                    htmlFor="email"
                >
                    {t("fields.email.label")}
                </label>
                <div className="relative group">
                    <input
                        className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 ltr:pr-8 rtl:pl-8 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                        id="email"
                        name="email"
                        placeholder={t("fields.email.placeholder")}
                        type="email"
                        dir={locale === "en" ? "ltr" : "rtl"}
                        autoComplete="off"
                        value={inputsValue.email}
                        onChange={handleInputChange}
                    />
                    <EmailIcon className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors" />
                </div>
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            </div>

            {/* PASSWORD */}
            <div className="relative">
                <label
                    className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                    htmlFor="password"
                >
                    {t("fields.password.label")}
                </label>
                <div className="relative group">
                    <input
                        className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 ltr:pr-8 rtl:pl-8 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                        id="password"
                        name="password"
                        placeholder={t("fields.password.placeholder")}
                        type={visibile ? "text" : "password"}
                        dir={locale === "en" ? "ltr" : "rtl"}
                        autoComplete="off"
                        value={inputsValue.password}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors cursor-pointer"
                        onClick={() => setVisible(!visibile)}
                    >
                        {visibile ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </button>
                </div>
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
                <label
                    className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                    htmlFor="confirm"
                >
                    {t("fields.confirm.label")}
                </label>
                <div className="relative group">
                    <input
                        className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 ltr:pr-8 rtl:pl-8 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                        id="confirm"
                        name="confirm"
                        placeholder={t("fields.confirm.placeholder")}
                        type="password"
                        dir={locale === "en" ? "ltr" : "rtl"}
                        autoComplete="off"
                        value={inputsValue.confirm}
                        onChange={handleInputChange}
                    />
                    <LockIcon className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors" />
                </div>
                <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>
            </div>
            <div className="flex items-start sm:items-center gap-3 py-2">
                <input
                    className="w-5 h-5 mt-0.5 sm:mt-0 shrink-0 text-primary-container rounded-md border-outline-variant focus:ring-primary-container bg-transparent"
                    id="terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                />
                <label className="text-outline text-sm" htmlFor="terms">
                    {t.rich("agreement", {
                        termsLink: (chunks) => (
                            <a
                                className="text-primary-container font-semibold hover:underline"
                                href="#"
                            >
                                {chunks}
                            </a>
                        ),
                        privacyLink: (chunks) => (
                            <a
                                className="text-primary-container font-semibold hover:underline"
                                href="#"
                            >
                                {chunks}
                            </a>
                        ),
                    })}
                </label>
            </div>
            <button
                className="w-full py-4 bg-gradient-to-r from-primary-container to-primary-fixed-dim text-white text-lg font-bold tracking-wide rounded-full shadow-lg hover:shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                type="submit"
                disabled={!isFormComplete}
            >
                {t("submit")}
            </button>
        </form>
    );
};

export default SignForm;
