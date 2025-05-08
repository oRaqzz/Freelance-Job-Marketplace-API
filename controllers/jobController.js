const express = require('express');
const Job = require('../models/jobSchema');
const Application = require('../models/applicationSchema');

// Create job
const createJob = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        const { title, description, client, status, createdAt } = req.body;

        const newJob = new Job({
            title,
            description,
            client: client || userId,
            status: status || 'pending',
            createdAt
        });

        await newJob.save();

        res.status(200).json({ message: 'Job created successfully', job: newJob });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Failed to upload' });
    }
}

// Update job
const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.userInfo.userId;

        const { title, description, status } = req.body

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job does not exist' })
        }

        if (job.client.toString() !== userId) {
            return res.status(403).json({ message: 'You cannot update this post' })
        }

        job.title = title || job.title
        job.description = description || job.description
        job.status = status || job.status

        await job.save();

        res.status(200).json({ message: 'Job updated successfully', job })

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Failed to update job' })
    }
}

// Delete job
const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id
        const userId = req.userInfo.userId

        const findJob = await Job.findById(jobId)
        if (!findJob) {
            return res.status(404).json({ message: 'Could not find job' })
        }

        if (findJob.client.toString() !== userId) {
            return res.status(403).json({ message: 'You cannot delete this post' })
        }

        console.log('userId:', userId);
        console.log('job client:', findJob.client)

        await Job.findByIdAndDelete(jobId)
        res.status(200).json({ message: 'Deleted job successfully' })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Failed to delete job' })
    }
}

// Get all jobs
const getJobs = async (req, res) => {
    try {
        const allJobs = await Job.find({})
        res.status(200).json({ data: allJobs })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Failed to get jobs' })
    }
}

// Apply for job
const applyForJob = async (req, res) => {
    try {
        const jobId = req.params.id
        const userId = req.userInfo.userId
        const { coverletter } = req.body

        // Check if job exists
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(400).json({ message: 'Job does not exist' })
        }

        // Prevent duplicate applications
        const existingApp = await Application.findOne({ job: jobId, freelancer: userId })
        if (existingApp) {
            return res.status(400).json({ message: 'You already applied for this job' })
        }

        // Create the application
        const newApplication = new Application({
            job: jobId,
            freelancer: userId,
            coverletter,
            status: 'pending',
            appliedAt: new Date()
        });

        await newApplication.save()

        res.status(201).json({ message: 'Applied successfully', application: newApplication })

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Failed to apply for job' })
    }
}

 /* // get job applications
const getJobApplications = async (req, res) => {
    try{
        const userId = req.userInfo.userId
        const jobId = req.params.id

        const job = await Job.findById(jobId)
        if(!job) {
            res.status(401).json({message : 'Job does not exist'})
        }

    }catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Failed to apply for job' })
    }
} */

module.exports = { createJob, updateJob, deleteJob, getJobs, applyForJob }
