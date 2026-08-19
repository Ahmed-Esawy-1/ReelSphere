"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormspree } from "@/hooks/useFormspree";
import Modal from "../components/Modal";

import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailIcon from "@mui/icons-material/Email";
import NotesIcon from "@mui/icons-material/Notes";

// ---- TYPES ----
interface AccessibilityFormInputs {
    name: string;
    email: string;
    subject: string;
    description: string;
    [key: string]: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    description?: string;
}

interface ModalMessage {
    title: string;
    description: string;
}

// ---- INITIAL VALUES ----
const initial_inputs_value: AccessibilityFormInputs = {
    name: "",
    email: "",
    subject: "",
    description: "",
};

const initial_errors: FormErrors = {
    name: "",
    email: "",
    subject: "",
    description: "",
};

// ---- COMPONENT ----
const AccessibilityForm = () => {
    const t = useTranslations("accessibility");
    const { sendEmail } = useFormspree();

    const [inputsValue, setInputsValue] =
        useState<AccessibilityFormInputs>(initial_inputs_value);
    const [errors, setErrors] = useState<FormErrors>(initial_errors);
    const [isSending, setIsSending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState<ModalMessage>({
        title: "",
        description: "",
    });

    // ---- HANDLE INPUT CHANGE ----------------------------------------------------------
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setInputsValue((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // ---- VALIDATION --------------------------------------------------------------------
    const validate = () => {
        const newErrors: FormErrors = { ...initial_errors };

        if (inputsValue.name.trim().length < 5) {
            newErrors.name = t("form.errors.nameMin");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(inputsValue.email.trim())) {
            newErrors.email = t("form.errors.emailInvalid");
        }

        if (!inputsValue.subject.trim()) {
            newErrors.subject = t("form.errors.subjectRequired");
        }

        const descLength = inputsValue.description.trim().length;
        if (descLength < 10 || descLength > 150) {
            newErrors.description = t("form.errors.descriptionLength");
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((e) => !e);
    };

    // ---- HANDLE SUBMIT -------------------------------------------------
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSending(true);

        try {
            await sendEmail(inputsValue);
            setModalMessage({
                title: t("success.title"),
                description: t("success.message"),
            });
            setInputsValue(initial_inputs_value);
            setErrors(initial_errors);
        } catch (error) {
            console.error("Accessibility form submission error:", error);
            setModalMessage({
                title: t("error.title"),
                description: t("error.message"),
            });
        } finally {
            setIsSending(false);
            setShowModal(true);
        }
    };

    return (
        <>
            <form className="space-y-8" onSubmit={handleSubmit}>
                {/* NAME */}
                <div className="relative">
                    <label
                        className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                        htmlFor="name"
                    >
                        {t("form.nameLabel")}
                    </label>
                    <div className="relative group">
                        <input
                            className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            value={inputsValue.name}
                            onChange={handleInputChange}
                        />
                        <PersonIcon className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors" />
                    </div>
                    {errors.name && (
                        <p className="text-error text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                {/* EMAIL */}
                <div className="relative">
                    <label
                        className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                        htmlFor="email"
                    >
                        {t("form.emailLabel")}
                    </label>
                    <div className="relative group">
                        <input
                            className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            value={inputsValue.email}
                            onChange={handleInputChange}
                        />
                        <AlternateEmailIcon className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors" />
                    </div>
                    {errors.email && (
                        <p className="text-error text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* SUBJECT */}
                <div className="relative">
                    <label
                        className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                        htmlFor="subject"
                    >
                        {t("form.subjectLabel")}
                    </label>
                    <div className="relative group">
                        <input
                            className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                            id="subject"
                            name="subject"
                            type="text"
                            autoComplete="off"
                            value={inputsValue.subject}
                            onChange={handleInputChange}
                        />
                        <EmailIcon className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors" />
                    </div>
                    {errors.subject && (
                        <p className="text-error text-sm mt-1">
                            {errors.subject}
                        </p>
                    )}
                </div>

                {/* DESCRIPTION */}
                <div className="relative">
                    <label
                        className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                        htmlFor="description"
                    >
                        {t("form.descriptionLabel")}
                    </label>
                    <div className="relative group">
                        <textarea
                            className="w-full resize-y bg-transparent border-b-2 border-outline-variant/30 py-3 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                            id="description"
                            name="description"
                            autoComplete="off"
                            value={inputsValue.description}
                            onChange={handleInputChange}
                        />
                        <NotesIcon className="absolute ltr:right-0 rtl:left-0 top-1 text-white group-focus-within:text-primary-container transition-colors" />
                    </div>
                    {errors.description && (
                        <p className="text-error text-sm mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                <button
                    className="block w-fit px-8 py-4 bg-gradient-to-r from-primary-container to-primary-fixed-dim text-white text-lg font-bold tracking-wide rounded-full shadow-lg hover:shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    type="submit"
                    disabled={isSending}
                >
                    {t(isSending ? "form.sending" : "form.submit")}
                </button>
            </form>

            {showModal && (
                <Modal
                    setShowModal={setShowModal}
                    modalMessage={modalMessage}
                />
            )}
        </>
    );
};

export default AccessibilityForm;
