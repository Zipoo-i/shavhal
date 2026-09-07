export type Badge = 'hit' | 'new' | 'popular' | null;

export interface AddOn {
  id: number;
  name: string;
  price: number;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  weight: string;
  badge?: Badge;
  available: boolean;
  ingredients?: string;
  allergens?: string;
  nutrition?: NutritionInfo;
}
