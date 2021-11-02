import { Button, Card, Col, Form, Input, Row, Select } from "antd"
import { useState } from "react";
import useToken from "../../hooks/useToken";
import { requiredFormRule } from "../../utils/constants";

const { Option } = Select;

const formLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 }
}
const buttonLayout = {
    wrapperCol: {
        span: 12,
        offset: 0
    }
}
const leftWrapperCol = { span: 30, offset: 0 };
const rightWrapperCol = { span: 30, offset: 2 };


export function UserForm({ currentUser }) {
    const { token, setToken } = useToken();
    const [form] = Form.useForm();
    console.log(currentUser);
    const [password, setpassWord] = useState("");
    const [confirmpass, setConfirmpass] = useState({ value: "" });

    const onConfirmpassChange = (value) => {
        if (value != password) {
            return setConfirmpass({ status: "error", message: "Les deux mots de passe ne correspondent pas.", value: value })
        }
        return setConfirmpass({ status: "success", value: value })
    }

    const onFinish = (values) => {
        console.log("Success", values);
    }
    const onFinishFailed = (values) => {
        console.log("Failed ", values);
    }
    return (
        <>
            <Row gutter={[24, 0]} justify="center">

                <Col span={24} md={24} className="mb-24" >
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Informations sur le profil</h6>}
                        className="header-solid h-full card-profile-information"
                        bodyStyle={{ paddingTop: 0, paddingBottom: 5 }}
                    >
                        <hr className="my-25" />
                        <Form {...formLayout} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} layout="vertical" className="row-col">
                            <Row justify="space-between">
                                <Col span={12}>
                                    <Form.Item label="Prénom"
                                        rules={requiredFormRule}
                                        name="firstname"
                                        wrapperCol={{ span: 24, offset: 0 }}
                                        initialValue={currentUser?.firstname}
                                    >
                                        <Input type="text" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Nom"
                                        name="lastname"
                                        rules={requiredFormRule}
                                        wrapperCol={rightWrapperCol}
                                        labelCol={rightWrapperCol}
                                        initialValue={currentUser?.lastname}
                                    >
                                        <Input type="text" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col span={12}>
                                    <Form.Item label="Email" name="email" rules={requiredFormRule} initialValue={currentUser?.email} wrapperCol={leftWrapperCol}>
                                        <Input type="text" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Téléphone" name="phone" rules={requiredFormRule} initialValue={currentUser?.phone} wrapperCol={rightWrapperCol}>
                                        <Input type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col span={12}>
                                    <Form.Item label="Role" name="role" rules={requiredFormRule} initialValue={currentUser?.role} wrapperCol={leftWrapperCol}>
                                        <Select placeholder="Role de l'utilisateur">
                                            <Option value="phUser">PH User</Option>
                                            <Option value="dhUser">DH User</Option>
                                            <Option value="admin">Admin</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="CNI" name="cni" rules={requiredFormRule} initialValue={currentUser?.cni} wrapperCol={rightWrapperCol}>
                                        <Input type="text" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {currentUser == undefined ? <Row justify="space-between">
                                <Col span={12}>
                                    <Form.Item label="Mot de passe" name="password" rules={requiredFormRule} wrapperCol={leftWrapperCol}
                                        labelCol={{ span: 30, offset: 0 }}>
                                        <Input type="password" value={password} onChange={e => setpassWord(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Confirmer mot de passe" help={confirmpass.message || ""} validateStatus={confirmpass.status} wrapperCol={rightWrapperCol}
                                        labelCol={rightWrapperCol}>
                                        <Input type="password" value={confirmpass.value} onChange={e => onConfirmpassChange(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                                : ""}
                            <Form.Item {...buttonLayout}>
                                <Button htmlType="submit" type="primary" style={{ width: "100%" }}>VALIDER</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}