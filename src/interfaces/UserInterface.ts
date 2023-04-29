export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  googleId: string;
  role: string;
  goals: any[];
  createdAt: Date;
  updatedAt: Date;
}
