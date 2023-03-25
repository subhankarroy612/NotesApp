import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.headers;

            //if token is not present throw error.
            if (!token)
                return res.status(400).send({ status: 'error', message: 'Please provide token!' });
            //verify token if available and store it in body object with a key verify.
            let verify = jwt.verify(token, process.env.TOKEN);
            req.body = { ...req.body, verify }
            next()

        } catch (e) {
            console.log(e.message);
            return res.status(501).send({ status: 'error', message: e.message })
        }
    }
}

