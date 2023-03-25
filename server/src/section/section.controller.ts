import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { sectionModel } from '../models/section.model'

@Controller('section')
export class SectionController {

    @Get()
    async findAll(@Req() request: Request, @Res() response: Response) {
        try {
            const { verify } = request.body;
            let data = await sectionModel.find({ userId: verify._id })
            return response.status(200).send({ status: 'success', message: data })

        } catch (e) {
            return response.status(501).send({ status: 'error', message: e.message })
        }

    }

    @Post()
    async postSection(@Req() request: Request, @Res() response: Response) {
        try {
            //verify has the user details inside it.
            const { verify, sectionName } = request.body;

            // create the section using the model and save in DB
            const section = new sectionModel({ sectionName, userId: verify._id })
            await section.save()

            return response.status(201).send({ status: 'success', message: 'Section created!' })

        } catch (e) {
            console.log(e.message);
            return response.status(501).send({ status: 'error', message: e.message })
        }
    }
}
