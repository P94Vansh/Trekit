import { NextResponse } from 'next/server';
import { connectDB } from '@/app/libs/mongodbconnect';
var CryptoJS = require("crypto-js");
import User from '@/app/models/User';

export async function POST(request) {
    try {
        // Connect to the database
        await connectDB();

        // Parse the request body
        const requestBodyText = await request.text();
        const userData = JSON.parse(requestBodyText);

        // Create a new user instance
        const {name,email}=userData
        const newUser = new User({name,email,password:CryptoJS.AES.encrypt(userData.password,"secret123").toString()});

        // Save the user to the database
        await newUser.save();

        // Prepare the success response data
        const responseData = { message: "User created successfully" };

        // Return a JSON response with status code 200
        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);

        // Return an error response with status code 500
        const errorMessage = 'An error occurred while processing the request';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
