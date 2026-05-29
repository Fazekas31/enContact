import React, { useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Globe } from 'lucide-react';

interface ProfileDropdownProps {
  onClose: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  const { theme, toggleTheme, language, toggleLanguage } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    // Pequeno atraso para registrar o evento e evitar fechar no próprio clique de abertura
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="profile-dropdown" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
      <div className="profile-info">
        <div className="profile-avatar-large">
          EA
        </div>
        <div className="profile-name">
          Enki Architect
        </div>
        <div className="profile-email">
          architect@enki.group
        </div>
      </div>

      <div className="profile-settings">
        <div className="setting-row">
          <span className="setting-label">
            {language === 'pt' ? 'Tema' : 'Theme'}
          </span>
          <button className="theme-toggle-btn" onClick={toggleTheme} title={language === 'pt' ? 'Alterar tema' : 'Toggle theme'}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {theme === 'light' ? (
                <>
                  <Sun size={14} />
                  {language === 'pt' ? 'Claro' : 'Light'}
                </>
              ) : (
                <>
                  <Moon size={14} />
                  {language === 'pt' ? 'Escuro' : 'Dark'}
                </>
              )}
            </span>
          </button>
        </div>

        <div className="setting-row">
          <span className="setting-label">
            {language === 'pt' ? 'Idioma' : 'Language'}
          </span>
          <button className="theme-toggle-btn" onClick={toggleLanguage} title={language === 'pt' ? 'Alterar idioma' : 'Toggle language'}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} />
              {language === 'pt' ? 'Português' : 'English'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
