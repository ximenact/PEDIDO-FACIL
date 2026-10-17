
from django.urls import path
from . import views

app_name = 'pedidos'

urlpatterns = [
    path('', views.lista_pedidos, name='lista'),
    path('crear/', views.crear_pedido, name='crear'),
    path('editar/<int:pk>/', views.editar_pedido, name='editar'),
    path('eliminar/<int:pk>/', views.eliminar_pedido, name='eliminar'),
]
