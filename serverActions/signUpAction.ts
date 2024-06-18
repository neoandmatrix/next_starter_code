"use server"

import prisma from "@/database/prismaClient";
import  bcrypt  from "bcrypt"
import { NextResponse } from "next/server";
import { signUpInputValidation } from "@/utilities/validation/validationSchema";

export default async function signUpUser (formdata : FormData) {
    const firstName = formdata.get("first_name") as string;
    const lastName = formdata.get("last_name") as string;
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const confirmPassword = formdata.get("confirm_password") as string;

    const validInputs = signUpInputValidation.safeParse({
        email : email,
        password : password,
        confirmPassword : confirmPassword,
        firstName : firstName,
        lastName : lastName
    })

    if (validInputs) {
        try {

            const hashedPassword = await bcrypt.hash(password,10);
    
            const createdUser = await prisma.user.create({
                data : {
                    firstName :firstName,
                    lastName : lastName,
                    email : email,
                    password : hashedPassword
                }
            })
    
            if (createdUser) {
                NextResponse.json({
                    message : "user created"
                })
            }
        } catch (error) {
            console.log(error);
            return NextResponse.json({
                messsage : "can't sign up"
            },{
                status : 401
            })
        }
    } else {
        return NextResponse.json({
            message : "send the correct inputs"
        },
        {
            status : 404

        })
    }
}