import { Context } from "hono";
import { errorResponse } from "./api-response";
import { ValidationError } from "../../domain/errors";

interface ErrorHandlerParams {
    c: Context;
    error: any;
    message: string;
}

export const errorHandler = ({c, error, message}: ErrorHandlerParams) => {
    console.log(error)
    if (error instanceof ValidationError) {
        return errorResponse(c, 400, error.message);
    }
    return errorResponse(c, 500, message);
}