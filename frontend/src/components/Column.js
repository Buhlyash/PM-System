import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTasks, createTask, deleteColumn, updateColumn } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ListGroup, ListGroupItem, Badge, Dropdown } from "react-bootstrap";
import Task from "../components/Task";
import {
  TASK_CREATE_RESET,
  TASK_DELETE_RESET,
  COLUMN_DELETE_RESET,
  COLUMN_UPDATE_RESET
} from "../constants/productConstants";
import CustomMenu from "./CustomMenu";

function Column({ column }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const tasksList = useSelector((state) => state.tasksList);
  const { error, loading, tasks } = tasksList;
  const projectsList = useSelector((state) => state.projectsUsersList);
  const { projects } = projectsList;
  const boardsList = useSelector((state) => state.boardsInProjectList);
  const { boards } = boardsList;
  const allProjectsList = useSelector((state) => state.projectsList);
  const { allProjects } = allProjectsList;
  const rolesList = useSelector((state) => state.roleList);
  const { roles } = rolesList;

  const thisBoard = boards.find((board) => board._id === column.board);
  const thisProject = projects.find(
    (project) => project._id === thisBoard.project
  );

  const thisAdminProject = allProjects.find(
    (project) => project._id === thisBoard.project
  );
  const users =  userInfo.isAdmin ? thisAdminProject.users : thisProject.users;
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const userCreateTask = useSelector(state => state.taskCreate);
  // const { success } = userCreateTask;

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [radioValue, setRadioValue] = useState("1");

  const [showColHead, setShowColHead] = useState(false);
  const [nameColHead, setNameColHead] = useState("");

  const [resp, setResp] = useState("");
  const [respName, setRespName] = useState("");

  const role = roles.find((role) => role.user === userInfo.id) !== undefined ? roles.find((role) => role.user === userInfo.id).role : "Нет роли"

  const taskArr = tasks.slice(0);
  taskArr.sort((a, b) => (a.position > b.position ? 1 : -1));

  const radios = [
    { name: "Не важно", value: "1" },
    { name: "Важно", value: "2" },
    { name: "Очень важно", value: "3" },
  ];

  function findLastPosition(arr) {
    let pos = 0;
    arr.forEach((element) => {
      if (element.column === column._id) {
        pos++;
      }
    });
    if (pos === 0) {
      return 1;
    } else {
      return pos + 1;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    // console.log(name, description, date, findLastPosition(taskArr), radioValue, 1, column._id,  column.board);
    if (name !== "" && description !== "" && date !== "") {
      dispatch(
        createTask(
          name,
          description,
          date,
          findLastPosition(taskArr),
          radioValue,
          1,
          column._id,
          column.board,
          resp
        )
      );
      dispatch({ type: TASK_CREATE_RESET });
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleColHeadClose = () => setShowColHead(false);
  const handleColHeadShow = () => {
    setShowColHead(true);
    setNameColHead(column.name);
  };

  const handleColHeadSubmit = (e) => {
    e.preventDefault();
    dispatch(updateColumn(column._id, nameColHead));
    dispatch({type: COLUMN_UPDATE_RESET});
    setShowColHead(false);
    // // console.log(name, description, date, findLastPosition(taskArr), radioValue, 1, column._id,  column.board);
    // if (name !== "" && description !== "" && date !== "") {
    //   dispatch(
    //     createTask(
    //       name,
    //       description,
    //       date,
    //       findLastPosition(taskArr),
    //       radioValue,
    //       1,
    //       column._id,
    //       column.board
    //     )
    //   );
    //   dispatch({ type: TASK_CREATE_RESET });
    // }
  };
  const handleDelete = () => {
    dispatch(deleteColumn(column._id));
    dispatch({type: COLUMN_DELETE_RESET});
  };
  // useEffect(() => {
  //   if (success) {
  //       dispatch({type: TASK_CREATE_RESET});
  //       dispatch(listTasks(column._id));
  //   }
  // }, [success]);

  return (
    <div className="list">
      {role === "Руководитель проекта" || userInfo.isAdmin ? <h3 className="list-title h3-hover" onClick={handleColHeadShow}>
        {column.name}
      </h3> : <h3 className="list-title">
        {column.name}
      </h3>}
      <Modal show={showColHead} onHide={handleColHeadClose}>
        <Modal.Header closeButton>
          <Modal.Title>{column.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleColHeadSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formColumnHeadName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Название этапа"
                value={nameColHead}
                onChange={(e) => setNameColHead(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleColHeadClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <button
        variant="primary"
        className="add-card-btn my-btn"
        onClick={handleShow}
        value={column._id}
        disabled={role === "Руководитель проекта" || userInfo.isAdmin ? false : true}
      >
        Добавить задачу
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить задачу</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formTaskName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Название задачи"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDescription">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={2}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDate">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Дедлайн"
                onChange={(e) => setDate(e.target.value)}
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
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
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
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Check>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ul className="list-items">
        {taskArr.map((task) =>
          task.column === column._id ? (
            <Row key={task.position}>
              <Task task={task} />
            </Row>
          ) : null
        )}
        {/* <li>Описание задачи</li> */}
      </ul>
    </div>
  );
}

export default Column;
