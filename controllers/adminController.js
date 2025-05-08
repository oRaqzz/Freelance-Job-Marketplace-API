const express = require('express');
const Job = require('../models/jobSchema');
const User = require('../models/userSchema');

// Manage job status 
const manageJobStatus = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { title, description, status } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job does not exist' });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.status = status || job.status;

    await job.save();

    res.status(200).json({ message: 'Job updated successfully', job });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Manage user role
const manageUser = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    user.role = role || user.role;
    await user.save();

    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Delete user 
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { manageJobStatus, manageUser, deleteUser };
