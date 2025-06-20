import './App.css';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  TableOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import AddLeadForm from './leads/AddLeadForm';
import LeadsTable from './leads/LeadsTable';
import Dashboard from './dashboard/Dashboard';
import About from './about/About';

const { Sider, Content } = Layout;

function App() {
  const [current, setCurrent] = useState('dashboard');

  const renderContent = () => {
    switch (current) {
      case 'dashboard':
        return <Dashboard />;
      case 'add':
        return <AddLeadForm />;
      case 'leads':
        return <LeadsTable />;
      case 'about':
        return <About />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <img
            src="https://api.qureal.com/assets/b90b0f1f-ac58-4462-beaf-8443326473a9"
            alt="logo"
            style={{ maxWidth: '80%', height: 40, objectFit: 'contain' }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[current]}
          onClick={({ key }) => setCurrent(key)}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="leads" icon={<TableOutlined />}>All Leads</Menu.Item>
          <Menu.Item key="add" icon={<PlusOutlined />}>Add New Lead</Menu.Item>
          <Menu.Item key="about" icon={<InfoCircleOutlined />}>About</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '16px' }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
}

export default App;
