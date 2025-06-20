import { Form, Input, Button, Select, message, Row, Col } from 'antd';
import { useCreateLead } from '../_actions/leads';

const { TextArea } = Input;

const AddLeadForm = () => {
  const [form] = Form.useForm();
  const createLead = useCreateLead();

  const onFinish = (values) => {
    createLead.mutate(values, {
      onSuccess: () => {
        message.success('Lead added successfully');
        form.resetFields();
      },
      onError: () => message.error('Failed to add lead'),
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[{ required: true, message: 'Please enter full name' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Contact Number"
            name="contact_no"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Company Name" name="company_name">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email To"
            name="email_to"
            rules={[{ type: 'email', required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 'active', label: 'Active' },
                { value: 'closed', label: 'Closed' },
                { value: 'on_hold', label: 'On Hold' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Requirement" name="requirement">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit" loading={createLead.isPending}>
          Add Lead
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddLeadForm;
