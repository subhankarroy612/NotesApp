import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('task')
export class TaskController {

    @Post()
    async findAll(@Req() request: Request, @Res() response: Response) {
        try {

            const { verify } = request.body
            return verify

        } catch (e) {
            return response.status(501).send({ status: 'error', message: e.message })
        }
    }
}
