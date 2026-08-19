// hooks/useFormspree.ts
const FORMSPREE_CONTACT_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID || "";

export function useFormspree() {
    const sendEmail = async (templateParams: Record<string, string>) => {
        try {
            const res = await fetch(
                `https://formspree.io/f/${FORMSPREE_CONTACT_ID}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(templateParams),
                },
            );

            if (res.ok) {
                return { success: true };
            }

            const data = await res.json().catch(() => null);
            console.error("Formspree Error:", data);
            return { success: false, error: data };
        } catch (error) {
            console.error("Formspree Error:", error);
            return { success: false, error };
        }
    };

    return { sendEmail };
}
