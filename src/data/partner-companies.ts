export const partnerCompanyIds = [
  "kirloskar",
  "crompton",
  "havells",
  "siemens",
  "abb",
  "vguard",
] as const;

export type PartnerCompanyId = (typeof partnerCompanyIds)[number];

type PartnerCompany = {
  id: PartnerCompanyId;
  initials: string;
  image: string;
};

export const partnerCompanies: PartnerCompany[] = [
  {
    id: "kirloskar",
    initials: "K",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=80&fit=crop&crop=faces&auto=format",
  },
  {
    id: "crompton",
    initials: "CG",
    image:
      "https://images.unsplash.com/photo-1507003211169-0b1dd7228f2d?w=80&h=80&fit=crop&crop=faces&auto=format",
  },
  {
    id: "havells",
    initials: "H",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces&auto=format",
  },
  {
    id: "siemens",
    initials: "S",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=faces&auto=format",
  },
  {
    id: "abb",
    initials: "ABB",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=faces&auto=format",
  },
  {
    id: "vguard",
    initials: "VG",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces&auto=format",
  },
];
