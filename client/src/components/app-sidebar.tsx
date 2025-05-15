import { Home, Inbox, Map, Receipt, ShieldUser, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"; // assuming your sidebar has Header and Footer components
import { ConfirmDialog } from "./atoms/ConfirmDialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button"; // Adjust the path if necessary
import { LogOut } from "lucide-react"; // Assuming LogOut is from lucide-react

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Mails",
    url: "/dashboard/mails",
    icon: Inbox,
  },
  {
    title: "Bills",
    url: "/dashboard/bills",
    icon: Receipt,
  },
  {
    title: "Routing Areas",
    url: "/dashboard/routingareas",
    icon: Map,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Employees",
    url: "/dashboard/employees",
    icon: ShieldUser,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4  bg-gray-100">
        <h1 className="text-2xl font-bold text-center">Welcome!</h1>
      </SidebarHeader>

      <Separator className="mb-2" />

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator className="mt-2 bg-gray-100" />

      <SidebarFooter className="mb-4 ">
        <ConfirmDialog
          title="Are you sure you want to sign out?"
          description="You will be signed out of your account and redirected to the login page."
          onConfirm={function (): void {
            throw new Error("Function not implemented.");
          }}
          trigger={
            <Button variant="destructive">
              <LogOut className="transform scale-x-[-1]" />
              Sign out
            </Button>
          }
        />
      </SidebarFooter>
    </Sidebar>
  );
}
