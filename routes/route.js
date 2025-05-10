const express = require('express')
const router = express.Router()

// controllers
const { register, login, changePassword } = require('../controllers/authController')
const { createJob, updateJob, deleteJob, getJobs, applyForJob } = require('../controllers/jobController')
const { manageJobStatus, manageUser, deleteUser } = require('../controllers/adminController')
const { users, updateProfile, ownProfile } = require('../controllers/userController')

// middleware
const verifyLogin = require('../middleware/verifyLogin')
const verifyFreelancer = require('../middleware/verifyFreelancer')
const verifyAdmin = require('../middleware/verifyAdmin')
const userVerify = require('../middleware/userVerify')

// auth routes
router.post('/register', register)
router.post('/login', login)
router.put('/change-pass', verifyLogin, changePassword)

//user routes
router.get('/get/users', verifyLogin, verifyAdmin, users)
router.put('/user/update', verifyLogin, updateProfile)
router.get('/user/profile', verifyLogin, ownProfile)

// job routes
router.post('/post-job', verifyLogin, userVerify, createJob)
router.put('/update-job/:id', verifyLogin, userVerify, updateJob)
router.delete('/delete-job/:id', verifyLogin,userVerify, deleteJob)
router.get('/get',verifyLogin, getJobs)
router.post('/job/apply/:id', verifyLogin, verifyFreelancer, applyForJob)

//admin routes
router.put('/job/status/:id', verifyLogin, verifyAdmin, manageJobStatus)
router.put('/user/status/:id', verifyLogin, verifyAdmin, manageUser)
router.delete('/user/delete/:id', verifyLogin, verifyAdmin, deleteUser)

module.exports = router
