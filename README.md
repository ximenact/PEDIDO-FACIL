PedidoFácil

es una aplicación web desarrollada con Django para gestionar productos y pedidos de manera organizada. Permite administrar la información registrada y consultar los datos desde una interfaz web.

Funcionalidades
- Inicio y cierre de sesión.
- Autenticación de usuarios mediante el sistema integrado de Django.
- Registro, consulta, edición y eliminación de productos (CRUD).
- Registro, consulta, edición y eliminación de pedidos (CRUD).
- Validación de formularios.
- Almacenamiento de datos en PostgreSQL mediante Neon.

Tecnologías utilizadas
- Python
- Django
- PostgreSQL
- Neon
- HTML y CSS
- JavaScript
- Bootstrap

Estructura del proyecto
- `config/`: configuración principal de Django.
- `cuentas/`: funcionalidades relacionadas con usuarios y autenticación.
- `productos/`: gestión de productos.
- `pedidos/`: gestión de pedidos.
- `templates/`: plantillas HTML.
- `static/`: archivos CSS y JavaScript.

Requisitos
- Python instalado.
- Git.
- Dependencias indicadas en `requirements.txt`.
- Una base de datos PostgreSQL configurada.

Instalación y ejecución local

1. Clonar el repositorio:
   `git clone URL_DEL_REPOSITORIO`

2. Entrar a la carpeta del proyecto:
   `cd pedidofacil`

3. Crear y activar un entorno virtual.

4. Instalar las dependencias:
   `pip install -r requirements.txt`

5. Configurar las variables de entorno necesarias en el archivo `.env`, incluida la conexión a PostgreSQL.

6. Aplicar las migraciones:
   `python manage.py migrate`

7. Iniciar el servidor:
   `python manage.py runserver`

Seguridad
Las credenciales y variables privadas se configuran mediante variables de entorno. El archivo `.env` no debe publicarse en el repositorio.

Estado del proyecto
Proyecto académico de desarrollo web.
