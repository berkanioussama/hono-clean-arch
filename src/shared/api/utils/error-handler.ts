import { Context } from "hono";
import { errorResponse } from "./api-response";
import { ValidationError, NotFoundError, UnauthorizedError, ForbiddenError } from "../../domain/errors";

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
    if (error instanceof NotFoundError) {
        return errorResponse(c, 404, error.message);
    }
    if (error instanceof UnauthorizedError) {
        return errorResponse(c, 401, error.message);
    }
    if (error instanceof ForbiddenError) {
        return errorResponse(c, 403, error.message);
    }
    return errorResponse(c, 500, message);
}