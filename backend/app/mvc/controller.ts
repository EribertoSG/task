import type { Request, Response } from "express";
import Model from "./model";

export default class Controller {
  private static getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return "Internal Server Error";
  }

  private static handleError(res: Response, error: unknown) {
    console.error("[API ERROR]", error);
    return res.status(500).json({
      success: false,
      message: Controller.getErrorMessage(error),
    });
  }

  static async getAllTask(req: Request, res: Response) {
    try {
      const data = await Model.getAllTask();

      return res.status(200).json({ data, success: true });
    } catch (error) {
      return Controller.handleError(res, error);
    }
  }

  static async createTask(req: Request, res: Response) {
    const { name, description } = req.body ?? {};
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "El campo 'name' es obligatorio.",
      });
    }

    try {
      const data = await Model.createTask({
        name: name.trim(),
        description: typeof description === "string" ? description.trim() : "",
      });
      return res.status(201).json({ data, success: true });
    } catch (error) {
      return Controller.handleError(res, error);
    }
  }

  static async updateTask(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido.",
      });
    }

    try {
      const data = await Model.updateTask(id, req.body);
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Tarea no encontrada o sin campos para actualizar.",
        });
      }
      return res.status(200).json({ data, success: true });
    } catch (error) {
      return Controller.handleError(res, error);
    }
  }

  static async deleteTask(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido.",
      });
    }

    try {
      const data = await Model.deleteTask(id);
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Tarea no encontrada.",
        });
      }
      return res.status(200).json({ data, success: true });
    } catch (error) {
      return Controller.handleError(res, error);
    }
  }
}
