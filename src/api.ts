import * as jwt from "jsonwebtoken";

export interface IUser {
  username: string;
  password: string;
}

export interface IScore {
  username: string;
  score: number;
  createdAt: string;
}

export interface ILoginResponse {
  token: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  userName: string;
}

export const login = async (user: IUser): Promise<ILoginResponse> => {
  const resp = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (resp.status !== 200) {
    throw new Error(await errFromResponse(resp));
  }
  return resp.json();
};

export const register = async (user: IUser) => {
  const resp = await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (resp.status !== 200) {
    throw new Error(await errFromResponse(resp));
  }
  return resp.json();
};

export const getScores = async (): Promise<IScore[]> => {
  const resp = await fetch("/api/v1/scores", {
    method: "GET",
    headers: {},
  });
  if (resp.status !== 200) {
    throw new Error(await errFromResponse(resp));
  }
  return resp.json();
};

export const getMyScores = async (): Promise<IScore[]> => {
  const resp = await fetch("/api/v1/scores/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (resp.status !== 200) {
    throw new Error(await errFromResponse(resp));
  }
  return resp.json();
};

export const addScore = async (score: IScore) => {
  const resp = await fetch("/api/v1/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(score),
  });
  if (resp.status !== 200) {
    throw new Error(await errFromResponse(resp));
  }
  return resp.json();
};

export const getAuthState = (): AuthState => {
  const loggedOut = {
    isLoggedIn: false,
    userName: "",
  };
  let token = jwt.decode(localStorage.getItem("token") || "");
  if (!token || token["exp"] < new Date().getTime() / 1000) {
    return loggedOut;
  }
  return { isLoggedIn: true, userName: token["data"].userName };
};

const errFromResponse = async (resp: Response): Promise<string> => {
  return (await resp.json()).message;
};
