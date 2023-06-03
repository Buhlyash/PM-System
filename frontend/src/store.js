import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, boardsListReducer, columnsListReducer, 
    tasksListReducer, tasksCreateReducer, tasksDeleteReducer, columnsCreateReducer, columnsDeleteReducer,
    columnsUpdateReducer, tasksUpdateReducer, usersProjectsListReducer, changeCurrentBoardReducer, boardsInProjectListReducer,
    boardsCreateReducer, commentsCreateReducer, roleCreateReducer, rolesListReducer, roleDeleteReducer, projectsListReducer,
    userRolesListReducer, projectInfoUpdateReducer } from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, usersListReducer } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    projectsUsersList: usersProjectsListReducer,
    projectsList: projectsListReducer,
    projectInfoUpdate: projectInfoUpdateReducer,
    currentBoard: changeCurrentBoardReducer,
    boardsList: boardsListReducer,
    boardsInProjectList: boardsInProjectListReducer,
    boardCreate: boardsCreateReducer,
    columnsList: columnsListReducer,
    columnCreate: columnsCreateReducer,
    columnDelete: columnsDeleteReducer,
    columnUpdate: columnsUpdateReducer,
    tasksList: tasksListReducer,
    taskCreate: tasksCreateReducer,
    taskDelete: tasksDeleteReducer, 
    taskUpdate: tasksUpdateReducer,
    commentCreate: commentsCreateReducer,
    roleCreate: roleCreateReducer,
    roleList: rolesListReducer,
    roleDelete: roleDeleteReducer,
    roleUserList: userRolesListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    usersList: usersListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store