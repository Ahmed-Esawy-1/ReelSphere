// Make genres From {key: {en, ar}} -> {key, en, ar}

interface GenreOption {
    key: string;
    en: string;
    ar: string;
}

export function toGenreOptions(
    source: Record<string, { en: string; ar: string }>,
): GenreOption[] {
    return Object.entries(source).map(([key, value]) => {
        return {
            key,
            en: value.en,
            ar: value.ar,
        };
    });
}
