export const initialStore=()=>{
  return{
    message: null,

    token: null,

    user: null
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "save_token":
      return {
        ...store,
        token: action.token,
      };
    case "save_user":
      return {
        ...store,
        user: action.user,
      };
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    default:
      throw Error("Unknown action.");
  }    
}
