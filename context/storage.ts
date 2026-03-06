import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

export const storage = {
    // CREATE
    createExpense: async (newExpense: any) => {
        try {
            const existing = await storage.getAllExpense();
            const updated = [newExpense, ...existing];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (e) {
            console.error("Error saving expense", e);
        }
    },

    // GET ALL
    getAllExpense: async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error("Error fetching expenses", e);
            return [];
        }
    },

    // DELETE SINGLE
    deleteSingleExpense: async (id: string) => {
        try {
            const existing = await storage.getAllExpense();
            const filtered = existing.filter((item: any) => item.id !== id);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
            return filtered;
        } catch (e) {
            console.error("Error deleting expense", e);
        }
    },

    // TOTAL EXPENSE (All time)
    totalExpense: async () => {
        const expenses = await storage.getAllExpense();
        return expenses.reduce((sum: any, item: any) => sum + item.amount, 0);
    },

    // TOTAL LAST 30 DAYS
    totalOfLast30Day: async () => {
        const expenses = await storage.getAllExpense();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        return expenses
            .filter((item: any) => new Date(item.date) >= thirtyDaysAgo)
            .reduce((sum: any, item: any) => sum + item.amount, 0);
    }
};