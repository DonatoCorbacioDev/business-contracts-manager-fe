export interface User {
    id: number;
    username: string;
    password: string;
    manager: number;
    role: number;
    managerName?: string;
    roleName?: string;
  }
  