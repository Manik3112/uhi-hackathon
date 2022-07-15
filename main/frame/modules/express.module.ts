import { Request, Response, Router } from 'express';

export type ExpressRequest = Request;

export type ExpressResponse = Response;

export type ExpressRouter = Router;

export const ExpressRouter = Router;

export type RestResponseType = {
  status: number,
  data: Record<string, any>,
}