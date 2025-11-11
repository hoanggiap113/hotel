export interface User{
    name:string;
    email:string;
    roles:string[];
}

export interface LoginUserForm{
    email: string;
    password: string;
    createdAt:Date;
    updatedAt:Date;
    role: string
}

export interface RegisterUserForm{
    name: string;
    email: string;
    role?: string;
    password?:string;

}