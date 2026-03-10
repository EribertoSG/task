import pool from "../config/psql";

// Interfaz completa (como viene de la base de datos)
export interface Task {
  id: number;
  name: string;
  description: string;
  done: boolean;
}

// Para crear (el id y el done son autogenerados/por defecto)
export interface CreateTaskDTO {
  name: string;
  description: string;
}

// Para actualizar (todos pueden ser opcionales)
export interface UpdateTaskDTO {
  name?: string;
  description?: string;
  done?: boolean;
}

export default class Model {
  static async getAllTask() {
    const result = await pool.query("SELECT * FROM tasks");
    return result.rows;
  }

  static async createTask(data: CreateTaskDTO) {
    const result = await pool.query(
      "INSERT INTO tasks (name, description) VALUES($1, $2) RETURNING *",
      [data.name, data.description],
    );
    return result.rows[0];
  }

  static async updateTask(id: number, data: UpdateTaskDTO) {
    // Para actualizar solo los campos que vienen en el body dinámicamente
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(data.description);
    }
    if (data.done !== undefined) {
      fields.push(`done = $${paramIndex++}`);
      values.push(data.done);
    }

    // Si no enviaron nada para actualizar, detenemos la ejecución o retornamos
    if (fields.length === 0) return null;

    const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async deleteTask(id: number) {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  }
}
