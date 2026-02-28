import { PageHeader } from "@/global/page-header";
import { ScrollView } from "react-native";

export default function ExpenseListScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50" stickyHeaderIndices={[0]}>
         <PageHeader 
           title="Expense List"  
         />
    </ScrollView>
  );
}   