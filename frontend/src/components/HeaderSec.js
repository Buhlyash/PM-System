import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { changeCurrentBoard } from "../actions/productActions";

function HeaderSec() {
  

  

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
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default HeaderSec;
