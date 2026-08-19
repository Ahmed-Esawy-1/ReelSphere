export const genres = {
    horror: { en: "Horror", ar: "رعب" },
    suspense: { en: "Suspense", ar: "تشويق" },
    drama: { en: "Drama", ar: "دراما" },
    action: { en: "Action", ar: "أكشن" },
    comedy: { en: "Comedy", ar: "كوميدي" },
    thrills: { en: "Thrills", ar: "إثارة" },
    "sci-fi": { en: "Sci-Fi", ar: "خيال علمي" },
    mystery: { en: "Mystery", ar: "غموض" },
    historical: { en: "Historical", ar: "تاريخي" },
    "psychological-horror": { en: "Psychological Horror", ar: "رعب نفسي" },
    crime: { en: "Crime", ar: "جريمة" },
    romantic: { en: "Romantic", ar: "رومانسي" },
    family: { en: "Family", ar: "عائلي" },
    adventure: { en: "Adventure", ar: "مغامرة" },
    thriller: { en: "Thriller", ar: "إثارة" },
    military: { en: "Military", ar: "عسكري" },
    psychological: { en: "Psychological", ar: "نفسي" },
    
} as const;

export type GenreKey = keyof typeof genres;
