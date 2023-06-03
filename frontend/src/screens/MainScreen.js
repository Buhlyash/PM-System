import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  ButtonGroup,
  Modal,
  Table,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HeaderSec from "../components/HeaderSec";
import {
  listUsersProjects,
  listRolesInProject,
  createRole,
  deleteRole,
  listUserRoles,
  updateProjectInfo,
} from "../actions/productActions";
import CustomMenu from "../components/CustomMenu";
import {
  PROJECT_INFO_UPDATE_RESET,
  ROLE_CREATE_RESET,
  ROLE_DELETE_RESET,
} from "../constants/productConstants";
import axios from "axios";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const projectsList = useSelector((state) => state.projectsUsersList);
  const { projects } = projectsList;
  const rolesList = useSelector((state) => state.roleList);
  const { roles } = rolesList;
  const usersList = useSelector((state) => state.usersList);
  const { users } = usersList;
  const allProjectsList = useSelector((state) => state.projectsList);
  const { allProjects } = allProjectsList;
  const userRolesList = useSelector((state) => state.roleUserList);
  const { userRoles } = userRolesList;
  
  const history = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [filtering, setFiltering] = useState("");
  // const [, setShow] = useState(false);

  const [showProjInfoHead, setShowProjInfoHead] = useState(false);
  const [nameProj, setNameProj] = useState("");
  const [descriptionProj, setDescriptionProj] = useState("");
  const [nowProject, setNowProject] = useState();
  const handleCloseProj = () => setShowProjInfoHead(false);
  const handleShowProj = (proj) => {
    setNameProj(proj.name);
    setDescriptionProj(proj.description);
    setShowProjInfoHead(true);
  };

  const handleProjInfoSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProjectInfo(nowProject._id, nameProj, descriptionProj));
    dispatch({ type: PROJECT_INFO_UPDATE_RESET });
    setShowProjInfoHead(false);
  };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowTable = (project) => {
    setProj(project);
    handleShow();
  };

  const handleChangeRole = (user, role, project, roleId) => {
    if (role === "del") {
      console.log(user, role, project, roleId);
      dispatch(deleteRole(roleId));
      dispatch({ type: ROLE_DELETE_RESET });
      dispatch(listRolesInProject(proj._id));
    } else {
      console.log(user, role, project);
      dispatch(createRole(project, role, user));
      dispatch({ type: ROLE_CREATE_RESET });
      dispatch(listRolesInProject(proj._id));
    }
  };

  const pageProjects = userInfo.isAdmin ? allProjects : projects;

  const [proj, setProj] = useState(pageProjects[0]);
  // const [userRoles, setUserRoles] = useState([]);
  const [resp, setResp] = useState("");
  const [respName, setRespName] = useState("");

  // const getUserRoles = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };

  //     const { data } = await axios.get(`/api/boards/roles/`, config);
  //     setUserRoles(data);
  //   } catch (error) {}
  // };

  useEffect(() => {
    dispatch(listUserRoles());
    if (userInfo && proj !== undefined) {
      dispatch(listRolesInProject(proj._id));

      // getUserRoles();
    }
  }, [userInfo, dispatch, proj]);

  // if (userRoles === []) {
  //   getUserRoles();
  // }

  
  return (
    <div>
      {userInfo && <HeaderSec />}
      <main className="p-3">
        <Container>
          <Row>
            {pageProjects.map((project) => (
              <Col sm={12} md={6} lg={4} xl={3} key={project._id}>
                <Card style={{ width: "18rem" }} className="my-3 p-3 rounded">
                  <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                    <Dropdown as={ButtonGroup}>
                      <Button
                        variant="primary"
                        onClick={() => history(`/projects/${project._id}`)}
                      >
                        Перейти
                      </Button>

                      <Dropdown.Toggle
                        split
                        variant="primary"
                        id="dropdown-split-basic"
                        disabled={
                          (userRoles.find(
                            (role) => role.project === project._id
                          ) !== undefined &&
                            userRoles.find(
                              (role) => role.project === project._id
                            ).role === "Руководитель проекта") ||
                          userInfo.isAdmin
                            ? false
                            : true
                        }
                      />

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            handleShowProj(project);
                            setNowProject(project);
                          }}
                        >
                          Переименовать
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleShowTable(project);
                          }}
                        >
                          Участники и роли
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Modal show={showProjInfoHead} onHide={handleCloseProj}>
          <Modal.Header closeButton>
            <Modal.Title>Изменить информацию о проекте</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formProjName">
                <Form.Label>Название проекта</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Название проекта"
                  autoFocus
                  value={nameProj}
                  onChange={(e) => (setNameProj(e.target.value))}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formProjDescription">
                <Form.Label>Описание проекта</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={descriptionProj}
                  onChange={(e) => (setDescriptionProj(e.target.value))}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseProj}>
                Закрыть
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={(e) => handleProjInfoSubmit(e)}
              >
                Сохранить
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Участники и роли</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Впишите имя сотрудника"
              onChange={(e) => setFiltering(e.target.value)}
            />
            <Table striped bordered hover as={CustomMenu}>
              <thead>
                <tr>
                  <th>Имя пользователя</th>
                  <th>Роль</th>
                  {/* <th>Роль</th> */}
                </tr>
              </thead>
              <tbody>
                {users !== undefined ? (
                  users
                    .filter((user) =>
                      user.name.toLowerCase().includes(filtering.toLowerCase())
                    )
                    .map((user, i) => (
                      <tr key={i}>
                        <td>{user.name}</td>
                        {/* <td>{roles[i] !== undefined && roles[i].user === user._id ? roles[i].role : <div></div>}</td> */}
                        {/* <td>
                          {roles.find((role) => role.user == user.id) !==
                          undefined
                            ? roles.find((role) => role.user == user.id).role
                            : "Нет роли"}
                        </td> */}
                        <td>
                          <Form.Group className="mb-3" controlId="formTaskResp">
                            <div style={{ display: "flex" }}>
                              <Form.Control
                                style={{ flex: 1 }}
                                value={
                                  roles.find(
                                    (role) => role.user === user.id
                                  ) !== undefined
                                    ? roles.find(
                                        (role) => role.user === user.id
                                      ).role
                                    : "Нет роли"
                                }
                                readOnly
                              />
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="primary"
                                  id="dropdown-basic"
                                >
                                  Выбрать
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() => {
                                      handleChangeRole(user.id, "pm", proj._id);
                                    }}
                                  >
                                    Руководитель проекта
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => {
                                      handleChangeRole(user.id, "em", proj._id);
                                    }}
                                  >
                                    Сотрудник
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => {
                                      handleChangeRole(user.id, "sp", proj._id);
                                    }}
                                  >
                                    Наблюдатель
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => {
                                      handleChangeRole(
                                        user.id,
                                        "del",
                                        proj._id,
                                        roles.find(
                                          (role) => role.user === user.id
                                        ) !== undefined
                                          ? roles.find(
                                              (role) => role.user === user.id
                                            )._id
                                          : "-1"
                                      );
                                    }}
                                  >
                                    Нет роли
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Form.Group>
                        </td>
                      </tr>
                    ))
                ) : (
                  <div></div>
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}

export default App;
