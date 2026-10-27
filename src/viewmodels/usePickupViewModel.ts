import { useState } from "react";
import { goBackOrHome } from "@/viewmodels/tabNavigation";

type Role = "Owner" | "Finder";

const PICKUP_CODE = "4821";

export function usePickupViewModel() {
  const [selectedRole, setSelectedRole] = useState<Role>("Owner");

  return {
    selectedRole,
    selectRole: setSelectedRole,
    description: selectedRole === "Owner"
      ? "Show this code to Finder when you meet. Once it's scanned, your keys are marked as returned."
      : "Scan the Owner's code when you meet. Once it's scanned, the keys are marked as returned.",
    pickupCode: PICKUP_CODE,
    qrValue: `BUE-LOST-FOUND-PICKUP- ${PICKUP_CODE}`,
    goBack: goBackOrHome,
  };
}
