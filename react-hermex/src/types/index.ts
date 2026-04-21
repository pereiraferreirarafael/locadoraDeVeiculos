export interface Category {
  id: number | string;
  title: string;
  description: string;
}

export interface Car {
  id: number | string;
  title: string;
  shortTitle: string;
  description: string;
  categoryId: number;
  price: number;
  image: string;
  specs?: {
    passengers: number;
    transmission: string;
    fuel: string;
    year: number;
    airConditioning: boolean;
    trunk: string;
  };
  features?: string[];
}
