import { Card, Row, Col, Statistic } from 'antd';
import { useGetLeads } from '../_actions/leads';

const Dashboard = () => {
  const { data = [], isLoading } = useGetLeads();

  const total = data.length;
  const active = data.filter((l) => l.status === 'active').length;
  const closed = data.filter((l) => l.status === 'closed').length;
  const onHold = data.filter((l) => l.status === 'on_hold').length;

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Total Leads"
              value={total}
              loading={isLoading}
              valueStyle={{ fontSize: '2.5rem' }}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Open"
              value={active}
              loading={isLoading}
              valueStyle={{ fontSize: '2.5rem' }}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Closed"
              value={closed}
              loading={isLoading}
              valueStyle={{ fontSize: '2.5rem' }}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="On Hold"
              value={onHold}
              loading={isLoading}
              valueStyle={{ fontSize: '2.5rem' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
