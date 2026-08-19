import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const namespaces = [
    "common",
    "home",
    "catalog",
    "contact",
    "privacy",
    "terms",
    "accessibility",
    "auth",
];

async function loadMessages(locale: string) {
    const modules = await Promise.all(
        namespaces.map((ns) => import(`../messages/${locale}/${ns}.json`)),
    );

    const messages: Record<string, unknown> = {};
    namespaces.forEach((ns, i) => {
        messages[ns] = modules[i].default;
    });

    return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: await loadMessages(locale),
    };
});
