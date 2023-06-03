import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { listUsers, logout } from "../actions/userActions";
import {
  listUsersProjects,
  changeCurrentBoard,
  listProjects,
} from "../actions/productActions";
import { Typography } from "./Typography.tsx";
import { COLUMN_LIST_RESET } from "../constants/productConstants";

function SideBar() {
  const { collapseSidebar } = useProSidebar();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const projectsList = useSelector((state) => state.projectsUsersList);
  const { projects } = projectsList;
  const allProjectsList = useSelector((state) => state.projectsList);
  const { allProjects } = allProjectsList;
  const projInfoUpdate = useSelector((state) => state.projectInfoUpdate);
  const { successProjInfUpd } = projInfoUpdate;

  

  const dispatch = useDispatch();
  const history = useNavigate();

  const changeBoardHandler = () => {
    dispatch(changeCurrentBoard(-1));
    dispatch({type: COLUMN_LIST_RESET})
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  // const handleClick = () => {
  //   dispatch(changeCurrentProject());
  // };

  useEffect(() => {
    if (!userInfo) {
      history("/");
    } else {
      if (projects.length === 0 || successProjInfUpd) {
        if(userInfo.isAdmin) {
          dispatch(listProjects());
        } else {
          dispatch(listUsersProjects());
        }
        dispatch(listUsers());
      }
    }
  }, [userInfo, history, dispatch, successProjInfUpd]);

  return (
    <Sidebar 
      transitionDuration={300}
      collapsedWidth="70px"
      style={{ borderRightStyle: "none", height: "100vh" }}
    >
      <div className="d-flex justify-content-start">
        <button
          className="sidebar-btn"
          onClick={() => {collapseSidebar()}}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      

      <Menu>
        <MenuItem component={<Link to="/main" />}>
          <i className="fa-solid fa-house-chimney sidebar-icon-item"></i>Главная
        </MenuItem>
        {/* <MenuItem component={<Link to="/" />} className=''><i className="fa-solid fa-user sidebar-icon"></i>Профиль</MenuItem> */}
        {userInfo ? (
          <SubMenu
            label="Мой профиль"
            icon={<i className="fa-solid fa-user sidebar-icon"></i>}
          >
            <MenuItem component={<Link to="/profile" />}>
              {userInfo.name}
            </MenuItem>
            <MenuItem component={<Link to="/" />} onClick={logoutHandler}>
              Выйти
            </MenuItem>
          </SubMenu>
        ) : (
          <MenuItem component={<Link to="/lg" />} className="">
            <i className="fa-solid fa-user sidebar-icon"></i>Войти
          </MenuItem>
        )}
        <SubMenu
          label="Мои Проекты"
          icon={<i className="fa-solid fa-briefcase"></i>}
        >
          <Menu>
            {/* <MenuItem component={<Link to="/projects" />}> Проект 1 </MenuItem>
          <MenuItem component={<Link to="/login" />}> Проект 2 </MenuItem> */}
            {/* <MenuItem component={<Link to="/home" />}> Проект 3 </MenuItem> */}
            {!userInfo.isAdmin ? projects.map((project) => (
              <MenuItem
                component={<Link to={`/projects/${project._id}`} />}
                key={project._id}
                onClick={changeBoardHandler}
              >
                {project.name}
              </MenuItem>
            )) : allProjects.map((project) => (
              <MenuItem
                component={<Link to={`/projects/${project._id}`} />}
                key={project._id}
                onClick={changeBoardHandler}
              >
                {project.name}
              </MenuItem>
            ))}
          </Menu>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;
