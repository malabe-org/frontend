import { Button, Card, Col, Form, Input, Row, Select } from "antd"
import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { addresses, requiredFormRule } from "../../utils/constants";
import { getCitiesByDepartment, getDepartmentByRegion } from "../../utils/functions";
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
const leftLabelCol = { span: 30, offset: 0 };
const rightWrapperCol = { span: 30, offset: 2 };
const colConfig = {
    wrapperCol:{span: 30, offset: 1}, labelCol:{span:30, offset:1}
}

export function DHForm({ selectedDh, handleOk }) {
    const { token, setToken } = useToken();
    const [form] = Form.useForm();
    const [region, setRegion] = useState();
    const [department, setDepartment] = useState();
    
    const onFinish = (values) => {
        const dhObject = {
            label: values.label,
            location: values.location,
            address: {
                region: values.region,
                department: values.department,
                city: values.city
            }
        }   
        handleOk(dhObject);
    }
    const handleRegionChange = (value) => {
        setRegion(value);
    }
    const handleDepartementChange = (value) => {
        setDepartment(value);
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
                        title={<h6 className="font-semibold m-0">Informations sur le DH</h6>}
                        className="header-solid h-full card-profile-information"
                        bodyStyle={{ paddingTop: 0, paddingBottom: 5 }}
                    >
                        <hr className="my-25" />
                        <Form {...formLayout} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} layout="vertical" className="row-col">
                            <Row justify="space-between">
                                <Col span={12}>
                                    <Form.Item label="Label"
                                        rules={requiredFormRule}
                                        name="label"
                                        wrapperCol={{ span: 24, offset: 0 }}
                                        initialValue={selectedDh?.label}
                                    >
                                        <Input type="text" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Localisation"
                                        name="location"
                                        rules={requiredFormRule}
                                        wrapperCol={rightWrapperCol}
                                        labelCol={rightWrapperCol}
                                        initialValue={selectedDh?.location}
                                    >
                                        <Input type="text"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col span={8}>
                                    <Form.Item label="Region" name="region" rules={requiredFormRule} initialValue={selectedDh?.address.region} wrapperCol={leftWrapperCol} wrapperCol={leftWrapperCol} labelCol={leftLabelCol}>
                                        <Select placeholder="Région du Hub" onSelect={e => handleRegionChange(e)}>
                                            {addresses.map((region, index) => <Option key={index} value={region.region}>{region.region}</Option>)}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Département" name="department" rules={requiredFormRule} initialValue={selectedDh?.address.department} {...colConfig}>
                                        <Select placeholder="Département du Hub" onSelect={e => handleDepartementChange(e)}>
                                            {getDepartmentByRegion(region).map((dept, index) => <Option key={index} value={dept.departement}>{dept.departement}</Option>)}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Ville" name="city" rules={requiredFormRule} initialValue={selectedDh?.address.city} {...colConfig}>
                                        <Select placeholder="Ville du Hub">
                                            {getCitiesByDepartment(region, department).map((city, index) => <Option key={index} value={city}>{city}</Option>)}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                  
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