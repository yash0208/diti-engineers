export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
}

export interface BusinessProfile {
  meta: {
    version: string;
    lastUpdated: string;
    source: string;
    locale: string;
  };
  businessPersona: {
    brandName: string;
    tagline: string;
    elevatorPitch: string;
    industry: string;
    businessType: string;
    yearsInBusiness: number;
    positioning: {
      primary: string;
      differentiators: string[];
      valueProposition: string;
    };
    targetAudience: {
      primary: string[];
      secondary: string[];
      buyerPersona: {
        title: string;
        goals: string[];
        painPoints: string[];
      };
    };
    brandVoice: {
      tone: string[];
      keywords: string[];
      avoid: string[];
    };
    trustSignals: string[];
  };
  company: {
    legalName: string;
    displayName: string;
    natureOfBusiness: string;
    additionalBusiness: string;
    legalStatus: string;
    proprietor: {
      name: string;
      title: string;
    };
    ceo: string;
    gst: {
      number: string;
      registrationDate: string;
      displayNote: string;
    };
    annualTurnover: {
      range: string;
      currency: string;
      period: string;
    };
    location: {
      city: string;
      state: string;
      country: string;
      regionLabel: string;
    };
    aboutUs: {
      summary: string;
      fullDescription: string | null;
      note: string;
    };
  };
  contact: {
    primaryActions: string[];
    channels: {
      mobile: {
        display: string;
        value: string | null;
        note: string;
      };
      email: {
        display: string;
        value: string | null;
        note: string;
      };
      indiaMartProfile: string | null;
    };
    leadCapture: {
      ctaPrimary: string;
      ctaSecondary: string;
      quoteFormFields: string[];
    };
  };
  productsAndServices: {
    categories: ProductCategory[];
    featuredProductIds: string[];
    relatedIndustryCategories: string[];
  };
  factsheet: {
    basicInformation: {
      natureOfBusiness: string;
      additionalBusiness: string;
      companyCeo: string;
      gstRegistrationDate: string;
      legalStatusOfFirm: string;
      annualTurnover: string;
    };
    statutoryProfile: {
      gstNo: string;
    };
  };
  media: {
    companyAlbum: {
      hasImages: boolean;
      imageCount: number;
      imageUrls: string[];
      note: string;
    };
    assets: {
      logo: string | null;
      heroImage: string | null;
      factoryImages: string[];
      productImages: string[];
    };
  };
  landingPage: {
    status: string;
    sections: string[];
    primaryCta: string;
    secondaryCta: string;
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}
