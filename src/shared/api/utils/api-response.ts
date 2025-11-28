export function ApiResponse<T = any>(data: T | string) {
    const isError = typeof data === 'string';
    
    if (isError) {
        return {
            status: 'error' as const,
            data: null,
            error: data
        };
    }

    return {
        status: 'success' as const,
        data,
        error: null
    };
}

export type ApiResponseType<T = any> = 
    | { status: 'success'; data: T; error: null }
    | { status: 'error'; data: null; error: string };