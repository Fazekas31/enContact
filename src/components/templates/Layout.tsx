import React from 'react';
import { Topbar } from '../organisms/Topbar';
import { Sidebar } from '../organisms/Sidebar';
import { ActionToolbar } from '../organisms/ActionToolbar';
import { MailList } from '../organisms/MailList';

export const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      <Topbar />
      <Sidebar />
      <main className="content-area">
        <ActionToolbar />
        <MailList />
      </main>
    </div>
  );
};
export default Layout;
