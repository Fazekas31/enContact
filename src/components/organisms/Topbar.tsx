import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfileDropdown } from '../molecules/ProfileDropdown';
import { Grid, Search, Bell, Settings, HelpCircle } from 'lucide-react';

export const Topbar: React.FC = () => {
  const { language, searchQuery, setSearchQuery } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileOpen(prev => !prev);
  };

  return (
    <header className="topbar">
      {/* Lado Esquerdo: Launcher e Logo */}
      <div className="topbar-left">
        <button className="app-launcher" title="App Launcher">
          <Grid size={20} />
        </button>
        <span className="app-title"></span>
      </div>

      {/* Centro: Barra de Busca */}
      <div className="topbar-search">
        <input
          type="text"
          placeholder={language === 'pt' ? 'Pesquisar e-mails...' : 'Search emails...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search size={16} className="search-icon" />
      </div>

      {/* Lado Direito: Ações rápidas e Perfil */}
      <div className="topbar-right">
        <button className="topbar-btn" title={language === 'pt' ? 'Notificações' : 'Notifications'}>
          <Bell size={18} />
        </button>
        <button className="topbar-btn" title={language === 'pt' ? 'Configurações' : 'Settings'}>
          <Settings size={18} />
        </button>
        <button className="topbar-btn" title={language === 'pt' ? 'Ajuda' : 'Help'}>
          <HelpCircle size={18} />
        </button>

        {/* Gatilho do Perfil */}
        <div className="user-profile">
          <button
            className="profile-trigger"
            onClick={toggleProfile}
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
            title={language === 'pt' ? 'Minha Conta' : 'My Account'}
          >
            EA
          </button>

          {isProfileOpen && (
            <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
};
