export interface AwardItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  order: number;
}

export interface Certification {
  _id: string;
  name: string;
  image: string;
  description?: string;
  featured: boolean;
  order: number;
}

export interface Compliance {
  _id: string;
  title: string;
  value: string;
  description?: string;
  order: number;
}
