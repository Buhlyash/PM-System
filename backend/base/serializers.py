from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Board, Column, Task, Project, Comment, File, UsersRole

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

class UsersRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersRole
        fields = '__all__'
    
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'
    
class ProjectSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
    
    def get_users(self, obj):
        name = obj.usersWithAccess
        serializer = UserSerializer(name, many=True)
        return serializer.data

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'

class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField(read_only=True)
    responsible = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'

    def get_comments(self, obj):
        comments = obj.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data
    
    def get_responsible(self, obj):
        name = obj.responsible
        serializer = UserSerializer(name, many=False)
        return serializer.data

class CommentSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    files = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'

    def get_name(self, obj):
        name = obj.user
        serializer = UserSerializer(name, many=False)
        return serializer.data
    
    def get_files(self, obj):
        files = obj.file_set.all()
        serializer = FileSerializer(files, many=True)
        return serializer.data
    

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']
    
    def get_isAdmin(self, obj):
        return obj.is_staff

    def get__id(self, obj):
        return obj.id

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields =  ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)