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
    },

    // TOTAL My Monthly Expenses
    // Add this inside your 'storage' object
    getCategoryTotalsByMonth: async (monthIndex: number, year = 2026) => {
        try {
            // 1. Get all expenses
            const expenses = await storage.getAllExpense();

            // 2. Filter by the specific month and year
            const monthlyExpenses = expenses.filter((item: any) => {
                const itemDate = new Date(item.date);
                return (
                    itemDate.getMonth() === monthIndex &&
                    itemDate.getFullYear() === year
                );
            });

            // 3. Reduce the array into a grouped object { "CategoryName": totalAmount }
            const totals = monthlyExpenses.reduce((acc: any, item: any) => {
                // 1. Extract the name safely. 
                // If item.category is an object, take .name; otherwise use the value itself or 'Other'
                let categoryKey = 'Uncategorized';

                if (item.category && typeof item.category === 'object') {
                    categoryKey = item.category.name;
                } else if (typeof item.category === 'string') {
                    categoryKey = item.category;
                }

                const amount = parseFloat(item.amount) || 0;

                // 2. Sum it up
                acc[categoryKey] = (acc[categoryKey] || 0) + amount;

                return acc;
            }, {});

            return totals;
        } catch (e) {
            console.error("Error calculating category totals", e);
            return {};
        }
    },
};