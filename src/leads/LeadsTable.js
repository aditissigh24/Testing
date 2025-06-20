import { Table, Tag, Button, message } from 'antd';
import { useGetLeads, useUpdateLead } from '../_actions/leads';

const statusColors = {
  active: 'green',
  on_hold: 'gray',
  closed: 'red',
};

const LeadsTable = () => {
  const { data = [], isLoading } = useGetLeads();
  const updateLead = useUpdateLead();

  const handleStatusChange = (id, status) => {
    updateLead.mutate(
      { id, status },
      {
        onSuccess: () => message.success('Status updated'),
        onError: () => message.error('Failed to update status'),
      }
    );
  };

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
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        if (record.status === 'active') {
          return (
            <>
              <Button
                size="small"
                onClick={() => handleStatusChange(record.id, 'on_hold')}
                style={{ marginRight: 8 }}
              >
                Hold
              </Button>
              <Button
                size="small"
                danger
                onClick={() => handleStatusChange(record.id, 'closed')}
              >
                Close
              </Button>
            </>
          );
        }
        if (record.status === 'closed' || record.status === 'on_hold') {
          return (
            <Button
              size="small"
              onClick={() => handleStatusChange(record.id, 'active')}
            >
              Open
            </Button>
          );
        }
        return null;
      },
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
