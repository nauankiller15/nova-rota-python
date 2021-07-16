import { AuthService } from "./auth.service";

export class Login {
    username: string;
    password: string;
}

export class User {
    user_id: number;
    username: string;
    email: string;
}