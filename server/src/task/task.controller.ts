import { Controller, Delete, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { taskModel } from 'src/models/task.model';

@Controller('task')
export class TaskController {


    @Post('/getTask')
    async findAll(@Req() request: Request, @Res() response: Response) {
        try {
            const { sectionId } = request.body
            //getting all the tasks from task model using the sectionID
            const tasks = await taskModel.find({ sectionId })
            return response.status(200).send({ status: 'success', message: tasks })

        } catch (e) {
            return response.status(501).send({ status: 'error', message: e.message })
        }
    }

    @Post('/postTask')
    async postTask(@Req() request: Request, @Res() response: Response) {
        try {

            const { taskName, description, sectionId } = request.body

            //post all the task with keeping the reference of section
            const task = new taskModel({ taskName, description, sectionId })
            await task.save()

            return response.status(201).send({ status: 'success', message: 'Task created successfully!' })

        } catch (e) {
            return response.status(501).send({ status: 'error', message: e.message })
        }
    }

    @Delete('/:id')
    async deleteTask(@Req() request: Request, @Res() response: Response) {
        try {

            const { id } = request.params;
            //finding the task with the help of id and deleting it.
            await taskModel.findByIdAndDelete(id)
            return response.status(200).send({ status: 'success', message: 'Task deleted!' })

        } catch (e) {
            return response.status(501).send({ status: 'error', message: e.message })
        }
    }
}
