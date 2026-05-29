import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { MenuItem, SubMenuItem } from '../../types';
import {
  Folder,
  Inbox,
  Send,
  Star,
  Trash2,
  ChevronRight,
  Mail
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeMenuId, setActiveMenuId, language } = useApp();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({});
  const [isLoadingMenu, setIsLoadingMenu] = useState<boolean>(true);

  // Busca a estrutura de menus na API
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/menus');
        if (response.ok) {
          const data = await response.json();
          setMenus(data);
          
          // Abre todas as contas por padrão
          const initialExpanded: Record<number, boolean> = {};
          data.forEach((item: MenuItem) => {
            initialExpanded[item.id] = true;
          });
          setExpandedGroups(initialExpanded);
        }
      } catch (error) {
        console.error("Erro ao buscar menus da sidebar:", error);
      } finally {
        setIsLoadingMenu(false);
      }
    };

    fetchMenus();
  }, []);

  const toggleGroup = (id: number) => {
    setExpandedGroups(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Mapeia ícones adequados conforme o nome da pasta do e-mail
  const getFolderIcon = (name: string) => {
    const normalized = name.toLowerCase().trim();
    if (normalized.includes('entrada') || normalized.includes('inbox')) {
      return <Inbox size={16} className="menu-icon" />;
    }
    if (normalized.includes('saída') || normalized.includes('outbox') || normalized.includes('sent')) {
      return <Send size={16} className="menu-icon" />;
    }
    if (normalized.includes('vip') || normalized.includes('star')) {
      return <Star size={16} className="menu-icon" fill="currentColor" />;
    }
    if (normalized.includes('lixo') || normalized.includes('trash') || normalized.includes('spam')) {
      return <Trash2 size={16} className="menu-icon" />;
    }
    return <Mail size={16} className="menu-icon" />;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {language === 'pt' ? 'Pastas' : 'Folders'}
      </div>

      {isLoadingMenu ? (
        // Estado de carregamento simplificado para a sidebar
        <div style={{ padding: '0 16px', opacity: 0.6, fontSize: '13px' }}>
          {language === 'pt' ? 'Carregando pastas...' : 'Loading folders...'}
        </div>
      ) : (
        <ul className="sidebar-menu-list">
          {menus.map((menu) => {
            const isExpanded = !!expandedGroups[menu.id];
            return (
              <li key={menu.id} className="menu-group">
                {/* Cabeçalho da Conta / Grupo (Clicável para Expandir/Colapsar) */}
                <div
                  className="menu-item-row header-row"
                  onClick={() => toggleGroup(menu.id)}
                >
                  <div className="menu-left">
                    <Folder size={16} className="menu-icon" />
                    <span className="menu-name" style={{ fontWeight: 600 }}>{menu.name}</span>
                  </div>
                  {menu.subMenus && menu.subMenus.length > 0 && (
                    <div className={`menu-right-icon ${isExpanded ? 'expanded' : ''}`}>
                      <ChevronRight size={14} />
                    </div>
                  )}
                </div>

                {/* Submenus (Pastas de E-mail) */}
                {menu.subMenus && menu.subMenus.length > 0 && isExpanded && (
                  <ul className="submenu-list">
                    {menu.subMenus.map((subMenu: SubMenuItem) => {
                      const isActive = activeMenuId === subMenu.id;
                      return (
                        <li key={subMenu.id} className="menu-item-wrapper">
                          <div
                            className={`menu-item-row ${isActive ? 'active' : ''}`}
                            onClick={() => setActiveMenuId(subMenu.id)}
                          >
                            <div className="menu-left">
                              {getFolderIcon(subMenu.name)}
                              <span className="menu-name">{subMenu.name}</span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
};
