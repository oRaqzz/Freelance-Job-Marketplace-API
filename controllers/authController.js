const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//user model
const User = require('../models/userSchema')

//register
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        //check if user exists
        const checkUser = await User.findOne({ $or: [{ name }, { email }] })
        if (checkUser) {
            return res.status(201).json({ message: 'User already exists' }) 
        }

        //hash the password
        const salt = await bcrypt.genSalt(10) // FIX: await was missing
        const hashedPass = await bcrypt.hash(password, salt)

        //create user
        const newUser = new User({
            name,
            email,
            password: hashedPass,
            role: role || 'User'
        })

        //save in database
        await newUser.save()

        res.status(200).json({ message: 'User registered successfully' }) 
    } catch (e) {
        console.log(e)
        res.status(404).json({ message: 'Failed to register, please try again' }) 
    }
}

//login
const login = async (req, res) => {
    try {
        const { name, password } = req.body

        //check if user exists
        const checkUser = await User.findOne({ name })
        if (!checkUser) { 
            return res.status(400).json({ message: 'User does not exist' })
        }

        //see if the pass match
        const matchPass = await bcrypt.compare(password, checkUser.password) 
        if (!matchPass) {
            return res.status(400).json({ message: 'Password does not match' })
        }

        //create token
        const token = jwt.sign({
            userId: checkUser._id,
            name: checkUser.name,
            role: checkUser.role || 'User'
        }, process.env.JWT_KEY, { expiresIn: '120m' })

        res.status(200).json({ message: 'Logged in successfully!', token })
    } catch (e) {
        console.log(e)
        res.status(404).json({ message: 'Failed to login, please try again.' })
    }
}

//change password
const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId
        const { old_pass, new_pass } = req.body

        const checkUser = await User.findById(userId)
        if (!checkUser) {
            return res.status(404).json({ message: 'Could not find user' })
        }

        const matchPass = await bcrypt.compare(old_pass, checkUser.password)
        if (!matchPass) {
            return res.status(404).json({ message: 'Old password incorrect' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(new_pass, salt)

        checkUser.password = hashedPass
        await checkUser.save()

        res.status(200).json({ message: 'successfully changed password' })
    } catch (e) {
        console.log(e)
        res.status(404).json({ message: 'Failed to login, please try again.' })
    }
}


module.exports = { register, login, changePassword }
