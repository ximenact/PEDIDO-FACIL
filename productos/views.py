
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q
from django.shortcuts import render, redirect, get_object_or_404

from .models import Producto
from .forms import ProductoForm


@login_required
def lista_productos(request):
    busqueda = request.GET.get('q', '').strip()

    productos = Producto.objects.all().order_by('-fecha_registro')

    if busqueda:
        productos = productos.filter(
            Q(nombre__icontains=busqueda) |
            Q(descripcion__icontains=busqueda)
        )

    return render(request, 'productos/lista.html', {
        'productos': productos,
        'busqueda': busqueda,
    })


@login_required
def crear_producto(request):
    form = ProductoForm(request.POST or None)

    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Producto creado correctamente.')
        return redirect('productos:lista')

    return render(request, 'productos/formulario.html', {
        'form': form,
        'titulo': 'Crear producto',
    })


@login_required
def editar_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    form = ProductoForm(request.POST or None, instance=producto)

    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Producto actualizado correctamente.')
        return redirect('productos:lista')

    return render(request, 'productos/formulario.html', {
        'form': form,
        'titulo': 'Editar producto',
    })


@login_required
def eliminar_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)

    if request.method == 'POST':
        producto.delete()
        messages.success(request, 'Producto eliminado correctamente.')
        return redirect('productos:lista')

    return render(request, 'productos/confirmar_eliminacion.html', {
        'objeto': producto,
        'tipo': 'producto',
    })
