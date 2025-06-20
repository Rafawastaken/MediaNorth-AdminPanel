// src/layouts/Layout.jsx
// -------------------------------------------------------------------
// Layout principal: Sidebar colapsável + Navbar no topo
// Corrige cor de texto global: deixa o conteúdo visível
// -------------------------------------------------------------------
import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import {PanelLeftClose, PanelLeftOpen} from 'lucide-react';
import Sidebar from '../components/ui/Sidebar';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <main className="flex h-screen overflow-hidden bg-slate-50 text-gray-900">
        {/* Sidebar colapsável */}
        <Sidebar collapsed={collapsed}/>

        {/* Área de conteúdo */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Navbar */}
          <header
              className="flex h-16 items-center justify-between bg-white/90 px-4 shadow-md backdrop-blur">
            <button
                aria-label="Alternar navegação"
                onClick={() => setCollapsed((v) => !v)}
                className="rounded p-2 text-[var(--dark-blue)] hover:bg-slate-200/50"
            >
              {collapsed ?
                  <PanelLeftOpen size={24}/> :
                  <PanelLeftClose size={24}/>}
            </button>

            <p className="text-sm text-gray-600">
              Última Atualização:&nbsp;02:51:55&nbsp;10&nbsp;Junho&nbsp;2025
            </p>
          </header>

          {/* Páginas */}
          <section className="flex-1 overflow-y-auto py-6 px-12">
            <Outlet/>
          </section>
        </div>
      </main>
  );
};

export default Layout;
