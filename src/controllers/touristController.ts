import express from "express";
import { Request, Response } from "express";
import touristModel from "../models/touristSchema";
import { ITourists } from "../models/touristSchema"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const registerTourist = async (req: Request, res: Response) => {
    try {
        const { name, email, password, country, gender, type, status, date} = req.body;
        if(!name || !email || !password || !country || !gender) {
            return res.status(400).json({
                message: "all fields are required"
            });
        }

        const existingUser = await touristModel.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                message: "The user already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new touristModel(
            {
                name, 
            email,
            password: hashedPassword,
            country,
            gender,
            type,
            status,
            date
            }
        );
        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            newUser
        })


    } catch (error : any) {
        console.log("Failed to register tourist, Server error", error);
        return res.status(500).json({
            message: "Failed to register Tourist, Server error",
            error: error.message
        })
    }
}

export const getTourist = async (req: Request, res: Response) => {
    try {
        const tourist = await touristModel.find();
        if(!tourist) {
            return res.status(404).json({
                message: "tourist are not found"
            });
        }

        return res.status(200).json({
            message: "Successully get data",
            tourist
        })

    } catch (error : any) {
        console.log("Failed to get tourist, Server error", error);
        return res.status(500).json({
            message: "Failed to get Tourist, Server Error",
            error: error.message
        })
    }
}

