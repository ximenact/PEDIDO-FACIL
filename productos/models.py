from django.db import models
from django.core.validators import MinLengthValidator, MinValueValidator


class Producto(models.Model):
    nombre = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(3)]
    )
    descripcion = models.TextField(max_length=500)
    precio = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    cantidad_disponible = models.PositiveIntegerField()
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre