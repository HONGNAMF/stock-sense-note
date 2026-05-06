import { glossaryTerms } from "@/lib/glossary-data";

export const glossaryService = {
  search: (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) return glossaryTerms;
    return glossaryTerms.filter((item) => [item.term, item.oneLine, item.simple, ...item.related].some((text) => text.toLowerCase().includes(q)));
  },
  get: (term: string) => glossaryTerms.find((item) => item.term.toLowerCase() === term.toLowerCase())
};
