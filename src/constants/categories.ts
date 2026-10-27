import { IdCard, KeyRound, Headphones, Calculator, Wallet, Box } from "lucide-react-native";

// Item categories, shared by the Report screen (tiles) and the Campus map (pin icons)
export const CATEGORIES = [
    { id: "id-card",    label: "ID Card",    icon: IdCard },
    { id: "keys",       label: "Keys",       icon: KeyRound },
    { id: "earphones",  label: "Earphones",  icon: Headphones },
    { id: "calculator", label: "Calculator", icon: Calculator },
    { id: "wallet",     label: "Wallet",     icon: Wallet },
    { id: "other",      label: "Other",      icon: Box },
];
