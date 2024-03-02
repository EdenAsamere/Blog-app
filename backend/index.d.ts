import { Request,Response } from "express";
export interface AuthenticatedRequest<TParams = any, TQuery = any, TBody = any> extends Request<TParams, TQuery, TBody> {
    userData: any;
  }
  