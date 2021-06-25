import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receive token
  const authToken = request.headers.authorization;

  // Validate if token is filled
  if (!authToken) {
    return response.status(401).end();
  }

  const token = authToken.split(' ')[1];

  // Validate if token is valid
  try {
    const { sub } = verify(
      token,
      '692400fde9ecd5621561277af1867846'
    ) as IPayload;

    // Recuperar informações do usuário
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
