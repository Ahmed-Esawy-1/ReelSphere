import React from "react";
import { useTranslations } from "next-intl";

interface ModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalMessage: { title: string; description: string };
}

const Modal = ({ setShowModal, modalMessage }: ModalProps) => {
    const t = useTranslations("common.modal");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowModal(false)}
        >
            <div
                className="w-full max-w-md text-center bg-surface-container-low p-8 rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-primary text-2xl font-bold mb-4">
                    {modalMessage.title}
                </h2>
                <p className="text-on-surface-variant mb-6">
                    {modalMessage.description}
                </p>
                <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-primary text-on-primary font-semibold rounded-full hover:bg-primary-fixed-dim transition-colors"
                >
                    {t("close")}
                </button>
            </div>
        </div>
    );
};

export default Modal;
