import ObjectId from "bson-objectid";
export interface UserInterface {
  _id: ObjectId;
  username: string;
  email: string;
  avatar: string;
  googleId: string;
  role: string;
  goals: any[];
}
