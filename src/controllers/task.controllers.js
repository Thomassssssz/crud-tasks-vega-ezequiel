import { Task } from "../models/task.models.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }
    if (title.length > 100 || description.length > 100) {
      return res.status(400).json({ message: "Los campos no pueden superar 100 caracteres." });
    }

    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) {
      return res.status(400).json({ message: "El título ya está en uso." });
    }

    const task = await Task.create({ title, description, isComplete });
    res.status(201).json({ message: "Tarea creada.", task });
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea.", error: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas.", error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada." });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tarea.", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

    if (title && title !== task.title) {
      const existing = await Task.findOne({ where: { title } });
      if (existing) {
        return res.status(400).json({ message: "Ese título ya está en uso." });
      }
    }

    await task.update({ title, description, isComplete });
    res.status(200).json({ message: "Tarea actualizada.", task });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea.", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

    await task.destroy();
    res.status(200).json({ message: "Tarea eliminada." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea.", error: error.message });
  }
};
