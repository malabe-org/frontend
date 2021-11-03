import {
	Row,
	Col,
	Card,
	Table,
	message,
	Button,
	Avatar,
	Typography,
	Modal,
} from "antd";
import { useEffect, useState } from "react";

import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import useToken from "../../hooks/useToken";
import { BASE_SERVER_URL } from "../../utils/constants";
import { getRequestForDh, getRequestsForPhUser, updateTreatment } from "../../services/request";
import { error, success } from "../../components/commons";

const { Title } = Typography;

// table code start
const columns = (handleRemise) => [
	{
		title: "AUTEUR",
		dataIndex: "name",
		key: "name",
		width: "32%",
	},
	{
		title: "DESCRIPTION",
		dataIndex: "description",
		key: "description",
	},

	{
		title: "STATUS",
		key: "status",
		dataIndex: "status",
	},
	{
		title: "DATE SOUMISSION",
		key: "dateSoumission",
		dataIndex: "dateSoumission",
	},
	{
		title: "DATE CLOTURE",
		key: "dateCloture",
		dataIndex: "dateCloture",
	},
	// {
	// 	title: "DATE DELIVRANCE",
	// 	key: "dateDelivrance",
	// 	dataIndex: "dateDelivrance",
	// },
	{
		title: "Action",
		key: "action",
		dataIndex: "action",
		render: (record) =>

				record.treatment.decision === "OK" &&  record.treatment.isGiven == false? 
          <Row onClick={() => handleRemise(record)} style={{ cursor: "pointer", color:"#1890ff"  }} justify="space-around" align="middle" >
            <Col span={10}>
              <RightOutlined type="primary" />
            </Col>
            <Col span={14}>
              <span style={{ fontSize: "10px" }} >Remettre</span>
            </Col>
          </Row>
					:
					""
	},
];
function buildDataTabelRows(requests) {
	var rows = [];
	// console.log(requests[0].treatment);
	requests.map((request, index) => {
		const created_at = new Date(request.created_at);
		const updated_at = new Date(request.treatment.closeDate);
		// console.log(request);
		rows.push(
			{
				key: index,
				name: (
					<>
						<Avatar.Group>
							<Avatar
                  className="shape-avatar"
                  shape="square"
                  size={40}
                  src={BASE_SERVER_URL + request.documents.seekerPhoto}
                ></Avatar>
							<div className="avatar-info">
								<Title level={5}>{request.seeker.firstname} {request.seeker.lastname}</Title>
								<p>CNI : <b>{request.seeker.cni}</b></p>
							</div>
						</Avatar.Group>{" "}
					</>
				),
				description: (
					<>
						<div className="author-info">
							<Title level={5}>{request.description}</Title>
						</div>
					</>
				),

				status: (
					<>
						{request.treatment.decision == "OK" ?
							<Button type="primary">
								{"Conforme"}
							</Button>
							:
							(request.treatment.decision == "No-OK" ?
								<Button type="primary" danger>
									{"Non Conforme"}
								</Button>
								:
								<Button type="default">
									{"Pas traité"}
								</Button>
							)}
					</>
				),
				dateSoumission: (
					<>
						<div className="ant-employed">
							<span>{created_at.toUTCString()}</span>
						</div>
					</>
				),
				dateCloture: (
					<>
						<div className="ant-employed">
							{request.treatment.decision === "OK" || request.treatment.decision === "No-OK" ?
								<span>{updated_at.toUTCString()}</span>
								:
								""
							}
						</div>
					</>
				),
				// dateDelivrance: (
				// 	<>
				// 		<div className="ant-employed">
				// 			{request.treatment.decision === "OK" ?
				// 				<span>{updated_at.toUTCString()}</span>
				// 				:
				// 				""
				// 			}
				// 		</div>
				// 	</>
				// ),
				action: request
			},
		)
	});
	return rows;
}

function RequestsList() {

	const [loading, setLoading] = useState(true);
	const { token, setToken } = useToken();
	const user = JSON.parse(token);
	const [requests, setRequests] = useState(undefined);

	const [refresh, setRefresh] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(undefined);
  
  // For the modals
  const [isRemiseModalVisible, setIsRemiseModalVisible] = useState(false);

  const showAddingModal = () => {
    setIsRemiseModalVisible(true);
  };


	const handleRemise = (record) => {
		setSelectedRequest(record)
		showAddingModal();
	}
	

	const handleRemiseOk = async () => {
		setLoading(true);
		setIsRemiseModalVisible(false)
		console.log("Handling remise", selectedRequest.treatment._id)
		await updateTreatment(selectedRequest.treatment._id, {isGiven: true}, user.token).then(res => {
			success("L'action a bien été enregistrée.");
			// else error("Une erreur est survenue.");
		})
		setLoading(false)
	}
	useEffect(async () => {
		let mounted = true;
		setLoading(true);
		
		await getRequestForDh("6181e5a49a6ac7e0ee870a44", user.token).then(res => {
			console.log(res)
			if (res != "" && mounted) {
				setRequests(res.requests);
			}
			else {
				setRequests(undefined);
			}
			setLoading(false);
		});

		return () => mounted = false;
	}, [refresh]);

	return (
		<>
			{
				loading ?
					<LoadingOutlined style={{ fontSize: "100px", color: "red" }} label="En cours de chargement..." />
					:

					requests == undefined ?
						<h2>Aucune demande pour le moment.</h2>
						:
						<div className="tabled">
							<Row gutter={[24, 0]}>
								<Col xs="24" xl={24}>
									<Card
										bordered={false}
										className="criclebox tablespace mb-24"
										title="Liste des requêtes"
									>
										<div className="table-responsive">
											<Table
												columns={columns(handleRemise)}
												dataSource={buildDataTabelRows(requests)}
												pagination={false}
												className="ant-border-space"
											/>
										</div>
									</Card>
								</Col>
							</Row>
							<Modal title="Réinitialiser Mot de passe" visible={isRemiseModalVisible} onOk={handleRemiseOk} onCancel={() => setIsRemiseModalVisible(false)}>
              <p>Voulez-vous vraiment remettre le passport de <b>{selectedRequest?.seeker?.firstname} {selectedRequest?.seeker?.lastname}</b> ?</p>
            	</Modal>
						</div>
			}
		</>
	);
}

export default RequestsList;
