import Message from '../models/Message.js';

export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      order: [['id', 'ASC']]
    });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim() === '') {
      const error = new Error('Treść wiadomości jest wymagana');
      error.statusCode = 400;
      throw error;
    }

    const message = await Message.create({ content: content.trim() });
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
      const error = new Error('Treść wiadomości jest wymagana');
      error.statusCode = 400;
      throw error;
    }

    const message = await Message.findByPk(id);
    
    if (!message) {
      const error = new Error('Wiadomość nie znaleziona');
      error.statusCode = 404;
      throw error;
    }

    message.content = content.trim();
    await message.save();
    
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const message = await Message.findByPk(id);
    
    if (!message) {
      const error = new Error('Wiadomość nie znaleziona');
      error.statusCode = 404;
      throw error;
    }

    await message.destroy();
    res.status(200).json({ message: 'Wiadomość usunięta' });
  } catch (error) {
    next(error);
  }
};