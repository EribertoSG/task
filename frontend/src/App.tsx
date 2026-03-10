import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./App.css";

interface Task {
  id: number;
  done: boolean;
  name: string;
  description: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: unknown;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isCreating, setIsCreating] = useState(false);

  const [busyTaskId, setBusyTaskId] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const pendingCount = useMemo(
    () => tasks.filter((task) => !task.done).length,
    [tasks],
  );

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => Number(a.done) - Number(b.done)),
    [tasks],
  );

  const getErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : "Ocurrió un error inesperado.";

  const getTask = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("/tasks");
      const payload = (await response.json()) as ApiResponse<Task[]>;

      if (!response.ok || !payload.success) {
        throw new Error("No se pudieron cargar las tareas.");
      }

      setTasks(payload.data ?? []);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = newName.trim();
    const cleanDescription = newDescription.trim();

    if (!cleanName) return;

    setIsCreating(true);
    setErrorMessage("");
    try {
      const response = await fetch("/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          description: cleanDescription,
        }),
      });

      const payload = (await response.json()) as ApiResponse<Task>;
      if (!response.ok || !payload.success) {
        throw new Error("No se pudo crear la tarea.");
      }

      setTasks((prevTasks) => [payload.data, ...prevTasks]);
      setNewName("");
      setNewDescription("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsCreating(false);
    }
  };

  const startEditTask = (task: Task) => {
    if (task.done) return;

    setEditingId(task.id);
    setEditingName(task.name);
    setEditingDescription(task.description);
  };

  const cancelEditTask = () => {
    setEditingId(null);
    setEditingName("");
    setEditingDescription("");
  };

  const updateTask = async (taskId: number) => {
    if (!editingName.trim()) return;

    setBusyTaskId(taskId);
    setErrorMessage("");

    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingName.trim(),
          description: editingDescription.trim(),
        }),
      });
      const payload = (await response.json()) as ApiResponse<Task>;

      if (!response.ok || !payload.success) {
        throw new Error("No se pudo actualizar la tarea.");
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? payload.data : task)),
      );
      cancelEditTask();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setBusyTaskId(null);
    }
  };

  const completeTask = async (task: Task) => {
    if (task.done) return;

    setBusyTaskId(task.id);
    setErrorMessage("");

    try {
      const response = await fetch(`/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: true,
        }),
      });
      const payload = (await response.json()) as ApiResponse<Task>;

      if (!response.ok || !payload.success) {
        throw new Error("No se pudo completar la tarea.");
      }

      setTasks((prevTasks) =>
        prevTasks.map((item) => (item.id === task.id ? payload.data : item)),
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setBusyTaskId(null);
    }
  };

  const deleteTask = async (taskId: number) => {
    setBusyTaskId(taskId);
    setErrorMessage("");

    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as ApiResponse<Task>;

      if (!response.ok || !payload.success) {
        throw new Error("No se pudo eliminar la tarea.");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      if (editingId === taskId) {
        cancelEditTask();
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setBusyTaskId(null);
    }
  };

  useEffect(() => {
    void getTask();
  }, [getTask]);

  return (
    <main className="main">
      <h1>TODO</h1>
      <form className="form" onSubmit={createTask}>
        <div className="field">
          <input
            className="input"
            type="text"
            placeholder="Nombre de la tarea"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            disabled={isCreating}
            required
          />
        </div>
        <div className="field">
          <textarea
            className="input textarea"
            placeholder="Descripción (opcional)"
            value={newDescription}
            onChange={(event) => setNewDescription(event.target.value)}
            disabled={isCreating}
            rows={3}
          />
        </div>
        <button type="submit" disabled={isCreating || !newName.trim()}>
          {isCreating ? "Agregando..." : "Agregar tarea"}
        </button>
      </form>

      {errorMessage ? <p className="error">{errorMessage}</p> : null}

      <div className="item-container">
        <div className="state">
          <span>⏳ Pendientes {pendingCount}</span>
          <span>✅ Realizadas {tasks.length - pendingCount}</span>
          <button
            className="refresh"
            onClick={() => {
              void getTask();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Actualizando..." : "Actualizar lista"}
          </button>
        </div>

        {!isLoading && sortedTasks.length === 0 ? (
          <p className="empty">No hay tareas todavía.</p>
        ) : null}

        {sortedTasks.map((task) => {
          const isEditing = editingId === task.id;
          const isBusy = busyTaskId === task.id;

          return (
            <div
              key={task.id}
              className={`item ${task.done ? "item-done" : ""}`}
            >
              {isEditing ? (
                <>
                  <input
                    className="input"
                    type="text"
                    value={editingName}
                    onChange={(event) => setEditingName(event.target.value)}
                    disabled={isBusy}
                  />
                  <textarea
                    className="input textarea"
                    value={editingDescription}
                    onChange={(event) =>
                      setEditingDescription(event.target.value)
                    }
                    disabled={isBusy}
                    rows={3}
                  />
                  <div className="actions">
                    <button
                      onClick={() => {
                        void updateTask(task.id);
                      }}
                      disabled={isBusy || !editingName.trim()}
                    >
                      Guardar
                    </button>
                    <button onClick={cancelEditTask} disabled={isBusy}>
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h4 className={task.done ? "done-title" : ""}>{task.name}</h4>
                  <p className={task.done ? "done-description" : ""}>
                    {task.description || "Sin descripción"}
                  </p>
                  <div className="actions">
                    <button
                      onClick={() => {
                        void completeTask(task);
                      }}
                      disabled={task.done || isBusy}
                    >
                      {task.done ? "Completada" : "Completar"}
                    </button>
                    <button
                      onClick={() => startEditTask(task)}
                      disabled={task.done || isBusy}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        void deleteTask(task.id);
                      }}
                      disabled={isBusy}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
