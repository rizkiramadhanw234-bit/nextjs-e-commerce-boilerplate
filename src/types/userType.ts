export type userType = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  gender: string;
  phone: string;
};

export type updateUser = Partial<userType>;
