# EFI MiniBlog – Frontend (React)

Aplicación web desarrollada con **React + Vite** que consume una **API Flask** provista por la cátedra.  
Implementa **autenticación JWT**, manejo de roles y CRUD completos de **posts** y **reviews**.

## 👤 Integrantes
- Candela Picco – @candePicco
- Abril Galindez – @A-galindez
- Lucia Agostini – @ LuciaAgostini

## 🔗 Backend (API Flask)
```
http://localhost:5000/api
```

## 🚀 Tecnologías
- React + Vite
- React Router DOM
- Material UI
- Axios
- JWT Decode
- Notistack
- Context API

## 🧩 Funcionalidades completas

### 🔐 Autenticación
- Registro (name, email, password, rol)
- Login con JWT
- Decodificación del token con jwt-decode
- Contexto global de usuario
- Logout
- Roles: user, moderator, admin

### 📝 Posts
- CRUD completo
- Cada usuario puede modificar sus propios posts
- Admin puede modificar/eliminar cualquiera
- Validaciones en formularios

### 💬 Reviews
- CRUD completo por post
- Solo dueños pueden editar/eliminar
- Admin puede eliminar cualquiera
- Vista dentro del detalle de cada post

### 🛡️ Seguridad
- Visualización de elementos según rol

### 🎨 UI
- Material UI
- Diseño moderno, limpio y responsive
- Formularios con validaciones
- Toasts de éxito/error con Notistack

## ⚙️ Instalación

1. Instalar dependencias:
```
npm install
```

2. Iniciar servidor de desarrollo:
```
npm run dev
```

3. Abrir en navegador la URL que indique Vite.

## 📝 Notas finales
Asegurarse que la API Flask esté corriendo en `localhost:5000` para que el frontend funcione correctamente.

Proyecto desarrollado para la **EFI de Programación Javascript** – Frontend.