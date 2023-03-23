import { userModel } from './../models/user.model';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { config } from 'dotenv'

config()

@Controller('user')
export class UserController {


    //this is signup route
    @Post('signup')
    async signup(@Req() request: Request, @Res() response: Response) {
        try {
            const { firstName, lastName = '', email, password } = request.body;
            //if any input is epmty send throw error.
            if (!firstName || !email || !password)
                return response.status(206).send({ status: 'error', message: 'Please fill all the details!' })
            //if the user already exists throw error.
            let existingUser = await userModel.findOne({ email })
            if (existingUser)
                return response.status(206).send({ status: 'error', message: 'User already exists!' })

            // if all the above cases are not true then create the user data and store in DB.   
            const hash = await argon2.hash(password);
            const user = new userModel({ firstName, lastName, email, password: hash })
            await user.save()
            return response.status(201).send({ status: 'success', message: 'Signup successful!' })

        } catch (e) {
            return response.status(501).send({ status: 'error', message: e.message })
        }
    }


    //this is login route
    @Post('login')
    async login(@Req() request: Request, @Res() response: Response) {

        try {
            const { email, password } = request.body;
            //if any input is epmty send throw error.
            if (!email || !password)
                return response.status(206).send({ status: 'error', message: 'Please fill all the details!' });
            //check if user already exists
            const existingUser = await userModel.findOne({ email });
            if (!existingUser)
                return response.status(200).send({ status: 'error', message: 'Invalid email!' });
            //if user email is valid then match the hashed password
            if (await argon2.verify(existingUser.password, password)) {
                //if password matches create token and send it.
                const token = jwt.sign({
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    _id: existingUser._id,
                    email: existingUser.email
                }, process.env.TOKEN)
                return response.status(200).send({ status: 'success', message: 'Login successful!', token })
            } else {
                // password did not match
                return response.status(200).send({ status: 'error', message: 'Invalid password!' });
            }

        } catch (e) {
            return 'haba'
            // return response.status(501).send({ status: 'error', message: e })
        }

    }
}
