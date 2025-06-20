import './App.css';
import { Form, Input, Button, Select, message } from 'antd';
import { useCreateLead } from './_actions/leads';

const { TextArea } = Input;

function App() {
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
        <div className="App">
            <h3>Add New Lead</h3>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600, margin: '0 auto' }}
            >
                <Form.Item
                    label="Full Name"
                    name="full_name"
                    rules={[{ required: true, message: 'Please enter full name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contact Number"
                    name="contact_no"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Company Name" name="company_name">
                    <Input />
                </Form.Item>
                <Form.Item label="Requirement" name="requirement">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Email To"
                    name="email_to"
                    rules={[{ type: 'email', required: true }]}
                >
                    <Input />
                </Form.Item>
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={createLead.isPending}>
                        Add Lead
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default App;
