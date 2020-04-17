const User = require('./../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { name } = req.body;
    const findUser = await User.find({ name });
    let user;

    if (findUser) {
      user = await User.findOneAndUpdate(
        { name },
        { loggedInAt: Date.now(), active: true },
        { new: true }
      );
      console.log('Existing user. Logging in...');
    } else {
      user = await User.create({ name });
      console.log('Not found this user, Created new user and logging in...');
    }

    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { name } = req.body;

    const user = await User.findOneAndUpdate({ name }, { active: false });

    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'Not found this user with that name.',
      });
      throw new Error('Not found this user with that name.');
    }

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.findOneAndDelete({ name });

    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'Not found this user with that name.',
      });
      throw new Error('Not found this user with that name.');
    }

    res.status(204).json();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};
