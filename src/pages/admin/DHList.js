import {
    Row,
    Col,
    Card,
    Table,
    Avatar,
    Typography,
    Button,
} from "antd";
import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { EditOutlined, LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { error, success } from "../../components/commons";
import { addDh, getDhs } from "../../services/dh";
import { DHForm } from "../../components/boxes/DHForm";

const { Title } = Typography;


function buildDataTabelRows(dhs) {
    var rows = [];
    dhs.map((dh, index) => {
        rows.push(
            {
                key: index,
                label: dh.label,
                address: `${dh.address.region} - ${dh.address.department} - ${dh.address.city}`,
                location: dh.location,
                action: dh
            },
        )
    });
    return rows;
}

function DHList() {
    const columns = [
        {
            title: "Label",
            dataIndex: "label",
            key: "label",
            width: "32%",
        },
        {
            title: "Adresse",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Loalisation",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            render: (record) =>
                <>
                    <Row onClick={() => handleEdit(record)} style={{ cursor: "pointer", color:"#1890ff" }} justify="space-around" align="middle" >
                        <Col span={6}>
                            <EditOutlined/>
                        </Col>
                        <Col span={18}>
                            <span style={{ fontSize: "10px" }} >Modifier</span>
                        </Col>
                    </Row>
                </>
        },
    ];
    const [loading, setLoading] = useState(true);
    const { token, setToken } = useToken();
    const user = JSON.parse(token);
    const [dhs, setDhs] = useState(undefined);
    const [refresh, setRefresh] = useState(false);
    // For the modals
    const [isAddingModalVisible, setIsAddingModalVisible] = useState(false);

    const showAddingModal = () => {
        setIsAddingModalVisible(true);
    };

    const handleAddButton = () => {
        showAddingModal();
    }
    const handleAddOk = async (values) => {
        setLoading(true);

        await addDh(values, user.token).then(res => {
            if('dhHub' in res){
                setIsAddingModalVisible(false);
                success("Le Hub de distribution a bien été créé.");
                setRefresh(!refresh);
            }
            else error("Une erreur est survenue.")
        })

        setLoading(false);
    }
    const handleEdit = (dh) => {
        showAddingModal();
    }

    useEffect(async () => {
        let mounted = true;
        setLoading(true);

        await getDhs(user.token).then(res => {
            if('dhHubs' in res){
                setDhs(res.dhHubs);
            }
        })

        setLoading(false);

        return () => mounted = false;
    }, [refresh]);

    return (
        <>
            {
                loading ?
                    <LoadingOutlined style={{ fontSize: "100px", color: "red" }} />
                    :
                    <>
                        <Row gutter={[24, 0]}>
                            <Col xs={24} sm={15} md={7} lg={7} xl={7} className="mb-24" >
                                <Card bordered={false} className="criclebox cardbody h-full">
                                    <div className="project-ant">
                                        <Button htmlType="button" type="primary" onClick={handleAddButton} style={{ width: "100%" }}>AJOUTER</Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Modal title="Ajouter Hub de distribution" visible={isAddingModalVisible} footer={null} onOk={() => setIsAddingModalVisible(false)} onCancel={() => setIsAddingModalVisible(false)}>
                            <DHForm handleOk={handleAddOk}/>
                        </Modal>

                        {dhs == undefined ?
                            <h2>Aucun Hub de distribution  pour le moment.</h2>
                            :
                            <div className="tabled">
                                <Row gutter={[24, 0]}>
                                    <Col xs="24" xl={24}>
                                        <Card
                                            bordered={false}
                                            className="criclebox tablespace mb-24"
                                            title="Liste des Hubs de distribution"
                                        >
                                            <div className="table-responsive">
                                                <Table
                                                    columns={columns}
                                                    dataSource={buildDataTabelRows(dhs)}
                                                    pagination={false}
                                                    className="ant-border-space"
                                                />
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        }</>
            }
        </>
    );
}

export default DHList;
