import { 
    PRODCUT_LIST_FAIL, 
    PRODCUT_LIST_REQUEST, 
    PRODCUT_LIST_SUCCESS,

    PRODCUT_DETAILS_FAIL,
    PRODCUT_DETAILS_REQUEST,
    PRODCUT_DETAILS_SUCCESS,

    PROJECT_LIST_FAIL,
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_SUCCESS,

    ALL_PROJECT_LIST_FAIL,
    ALL_PROJECT_LIST_REQUEST,
    ALL_PROJECT_LIST_SUCCESS,

    BOARD_CHANGE_CURRENT,

    BOARD_LIST_FAIL,
    BOARD_LIST_REQUEST,
    BOARD_LIST_SUCCESS, 

    BOARD_LIST_IN_PROJECT_FAIL,
    BOARD_LIST_IN_PROJECT_REQUEST,
    BOARD_LIST_IN_PROJECT_SUCCESS,

    BOARD_CREATE_FAIL,
    BOARD_CREATE_REQUEST,
    BOARD_CREATE_RESET,
    BOARD_CREATE_SUCCESS,

    COLUMN_LIST_FAIL,
    COLUMN_LIST_REQUEST,
    COLUMN_LIST_SUCCESS,
    COLUMN_LIST_RESET,

    TASK_LIST_FAIL,
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,

    TASK_CREATE_FAIL,
    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_RESET,

    TASK_DELETE_FAIL,
    TASK_DELETE_RESET,
    TASK_DELETE_SUCCESS,

    COLUMN_CREATE_FAIL,
    COLUMN_CREATE_REQUEST,
    COLUMN_CREATE_RESET,
    COLUMN_CREATE_SUCCESS,

    COLUMN_DELETE_FAIL,
    COLUMN_DELETE_SUCCESS,
    COLUMN_DELETE_RESET,

    COLUMN_UPDATE_FAIL,
    COLUMN_UPDATE_REQUEST,
    COLUMN_UPDATE_SUCCESS,
    COLUMN_UPDATE_RESET,

    TASK_UPDATE_FAIL,
    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS,
    TASK_UPDATE_RESET,

    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_RESET,
    COMMENT_CREATE_SUCCESS,
    
    ROLE_CREATE_FAIL,
    ROLE_CREATE_REQUEST,
    ROLE_CREATE_RESET,
    ROLE_CREATE_SUCCESS,

    ROLE_LIST_FAIL,
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,

    ROLE_DELETE_FAIL,
    ROLE_DELETE_SUCCESS,
    ROLE_DELETE_RESET,

    USER_ROLE_LIST_FAIL,
    USER_ROLE_LIST_REQUEST,
    USER_ROLE_LIST_SUCCESS,

    PROJECT_INFO_UPDATE_REQUEST, 
    PROJECT_INFO_UPDATE_SUCCESS,
    PROJECT_INFO_UPDATE_FAIL, 
    PROJECT_INFO_UPDATE_RESET 
} from '../constants/productConstants'

export const productListReducer = (state = { products:[] }, action) => {
    switch(action.type) {
        case PRODCUT_LIST_REQUEST:
            return {loading:true, products: []}
        case PRODCUT_LIST_SUCCESS:
            return {loading:false, products: action.payload}
        case PRODCUT_LIST_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch(action.type) {
        case PRODCUT_DETAILS_REQUEST:
            return {loading:true, ...state}
        case PRODCUT_DETAILS_SUCCESS:
            return {loading:false, product: action.payload}
        case PRODCUT_DETAILS_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const changeCurrentBoardReducer = (state = { }, action) => {
    switch(action.type) {
        case BOARD_CHANGE_CURRENT:
            return {board: action.payload}
        default:
            return state
    }
}

export const usersProjectsListReducer = (state = { projects: [] }, action) => {
    switch(action.type) {
        case PROJECT_LIST_REQUEST:
            return {loading:true, projects: []}
        case PROJECT_LIST_SUCCESS:
            return {loading:false, projects: action.payload}
        case PROJECT_LIST_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const projectsListReducer = (state = { allProjects: [] }, action) => {
    switch(action.type) {
        case ALL_PROJECT_LIST_REQUEST:
            return {loading:true, allProjects: []}
        case ALL_PROJECT_LIST_SUCCESS:
            return {loading:false, allProjects: action.payload}
        case ALL_PROJECT_LIST_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const boardsListReducer = (state = { boards:[] }, action) => {
    switch(action.type) {
        case BOARD_LIST_REQUEST:
            return {loading:true, boards: []}
        case BOARD_LIST_SUCCESS:
            return {loading:false, boards: action.payload}
        case BOARD_LIST_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const boardsInProjectListReducer = (state = { boards:[] }, action) => {
    switch(action.type) {
        case BOARD_LIST_IN_PROJECT_REQUEST:
            return {loading:true, boards: []}
        case BOARD_LIST_IN_PROJECT_SUCCESS:
            return {loading:false, boards: action.payload}
        case BOARD_LIST_IN_PROJECT_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const boardsCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case BOARD_CREATE_REQUEST:
            return {loading:true}
        case BOARD_CREATE_SUCCESS:
            return {loading:false, successBoard: true, boardInfo: action.payload}
        case BOARD_CREATE_FAIL:
            return {loading:false, error: action.payload}
        case BOARD_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const columnsListReducer = (state = { columns:[] }, action) => {
    switch(action.type) {
        case COLUMN_LIST_REQUEST:
            return {loading:true, columns: []}
        case COLUMN_LIST_SUCCESS:
            return {loading:false, columns: action.payload}
        case COLUMN_LIST_FAIL:
            return {loading:false, error: action.payload}
        case COLUMN_LIST_RESET:
            return { columns:[] }
        default:
            return state
    }
}

export const tasksListReducer = (state = { tasks:[] }, action) => {
    switch(action.type) {
        case TASK_LIST_REQUEST:
            return {loading:true, tasks: []}
        case TASK_LIST_SUCCESS:
            return {loading:false, tasks: action.payload}
        case TASK_LIST_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const tasksCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case TASK_CREATE_REQUEST:
            return {loading:true}
        case TASK_CREATE_SUCCESS:
            return {loading:false, success: true, taskInfo: action.payload}
        case TASK_CREATE_FAIL:
            return {loading:false, error: action.payload}
        case TASK_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const tasksDeleteReducer = (state = { deleteSuccess: false }, action) => {
    switch(action.type) {
        case TASK_DELETE_SUCCESS:
            return {loading:false, deleteSuccess: true, taskDeleteInfo: action.payload}
        case TASK_DELETE_FAIL:
            return {loading:false, error: action.payload}
        case TASK_DELETE_RESET:
            return {deleteSuccess: false}
        default:
            return state
    }
}

export const columnsCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case COLUMN_CREATE_REQUEST:
            return {loading:true}
        case COLUMN_CREATE_SUCCESS:
            return {loading:false, columnSuccess: true, columnInfo: action.payload}
        case COLUMN_CREATE_FAIL:
            return {loading:false, error: action.payload}
        case COLUMN_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const columnsDeleteReducer = (state = { deleteColSuccess: false }, action) => {
    switch(action.type) {
        case COLUMN_DELETE_SUCCESS:
            return {loading:false, deleteColSuccess: true, columnDeleteInfo: action.payload}
        case COLUMN_DELETE_FAIL:
            return {loading:false, error: action.payload}
        case COLUMN_DELETE_RESET:
            return {deleteColSuccess: false}
        default:
            return state
    }
}

export const columnsUpdateReducer = (state = { }, action) => {
    switch(action.type) {
        case COLUMN_UPDATE_REQUEST:
            return {loading:true}
        case COLUMN_UPDATE_SUCCESS:
            return {loading:false, successColUpd: true, colInfo: action.payload}
        case COLUMN_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        case COLUMN_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const tasksUpdateReducer = (state = { }, action) => {
    switch(action.type) {
        case TASK_UPDATE_REQUEST:
            return {loading:true}
        case TASK_UPDATE_SUCCESS:
            return {loading:false, successTaskUpd: true, taskUpdInfo: action.payload}
        case TASK_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        case TASK_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const commentsCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case COMMENT_CREATE_REQUEST:
            return {loading:true}
        case COMMENT_CREATE_SUCCESS:
            return {loading:false, successComment: true, CommentInfo: action.payload}
        case COMMENT_CREATE_FAIL:
            return {loading:false, error: action.payload}
        case COMMENT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const roleCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case ROLE_CREATE_REQUEST:
            return {loading:true}
        case ROLE_CREATE_SUCCESS:
            return {loading:false, successRole: true, RoleInfo: action.payload}
        case ROLE_CREATE_FAIL:
            return {loading:false, error: action.payload}
        case ROLE_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const rolesListReducer = (state = { roles: [] }, action) => {
    switch(action.type) {
        case ROLE_LIST_REQUEST:
            return {loading:true, roles: []}
        case ROLE_LIST_SUCCESS:
            return {loading:false, roles: action.payload}
        case ROLE_LIST_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const roleDeleteReducer = (state = { deleteSuccess: false }, action) => {
    switch(action.type) {
        case ROLE_DELETE_SUCCESS:
            return {loading:false, deleteSuccess: true, roleDeleteInfo: action.payload}
        case ROLE_DELETE_FAIL:
            return {loading:false, error: action.payload}
        case ROLE_DELETE_RESET:
            return {deleteSuccess: false}
        default:
            return state
    }
}

export const userRolesListReducer = (state = { userRoles: [] }, action) => {
    switch(action.type) {
        case USER_ROLE_LIST_REQUEST:
            return {loading:true, userRoles: []}
        case USER_ROLE_LIST_SUCCESS:
            return {loading:false, userRoles: action.payload}
        case USER_ROLE_LIST_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const projectInfoUpdateReducer = (state = { }, action) => {
    switch(action.type) {
        case PROJECT_INFO_UPDATE_REQUEST:
            return {loading:true}
        case PROJECT_INFO_UPDATE_SUCCESS:
            return {loading:false, successProjInfUpd: true, projInfo: action.payload}
        case PROJECT_INFO_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        case PROJECT_INFO_UPDATE_RESET:
            return {}
        default:
            return state
    }
}