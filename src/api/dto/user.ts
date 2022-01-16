export interface UserDTO {
  username: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  id?: string;
}

export interface UploaderDTO {
  id: number;
  username: string;
}
