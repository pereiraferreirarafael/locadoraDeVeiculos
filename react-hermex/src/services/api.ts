import type { Category, Car } from '../types/index';

const API_BASE_URL = 'http://localhost:3001';

export const api = {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/category`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },

  async getCategoryById(id: number): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/category/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    return response.json();
  },

  async getCars(): Promise<Car[]> {
    const response = await fetch(`${API_BASE_URL}/car`);
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    return response.json();
  },

  async getCarById(id: number): Promise<Car> {
    const response = await fetch(`${API_BASE_URL}/car/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch car');
    }
    return response.json();
  },

  async getCarsByCategory(categoryId: number): Promise<Car[]> {
    const response = await fetch(`${API_BASE_URL}/car?categoryId=${categoryId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cars by category');
    }
    return response.json();
  }
};
