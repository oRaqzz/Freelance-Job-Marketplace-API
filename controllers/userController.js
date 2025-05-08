const User = require('../models/userSchema')

// Get all users (admin only)
const users = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({ data: users })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Failed to fetch users' })
  }
};

// Update own profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { name, email } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' })
    }

    user.name = name || user.name
    user.email = email || user.email

    await user.save()

    res.status(200).json({ message: 'Profile updated successfully', user })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Something went wrong while updating profile' })
  }
};

// Get own profile
const ownProfile = async (req, res) => {
  try {
    const userId = req.userInfo.userId
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ data: user })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Failed to retrieve profile' })
  }
};

module.exports = { users, updateProfile, ownProfile }
