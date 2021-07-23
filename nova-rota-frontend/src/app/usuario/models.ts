export class NovoUsuario {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export class Usuario {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    cargo: string;
}

export class Cargo {
    id: number;
    user: number;
    cargo: string;
}