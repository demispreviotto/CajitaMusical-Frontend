// Define la estructura de la información básica del usuario
export interface UserInfo {
    id: number;
    username: string;
    email: string;
    name: string;
}

// Define la estructura de la solicitud de login (lo que envías al backend)
export interface LoginUserInput {
    username: string;
    password: string;
}

// Define la estructura de la respuesta de login (lo que recibes del backend)
export interface LoginResponse {
    message: string;
    user: UserInfo;
}

// Define la estructura de la solicitud de registro
export interface RegisterUserInput {
    username: string;
    email: string;
    name: string;
    password: string;
}

// Define la estructura de la respuesta de registro (similar a UserInfo)
export interface UserResponse {
    id: number;
    username: string;
    email: string;
    name: string;
}

// Puedes añadir más interfaces aquí según tus necesidades (ej. para errores)
export interface ErrorResponse {
    error: string;
}