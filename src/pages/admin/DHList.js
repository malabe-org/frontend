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

const { Title } = Typography;


function buildDataTabelRows(dh) {
    var rows = [];
    dh.map((dh, index) => {
        rows.push(
            {
                key: index,
                label: dh.label,
                address: `${dh.address.region} ${dh.address.departement} ${dh.address.city}`,
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
                    <Row onClick={() => handleEdit(record)} style={{ cursor: "pointer" }} justify="center" align="middle" >
                        <Col span={12}>
                            <EditOutlined type="primary" />
                        </Col>
                        <Col span={12}>
                            <span style={{ fontSize: "10px" }} >Modifier</span>
                        </Col>
                    </Row>
                </>
        },
    ];
    const [loading, setLoading] = useState(true);
    const { token, setToken } = useToken();
    const user = JSON.parse(token);
    const [dh, setdh] = useState(undefined);
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



        setLoading(false);
    }
    const handleEdit = (dh) => {
        showAddingModal();
    }

    useEffect(async () => {
        let mounted = true;
        setLoading(true);



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
                            
                        </Modal>

                        {dh == undefined ?
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
                                                    dataSource={buildDataTabelRows(dh)}
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
