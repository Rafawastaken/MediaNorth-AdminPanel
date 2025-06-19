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
} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useAuth} from '../../contexts/AuthContext';

const Section = ({icon: Icon, label, defaultOpen = false, children}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
      <div className="text-sm text-gray-200">
        <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center gap-3 px-5 py-3 hover:bg-white/5 hover:text-white transition"
        >
          <Icon size={20}/>
          <span
              className="flex-1 text-left text-lg font-normal text-white">{label}</span>
          {open ? <ChevronDown size={20}/> : <ChevronRight size={20}/>}
        </button>
        {open && <div
            className="mt-2 space-y-2 pl-11 text-indigo-100 opacity-90">{children}</div>}
      </div>
  );
};

const Item = ({icon: Icon, to, children}) => (
    <Link
        to={to}
        className="flex items-center gap-3 rounded px-3 py-2 hover:bg-white/5 transition hover:text-white"
    >
      <Icon size={18} className="shrink-0"/>
      {children}
    </Link>
);

const Sidebar = () => {
  const {user, signOut} = useAuth();
  const fullName = user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      user?.email?.split('@')[0] || 'Utilizador';
  const email = user?.email || '';

  return (
      <aside
          className="flex h-screen w-72 flex-col bg-[var(--dark-blue)]">
        {/* Logo / título */}
        <div
            className="flex h-20 items-center gap-4 border-b border-white/10 px-5">
          <Tv size={32} className="rounded-lg bg-blue-600 p-1 text-white"/>
          <div className="leading-tight">
            <h1 className="text-xl font-semibold text-white">Media North</h1>
            <p className="text-xs text-indigo-100 opacity-75">Painel de
              Controle</p>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex-1 overflow-y-auto py-6">
          <Section icon={LayoutDashboard} label="Dashboard" defaultOpen>
            <Item icon={MonitorOff} to="/tvs-inativas">
              TVs Inativas
            </Item>
            <Item icon={CalendarClock} to="/anuncios-fim">
              Anúncios em Finalização
            </Item>
            <Item icon={BarChart2} to="/avisos">
              TVs/Avisos
            </Item>
          </Section>

          <Section icon={MapPin} label="Locais/Pontos" defaultOpen>
            <Item icon={Plus} to="/locais/novo">
              Adicionar Novo
            </Item>
            <Item icon={List} to="/locais">
              Lista de Locais
            </Item>
          </Section>

          <Section icon={Users} label="Clientes" defaultOpen>
            <Item icon={Plus} to="/clientes/novo">
              Adicionar Novo
            </Item>
            <Item icon={List} to="/clientes">
              Lista de Clientes
            </Item>
          </Section>

          <Section icon={Store} label="Revenda" defaultOpen>
            <Item icon={Plus} to="/revenda/novo">
              Adicionar Novo
            </Item>
            <Item icon={List} to="/revendedores">
              Lista de Revendedores
            </Item>
          </Section>
        </nav>

        {/* Área do utilizador */}
        {/* Rodapé com utilizador */}
        <div className="border-t border-white/10 px-5 py-4">
          <div className="flex items-center gap-3 text-sm">
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGaabie0IJGx5Fq1Ro19m2hVNOPA7Jh4JgA&s"
                alt="avatar" height={18} width={18}
                className={'rounded-full h-12 w-12 object-cover object-center'}/>

            <div className="flex-1 overflow-hidden leading-tight">
              <p className="truncate text-white">{fullName}</p>
              <p className="truncate text-[13px] text-gray-400">{email}</p>
            </div>
            <button
                onClick={signOut}
                title="Terminar sessão"
                className="rounded p-2 text-red-300 hover:bg-white/5"
            >
              <LogOut size={18}/>
            </button>
          </div>
        </div>
      </aside>
  );
};

export default Sidebar;