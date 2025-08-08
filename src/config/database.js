import { Sequelize } from "sequelize";
import dotenv from  "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

export default sequelize;

export const startDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión con la base de datos establecida");
        await sequelize.sync();
    } catch (error) {
        console.log("Error al intentar establecer conexión con la base de datos", error.message);
    }
};
