import React from 'react';
import type { MailItem } from '../../types';
import { Avatar } from '../atoms/Avatar';
import { Checkbox } from '../atoms/Checkbox';

interface MailRowProps {
  mail: MailItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

export const MailRow: React.FC<MailRowProps> = ({
  mail,
  isSelected,
  onSelect,
  index
}) => {
  // Tratamento para evitar que cliques gerais ativem múltiplas coisas indesejadas
  const handleRowClick = () => {
    onSelect(mail.id);
  };

  return (
    <div
      className={`mail-row ${isSelected ? 'selected' : ''} ${mail.isRead ? 'read' : 'unread'}`}
      onClick={handleRowClick}
    >
      {/* Coluna Esquerda: Avatar do Proprietário ou Checkbox (Transição via CSS) */}
      <div className="mail-left-col">
        <div className="avatar-wrapper">
          <Avatar initials={mail.owner} size="medium" index={index} />
        </div>
        <div className="checkbox-wrapper">
          <Checkbox checked={isSelected} onChange={() => onSelect(mail.id)} />
        </div>
      </div>

      {/* Coluna Central: Dados do e-mail (Remetente, Assunto, Preview do corpo) */}
      <div className="mail-content-col">
        <div className="mail-header-info">
          <span className="mail-sender">{mail.name}</span>
        </div>
        <div className="mail-subject-row" title={mail.subject}>
          {mail.subject}
        </div>
        <div className="mail-body-preview" title={mail.description}>
          {mail.description}
        </div>
      </div>

      {/* Coluna Direita: Data e Avatares dos Usuários Participantes */}
      <div className="mail-right-col">
        <span className="mail-date">{mail.date}</span>
        
        {/* Renderização dos círculos de participantes pequenos */}
        {mail.users && mail.users.length > 0 && (
          <div className="users-avatars-group" title={`${mail.users.length} participante(s)`}>
            {mail.users.map((userInitials, uIdx) => (
              <div
                key={`${mail.id}-user-${uIdx}`}
                className={`user-avatar-mini color-${uIdx % 5}`}
              >
                {userInitials}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
