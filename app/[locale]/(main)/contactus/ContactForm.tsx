"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormspree } from "@/hooks/useFormspree";
import Image from "next/image";
import Modal from "../components/Modal";

import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CallIcon from "@mui/icons-material/Call";

const initialInputsState = {
    name: "",
    email: "",
    subject: "",
    message: "",
    isSending: false,
};

const initialErrorsState = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const ContactForm = () => {
    const t = useTranslations("contact");
    const { sendEmail } = useFormspree();
    const [inputsValue, setInputsValue] = useState(initialInputsState);
    const [errors, setErrors] = useState(initialErrorsState);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        title: "",
        description: "",
    });

    // ---- HANDLE INPUT CHANGE -------------------------------------------
    function handleInputsChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setInputsValue((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // ---- VALIDATION ----------------------------------------------------------
    function validate() {
        const newErrors = { ...initialErrorsState };

        if (inputsValue.name.trim().length < 5) {
            newErrors.name = t("validation.nameMin");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(inputsValue.email.trim())) {
            newErrors.email = t("validation.emailInvalid");
        }

        if (!inputsValue.subject.trim()) {
            newErrors.subject = t("validation.subjectRequired");
        }

        if (
            inputsValue.message.trim().length < 10 ||
            inputsValue.message.trim().length > 150
        ) {
            newErrors.message = t("validation.messageLength");
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((e) => e === "");
    }

    // ---- SUBMIT -------------------------------------------------------------------------
    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!validate()) return;

        setInputsValue((prev) => ({ ...prev, isSending: true }));

        const templateParams = {
            name: inputsValue.name,
            email: inputsValue.email,
            _subject: `Contact Us: ${inputsValue.subject}`,
            subject: inputsValue.subject,
            message: inputsValue.message,
        };

        try {
            const result = await sendEmail(templateParams);

            if (result.success) {
                setModalMessage({
                    title: t("success.title") || "Success!",
                    description:
                        t("success.message") ||
                        "Your message was sent successfully!",
                });

                setInputsValue(initialInputsState);
            } else {
                console.error("Form submission failed:", result.error);

                setModalMessage({
                    title: t("error.title") || "Error",
                    description:
                        t("error.message") ||
                        "Failed to send message. Please try again.",
                });

                setInputsValue((prev) => ({
                    ...prev,
                    isSending: false,
                }));
            }
        } catch (error) {
            console.error("Form submission error:", error);

            setModalMessage({
                title: t("error.title") || "Error",
                description:
                    t("error.message") ||
                    "Failed to send message. Please try again.",
            });

            setInputsValue((prev) => ({
                ...prev,
                isSending: false,
            }));
        }

        setShowModal(true);
    }

    // ----------------------------------------------------------------------------
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* FORM */}
                <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-8 md:p-12 shadow-2xl">
                    <h2 className="text-primary text-3xl font-bold mb-8">
                        {t("form.title")}
                    </h2>
                    <form className="space-y-8" onSubmit={handleFormSubmit}>
                        {/* NAME */}
                        <div className="relative">
                            <label
                                className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                                htmlFor="name"
                            >
                                {t("form.name.label")}
                            </label>
                            <div className="relative group">
                                <input
                                    className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                                    id="name"
                                    name="name"
                                    placeholder={t("form.name.placeholder")}
                                    type="text"
                                    autoComplete="off"
                                    value={inputsValue.name}
                                    onChange={handleInputsChange}
                                />
                                <PersonIcon className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors" />
                            </div>
                            {errors.name && (
                                <p className="text-error">{errors.name}</p>
                            )}
                        </div>

                        {/* EMAIL */}
                        <div className="relative">
                            <label
                                className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                                htmlFor="email"
                            >
                                {t("form.email.label")}
                            </label>
                            <div className="relative group">
                                <input
                                    className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                                    id="email"
                                    name="email"
                                    placeholder={t("form.email.placeholder")}
                                    type="email"
                                    autoComplete="off"
                                    value={inputsValue.email}
                                    onChange={handleInputsChange}
                                />
                                <AlternateEmailIcon className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors" />
                            </div>
                            {errors.email && (
                                <p className="text-error">{errors.email}</p>
                            )}
                        </div>

                        {/* SUBJECT */}
                        <div className="relative">
                            <label
                                className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                                htmlFor="subject"
                            >
                                {t("form.subject.label")}
                            </label>
                            <div className="relative group">
                                <input
                                    className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                                    id="subject"
                                    name="subject"
                                    placeholder={t("form.subject.placeholder")}
                                    autoComplete="off"
                                    value={inputsValue.subject}
                                    onChange={handleInputsChange}
                                />

                                <EmailIcon className="absolute ltr:right-0 rtl:left-0 bottom-3 text-white group-focus-within:text-primary-container transition-colors" />
                            </div>
                            {errors.subject && (
                                <p className="text-error">{errors.subject}</p>
                            )}
                        </div>

                        {/* MESSAGE */}
                        <div className="relative">
                            <label
                                className="block text-outline font-semibold text-xs uppercase tracking-wider mb-2"
                                htmlFor="message"
                            >
                                {t("form.message.label")}
                            </label>
                            <div className="relative group">
                                <textarea
                                    className="w-full resize-y bg-transparent border-b-2 border-outline-variant/30 py-3 focus:outline-none focus:border-primary-container transition-all placeholder-outline/50"
                                    id="message"
                                    name="message"
                                    placeholder={t("form.message.placeholder")}
                                    autoComplete="off"
                                    value={inputsValue.message}
                                    onChange={handleInputsChange}
                                />
                            </div>
                            {errors.message && (
                                <p className="text-error">{errors.message}</p>
                            )}
                        </div>
                        <button
                            className="block w-fit px-8 py-4 bg-gradient-to-r from-primary-container to-primary-fixed-dim text-white text-lg font-bold tracking-wide rounded-full shadow-lg hover:shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                            type="submit"
                            disabled={inputsValue.isSending}
                        >
                            {t(
                                inputsValue.isSending
                                    ? "form.sending"
                                    : "form.submit",
                            )}
                        </button>
                    </form>
                    {showModal && (
                        <Modal
                            setShowModal={setShowModal}
                            modalMessage={modalMessage}
                        />
                    )}
                </div>

                {/* SIDE */}
                <aside className="lg:col-span-5 space-y-8">
                    {/* LOCATION */}
                    <div className="relative bg-surface-container-highest rounded-xl overflow-hidden aspect-video group">
                        <Image
                            fill
                            sizes="(max-width: 1024px) 98vw, 40vw"
                            alt={t("location.imageAlt")}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src="/images/location.webp"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent opacity-60"></div>
                        <div className="absolute bottom-6 ltr:left-6 rtl:right-6 flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-full shadow-lg">
                                <LocationOnIcon className="text-on-primary text-xl" />
                            </div>

                            <div>
                                <p className="font-title text-on-surface font-bold leading-none">
                                    {t("location.title")}
                                </p>
                                <p className="text-on-surface-variant text-xs">
                                    {t("location.address")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SOCIAL */}
                    <div className="bg-surface-container-low p-8 rounded-xl">
                        <h3 className="text-xl font-title mb-6">
                            {t("social.title")}
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-lg hover:bg-surface-bright transition-colors group">
                                <div className="flex items-center gap-4">
                                    <FacebookOutlinedIcon className="text-primary" />
                                    <span className="font-medium">
                                        {t("social.facebook")}
                                    </span>
                                </div>
                                <ArrowForwardIcon className="text-outline group-hover:text-primary transition-colors rtl:rotate-180" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-lg hover:bg-surface-bright transition-colors group">
                                <div className="flex items-center gap-4">
                                    <MusicVideoIcon className="text-primary" />
                                    <span className="font-medium">
                                        {t("social.tiktok")}
                                    </span>
                                </div>
                                <ArrowForwardIcon className="text-outline group-hover:text-primary transition-colors rtl:rotate-180" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-lg hover:bg-surface-bright transition-colors group">
                                <div className="flex items-center gap-4">
                                    <InstagramIcon className="text-primary" />
                                    <span className="font-medium">
                                        {t("social.instagram")}
                                    </span>
                                </div>
                                <ArrowForwardIcon className="text-outline group-hover:text-primary transition-colors rtl:rotate-180" />
                            </div>
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex gap-4">
                            <ScheduleIcon className="text-primary" />
                            <div>
                                <h4 className="text-on-surface text-sm font-bold uppercase tracking-widest">
                                    {t("details.visitingHours.title")}
                                </h4>
                                <p className="text-on-surface-variant">
                                    {t("details.visitingHours.weekdays")}
                                </p>
                                <p className="text-on-surface-variant">
                                    {t("details.visitingHours.weekend")}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <CallIcon className="text-primary" />
                            <div>
                                <h4 className="text-on-surface text-sm font-bold uppercase tracking-widest">
                                    {t("details.directLine.title")}
                                </h4>
                                <p className="text-on-surface-variant">
                                    {t("details.directLine.phone")}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* FOOTER */}
            <section className="relative mt-24 p-12 bg-surface-container-highest rounded-2xl overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-md">
                        <h2 className="text-3xl font-title mb-4">
                            {t("newsletter.title")}
                        </h2>
                        <p className="text-on-surface-variant">
                            {t("newsletter.description")}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <input
                            className="min-w-[300px] bg-surface-container-lowest text-on-surface border-2 border-outline-variant/20 rounded-full px-6 py-3 focus:border-primary focus:ring-0"
                            placeholder={t("newsletter.emailPlaceholder")}
                            type="email"
                        />
                        <button className="bg-primary text-on-primary font-bold px-8 py-3 rounded-full hover:bg-primary-fixed-dim transition-colors">
                            {t("newsletter.button")}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactForm;
