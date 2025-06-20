import { Table, Tag } from 'antd';
import { useGetLeads } from '../_actions/leads';

const statusColors = {
  active: 'green',
  on_hold: 'gray',
  closed: 'red',
};

const LeadsTable = () => {
  const { data = [], isLoading } = useGetLeads();

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact No',
      dataIndex: 'contact_no',
      key: 'contact_no',
    },
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'Requirement',
      dataIndex: 'requirement',
      key: 'requirement',
    },
    {
      title: 'Email To',
      dataIndex: 'email_to',
      key: 'email_to',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status] || 'default'}>{status}</Tag>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={data}
      pagination={false}
      style={{ marginTop: 20 }}
    />
  );
};

export default LeadsTable;
