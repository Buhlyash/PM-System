import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, Row, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { changeCurrentBoard } from "../actions/productActions";

function Header() {
  const handleClick = () => {
    console.log(1);
  };

  const boardsList = useSelector((state) => state.boardsInProjectList);
  const { boards } = boardsList;
  const [boardID, setBoardID] = useState(-1);
  const dispatch = useDispatch();
  useEffect(() => {
    if(boardID !== -1) {
      dispatch(changeCurrentBoard(boardID));
    }

  }, [boardID]);

  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="d-flex justify-content-center px-3"
        style={{ height: "56px" }}
      >
        <Container>
          <Navbar.Collapse>
            <Nav className="mr-auto">
              {boards.map((board) => (
                <Button key={board._id} onClick={() => setBoardID(board._id)}>
                  {board.name}
                </Button>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
