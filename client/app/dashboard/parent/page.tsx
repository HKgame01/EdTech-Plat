// app/dashboard/parent/page.tsx

import { AuthGuard } from "@/components/auth-guard"
import ParentDashboardContent from "./ParentDashboardContent"

export default function ParentDashboard() {
  return (
    <AuthGuard allowedRoles={["parent"]}>
      <ParentDashboardContent />
    </AuthGuard>
  )
}
