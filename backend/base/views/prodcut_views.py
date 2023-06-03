# from django.shortcuts import render
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response

# from base.products import products
# from base.models import Board
# from base.serializers import BoardSerializer

# from rest_framework import status

# @api_view(['GET'])
# def getProducts(request):
#     return Response(products)

# @api_view(['GET'])
# def getProduct(requset, pk):
#     product = None
#     for p in products:
#         if p['_id'] == pk:
#             product = p
#             break
#     return Response(product)