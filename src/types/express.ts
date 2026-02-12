import type { Request } from "express";

export type RequestBody<T> = Request<any, any, T>;
