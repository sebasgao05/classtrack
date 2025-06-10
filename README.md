# 📚 ClassTrack

**ClassTrack** es una aplicación web creada para gestionar clases técnicas (por ejemplo, de un AWS Cloud Club), donde los usuarios pueden visualizar clases disponibles y confirmar asistencia a través de un enlace externo a Meetup. El administrador puede crear, asignar y modificar clases. El sistema está basado en una arquitectura moderna con servicios de AWS y buenas prácticas DevOps.

## 🧩 Características

- ✅ Visualización de clases programadas (título, descripción, tecnologías)
- ✅ Confirmación de asistencia con redirección a [Meetup](https://meetup.com)
- ✅ Panel administrativo para gestionar clases
- ✅ Backend serverless (AWS Lambda)
- ✅ Base de datos NoSQL (DynamoDB)
- ✅ Frontend moderno con React
- ✅ Autenticación con Amazon Cognito (en progreso)
- ✅ Despliegue automático con GitHub Actions

## 🛠️ Tecnologías utilizadas

| Parte | Tecnología |
|-------|------------|
| Frontend | React, React Router DOM, TailwindCSS |
| Backend | Node.js (AWS Lambda), API Gateway |
| Base de datos | DynamoDB |
| Autenticación | Amazon Cognito |
| DevOps | GitHub Actions, CodePipeline |
| Infraestructura | AWS CloudFormation o Terraform (pendiente) |
| Hosting | S3 + CloudFront |
| Otros | Meetup (para gestión de eventos externos) |

## 📁 Estructura del repositorio

```
classtrack/
├── frontend/         # Interfaz del usuario en React
├── backend/          # Funciones Lambda y lógica de negocio
├── infra/            # Infraestructura como código (IaC)
├── devops/           # Configuración de CI/CD
├── docs/             # Diagramas, documentación adicional
└── README.md         # Este archivo
````

## 🚀 Cómo iniciar el frontend

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/classtrack.git
cd classtrack/frontend
````

2. Instala dependencias:

```bash
npm install
```

3. Levanta el proyecto en modo desarrollo:

```bash
npm start
```

Accede en tu navegador a [http://localhost:3000](http://localhost:3000)

## 🌐 Rutas del frontend (SPA)

| Ruta             | Descripción                     |
| ---------------- | ------------------------------- |
| `/`              | Página de bienvenida            |
| `/clases`        | Lista de clases disponibles     |
| `/clase/:id`     | Detalle de una clase específica |
| `/confirmar/:id` | Confirmación de asistencia      |
| `/admin`         | Gestión de clases (solo admins) |

## 🧪 En desarrollo

* [ ] Integración con Cognito
* [ ] Registro de asistencia en DynamoDB
* [ ] Validación de roles
* [ ] Envío de correos de confirmación
* [ ] Exportación CSV de asistentes

## 📌 Estructura de ramas Git

| Rama       | Descripción                        |
| ---------- | ---------------------------------- |
| `main`     | Rama estable y desplegada          |
| `dev`      | Desarrollo general                 |
| `frontend` | Interfaz en React                  |
| `backend`  | Funciones Lambda y lógica del API  |
| `infra`    | Infraestructura en AWS como código |
| `devops`   | Automatización, despliegue         |
| `docs`     | Documentación y diagramas          |

## ✍️ Autor

David Sebastian Barrera Gaona – [@sebasgao05](https://github.com/sebasgao05)
Estudiante de Ingeniería de Sistemas • Apasionada por la nube ☁️ • Organizadora de AWS Cloud Club EAN

## 📄 Licencia

Este proyecto está bajo licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.
