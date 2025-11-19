export interface Product {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  botanicalName: string;
  form: string;
  packaging: string;
  origin: string;
  gallery: string[];
  specifications: Record<string, string>;
  description: string;
  benefits: string;
  details: string;
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
}

// types/ProductForm.ts
export interface ProductForm {
  id: string;
  name: string;
  subtitle: string;
  image: File | null; // uploaded file
  botanicalName: string;
  form: string;
  packaging: string;
  origin: string;
  gallery: File[]; // uploaded files
  specifications: Record<string, string>;
  description: string;
  benefits: string;
  details: string;
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
}
