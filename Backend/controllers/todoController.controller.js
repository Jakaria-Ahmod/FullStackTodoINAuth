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

const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;

    const todo = await Todos.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title || todo.title;
    todo.text = text || todo.text;

    if (req.file) {
      todo.img = `/uploads/${req.file.filename}`;
    }

    await todo.save();
    res.json({
      message: 'Todo updated successfully!',
      todo: {
        ...todo._doc,
        image: todo.image ? `http://localhost:5000${todo.image}` : null,
      },
    });
  } catch (error) {
    res.json({ errror: error.message });
  }
};

const getAllTodoContrller = async (req, res) => {
  try {
    const AllTodo = await Todos.find();

    res.json(AllTodo);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletTodos = await Todos.findByIdAndDelete(id);

    if (!deletTodos) {
      return res.status(400).json({ message: 'todo is not found' });
    }

    res.json({ message: 'todos is delete' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const singleTodoController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'id is not send ' });
  }

  const singleTodo = await Todos.findOne({ _id: id });

  if (!singleTodo) {
    return res.status(400).json({ message: 'todos not found' });
  }

  res.status(203).json({ message: 'single tods featch', singleTodo });
};

module.exports = {
  createTodoContorller,
  updateTodoController,
  getAllTodoContrller,
  deleteTodoController,
  singleTodoController,
};
