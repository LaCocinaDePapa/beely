Para un ejemplo más realista de una web simulada usando Express y TypeScript, podemos imaginar que estamos creando una API para un sistema de gestión de usuarios. Esta API tendrá varias funcionalidades como:

Crear un nuevo usuario.
Obtener información de un usuario.
Autenticación de usuario (login).
Actualizar y eliminar usuarios.
Imaginemos que nuestra aplicación web tiene una base de datos que guarda la información de los usuarios y permite gestionar estos datos mediante una API RESTful.

Estructura del Proyecto
bash
Copy code
/project-root
│
├── /src
│   ├── /controllers
│   │   └── userController.ts
│   ├── /dtos
│   │   └── userDTO.ts
│   ├── /middlewares
│   │   └── authMiddleware.ts
│   ├── /models
│   │   └── userModel.ts
│   ├── /routes
│   │   └── userRoutes.ts
│   ├── /services
│   │   └── userService.ts
│   ├── /utils
│   │   └── validation.ts
│   └── app.ts
├── /node_modules
├── package.json
└── tsconfig.json
Detalles de Implementación


1. /src/dtos/userDTO.ts — DTO para crear y responder información de usuarios
typescript
Copy code
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
}


2. /src/models/userModel.ts — Modelo de Usuario Simulado
typescript
Copy code
import { CreateUserDTO } from '../dtos/userDTO';

class UserModel {
  private static users: any[] = []; // Simula una base de datos en memoria

  static async userExists(email: string): Promise<boolean> {
    return this.users.some(user => user.email === email);
  }

  COMMENT

  static async create({ name, email, password }: CreateUserDTO): Promise<any> {
    const user = {
      id: `${this.users.length + 1}`, // Simulando un ID auto-incremental
      name,
      email,
      password, // En un entorno real, nunca almacenarías contraseñas en texto plano
    };
    this.users.push(user);
    return user;
  }

  static async getUserByEmail(email: string): Promise<any> {
    return this.users.find(user => user.email === email);
  }

  static async updateUser(id: string, updates: Partial<CreateUserDTO>): Promise<any> {
    const user = this.users.find(user => user.id === id);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  }

  static async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default UserModel;


3. /src/services/userService.ts — Lógica de negocio para usuarios
typescript
Copy code
import { CreateUserDTO } from '../dtos/userDTO';
import UserModel from '../models/userModel';

class UserService {
  static async createUser(data: CreateUserDTO) {
    const userExists = await UserModel.userExists(data.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    return await UserModel.create(data);
  }

  static async getUserByEmail(email: string) {
    return await UserModel.getUserByEmail(email);
  }

  static async updateUser(id: string, updates: Partial<CreateUserDTO>) {
    return await UserModel.updateUser(id, updates);
  }

  static async deleteUser(id: string) {
    return await UserModel.deleteUser(id);
  }
}

export default UserService;


4. /src/controllers/userController.ts — Controladores para manejar las rutas de usuarios
typescript
Copy code
import { Request, Response } from 'express';
import { CreateUserDTO } from '../dtos/userDTO';
import UserService from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password }: CreateUserDTO = req.body;

  try {
    const newUser = await UserService.createUser({ name, email, password });

    res.status(201).json({
      message: 'User has been created successfully',
      result: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ result: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await UserService.updateUser(id, updates);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', result: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const success = await UserService.deleteUser(id);
    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


5. /src/routes/userRoutes.ts — Rutas para interactuar con la API de usuarios
typescript
Copy code
import { Router } from 'express';
import { createUser, getUserByEmail, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post('/users', createUser);  // Crear usuario
router.get('/users/:email', getUserByEmail);  // Obtener usuario por email
router.put('/users/:id', updateUser);  // Actualizar usuario por ID
router.delete('/users/:id', deleteUser);  // Eliminar usuario por ID

export default router;


6. /src/app.ts — Archivo principal donde se configura el servidor y las rutas
typescript
Copy code
import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

// Middlewares
app.use(express.json());  // Para parsear JSON en las solicitudes

// Rutas
app.use('/api', userRoutes);

// Levantar el servidor
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
Cómo Probar la API
Crear un usuario (POST):

Endpoint: POST /api/users
Cuerpo (JSON):
json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
Obtener un usuario por email (GET):

Endpoint: GET /api/users/john@example.com
Actualizar un usuario (PUT):

Endpoint: PUT /api/users/1
Cuerpo (JSON):
json
Copy code
{
  "name": "John Updated"
}
Eliminar un usuario (DELETE):

Endpoint: DELETE /api/users/1
Resumen
Este ejemplo simula un sistema de gestión de usuarios con Express y TypeScript, usando una base de datos en memoria (representada por un arreglo de objetos). La estructura sigue una arquitectura en capas, con DTOs para estructurar los datos, Modelos para interactuar con la base de datos, Servicios para la lógica de negocio, y Controladores para manejar las rutas.

Este tipo de arquitectura permite una mayor escalabilidad y mantenibilidad, y te da una base sólida para trabajar con aplicaciones más grandes.

Si necesitas más detalles o tienes alguna duda, ¡avísame!
