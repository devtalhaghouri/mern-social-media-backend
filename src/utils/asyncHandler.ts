import { NextFunction, Request, Response } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const asyncHadler =
  (fun: AsyncHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fun(req, res, next)).catch(next);
  };

export default asyncHadler;
