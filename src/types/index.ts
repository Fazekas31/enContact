export interface SubMenuItem {
  id: number;
  name: string;
}

export interface MenuItem {
  id: number;
  name: string;
  subMenus?: SubMenuItem[];
}

export interface MailItem {
  id: string;
  name: string;
  subject: string;
  owner: string;
  users: string[];
  // Campos virtuais para enriquecer o visual de alta fidelidade do Office 365
  date?: string;
  description?: string;
  isRead?: boolean;
}

export interface MailAPIResponse {
  id: number;
  subMenuItems: MailItem[];
}
