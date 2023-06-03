from django.db import models
from django.contrib.auth.models import User



class Project(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    usersWithAccess = models.ManyToManyField(User, 
                                             related_name="usersWithAccess")
    def __str__(self):
        return self.name
    
class Board(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

class Column(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    position = models.IntegerField(null=True, blank=True)
    board = models.ForeignKey(Board, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

class Task(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    dueDate = models.DateTimeField(null=True, blank=True)
    position = models.IntegerField(null=True, blank=True)
    priority = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=200, null=True, blank=True)
    column = models.ForeignKey(Column, on_delete=models.SET_NULL, null=True)
    board = models.ForeignKey(Board, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    responsible = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="usersResponsible")

    def __str__(self):
        return self.name
    
class Comment(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    content = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    task = models.ForeignKey(Task, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(self.createdAt)
    
class File(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    file = models.FileField(null=True, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name
    
class UsersRole(models.Model):
    PM = "Руководитель проекта"
    EMP = "Сотрудник"
    SPEC = "Наблюдатель"
    ROLES_CHOICES = [
        (PM, "Руководитель проекта"),
        (EMP, "Сотрудник"),
        (SPEC, "Наблюдатель"),
    ]
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    role = models.CharField(max_length=30, null=True, blank=True, choices=ROLES_CHOICES)

    def __str__(self):
        return str(self.project) + " " + str(self.user) + " " + str(self.role)

# class Product(models.Model):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     name = models.CharField(max_length=200, null=True, blank=True)
#     image = models.ImageField(null=True, blank=True)
#     brand = models.CharField(max_length=200, null=True, blank=True)
#     category = models.CharField(max_length=200, null=True, blank=True)
#     description = models.TextField(null=True, blank=True)
#     rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     numReviews = models.IntegerField(null=True, blank=True, default=0)
#     price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     countInStock = models.IntegerField(null=True, blank=True, default=0)
#     createdAt = models.DateTimeField(auto_now_add=True)
#     _id = models.AutoField(primary_key=True, editable=False)
#     upload = models.FileField(null=True, blank=True)

#     def __str__(self):
#         return self.name

# class Review(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     name = models.CharField(max_length=200, null=True, blank=True)
#     rating = models.IntegerField(null=True, blank=True, default=0)
#     comment = models.TextField(null=True, blank=True)
#     _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return str(self.rating)

# class Order(models.Model):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     paymentMethod = models.CharField(max_length=200, null=True, blank=True)
#     taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     isPaid = models.BooleanField(default=False)
#     paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
#     isDelivered = models.BooleanField(default=False)
#     deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
#     createdAt = models.DateTimeField(auto_now_add=True) 
#     _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return str(self.createdAt)

# class OrderItem(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
#     order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
#     name = models.CharField(max_length=200, null=True, blank=True)
#     qty = models.IntegerField(null=True, blank=True, default=0)
#     price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     image = models.CharField(max_length=200, null=True, blank=True)
#     _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return str(self.name)

# class ShippingAddress(models.Model):
#     order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
#     address = models.CharField(max_length=200, null=True, blank=True)
#     city = models.CharField(max_length=200, null=True, blank=True)
#     postalCode = models.CharField(max_length=200, null=True, blank=True)
#     country = models.CharField(max_length=200, null=True, blank=True)
#     shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return str(self.address)