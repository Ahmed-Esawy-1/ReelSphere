"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormspree } from "@/hooks/useFormspree";
import Modal from "../components/Modal";

// ---- TYPES ----
interface AccessibilityFormInputs {
    name: string;
    email: string;
    message: string;
    [key: string]: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

interface ModalMessage {
    title: string;
    description: string;
}

// ---- INITIAL VALUES ----
const initial_inputs_value: AccessibilityFormInputs = {
    name: "",
    email: "",
    message: "",
};

const initial_errors: FormErrors = {
    name: "",
    email: "",
    message: "",
};

// ---- COMPONENT ----
const AccessibilityForm = () => {
    const t = useTranslations("accessibility");
    const { sendEmail } = useFormspree();

    const [inputsValue, setInputsValue] =
        useState<AccessibilityFormInputs>(initial_inputs_value);
    const [errors, setErrors] = useState<FormErrors>(initial_errors);
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
    };

    // ---- HANDLE SUBMIT -------------------------------------------------
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ---- VALIDATION --------------------
        const newErrors: FormErrors = {};
        if (!inputsValue.name) newErrors.name = t("errors.nameRequired");
        if (!inputsValue.email) newErrors.email = t("errors.emailRequired");
        if (!inputsValue.message)
            newErrors.message = t("errors.messageRequired");

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await sendEmail(inputsValue);
            setModalMessage({
                title: t("success.title"),
                description: t("success.description"),
            });
            setInputsValue(initial_inputs_value);
            setErrors(initial_errors);
        } catch (error) {
            setModalMessage({
                title: t("error.title"),
                description: t("error.description"),
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* NAME INPUT */}
                <div>
                    <label htmlFor="name">{t("fields.name.label")}</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={inputsValue.name}
                        onChange={handleInputChange}
                        className={errors.name ? "border-red-600" : ""}
                    />
                    {errors.name && (
                        <p className="text-red-600 text-sm">{errors.name}</p>
                    )}
                </div>

                {/* EMAIL INPUT */}
                <div>
                    <label htmlFor="email">{t("fields.email.label")}</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={inputsValue.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-red-600" : ""}
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm">{errors.email}</p>
                    )}
                </div>

                {/* MESSAGE INPUT */}
                <div>
                    <label htmlFor="message">{t("fields.message.label")}</label>
                    <textarea
                        id="message"
                        name="message"
                        value={inputsValue.message}
                        onChange={handleInputChange}
                        className={errors.message ? "border-red-600" : ""}
                    />
                    {errors.message && (
                        <p className="text-red-600 text-sm">{errors.message}</p>
                    )}
                </div>

                <button type="submit">{t("submit")}</button>
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
