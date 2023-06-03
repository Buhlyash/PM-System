from django.urls import path
from base.views import board_views as views


urlpatterns = [
    path('', views.getBoards, name='boards'),
    path('userproject/<str:project_id>/', views.getBoardsInProject, name='boards-in-project'),
    path('create/', views.createBoard, name='create-board'),
    path('delete/', views.deleteBoard, name='delete-board'),
    path('columns/', views.getColumns, name='get-columns'),
    path('<str:board_id>/columns/', views.getColumnsInBoard, name='get-columns-in-board'),
    path('columns/create/', views.createColumn, name='create-column'),
    path('columns/delete/', views.deleteColumn, name='delete-column'),
    path('columns/update/', views.updateColumn, name='update-column'),
    path('tasks/', views.getTasks, name='get-tasks'),
    path('<str:board_id>/tasks/', views.getTasksInBoard, name='get-tasks-in-board'),
    path('tasks/create/', views.createTask, name='create-task'),
    path('tasks/delete/', views.deleteTask, name='delete-task'),
    path('tasks/update/', views.updateTask, name='update-task'),
    path('projects/', views.getProjects, name='get-projects'),
    path('usersprojects/', views.getUsersProjects, name='get-users-projects'),
    path('projects/create/', views.createProject, name='create-project'),
    path('projects/delete/', views.deleteProject, name='delete-project'),
    path('projects/udpateinfo/', views.updateProjectInfo, name='update-info-project'),
    path('comment/create/', views.createComment, name='create-comment'),
    path('role/create/', views.createRole, name='create-role'),
    path('roles/<str:project_id>/', views.getRolesInProject, name='get-roles'),
    path('role/delete/', views.deleteRole, name='delete-role'),
    path('roles/', views.getUserRoles, name='get-users-roles'),
]

# from django.urls import path
# from . import views


# urlpatterns = [
#     # path('', views.getRoutes, name='routes'),
#     path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

#     path('users/register/', views.registerUser, name='register'),

#     path('users/profile/', views.getUserProfile, name='profile'),
#     path('users/', views.getUsers, name='users'),

#     path('boards/', views.getBoards, name='boards'),

#     path('products/', views.getProducts, name='products'),
#     path('products/<str:pk>', views.getProduct, name='product'),
# ]
