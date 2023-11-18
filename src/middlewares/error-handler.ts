import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/abstract-custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .json({ success: false, errors: err.serializeErrors() });
  }

  //  Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found.`;
    res.status(404).json({ success: false, errors: [{ message }] });
  }

  res
    .status(500)
    .json({ success: false, errors: [{ message: "Something Bad Occured" }] });
};
