// hooks/useFormspree.ts

const FORMSPREE_CONTACT_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID;

export function useFormspree() {
    const sendEmail = async (templateParams: Record<string, string>) => {
        if (!FORMSPREE_CONTACT_ID) {
            console.error("NEXT_PUBLIC_FORMSPREE_CONTACT_ID is not defined");

            return {
                success: false,
                error: "Formspree ID is missing",
            };
        }

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

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                console.error("Formspree Error:", data);

                return {
                    success: false,
                    error: data,
                };
            }

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error("Formspree Error:", error);

            return {
                success: false,
                error,
            };
        }
    };

    return { sendEmail };
}
