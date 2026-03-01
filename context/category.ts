import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@app_categories';

export interface Category {
    id: string;
    name: string;
}

// 1. Fetch all categories
export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
        console.error("Error loading categories", error);
        return [];
    }
};

// 2. Add a category to the existing array
export const createCategory = async (name: string): Promise<Category[]> => {
    try {
        const existing = await getAllCategories();
        const newCategory: Category = {
            id: Date.now().toString(),
            name: name.trim(),
        };
        const updated = [...existing, newCategory];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated; // Return the new full array
    } catch (error) {
        console.error("Error saving category", error);
        return [];
    }
};

// 3. Remove a category from the array by ID
export const removeCategory = async (id: string): Promise<Category[]> => {
    try {
        const existing = await getAllCategories();
        const updated = existing.filter((item) => item.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated; // Return the filtered array
    } catch (error) {
        console.error("Error deleting category", error);
        return [];
    }
};