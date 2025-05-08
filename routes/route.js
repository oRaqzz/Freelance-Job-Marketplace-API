const express = require('express')
const router = express.Router()

// controllers
const { register, login, changePassword } = require('../controllers/authController')
const { createJob, updateJob, deleteJob, getJobs, applyForJob } = require('../controllers/jobController')
const { manageJobStatus, manageUser, deleteUser } = require('../controllers/adminController')
const { users, updateProfile, ownProfile } = require('../controllers/userController')

// middleware
const verifyUser = require('../middleware/verifyUser')
const verifyFreelancer = require('../middleware/verifyFreelancer')
const verifyAdmin = require('../middleware/verifyAdmin')
const userVerify = require('../middleware/userVerify')

// auth routes
router.post('/register', register)
router.post('/login', login)
router.put('/change-pass', verifyUser, changePassword)

//user routes
router.get('/get/users', verifyUser, verifyAdmin, users)
router.put('/user/update', verifyUser, updateProfile)
router.get('/user/profile', verifyUser, ownProfile)

// job routes
router.post('/post-job', verifyUser, userVerify, createJob)
router.put('/update-job/:id', verifyUser, userVerify, updateJob)
router.delete('/delete-job/:id', verifyUser,userVerify, deleteJob)
router.get('/get',verifyUser, getJobs)
router.post('/job/apply/:id', verifyUser, verifyFreelancer, applyForJob)

//admin routes
router.put('/job/status/:id', verifyUser, verifyAdmin, manageJobStatus)
router.put('/user/status/:id', verifyUser, verifyAdmin, manageUser)
router.delete('/user/delete/:id', verifyUser, verifyAdmin, deleteUser)

module.exports = router
