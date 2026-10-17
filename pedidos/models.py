from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, MinValueValidator


class Pedido(models.Model):

    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('confirmado', 'Confirmado'),
        ('cancelado', 'Cancelado'),
    ]

    numero_pedido = models.CharField(
        max_length=50,
        unique=True
    )
    cliente = models.CharField(
        max_length=150,
        validators=[MinLengthValidator(3)]
    )
    fecha_registro = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField(max_length=500)
    valor_total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='pendiente'
    )
    usuario = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='pedidos'
    )

    def __str__(self):
        return self.numero_pedido