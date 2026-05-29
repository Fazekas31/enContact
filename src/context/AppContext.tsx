import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MailItem } from '../types';

type Theme = 'light' | 'dark';
type Language = 'pt' | 'en';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  activeMenuId: number | null;
  setActiveMenuId: (id: number | null) => void;
  selectedMailIds: string[];
  toggleSelectMail: (id: string) => void;
  toggleSelectAllMails: () => void;
  clearSelection: () => void;
  mails: MailItem[];
  setMails: React.Dispatch<React.SetStateAction<MailItem[]>>;
  archiveSelectedMails: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Lista de corpos de e-mail mockados para enriquecer a alta fidelidade da UI
const mockBodies = [
  "Olá, estou enviando este e-mail para confirmar a nossa reunião agendada para a próxima semana sobre o andamento do projeto.",
  "Desejo-lhe um excelente dia! Gostaria de verificar se você teve a oportunidade de revisar os relatórios financeiros que enviei.",
  "Estou aguardando o seu retorno sobre a proposta comercial que enviamos ontem. Qualquer dúvida, estou à total disposição.",
  "Apenas um lembrete rápido sobre o prazo de entrega dos documentos finais que vence nesta sexta-feira às 18h.",
  "Gostaria de informar que a manutenção do sistema ocorrerá neste final de semana. Favor salvar todos os arquivos pendentes.",
  "Segue a resposta detalhada referente ao chamado aberto no suporte técnico. Conseguimos isolar o problema de rede.",
  "A versão atualizada do contrato de prestação de serviços jurídicos está disponível para assinatura digital na plataforma.",
  "Boa noite, gostaria de agendar um horário com você amanhã à tarde para alinhar as metas do trimestre."
];

// Gerador de datas realistas para simular a caixa de entrada do Outlook
const getMockDate = (index: number): string => {
  const dates = [
    "10:32",
    "08:15",
    "Ontem",
    "27 de mai.",
    "26 de mai.",
    "24 de mai.",
    "20 de mai.",
    "15 de mai.",
  ];
  return dates[index % dates.length];
};

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('office365-theme');
    return (saved as Theme) || 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('office365-lang');
    return (saved as Language) || 'pt';
  });

  const [activeMenuId, setActiveMenuId] = useState<number | null>(11); // Caixa de entrada padrão
  const [selectedMailIds, setSelectedMailIds] = useState<string[]>([]);
  const [mails, setMails] = useState<MailItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sincroniza o tema com o elemento <html> para aplicação do CSS custom properties
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('office365-theme', theme);
  }, [theme]);

  // Sincroniza o idioma
  useEffect(() => {
    localStorage.setItem('office365-lang', language);
  }, [language]);

  // Carrega e-mails ao mudar o menu ativo
  useEffect(() => {
    if (activeMenuId === null) return;

    const fetchMails = async () => {
      setIsLoading(true);
      setSelectedMailIds([]); // Limpa a seleção ao trocar de pasta
      try {
        const response = await fetch(`https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/items/${activeMenuId}`);
        if (response.ok) {
          const data = await response.json();
          // Enriquece os itens com dados virtuais para fidelidade de design
          const enrichedItems: MailItem[] = (data.subMenuItems || []).map((item: any, idx: number) => {
            const name = item.name === 'Bruna Marquezine' ? 'Beatriz Martins' : item.name;
            return {
              ...item,
              name,
              date: getMockDate(idx),
              description: mockBodies[idx % mockBodies.length],
              isRead: idx > 1 // Simula e-mails lidos e não lidos
            };
          });
          setMails(enrichedItems);
        } else {
          setMails([]);
        }
      } catch (error) {
        console.error("Erro ao buscar e-mails:", error);
        setMails([]);
      } finally {
        // Simular um atraso suave de carregamento para apreciar o Skeleton Loader
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    fetchMails();
  }, [activeMenuId]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'pt' ? 'en' : 'pt'));
  };

  const toggleSelectMail = (id: string) => {
    setSelectedMailIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAllMails = () => {
    if (selectedMailIds.length === mails.length) {
      setSelectedMailIds([]);
    } else {
      setSelectedMailIds(mails.map(m => m.id));
    }
  };

  const clearSelection = () => {
    setSelectedMailIds([]);
  };

  const archiveSelectedMails = () => {
    // Remove do estado local os itens que estão selecionados
    setMails(prev => prev.filter(mail => !selectedMailIds.includes(mail.id)));
    setSelectedMailIds([]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        toggleLanguage,
        activeMenuId,
        setActiveMenuId,
        selectedMailIds,
        toggleSelectMail,
        toggleSelectAllMails,
        clearSelection,
        mails,
        setMails,
        archiveSelectedMails,
        isLoading,
        setIsLoading,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppContextProvider');
  }
  return context;
};
