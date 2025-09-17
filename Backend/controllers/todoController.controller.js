const Todos = require('../models/todos.model');
const User = require('../models/Users.model');
const createTodoContorller = async (req, res) => {
  try {
    const { text, title } = req.body;

    const todos = await Todos({
      text,
      title,
      userId: req.user.id,
      img: req.file ? req.file.path : null,
    });
    // console.log(req.title);

    await todos.save();

    const user = await User.findById(req.user.id).select('-password');

    res.json({
      success: true,
      message: 'Todos create sucessfully',
      user,
      todos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTodoContorller };
