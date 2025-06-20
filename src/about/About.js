import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => (
  <Typography>
    <Title level={2}>CRM Tutorial</Title>
    <Paragraph>
      Welcome to the QCRM lead management system. Use the sidebar to navigate
      through different sections. In <strong>Add New Lead</strong> you can submit
      a new prospect. The <strong>All Leads</strong> section lists every lead
      with actions to update their status. The <strong>Dashboard</strong> gives
      you an overview of your pipeline. Update lead status to keep track of your
      progress and ensure no opportunity is lost.
    </Paragraph>
    <Paragraph>
      Select a lead to change its status between <em>active</em>, <em>on hold</em>
      , or <em>closed</em>. Use the dashboard charts to monitor your overall
      performance.
    </Paragraph>
  </Typography>
);

export default About;
