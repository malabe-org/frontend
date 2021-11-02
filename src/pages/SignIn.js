import React, { Component, useState } from "react";
import { login } from "../services/user";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Tag,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import PropTypes from "prop-types";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;


export default function SignIn({setToken}){
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
      setLoading(true);
      await login(values).then(data => {
        if(data != ""){
          setToken(data);
        }
        else{
          setMessage("Login ou mot de passe invalide.");
        }
      })
      setLoading(false);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <>
        <Layout className="layout-default layout-signin">
          <Header>
            <div className="header-col header-brand">
              <h5>Processing HUB</h5>
            </div>
          </Header>
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Connexion</Title>
                <Title className="font-regular text-muted" level={5}>
                  Entrer votre email et votre mot de passe
                </Title>
                {message != "" ? <Tag color="magenta">{message}</Tag> : ""}

                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Renseignez l'email.",
                      },
                    ]}
                  >
                    <Input placeholder="Email"/>
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Mot de passe"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Renseignez le mot de passe.",
                      },
                    ]}
                  >
                    <Input type="password" placeholder="Mot de passe"/>
                  </Form.Item>
                  <br/>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      {loading ? <LoadingOutlined></LoadingOutlined> : "CONNEXION"}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Content>
          <Footer>              
            <p className="copyright">
              {" "}
              Copyright © 2021 TEAM-MALABE.{" "}
            </p>
          </Footer>
        </Layout>
      </>
    );
}

SignIn.propTypes = {
  setToken : PropTypes.func.isRequired
}