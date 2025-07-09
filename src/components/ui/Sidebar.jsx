// src/components/ui/Sidebar.jsx
// -------------------------------------------------------------------
// Sidebar colapsáveis: quando `collapsed` é true mostra só ícones.
// Animação suave com Tailwind `transition-all`.
// -------------------------------------------------------------------
import {
  Tv,
  LayoutDashboard,
  MonitorOff,
  CalendarClock,
  BarChart2,
  MapPin,
  Plus,
  List,
  Users,
  Store,
  User,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

/* ------------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------*/
const Section = ({
  icon: Icon,
  label,
  collapsed,
  defaultOpen = false,
  children,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const canToggle = !collapsed;

  return (
    <div className="text-[15px] leading-tight text-gray-200">
      <button
        onClick={() => canToggle && setOpen(!open)}
        className={`flex w-full items-center gap-3 px-4 py-3 hover:bg-white/5 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <Icon size={22} />
        {!collapsed && (
          <>
            <span className="flex-1 text-left font-medium tracking-wide">
              {label}
            </span>
            {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </>
        )}
      </button>

      {!collapsed && open && (
        <div className="space-y-2 pl-12 pr-4 pb-3 text-indigo-100/90">
          {children}
        </div>
      )}
    </div>
  );
};

const Item = ({ icon: Icon, to, children, collapsed }) => (
  <Link
    to={to}
    title={collapsed ? children : undefined}
    className={`flex items-center gap-3 rounded px-3 py-2 hover:bg-white/5 transition ${
      collapsed ? "justify-center" : ""
    }`}
  >
    <Icon size={18} className="shrink-0" />
    {!collapsed && children}
  </Link>
);

/* ------------------------------------------------------------------
 * Sidebar principal
 * ----------------------------------------------------------------*/
const Sidebar = ({ collapsed = false }) => {
  const { user, signOut } = useAuth();
  const email = user?.email || "";

  return (
    <aside
      className={`flex h-screen flex-col bg-[var(--dark-blue)] transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo / título */}
      <Link
        to={"/"}
        className={`flex items-center gap-3 border-b border-white/10 px-4 ${
          collapsed ? "h-20 justify-center" : "h-24"
        }`}
      >
        <Tv
          size={collapsed ? 28 : 32}
          className="rounded-lg bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 p-1 text-white shadow-md shadow-cyan-500/30"
        />
        {!collapsed && (
          <div>
            <h1 className="text-xl font-semibold text-white leading-none">
              Media&nbsp;North
            </h1>
            <p className="text-xs text-gray-300">Gestor de Publicidade</p>
          </div>
        )}
      </Link>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto py-6">
        <Section
          icon={LayoutDashboard}
          label="Dashboard"
          collapsed={collapsed}
          defaultOpen
        >
          <Item icon={MonitorOff} to="/inactive-devices" collapsed={collapsed}>
            Dispositivos Inativas
          </Item>
          <Item
            icon={CalendarClock}
            to="/terminating-contracts"
            collapsed={collapsed}
          >
            Anúncios a Terminar
          </Item>
          <Item icon={BarChart2} to="/logs" collapsed={collapsed}>
            Estatísticas & Avisos
          </Item>
        </Section>

        <Section
          icon={MapPin}
          label="Locais/Pontos"
          collapsed={collapsed}
          defaultOpen
        >
          <Item icon={Plus} to="/sites/add" collapsed={collapsed}>
            Adicionar Local
          </Item>
          <Item icon={List} to="/sites" collapsed={collapsed}>
            Lista de Locais
          </Item>
        </Section>

        <Section
          icon={Users}
          label="Clientes"
          collapsed={collapsed}
          defaultOpen
        >
          <Item icon={Plus} to="/customers/add" collapsed={collapsed}>
            Novo Cliente
          </Item>
          <Item icon={List} to="/customers" collapsed={collapsed}>
            Lista de Clientes
          </Item>
        </Section>

        <Section icon={Store} label="Revenda" collapsed={collapsed} defaultOpen>
          <Item icon={Plus} to="#" collapsed={collapsed}>
            Novo Canal
          </Item>
          <Item icon={List} to="#" collapsed={collapsed}>
            Revendedores
          </Item>
        </Section>
      </nav>

      {/* Rodapé do utilizador */}
      {collapsed ? (
        <div className="flex h-16 items-center justify-center border-t border-white/10">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-600/40">
            <User size={18} />
          </div>
        </div>
      ) : (
        <div className="border-t border-white/10 px-5 py-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-600/40">
              <User size={18} />
            </div>
            <div className="flex-1 overflow-hidden leading-tight">
              <p className="truncate text-white">{user.fullName}</p>
              <p className="truncate text-[13px] text-gray-400">{email}</p>
            </div>
            <button
              onClick={signOut}
              title="Terminar sessão"
              className="rounded p-2 text-red-300 hover:bg-white/5"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
