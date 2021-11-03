import { Button, Card, Col, Form, Input, Row, Select } from "antd"
import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { requiredFormRule } from "../../utils/constants";
import { error } from "../commons";

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


export function UserForm({ selectedUser, handleOk }) {
    const { token, setToken } = useToken();
    const [form] = Form.useForm();

    const [password, setpassWord] = useState("");
    const [confirmpass, setConfirmpass] = useState({ value: "" });

    const onConfirmpassChange = (value) => {
        if (value != password) {
            return setConfirmpass({ status: "error", message: "Les deux mots de passe ne correspondent pas.", value: value })
        }
        return setConfirmpass({ status: "success", value: value })
    }
    // console.log(selectedUser);
    const onFinish = (values) => {
        values.password = "passer1234";
        const ff = {};
        for(const [key, value] of Object.entries(values)){
            if(value == undefined || value === ""){
                error("Vérifier les informations");
                return
            }
        }
        handleOk(values);

        // console.log("Success", values);
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
                                        initialValue={selectedUser?.firstname}
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
                                        initialValue={selectedUser?.lastname}
                                    >
                                        <Input type="text" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col span={12}>
                                    <Form.Item label="Email" name="email" rules={requiredFormRule} initialValue={selectedUser?.email} wrapperCol={leftWrapperCol}>
                                        <Input type="email" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Téléphone" name="phone" rules={requiredFormRule} initialValue={selectedUser?.phone} wrapperCol={rightWrapperCol}>
                                        <Input type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col span={12}>
                                    <Form.Item label="Role" name="role" rules={requiredFormRule} initialValue={selectedUser?.role} wrapperCol={leftWrapperCol}>
                                        <Select placeholder="Role de l'utilisateur">
                                            <Option value="phUser">PH User</Option>
                                            <Option value="dhUser">DH User</Option>
                                            <Option value="admin">Admin</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Genre" name="gender" rules={requiredFormRule} initialValue={selectedUser?.gender} wrapperCol={rightWrapperCol}>
                                        <Select placeholder="Choisir le genre">
                                            <Option value="Female">Femme</Option>
                                            <Option value="Male">Homme</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/* <Row justify="space-between">
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
                            </Row> */
                            }
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