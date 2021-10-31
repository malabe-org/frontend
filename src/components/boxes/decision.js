import { Button, Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
const { Option } = Select;
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
};
const tailLayout = {
    wrapperCol: {offset: 0, span:20}
}
export default function Decision() {

    const [form] = Form.useForm(); 
    const [description, setDescription] = useState();
    const onFinish = (values) => {
        values.description = description;
        console.log(values);
    }
    return (
        <div className="h-full col-content">
        <Form {...layout} name="control-hooks" onFinish={onFinish} form={form} layout="vertical" className="row-col">
            <Form.Item name="decision">
                <Select placeholder="Décision finale de la demande">
                    <Option value="conforme" >Conforme</Option>
                    <Option value="non-conforme" >Non Conforme</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <TextArea value={description} placeholder="Motif de la décision" name="description" rows={5} onChange={ e => setDescription(e.target.value)}/>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button htmlType="submit" type="primary" style={{width:"30%"}}>VALIDER</Button>
            </Form.Item>
        </Form>
        </div>
    )
}