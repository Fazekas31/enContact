import React from 'react';
import { useApp } from '../../context/AppContext';
import { Checkbox } from '../atoms/Checkbox';
import { Archive } from 'lucide-react';

export const ActionToolbar: React.FC = () => {
  const {
    selectedMailIds,
    mails,
    toggleSelectAllMails,
    archiveSelectedMails,
    language
  } = useApp();

  const hasSelection = selectedMailIds.length > 0;
  const isAllSelected = mails.length > 0 && selectedMailIds.length === mails.length;

  return (
    <div className="action-toolbar">
      {/* Checkbox Geral de Seleção para marcar todos/nenhum */}
      {mails.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '8px' }} title={language === 'pt' ? 'Selecionar todos' : 'Select all'}>
          <Checkbox
            checked={isAllSelected}
            onChange={toggleSelectAllMails}
          />
        </div>
      )}

      <div className="toolbar-actions">
        {/* Botão de Arquivar */}
        <button
          className={`archive-btn ${hasSelection ? 'active' : ''}`}
          onClick={() => {
            if (hasSelection) archiveSelectedMails();
          }}
          disabled={!hasSelection}
          title={language === 'pt' ? 'Arquivar selecionados' : 'Archive selected'}
        >
          <span className="btn-icon">
            <Archive size={16} />
          </span>
          <span>
            {language === 'pt' ? 'Arquivar' : 'Archive'}
          </span>
        </button>
      </div>

      {hasSelection && (
        <>
          <div className="toolbar-divider"></div>
          <span className="toolbar-info">
            {language === 'pt'
              ? `${selectedMailIds.length} selecionado(s)`
              : `${selectedMailIds.length} selected`}
          </span>
        </>
      )}
    </div>
  );
};
