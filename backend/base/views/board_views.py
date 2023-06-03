from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Board, Column, Task, Project, Comment, File, UsersRole
from django.contrib.auth.models import User
from base.serializers import BoardSerializer, UserSerializer, UserSerializerWithToken, ColumnSerializer, TaskSerializer, ProjectSerializer, CommentSerializer, UsersRoleSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['GET'])
def getBoards(request):
    boards = Board.objects.all()
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBoardsInProject(request, project_id):
    project = Project.objects.get(_id=project_id)
    boards = Board.objects.filter(project=project)
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBoard(request):
    data = request.data
    user = request.user 

    try:
        board = Board.objects.create(
            name = data['name'],
            description = data['description'],
            project = Project.objects.get(_id=data['projectId']),
            user = user
        )
        serializer = BoardSerializer(board, many=False)
        return Response(serializer.data)
    except:
        message = {'detail' : 'Something went wrong'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBoard(request):
    data = request.data
    board = Board.objects.get(_id=data['id'])
    board.delete()
    message = {'detail' : 'Board was deleted'}
    return Response(message, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createColumn(request):
    data = request.data 

    try:
        column = Column.objects.create(
            name = data['name'],
            position = data['position'],
            board = Board.objects.get(_id=data['id'])
        )
        serializer = ColumnSerializer(column, many=False)
        return Response(serializer.data)
    except:
        message = {'detail' : 'Something went wrong'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getColumns(request):
    columns = Column.objects.all()
    serializer = ColumnSerializer(columns, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getColumnsInBoard(request, board_id):
    board = Board.objects.get(_id=board_id)
    columns = Column.objects.filter(board=board)
    serializer = ColumnSerializer(columns, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteColumn(request):
    data = request.data
    column = Column.objects.get(_id=data['id'])
    column.delete()
    message = {'detail' : 'Column was deleted'}
    return Response(message, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateColumn(request):
    data = request.data
    column = Column.objects.get(_id=data['id'])
    

    column.name = data['name']
    column.save() 
    serializer = ColumnSerializer(column, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTasksInBoard(request, board_id):
    board = Board.objects.get(_id=board_id)
    tasks = Task.objects.filter(board=board)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTask(request):
    data = request.data
    user = request.user 

    try:
        task = Task.objects.create(
            name = data['name'],
            description = data['description'],
            dueDate = data['dueDate'],
            position = data['position'],
            priority = data['priority'],
            status = data['status'],
            board = Board.objects.get(_id=data['boardId']),
            column = Column.objects.get(_id=data['columnId']),
            user = user,
            responsible = User.objects.get(id=data['responsible'])
        )
        serializer = TaskSerializer(task, many=False)
        return Response(serializer.data)
    except:
        message = {'detail' : 'Something went wrong'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTask(request):
    data = request.data
    task = Task.objects.get(_id=data['id'])
    task.delete()
    message = {'detail' : 'Task was deleted'}
    return Response(message, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTask(request):
    data = request.data
    task = Task.objects.get(_id=data['id'])

    task.name = data['name']
    task.description = data['description']
    task.dueDate = data['dueDate']
    task.position = data['position']
    task.priority = data['priority']
    task.status = data['status']
    task.column = Column.objects.get(_id=data['columnId'])
    task.responsible = User.objects.get(id=data['responsible']) 
    task.save() 
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProjects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsersProjects(request):
    user = request.user 
    projects = Project.objects.filter(usersWithAccess = user)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProject(request):
    data = request.data
    user = request.user 

    try:
        project = Project.objects.create(
            name = data['name'],
            description = data['description'],
            user = user
        )
        serializer = ProjectSerializer(project, many=False)
        return Response(serializer.data)
    except:
        message = {'detail' : 'Something went wrong'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProject(request):
    data = request.data
    project = Project.objects.get(_id=data['id'])
    project.delete()
    message = {'detail' : 'Project was deleted'}
    return Response(message, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProjectInfo(request):
    data = request.data
    project = Project.objects.get(_id=data['id'])

    project.name = data['name']
    project.description = data['description']
     
    project.save() 
    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data) 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComment(request):
    data = request.data
    user = request.user    

    try:
        comment = Comment.objects.create(
            content = data['content'],
            user = user,
            task = Task.objects.get(_id=data['id'])
        )

        files = request.FILES
        i = 0
        for file in files:
            i+=1
        if(i>0):
            j = 0
            for file in files:
                f = files.get('file-' + str(j))
                File.objects.create(
                    name = str(f),
                    file = f,
                    comment = comment
                )
                j+=1
        
        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data)
    except:
        message = {'detail' : 'Something went wrong'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRole(request):
    data = request.data
    user = User.objects.get(id=data['userId'])

    project = Project.objects.get(_id=data['projectId'])
     
    if data['role'] == 'pm':
        user_role = UsersRole.PM
    elif data['role'] == 'em':
        user_role = UsersRole.EMP
    elif data['role'] == 'sp':
        user_role = UsersRole.SPEC
    
    
    try:
        obj = UsersRole.objects.get(user = user, project = project)
    except UsersRole.DoesNotExist:
        obj = None
    if obj == None:
        try:
            project.usersWithAccess.add(user)
            role = UsersRole.objects.create(
                user = user,
                project = project,
                role = user_role,
                
            )
            serializer = UsersRoleSerializer(role, many=False)
            return Response(serializer.data)
        except:
            message = {'detail' : 'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        obj.role = user_role
        obj.save()
        serializer = UsersRoleSerializer(obj, many=False)
        return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRolesInProject(request, project_id):
    projects = Project.objects.get(_id=project_id)

    roles = UsersRole.objects.filter(project = projects)
    serializer = UsersRoleSerializer(roles, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteRole(request):
    data = request.data
    try:
        role = UsersRole.objects.get(_id=data['roleId'])
        user = role.user
        project = role.project
        project.usersWithAccess.remove(user)
        role.delete()
        message = {'detail' : 'Role was deleted'}
        return Response(message, status=status.HTTP_200_OK)
    except UsersRole.DoesNotExist:
        message = {'detail' : 'Role not found'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserRoles(request):
    user = request.user
    roles = UsersRole.objects.filter(user = user)
    serializer = UsersRoleSerializer(roles, many=True)
    return Response(serializer.data)