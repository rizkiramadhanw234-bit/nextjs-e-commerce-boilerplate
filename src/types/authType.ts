export type authType = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type authResponseType = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  gender: string;
  phone: string;
  accessToken: string;
  refreshToken: string;
};

export type refreshTokenType = {
  refreshToken: string;
  expiresInMins: number;
};
