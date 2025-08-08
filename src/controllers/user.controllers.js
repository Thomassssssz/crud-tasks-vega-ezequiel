

import { User } from "../models/user.models.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }


    if (name.length > 100 || email.length > 100 || password.length > 100) {
      return res.status(400).json({ message: "Los campos no deben superar los 100 caracteres." });
    }


    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ message: "El email ya está registrado." });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: "Usuario creado correctamente", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario.", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios.", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado." });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario.", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

    if (email && email !== user.email) {
      const emailUsed = await User.findOne({ where: { email } });
      if (emailUsed) return res.status(400).json({ message: "El email ya está en uso." });
    }

    await user.update({ name, email, password });
    res.status(200).json({ message: "Usuario actualizado.", user });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario.", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario.", error: error.message });
  }
};
