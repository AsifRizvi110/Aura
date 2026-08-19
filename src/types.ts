export type PageId = 'home' | 'products' | 'manufacturing' | 'about' | 'contact';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  material: string;
  closure: string;
  panels: string;
  customization: string[];
  imageUrl: string;
  altText: string;
  featured?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  itemCount: string;
}

export interface FabricMaterial {
  id: string;
  name: string;
  type: string;
  description: string;
  characteristics: string[];
  bestFor: string;
  imageUrl: string;
}

export interface ManufacturingStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  iconName: string;
  highlights: string[];
  imageUrl: string;
}

export interface PartnerProfile {
  name: string;
  role: string;
  bio: string;
  imageAlt: string;
   imageUrl: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  capType?: string;
  estimatedQuantity?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'moq' | 'lead-times' | 'shipping' | 'customization' | 'quality' | 'payment';
  categoryLabel: string;
  highlights?: string[];
}
