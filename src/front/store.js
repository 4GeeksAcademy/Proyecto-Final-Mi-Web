// Estado inicial
export const initialStore = () => {
  return {
    message: null,  // Mensaje de estado general (si lo necesitas)
    token: localStorage.getItem("token") || null,    // Token de autenticación
    user: null,     // Información del usuario
    todos: [],      // Tareas (si en algún momento las implementas)
  };
};

// Reducer para manejar las acciones del estado global
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "save_token":
      return {
        ...store,
        token: action.token,  // Guardamos el token cuando el usuario se autentica
      };

    case "save_user":
      return {
        ...store,
        user: action.user,    // Guardamos la información del usuario (tras login o signup)
      };

    case "set_hello":
      return {
        ...store,
        message: action.payload,  // Guardamos un mensaje general (opcional)
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),  // Actualizamos el color de la tarea con el id específico
      };

    // Si agregas más acciones en el futuro, puedes seguir expandiendo aquí.
    default:
      throw Error("Unknown action.");
  }
}
