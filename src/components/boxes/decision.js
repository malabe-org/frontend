import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { updateTreatment } from "../../services/request";
import { requiredFormRule } from "../../utils/constants";
const { Option } = Select;
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 20 }
}
export default function Decision({ setTreated, treatment, token, treated }) {

    const [form] = Form.useForm();
    const [motif, setMotif] = useState(treatment.reason);
    // console.log(treatment.reason);
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        // console.log(values);
        setLoading(true);
        values.reason = motif;
        if(values.reason != "" && values.decision != "")
            await updateTreatment(treatment._id, values, token);
        else{
            alert("Les champs ne doivent pas être vides.")
        }
        setLoading(false);
        setTreated(!treated);
    }
    {/* <LoadingOutlined style={{ fontSize: "100px", color: "red" }} width="0px" height="0px"/> */}

    return (

        <div className="h-full col-content">
            {
                loading ?
                    <p>Chargement en cours...</p>
                    :

                    <Form {...layout} name="control-hooks" onFinish={onFinish} form={form} layout="vertical" className="row-col">
                        <Form.Item name="decision" rules={requiredFormRule} initialValue={treatment.decision}>
                            <Select placeholder="Décision finale de la demande">
                                <Option value="OK">Conforme</Option>
                                <Option value="No-OK">Non Conforme</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item rules={requiredFormRule}>
                            <TextArea required value={motif} placeholder="Motif de la décision" name="reason" rows={5} onChange={e => setMotif(e.target.value)} />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button htmlType="submit" type="primary" style={{ width: "30%" }}>VALIDER</Button>
                        </Form.Item>
                    </Form>
            }
        </div>
    )
}