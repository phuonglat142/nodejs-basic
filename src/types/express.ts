import type { Request } from "express";

export type TypedRequest<TBody = any, TParams = Record<string, string>> = Request<
    TParams,
    any,
    TBody
>;
