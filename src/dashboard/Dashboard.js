import { Card, Row, Col, Statistic } from 'antd';
import { Pie } from '@ant-design/plots';
import { useGetLeads } from '../_actions/leads';

const Dashboard = () => {
  const { data = [], isLoading } = useGetLeads();

  const total = data.length;
  const active = data.filter((l) => l.status === 'active').length;
  const closed = data.filter((l) => l.status === 'closed').length;
  const onHold = data.filter((l) => l.status === 'on_hold').length;

  const pieData = [
    { type: 'Active', value: active },
    { type: 'Closed', value: closed },
    { type: 'On Hold', value: onHold },
  ];

  const config = {
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: { fontSize: 14, textAlign: 'center' },
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Leads" value={total} loading={isLoading} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Open" value={active} loading={isLoading} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Closed" value={closed} loading={isLoading} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="On Hold" value={onHold} loading={isLoading} />
          </Card>
        </Col>
      </Row>
      <Card>
        <Pie {...config} />
      </Card>
    </div>
  );
};

export default Dashboard;
