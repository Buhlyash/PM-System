import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Row, Col, Container, Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Column from "../components/Column";
import { COLUMN_CREATE_RESET, BOARD_CREATE_RESET } from "../constants/productConstants";
import {
  listProducts,
  listBoards,
  listColumns,
  listTasks,
  createColumn,
  listBoardsInProject,
  changeCurrentBoard,
  createBoard,
  listRolesInProject
} from "../actions/productActions";
import Header from "../components/Header";

function HomeScreen({ userInfo }) {
  const boardsList = useSelector((state) => state.boardsInProjectList);
  const { boards } = boardsList;
  const userCreateBoard = useSelector((state) => state.boardCreate);
  const { successBoard } = userCreateBoard;
  const columnsList = useSelector((state) => state.columnsList);
  const { error, loading, columns } = columnsList;
  const userCreateTask = useSelector((state) => state.taskCreate);
  const { success } = userCreateTask;
  const userCreateColumn = useSelector((state) => state.columnCreate);
  const { columnSuccess } = userCreateColumn;
  const userDeleteTask = useSelector((state) => state.taskDelete);
  const { deleteSuccess } = userDeleteTask;
  const userDeleteColumn = useSelector((state) => state.columnDelete);
  const { deleteColSuccess } = userDeleteColumn;
  const userUpdateColumn = useSelector((state) => state.columnUpdate);
  const { successColUpd } = userUpdateColumn;
  const userUpdateTask = useSelector((state) => state.taskUpdate);
  const { successTaskUpd } = userUpdateTask;
  const currentBoard = useSelector((state) => state.currentBoard);
  const { board } = currentBoard;
  const userCreateComment = useSelector((state) => state.commentCreate);
  const { successComment } = userCreateComment;
  const rolesList = useSelector((state) => state.roleList);
  const { roles } = rolesList;
  

  const dispatch = useDispatch();
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [name, setName] = useState("");
  const [nameBoard, setNameBoard] = useState("");
  const [descBoard, setDescBoard] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/";
  const params = useParams();

  const role = roles.find((role) => role.user === userInfo.id) !== undefined ? roles.find((role) => role.user === userInfo.id).role : "Нет роли"

  const columnArr = columns.slice(0);
  columnArr.sort((a, b) => (a.position > b.position ? 1 : -1));

  function findLastPosition(arr) {
    let pos = 0;
    arr.forEach((element) => {
      if (element.board === board) {
        pos++;
      }
    });
    if (pos === 0) {
      return 1;
    } else {
      return pos + 1;
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleCloseBoard = () => {
    setShowBoard(false);
  };

  const handleShowBoard = () => setShowBoard(true);

  const handleSubmitBoard = (e) => {
    e.preventDefault();
    setShowBoard(false);
    if (nameBoard !== "") {
      dispatch(createBoard(nameBoard, descBoard, params.id));
      dispatch({ type: BOARD_CREATE_RESET });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    if (name !== "") {
      dispatch(createColumn(name, findLastPosition(columnArr), board));
      dispatch({ type: COLUMN_CREATE_RESET });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history(redirect);
    } else {
      if (
        !columns[0] ||
        deleteSuccess ||
        success ||
        columnSuccess ||
        deleteColSuccess ||
        successColUpd ||
        successTaskUpd ||
        params.id ||
        board || 
        successBoard ||
        successComment
      ) {
        if (board !== -1 && board !== undefined) {
          dispatch(listColumns(board));
          dispatch(listTasks(board));
        } else {
          dispatch(listBoardsInProject(params.id));
        }
        dispatch(listRolesInProject(params.id));
      } else {
        console.log(1);
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    redirect,
    deleteSuccess,
    success,
    columnSuccess,
    deleteColSuccess,
    successColUpd,
    successTaskUpd,
    params.id,
    board,
    successBoard,
    successComment
  ]); 
  return (
    <div>
      {/* {userInfo && <Header />} */}
      {/* Было */}
      {userInfo && (
        <header>
          <Navbar
            bg="primary"
            variant="dark"
            expand="lg"
            collapseOnSelect
            className="d-flex justify-content-center px-3"
            style={{ height: "56px" }}
          >
            {/* <Container>
          <section className="lists-container">
            <div className="list">
              <h3 className="list-title h3-hover">bla</h3>
            </div>
          </section>
          <div style={{ fontWeight: "bold" }}>Проект 1</div>
          <div className="d-flex "></div>
        </Container>
        <Container>
          <div style={{ fontWeight: "bold" }}>Проект 1</div>
          <div className="d-flex "></div>
        </Container> */}

            <Container>
              {/* <Navbar.Brand onClick={handleClick}>
              <button>PM System</button>
            </Navbar.Brand> */}

              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              {/* <Navbar.Collapse id="basic-navbar-nav"> */}
              <Navbar.Collapse>
                <Nav className="mr-auto">
                  {boards.map((board) => (
                    <Button
                      key={board._id}
                      // onClick={() => setBoardID(board._id)}
                      onClick={() => {
                        dispatch(changeCurrentBoard(board._id));
                      }}
                    >
                      {board.name}
                    </Button>
                  ))}
                  {role == 'Руководитель проекта' || userInfo.isAdmin ? <Button onClick={handleShowBoard}>+</Button> : <div></div>}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Modal show={showBoard} onHide={handleCloseBoard}>
            <Modal.Header closeButton>
              <Modal.Title>Добавить доску</Modal.Title>
            </Modal.Header>
            {/* <Form onSubmit={handleSubmitBoard}> */}
            <Form onSubmit={handleSubmitBoard}> 
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBoardName">
                  <Form.Label>Название</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Название доски"
                    autoFocus
                    onChange={(e) => setNameBoard(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBoardDesc">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={2}
                    placeholder="Описание доски"
                    onChange={(e) => setDescBoard(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseBoard}>
                  Close
                </Button>
                {/* <Button type="submit" variant="primary"> */}
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </header>
      )}
      {(board === -1 || board === undefined) && (
        <main className="p-3">
          <Container>Выберете или создайте доску</Container>
        </main>
      )}
      {board !== -1 && board !== undefined && (
        <main className="p-3">
          <Container>
            {/* <h1>Проекты</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
      
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
     )}  */}

            <section className="lists-container">
              {columns.map((column) => (
                <Col key={column._id}>
                  <Column column={column} />
                </Col>
              ))}

              <button hidden={role === 'Руководитель проекта' || userInfo.isAdmin ? false : true} className="add-list-btn my-btn" onClick={handleShow}>
                Добавить этап
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Добавить этап</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                  <Modal.Body>
                    <Form.Group className="mb-3" controlId="formColumnName">
                      <Form.Label>Название</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Название этапа"
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                      />
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
            </section>
          </Container>
        </main>
      )}
    </div>
  );
}

export default HomeScreen;
