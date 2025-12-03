export interface AboutData {
  _id?: string;
  title: string;
  description: string;
  mission: string;
  vision: string;
  stats?: {
    countries: number;
    clients: number;
    experience: number;
    support: string;
  };
  features?: Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
    bgColor: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}
