import React from 'react';
import { useApp } from '../../context/AppContext';
import { MailRow } from '../molecules/MailRow';
import { SkeletonRow } from '../atoms/SkeletonRow';
import { MailOpen } from 'lucide-react';

export const MailList: React.FC = () => {
  const {
    mails,
    selectedMailIds,
    toggleSelectMail,
    isLoading,
    searchQuery,
    language
  } = useApp();

  // Filtra e-mails com base na busca (nome, assunto ou conteúdo)
  const filteredMails = mails.filter(mail => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      mail.name.toLowerCase().includes(query) ||
      mail.subject.toLowerCase().includes(query) ||
      (mail.description && mail.description.toLowerCase().includes(query))
    );
  });

  const isSelectionModeActive = selectedMailIds.length > 0;

  if (isLoading) {
    return (
      <div className="mail-list-container">
        <div className="mail-list">
          {/* Exibe 6 skeletons para preencher a tela com animação suave */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonRow key={`skeleton-${idx}`} />
          ))}
        </div>
      </div>
    );
  }

  if (filteredMails.length === 0) {
    return (
      <div className="mail-list-container">
        <div className="mail-list-empty">
          <MailOpen className="empty-icon" />
          <p>
            {language === 'pt'
              ? 'Nenhuma mensagem encontrada nesta pasta.'
              : 'No messages found in this folder.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mail-list-container">
      {/* 
        A classe 'selection-mode-active' força todos os avatares de e-mails 
        a se transformarem em checkboxes, facilitando a seleção múltipla granular.
      */}
      <div className={`mail-list ${isSelectionModeActive ? 'selection-mode-active' : ''}`}>
        {filteredMails.map((mail, idx) => (
          <MailRow
            key={mail.id}
            mail={mail}
            isSelected={selectedMailIds.includes(mail.id)}
            onSelect={toggleSelectMail}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};
