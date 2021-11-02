import useToken from "../hooks/useToken";
import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Form,
  Input
} from "antd";

import BgProfile from "../assets/images/bg-profile.jpg";
import { useState } from "react";
import { ICON_DATA } from "../services/user";
const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 12 }
}
const buttonLayout = {
  wrapperCol: {
    span: 10,
    offset: 0
  }
}
const rules = [
  { required: true, message: "Ce champ est obligatoire." }
];
function Profile() {

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const { token, setToken } = useToken();
  const user = JSON.parse(token);
  const [form] = Form.useForm();

  const [password, setpassWord] = useState("passer1234");
  const [confirmpass, setConfirmpass] = useState({ value: "passer1234" });

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
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={"data:image/png;base64," + ICON_DATA} />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{user.firstname} {user.lastname}</h4>
                  <p>{user.role == "phUser" ? "Membre Processing HUB" : ""} </p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]} justify="center">

        <Col span={24} md={12} className="mb-24" >
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Informations sur le profil</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 5 }}
          >
            <hr className="my-25" />
            <Form {...formLayout} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} layout="vertical" className="row-col">
              <Row justify="space-between">
                <Col span={12}>
                  <Form.Item label="Prénom"
                    rules={rules}
                    name="firstname"
                    wrapperCol={{ span: 24, offset: 0 }}
                    initialValue={user.firstname}
                  >
                    <Input type="text"/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Nom"
                    name="lastname"
                    rules={rules}
                    wrapperCol={{ span: 30, offset: 2 }}
                    labelCol={{ span: 30, offset: 2 }}
                    initialValue={user.lastname}
                  >
                    <Input type="text" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Email" name="email" rules={rules} initialValue={user.email}>
                <Input type="text" value="" disabled />
              </Form.Item>
              <Row justify="space-between">
                <Col span={12}>
                  <Form.Item label="Mot de passe" name="password" rules={rules} wrapperCol={{ span: 30, offset: 0 }}
                    labelCol={{ span: 30, offset: 0 }}>
                    <Input type="password" value={password} onChange={e => setpassWord(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Confirmer mot de passe" help={confirmpass.message || ""} validateStatus={confirmpass.status} wrapperCol={{ span: 30, offset: 2 }}
                    labelCol={{ span: 30, offset: 2 }}>
                    <Input type="password" value={confirmpass.value} onChange={e => onConfirmpassChange(e.target.value)} />
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
  );
}

export default Profile;
