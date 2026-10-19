import { createClient } from '@supabase/supabase-js';
import type { Category, Car } from '../types/index';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY (veja .env.example).');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

interface CarRow {
  id: number;
  title: string;
  short_title: string;
  description: string;
  category_id: number;
  price: number;
  image: string;
  specs: Car['specs'] | null;
  features: string[];
}

function toCar(row: CarRow): Car {
  return {
    id: row.id,
    title: row.title,
    shortTitle: row.short_title,
    description: row.description,
    categoryId: row.category_id,
    price: Number(row.price),
    image: row.image,
    specs: row.specs ?? undefined,
    features: row.features,
  };
}

export const api = {
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase.from('category').select('*').order('id');
    if (error) throw new Error(`Falha ao buscar categorias: ${error.message}`);
    return data;
  },

  async getCategoryById(id: number): Promise<Category> {
    const { data, error } = await supabase.from('category').select('*').eq('id', id).single();
    if (error) throw new Error(`Falha ao buscar categoria: ${error.message}`);
    return data;
  },

  async getCars(): Promise<Car[]> {
    const { data, error } = await supabase.from('car').select('*').order('id');
    if (error) throw new Error(`Falha ao buscar carros: ${error.message}`);
    return (data as CarRow[]).map(toCar);
  },

  async getCarById(id: number): Promise<Car> {
    const { data, error } = await supabase.from('car').select('*').eq('id', id).single();
    if (error) throw new Error(`Falha ao buscar carro: ${error.message}`);
    return toCar(data as CarRow);
  },

  async getCarsByCategory(categoryId: number): Promise<Car[]> {
    const { data, error } = await supabase
      .from('car')
      .select('*')
      .eq('category_id', categoryId)
      .order('id');
    if (error) throw new Error(`Falha ao buscar carros da categoria: ${error.message}`);
    return (data as CarRow[]).map(toCar);
  },
};
