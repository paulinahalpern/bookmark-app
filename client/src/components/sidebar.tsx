import {
  SidebarContent,
  SidebarProvider,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  Sidebar,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Logout } from "./logout";
import AuthUser from "./auth-user";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function SideBar() {
  return (
    <SidebarProvider>
      <SidebarTrigger />
      <Sidebar>
        <SidebarHeader>
          <AuthUser />
        </SidebarHeader>
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Logout />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
