import { SidebarContent, SidebarMenu } from "@/components/ui/sidebar";
import { Logout } from "./logout";
import AuthUser from "./auth-user";

export default function SideBar() {
  return (
    <SidebarMenu className="w-64 h-screen bg-white">
      <SidebarContent className="flex flex-col justify-between h-full p-4">
        <div className="space-y-4">
          <AuthUser />
          <Logout />
        </div>
      </SidebarContent>
    </SidebarMenu>
  );
}
