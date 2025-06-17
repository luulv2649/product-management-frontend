import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, BarChart3, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    {
      path: '/dashboard',
      icon: Home,
      label: 'Dashboard',
    },
    {
      path: '/products',
      icon: Package,
      label: 'Sản phẩm',
    },
    {
      path: '/statistics',
      icon: BarChart3,
      label: 'Thống kê',
    },
    {
      path: '/settings',
      icon: Settings,
      label: 'Cài đặt',
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Product Manager</h2>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <item.icon size={20} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;