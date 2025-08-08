import express from "express";
import dotenv from "dotenv";
import { startDB } from './src/config/database.js';
import userRoutes from './src/routes/user.routes.js'; 
import taskRoutes from './src/routes/task.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


app.use((req, res) => {
  res.status(404).json({ errorMessage: "Ruta no encontrada." });
});


app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en ${PORT}`);
});
