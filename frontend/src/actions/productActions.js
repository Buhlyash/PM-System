import axios from 'axios'
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
    BOARD_CREATE_SUCCESS,

    COLUMN_LIST_FAIL,
    COLUMN_LIST_REQUEST,
    COLUMN_LIST_SUCCESS,

    TASK_LIST_FAIL,
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,

    TASK_CREATE_FAIL,
    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,

    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,

    COLUMN_CREATE_FAIL,
    COLUMN_CREATE_REQUEST,
    COLUMN_CREATE_SUCCESS,

    COLUMN_DELETE_FAIL,
    COLUMN_DELETE_SUCCESS,

    COLUMN_UPDATE_FAIL,
    COLUMN_UPDATE_REQUEST,
    COLUMN_UPDATE_SUCCESS,

    TASK_UPDATE_FAIL,
    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS,

    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,

    ROLE_CREATE_FAIL,
    ROLE_CREATE_REQUEST,
    ROLE_CREATE_SUCCESS,

    ROLE_LIST_FAIL,
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,

    ROLE_DELETE_SUCCESS,
    ROLE_DELETE_FAIL,

    USER_ROLE_LIST_FAIL,
    USER_ROLE_LIST_REQUEST,
    USER_ROLE_LIST_SUCCESS,

    PROJECT_INFO_UPDATE_REQUEST, 
    PROJECT_INFO_UPDATE_SUCCESS,
    PROJECT_INFO_UPDATE_FAIL, 
    PROJECT_INFO_UPDATE_RESET 
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type:PRODCUT_LIST_REQUEST})
        const { data }  = await axios.get('/api/products/')
        dispatch({
            type: PRODCUT_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: PRODCUT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODCUT_DETAILS_REQUEST})
        const { data }  = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODCUT_DETAILS_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: PRODCUT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const changeCurrentBoard = (id) => async (dispatch) => {
    const data = id;
    dispatch({type:BOARD_CHANGE_CURRENT, payload: data});
}

export const listUsersProjects = () => async (dispatch, getState) => {
    try {
        dispatch({type:PROJECT_LIST_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/boards/usersprojects/`, config)
        dispatch({
            type: PROJECT_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: PROJECT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listProjects = () => async (dispatch, getState) => {
    try {
        dispatch({type:ALL_PROJECT_LIST_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/boards/projects/`, config)
        dispatch({
            type: ALL_PROJECT_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: ALL_PROJECT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listBoardsInProject = (id) => async (dispatch, getState) => {
    try {
        dispatch({type:BOARD_LIST_IN_PROJECT_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/boards/userproject/${id}/`, config)
        dispatch({
            type: BOARD_LIST_IN_PROJECT_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: BOARD_LIST_IN_PROJECT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listBoards = () => async (dispatch) => {
    try {
        dispatch({type:BOARD_LIST_REQUEST})
        const { data } = await axios.get('/api/boards/')
        dispatch({
            type: BOARD_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: BOARD_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const createBoard = (name, description, projectId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BOARD_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            '/api/boards/create/',
            {'name': name, 'description': description, 'projectId':projectId},
            config
            )

        dispatch({
            type: BOARD_CREATE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: BOARD_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listColumns = (id) => async (dispatch, getState) => {
    try {
        dispatch({type:COLUMN_LIST_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/boards/${id}/columns/`, config)
        dispatch({
            type: COLUMN_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: COLUMN_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listTasks = (id) => async (dispatch, getState) => {
    try {
        dispatch({type:TASK_LIST_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/boards/${id}/tasks/`, config)
        dispatch({
            type: TASK_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: TASK_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const createTask = (name, description, dueDate, position, priority, status, columnId, boardId, responsible) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TASK_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            '/api/boards/tasks/create/',
            {'name': name, 'description': description, 'dueDate': dueDate, 'position': position,
                'priority': priority, 'status': status, 'columnId': columnId, 'boardId': boardId, 'responsible': responsible},
            config
            )

        dispatch({
            type: TASK_CREATE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: TASK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const deleteTask = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo }
        } = getState()

        const {data} = await axios.delete(
            '/api/boards/tasks/delete/', {
                headers: {
                  Authorization: `Bearer ${userInfo.token}`
                },
                data: {
                    'id': id
                }
              }
            )

        dispatch({
            type: TASK_DELETE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: TASK_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const createColumn = (name, position, boardId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLUMN_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            '/api/boards/columns/create/',
            {'name': name, 'position': position, 'id': boardId},
            config
            )

        dispatch({
            type: COLUMN_CREATE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: COLUMN_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const deleteColumn = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo }
        } = getState()

        const {data} = await axios.delete(
            '/api/boards/columns/delete/', {
                headers: {
                  Authorization: `Bearer ${userInfo.token}`
                },
                data: {
                    'id': id
                }
              }
            )

        dispatch({
            type: COLUMN_DELETE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: COLUMN_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const updateColumn = (id, name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLUMN_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            '/api/boards/columns/update/',
            {'id': id, 'name': name},
            config
            )

        dispatch({
            type: COLUMN_UPDATE_SUCCESS,
            payload: data
        })
        
    } catch(error) {
        dispatch({
            type: COLUMN_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const updateTask = (id, name, description, dueDate, position, priority, status, columnId, responsible) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TASK_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(
            '/api/boards/tasks/update/',
            {'id': id, 'name': name, 'description': description, 'dueDate': dueDate, 'position': position,
                'priority': priority, 'status': status, 'columnId': columnId, 'responsible': responsible},
            config
            )

        dispatch({
            type: TASK_UPDATE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const createComment = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COMMENT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            '/api/boards/comment/create/',
            formData,
            config
            )

        dispatch({
            type: COMMENT_CREATE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: COMMENT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const createRole = (projectId, role, userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ROLE_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            '/api/boards/role/create/',
            {'projectId': projectId, 'role': role, 'userId': userId},
            config
            )

        dispatch({
            type: ROLE_CREATE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ROLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listRolesInProject = (projectId) => async (dispatch, getState) => {
    try {
        dispatch({type:ROLE_LIST_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/boards/roles/${projectId}`, config)
        dispatch({
            type: ROLE_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: ROLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const deleteRole = (roleId) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo }
        } = getState()

        const {data} = await axios.delete(
            '/api/boards/role/delete/', {
                headers: {
                  Authorization: `Bearer ${userInfo.token}`
                },
                data: {
                    'roleId': roleId
                }
              }
            )

        dispatch({
            type: ROLE_DELETE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ROLE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listUserRoles = () => async (dispatch, getState) => {
    try {
        dispatch({type:USER_ROLE_LIST_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/boards/roles/`, config)
        dispatch({
            type: USER_ROLE_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: USER_ROLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const updateProjectInfo = (id, name, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROJECT_INFO_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            '/api/boards/projects/udpateinfo/',
            {'id': id, 'name': name, 'description': description},
            config
            )

        dispatch({
            type: PROJECT_INFO_UPDATE_SUCCESS,
            payload: data
        })
        
    } catch(error) {
        dispatch({
            type: PROJECT_INFO_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}