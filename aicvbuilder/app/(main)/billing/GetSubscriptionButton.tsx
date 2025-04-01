"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "../../../hooks/usePreminumModal";

export default function GetSubscriptionButton() {
  const premiumModal = usePremiumModal();

  return (
    <Button onClick={() => premiumModal.setOpen(true)} variant="preminum">
      Get Premium subscription
    </Button>
  );
}