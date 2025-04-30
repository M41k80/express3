export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
  }
  
  export interface JwtUser {
    userId: string;
    email: string;
    role: string;
  }