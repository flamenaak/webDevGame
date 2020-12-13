declare namespace Express {
  export interface Request {
    user?: ITokenData;
  }
}

interface ITokenData {
  userName: string;
}
