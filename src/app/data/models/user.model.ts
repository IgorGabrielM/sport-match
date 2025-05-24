export class CreateUserModel {
  name: string;
  email: string;
  password: string;
  interests?: [];
}

export class AuthModel {
  email: string;
  password: string;
}
