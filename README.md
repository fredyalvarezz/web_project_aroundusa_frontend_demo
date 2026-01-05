# Tripleten web_project_api_full

Titulo: Around the EE.AA
proyecto: https://github.com/fredyalvarezz/web_project_api_full.git


Descripción del proyecto: 
Around the EE.AA es una aplicacion web en el cual puedes compartir y mostrar algunos lugares visitados por los usuarios, agregando imagenes de los nuevos lugares y descripciones de los sitios.
Cada usuario puede:
- Editar su perfil (nombre, descripción y foto de perfil).
- Agregar nuevas tarjetas de lugares con nombre e imagen.
- Dar like o quitar like de las tarjetas.
- Eliminar sus propias tarjetas.
- Registrarse e iniciar sesion con autenticación protegida por JWT.

El proyecto esta separado por el Frontend y el Backend lograndp un flujo completo y manejo de datos en tiempo real con una API REST.


Tecnologias y técnicas Usadas: 
Se incluyeron:
 Frontend:
  - Reack.js: Creacion de componentes reutilizables (App, Header, Main, Cards, Popups).
  - React Router DOM: Manejo de rutas protegidas y públicas (/login, /signup, /signup).
  - Vite: Entorno de desarrollo rápido, reemplazando HTML por JSX.
   - JavaScript: Uso de clases, módulos y estados (useState, useEffect) y contextos (CurrentUserContext).
   - Media Queries: Diseño adaptable (responsive) para estilización personalizada.
   - Fetch API: Comunicación con el backend (registro, login, CRUD de las tarjetas).
   - JSON Web Tokens (JWT): Almacenamiento de token para mantener la sesión activa.

   Backend:
   - Node.js: Entorno de ejecución del servidor.
   - Express.js: Framework para construir la API REST.
    - MongoDB: Base de datos para guardar usuarios y tarjetas.
    - bcryptjs: Encriptación de contraseñas.
    - jsonwebtoken: Creacion y verificación de entrada en rutas.
    - Celebrate / Joi: Validacion de datos de entrada en rutas.
    - dotenv: Gestión de variables de entorno.
    - CORS: Configuración de acceso seguro entre frontend y backend. 


Autor: 
 Fredy Alvarez.
 Desarrollador Full Stack
 Estudiante de Tripleten.

Driver con fotos: https://drive.google.com/drive/folders/1B2j6VioY6mdVSP9tyGr-V_iJRcbPs-7r?usp=drive_link

 URL del frontend: https://web-project-frontend-483794102565.us-central1.run.app
 URL del backend: https://web-project-api-483794102565.us-central1.run.app

 Usuarios:
 fredy@example.com 
 prueba123@example.com 
 prueba1234@example.com

 -Contraseña para todos los usuarios "12345678" (sin comillas, solo los números)