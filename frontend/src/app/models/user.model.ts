export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    // add other roles if needed
  }
  
  export interface User {
    id: number;
    email: string;
    password?: string;
    photo:string;
    name?: string;
    role: 'ADMIN' | 'RH' |'EMPLOYE'; // Match the Role enum from the backend
    created_at: Date;
    updated_at: Date;
  }
  