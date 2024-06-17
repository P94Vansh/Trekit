import { NextResponse } from 'next/server';
import { connectDB } from '@/app/libs/mongodbconnect';
var CryptoJS = require("crypto-js");
import User from '@/app/models/User';
var jwt = require('jsonwebtoken');
export async function POST(request) {
    try {
        // Connect to the database
        await connectDB();
        // Parse the request body
        const requestBodyText = await request.text();
        const userData = JSON.parse(requestBodyText);
        console.log(userData);
        const user = await User.findOne({ "email": userData.email });
        const bytes=CryptoJS.AES.decrypt(user.password, 'secret123')
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (user && userData.email === user.email && originalText==userData.password) {
            // Prepare the success response data
            const responseData = { message: "You are Now Logged In"};

            // Return a JSON response with status code 200
            var token = jwt.sign({message: "You are Now Logged In",email:user.email,name:user.name}, 'jwtsecret',{expiresIn:"2d"});
            return NextResponse.json({responseData,token, status: 200 });
        } else {
            // Invalid credentials
            const errorMessage = 'Please enter valid credentials';
            return NextResponse.json({ error: errorMessage }, { status: 401 });
        }
    } catch (error) {
        // Handle errors
        console.error('Error:', error);

        // Return an error response with status code 500
        const errorMessage = 'An error occurred while processing the request';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
