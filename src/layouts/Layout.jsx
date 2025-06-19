// src/Layout.jsx
import {Outlet} from 'react-router-dom';
import Sidebar from '../components/ui/sidebar.jsx';

const Layout = () => (
    <main className="flex">
      <Sidebar/>
      <div className="flex-1 overflow-y-auto">
        <Outlet/>
      </div>
    </main>
);

export default Layout;
