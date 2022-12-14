"use client";

import { IconRefresh } from "@tabler/icons";
import { useRouter } from "next/navigation";

const RefreshButton = () => {
  const router = useRouter();
  return (
    <div className="btn btn-circle btn-ghost fixed top-4 right-4">
      <div className="tooltip tooltip-left" data-tip="Refresh Data">
        <IconRefresh stroke={2} size={28} onClick={() => router.refresh()} />
      </div>
    </div>
  );
};

export default RefreshButton;
