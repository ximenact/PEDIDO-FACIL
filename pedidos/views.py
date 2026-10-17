
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q
from django.shortcuts import render, redirect, get_object_or_404

from .models import Pedido
from .forms import PedidoForm


@login_required
def lista_pedidos(request):
    busqueda = request.GET.get('q', '').strip()

    pedidos = Pedido.objects.select_related('usuario').all().order_by(
        '-fecha_registro'
    )

    if busqueda:
        pedidos = pedidos.filter(
            Q(numero_pedido__icontains=busqueda) |
            Q(cliente__icontains=busqueda) |
            Q(descripcion__icontains=busqueda)
        )

    return render(request, 'pedidos/lista.html', {
        'pedidos': pedidos,
        'busqueda': busqueda,
    })


@login_required
def crear_pedido(request):
    form = PedidoForm(request.POST or None)

    if request.method == 'POST' and form.is_valid():
        pedido = form.save(commit=False)
        pedido.usuario = request.user
        pedido.save()

        messages.success(request, 'Pedido creado correctamente.')
        return redirect('pedidos:lista')

    return render(request, 'pedidos/formulario.html', {
        'form': form,
        'titulo': 'Crear pedido',
    })


@login_required
def editar_pedido(request, pk):
    pedido = get_object_or_404(Pedido, pk=pk)
    form = PedidoForm(request.POST or None, instance=pedido)

    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Pedido actualizado correctamente.')
        return redirect('pedidos:lista')

    return render(request, 'pedidos/formulario.html', {
        'form': form,
        'titulo': 'Editar pedido',
    })


@login_required
def eliminar_pedido(request, pk):
    pedido = get_object_or_404(Pedido, pk=pk)

    if request.method == 'POST':
        pedido.delete()
        messages.success(request, 'Pedido eliminado correctamente.')
        return redirect('pedidos:lista')

    return render(request, 'pedidos/confirmar_eliminacion.html', {
        'objeto': pedido,
        'tipo': 'pedido',
    })
