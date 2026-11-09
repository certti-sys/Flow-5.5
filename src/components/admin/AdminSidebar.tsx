import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  Palette,
  Images,
  Bell,
  Webhook,
  GraduationCap,
  LogOut,
  Home,
  MessageSquare,
  Mail,
  MessageCircle,
  ShoppingCart,
  Package,
  Layers,
  Award,
  Activity,
  CreditCard,
  TrendingUp,
  UserCheck,
  Tag
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePlatformSettingsContext } from "@/components/PlatformSettingsProvider";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// 1. Visão Geral
const overviewItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
];

// 2. Acadêmico
const academicItems = [
  { title: "Carrosséis", url: "/admin/carrosseis", icon: Images },
  { title: "Cursos", url: "/admin/cursos", icon: BookOpen },
  { title: "Alunos", url: "/admin/alunos", icon: Users },
  { title: "Comentários", url: "/admin/comentarios", icon: MessageSquare },
  { title: "Certificados", url: "/admin/certificados", icon: Award },
];

// 3. Comercial
const commercialItems = [
  { title: "Vendas", url: "/admin/vendas", icon: TrendingUp },
  { title: "Pedidos", url: "/admin/pedidos", icon: ShoppingCart },
  { title: "Clientes", url: "/admin/clientes", icon: UserCheck },
  { title: "Produtos", url: "/admin/produtos", icon: Package },
  { title: "Cupons", url: "/admin/cupons", icon: Tag },
  { title: "Orderbumps", url: "/admin/orderbump", icon: Layers },
];

// 4. Canais de Comunicação
const communicationItems = [
  { title: "Notificações", url: "/admin/notificacoes", icon: Bell },
  { title: "Emails", url: "/admin/emails", icon: Mail },
  { title: "WhatsApp", url: "/admin/whatsapp", icon: MessageCircle },
];

// 5. Configurações do Sistema
const systemItems = [
  { title: "Gateways", url: "/admin/gateways", icon: CreditCard },
  { title: "Webhooks", url: "/admin/webhooks", icon: Webhook },
  { title: "Monitoramento", url: "/admin/monitoring", icon: Activity },
];

// 6. Aparência & Design
const appearanceItems = [
  { title: "Personalização", url: "/admin/personalizacao", icon: Palette },
];

export function AdminSidebar() {
  const { state, isMobile } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { settings } = usePlatformSettingsContext();
  const collapsed = isMobile ? false : state === "collapsed";

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const renderMenuItems = (items: typeof overviewItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.url)}
            tooltip={collapsed ? item.title : undefined}
          >
            <NavLink
              to={item.url}
              end={item.url === "/admin"}
              className={cn(
                "flex items-center gap-2",
                isActive(item.url)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4 text-white/50 transition-colors group-hover:text-primary" />
              {!collapsed && (
                <span className={cn(
                  "text-xs sm:text-sm font-medium",
                  isActive(item.url) ? "text-primary font-bold" : "text-white/50"
                )}>
                  {item.title}
                </span>
              )}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible={isMobile ? "offcanvas" : "icon"} className="border-r border-white/10 bg-white/5 backdrop-blur-md">
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-white/5 px-4 py-4">
        <div className={cn("flex items-center gap-2", settings.logo_display_mode === 'horizontal' && "justify-center w-full")}>
          {settings.logo_display_mode === 'horizontal' && settings.logo_horizontal_url ? (
            <img
              src={settings.logo_horizontal_url}
              alt={settings.logo_text || "Logo"}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <>
              {settings.logo_image_url ? (
                <img
                  src={settings.logo_image_url}
                  alt="Logo"
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
              )}
              {!collapsed && (
                <span className="font-semibold text-white tracking-tight">
                  {settings.logo_text || "EduStream"}
                </span>
              )}
            </>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Back to Client Area */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={collapsed ? "Área do Aluno" : undefined}
                  className="text-white/50 hover:text-white hover:bg-white/5"
                >
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2"
                  >
                    <Home className="h-4 w-4 text-white/50 group-hover:text-primary transition-colors" />
                    {!collapsed && (
                      <span className="text-xs sm:text-sm font-medium text-white/50 group-hover:text-primary transition-colors">
                        Área do Aluno
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 1. Visão Geral */}
        <SidebarGroup>
          <SidebarGroupLabel>Visão Geral</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(overviewItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 2. Acadêmico */}
        <SidebarGroup>
          <SidebarGroupLabel>Acadêmico</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(academicItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 3. Comercial */}
        <SidebarGroup>
          <SidebarGroupLabel>Comercial</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(commercialItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 6. Aparência & Design */}
        <SidebarGroup>
          <SidebarGroupLabel>Aparência & Design</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(appearanceItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 4. Canais de Comunicação */}
        <SidebarGroup>
          <SidebarGroupLabel>Canais de Comunicação</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(communicationItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 5. Configurações do Sistema */}
        <SidebarGroup>
          <SidebarGroupLabel>Configurações do Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(systemItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip={collapsed ? "Sair" : undefined}
              className="text-white/50 hover:text-white hover:bg-white/5"
            >
              <LogOut className="h-4 w-4 text-white/50 group-hover:text-destructive transition-colors" />
              {!collapsed && <span className="font-medium text-white/50 group-hover:text-destructive">Sair</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}


