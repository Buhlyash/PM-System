import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  updateTask,
  createComment,
} from "../actions/productActions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ListGroup, ListGroupItem, Badge, Dropdown } from "react-bootstrap";
import {
  TASK_DELETE_RESET,
  TASK_UPDATE_RESET,
  COMMENT_CREATE_RESET,
} from "../constants/productConstants";
import CustomMenu from "./CustomMenu";
import axios from "axios";
import { Link } from "react-router-dom";

function Task({ task }) {
  const projectsList = useSelector((state) => state.projectsUsersList);
  const { projects } = projectsList;
  const boardsList = useSelector((state) => state.boardsInProjectList);
  const { boards } = boardsList;
  const allProjectsList = useSelector((state) => state.projectsList);
  const { allProjects } = allProjectsList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const rolesList = useSelector((state) => state.roleList);
  const { roles } = rolesList;

  const role = roles.find((role) => role.user === userInfo.id) !== undefined ? roles.find((role) => role.user === userInfo.id).role : "Нет роли"

  // const thisBoard = boards.map((board) => {
  //   if(board._id === task.board) {
  //     return board;
  //   }
  // });
  const thisBoard = boards.find((board) => board._id === task.board);
  const thisProject = projects.find(
    (project) => project._id === thisBoard.project
  );
  const thisAdminProject = allProjects.find(
    (project) => project._id === thisBoard.project
  );
  const users =  userInfo.isAdmin ? thisAdminProject.users : thisProject.users;
  // console.log(users);
  // const thisProject = projects.map((project) => {
  //   if(project.)
  // });
  // console.log(thisProject);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [resp, setResp] = useState("");
  const [respName, setRespName] = useState("");
  const [radioValue, setRadioValue] = useState(`${task.priority}`);
  const [statusValue, setStatusValue] = useState(`${task.status}`);
  const dispatch = useDispatch();

  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const [fileList, setFileList] = useState();

  const handleFileChange = (e) => {
    setFileList(e.target.files);
    console.log(fileList);
  };

  // const handleUploadClick = async () => {
  //   if (!fileList) {
  //     return;
  //   }

  //   const data = new FormData();
  //   data.append("content", commentContent);
  //   data.append("id", task._id);
  //   files.map((file, i) => {
  //     data.append(`file-${i}`, file);
  //   });

  //   // try {
  //   //   const config = {
  //   //     headers: {
  //   //       'Content-Type':'multipart/form-data'
  //   //     }
  //   //   }

  //   //   const {data} = await axios.post('/api/boards/comment/create/', formData, config)
  //   // } catch(error) {

  //   // }
  //   fetch("https://httpbin.org/post", {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
  // };

  const files = fileList ? [...fileList] : [];

  const radios = [
    { name: "Не важно", value: "1" },
    { name: "Важно", value: "2" },
    { name: "Очень важно", value: "3" },
  ];

  const status = [
    { name: "В работе", value: "1" },
    { name: "Завершено", value: "2" },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setName(task.name);
    setDescription(task.description);
    setDate(task.dueDate.slice(0, 10));
    setComments(task.comments);
    setResp(task.responsible.id);
    setRespName(task.responsible.name);
    console.log(task.comments);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTask(
        task._id,
        name,
        description,
        date,
        task.position,
        radioValue,
        statusValue,
        task.column,
        resp
      )
    );
    dispatch({ type: TASK_UPDATE_RESET });
    // console.log(name, description, date, findLastPosition(taskArr), radioValue, 1, column._id,  column.board);
    //if(name !== "" && description !== "" && date !== "") {
    //dispatch(createTask(name, description, date, findLastPosition(taskArr), radioValue, 1, column._id,  column.board));
    setShow(false);
    //}
  };
  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    dispatch({ type: TASK_DELETE_RESET });
  };

  const handleAddComment = () => {
    const data = new FormData();
    data.append("content", commentContent);
    data.append("id", task._id);
    if (fileList) {
      files.map((file, i) => {
        data.append(`file-${i}`, file);
      });
    }
    dispatch(createComment(data));
    dispatch({ type: COMMENT_CREATE_RESET });
  };

  const downloadFile = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  // const uploadFileHandler = async (e) => {
  //   //const files = e.target.file.slice();
  //   const f = e.target.file[0];
  //   console.log(f);
  // };

  return (
    <div>
      <li
        onClick={handleShow}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          {task.name.length > 10 ? task.name.substr(0, 10) + "..." : task.name}
        </div>
        <div>
          <Badge bg={task.status === "1" ? "warning" : "success"}>
            {task.status === "1" ? "В работе" : "Завершено"}
          </Badge>
          <Badge
            bg={
              task.priority === 1
                ? "secondary"
                : task.priority === 2
                ? "success"
                : "danger"
            }
            style={{ marginLeft: "4px" }}
          >
            {task.priority === 1
              ? "Не важно"
              : task.priority === 2
              ? "Важно"
              : "Очень важно"}
          </Badge>
        </div>
      </li>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{task.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formTaskName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Название задачи"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={role === "Руководитель проекта" || userInfo.isAdmin ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDescription">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={role === "Руководитель проекта" || userInfo.isAdmin ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDate">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Дедлайн"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={role === "Руководитель проекта" || userInfo.isAdmin ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskResp">
              <Form.Label>Ответственный</Form.Label>
              <div style={{ display: "flex" }}>
                <Form.Control
                  style={{ flex: 1 }}
                  required
                  placeholder="Выберете ответственного"
                  value={respName}
                  readOnly
                />
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic" disabled={role === "Руководитель проекта" || userInfo.isAdmin ? false : true}>
                    Выбрать
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomMenu}>
                    {users.map((user) => (
                      <Dropdown.Item
                        key={user.id}
                        onClick={() => {
                          setRespName(user.name);
                          setResp(user.id);
                        }}
                      >
                        {user.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskPriority">
              <Form.Label>Важность</Form.Label>
              <Form.Check required>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={
                        idx === 0
                          ? "outline-secondary"
                          : idx === 1
                          ? "outline-success"
                          : "outline-danger"
                      }
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                      disabled={role === "Руководитель проекта" || userInfo.isAdmin ? false : true}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Check>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTaskStatus">
              <Form.Label>Статус</Form.Label>
              <Form.Check>
                <ButtonGroup>
                  <ToggleButton
                    id={`status-1`}
                    type="radio"
                    variant="outline-warning"
                    name="status1"
                    value="1"
                    checked={statusValue === "1"}
                    onChange={() => setStatusValue("1")}
                    disabled={role === "Наблюдатель" ? true : false}
                  >
                    В работе
                  </ToggleButton>
                  <ToggleButton
                    id={`status-2`}
                    type="radio"
                    variant="outline-success"
                    name="status2"
                    value="2"
                    checked={statusValue === "2"}
                    onChange={() => setStatusValue("2")}
                    disabled={role === "Наблюдатель" ? true : false}
                  >
                    Завершено
                  </ToggleButton>
                </ButtonGroup>
              </Form.Check>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTaskComments">
              <Form.Label>Комментарии</Form.Label>
              {comments.map((x) => x).length > 3 ? (
                <Button
                  size="sm"
                  variant="link"
                  onClick={() => setShowComments(!showComments)}
                >
                  {!showComments
                    ? "Показать комментарии"
                    : "Скрыть комментарии"}
                </Button>
              ) : (
                <div></div>
              )}

              <ListGroup as="ol">
                {showComments === true
                  ? comments.map((comment) => (
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start mb-3"
                        key={comment._id}
                        style={{
                          borderTop: "solid 0.1em rgba(0, 0, 0, 0.125)",
                        }}
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{comment.name.name}</div>
                          <div className="fw-bold mb-1">{`${comment.createdAt.substring(
                            0,
                            10
                          )} ${comment.createdAt.substring(11, 19)}`}</div>
                          {comment.content}
                          <div>
                            {comment.files.map((f) => (
                              <Button
                                size="sm"
                                variant="link"
                                onClick={() => {
                                  downloadFile(f.file);
                                }}
                              >
                                {f.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))
                  : comments
                      .map((comment) => (
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start mb-3"
                          key={comment._id}
                          style={{
                            borderTop: "solid 0.1em rgba(0, 0, 0, 0.125)",
                          }}
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{comment.name.name}</div>
                            <div className="fw-bold mb-1">{`${comment.createdAt.substring(
                              0,
                              10
                            )} ${comment.createdAt.substring(11, 19)}`}</div>
                            {comment.content}
                            <div>
                              {comment.files.map((f) => (
                                <Button
                                  size="sm"
                                  variant="link"
                                  key={f._id}
                                  onClick={() => {
                                    downloadFile(f.file);
                                  }}
                                >
                                  {f.name}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))
                      .slice(-3)}
                {comments.map((x) => x).length === 0 ? (
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start mb-3"
                    style={{
                      borderTop: "solid 0.1em rgba(0, 0, 0, 0.125)",
                    }}
                  >
                    <div className="ms-2 me-auto">Нет комментариев</div>
                  </ListGroup.Item>
                ) : (
                  <div></div>
                )}
                {/* <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                  </div>
                </ListGroup.Item> */}
              </ListGroup>
            </Form.Group>
            <hr
              style={{
                color: "black",
                backgroundColor: "black",
                height: 1,
              }}
            />
            <Form.Group className="mb-3" controlId="formTaskCommentAdd">
              <Form.Control
                as="textarea"
                rows={2}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="mb-3"
              />
              <div>
                <Button
                  variant="primary"
                  disabled={commentContent === "" ? true : false}
                  onClick={handleAddComment}
                >
                  Отправить
                </Button>

                <Form.Control
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="mt-3"
                />
              </div>
              
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleDelete} disabled={role === "Руководитель проекта" || userInfo.isAdmin ? false : true}>
              Удалить
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmit} disabled={role === "Наблюдатель" ? true : false}>
              Сохранить изменения
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Task;
