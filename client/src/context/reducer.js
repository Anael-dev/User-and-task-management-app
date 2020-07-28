export const initialState = {
  users: [],
  filteredUsers: [],
  posts: [],
  todos: [],
  todosProgress: [],
  postsProgress: [],
  isLoading: true,
  isWelcome: true,
  snackBar: { open: false, massage: "" },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload,
      };
    case "FETCH_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "FETCH_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "FILTER_USERS":
      const input = action.payload;
      let filteredArr = [];
      let filteredResult;
      if (input) {
        const lowerInput = input.trim().toLowerCase();
        filteredArr = state.users.filter(
          (user) =>
            user.name.toLowerCase().trim().includes(lowerInput) ||
            user.email.toLowerCase().trim().includes(lowerInput)
        );
        if (filteredArr !== state.filteredUsers) {
          if (filteredArr.length > 0) {
            filteredResult = filteredArr;
          } else {
            filteredResult = [];
          }
        }
      } else {
        filteredResult = [...state.users];
      }
      return {
        ...state,
        filteredUsers: filteredResult,
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload._id),
        filteredUsers: state.users.filter(
          (user) => user._id !== action.payload._id
        ),
        todos: state.todos.filter((todo) => todo.userId !== action.payload.id),
        posts: state.posts.filter((post) => post.userId !== action.payload.id),
        todosProgress: state.todosProgress.filter(
          (item) => item.id !== action.payload.id
        ),
        postsProgress: state.postsProgress.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "ADD_USER":
      return {
        ...state,
        users: [action.payload, ...state.users],
        filteredUsers: [action.payload, ...state.users],
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case "ADD_TODOS_PROGRESS":
      const userTodo = action.payload;
      let mappedTodos;
      let foundUser = false;
      if (state.todosProgress.length > 0) {
        mappedTodos = state.todosProgress.map((x) => {
          if (x.id === userTodo.id) {
            foundUser = true;
            return { ...x, ...userTodo };
          } else {
            return x;
          }
        });
      }
      if (state.todosProgress.length === 0 || !foundUser) {
        mappedTodos = [...state.todosProgress, userTodo];
      }
      return {
        ...state,
        todosProgress: mappedTodos,
      };

    case "ADD_POSTS_PROGRESS":
      const userPost = action.payload;
      let mappedPosts;
      let foundUserPost = false;
      if (state.postsProgress.length > 0) {
        mappedPosts = state.postsProgress.map((x) => {
          if (x.id === userPost.id) {
            foundUserPost = true;
            return { ...x, ...userPost };
          } else {
            return x;
          }
        });
      }
      if (state.postsProgress.length === 0 || !foundUserPost) {
        mappedPosts = [...state.postsProgress, userPost];
      }
      return {
        ...state,
        postsProgress: mappedPosts,
      };
    case "EDIT_USER":
      const updatedUser = action.payload;
      const updatedUsers = state.users.map((user) => {
        if (user._id === updatedUser._id) {
          return updatedUser;
        }
        return user;
      });
      const updatedTodosProgress = state.todosProgress.map((user) => {
        if (user.id === updatedUser.id) {
          return { ...user, name: updatedUser.name };
        }
        return user;
      });
      const updatedPostsProgress = state.postsProgress.map((user) => {
        if (user.id === updatedUser.id) {
          return { ...user, name: updatedUser.name };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsers,
        filteredUsers: updatedUsers,
        todosProgress: updatedTodosProgress,
        postsProgress: updatedPostsProgress,
      };
    case "EDIT_POST":
      const updatedPost = action.payload;
      const updatedPosts = state.posts.map((post) => {
        if (post._id === updatedPost._id) {
          return updatedPost;
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts,
      };
    case "COMPLETE_TODO":
      const completedTodo = action.payload;
      const completedTodos = state.todos.map((todo) => {
        if (todo._id === completedTodo._id) {
          return completedTodo;
        }
        return todo;
      });

      return {
        ...state,
        todos: completedTodos,
      };
    case "DELETE_POST":
      const postUserId = action.payload.userId;
      let filteredPostsArr;
      const userPosts = state.postsProgress.find((x) => x.id === postUserId);
      userPosts.posts--;
      if (userPosts.posts === 0) {
        filteredPostsArr = state.postsProgress.filter(
          (item) => item.id !== postUserId
        );
      } else {
        filteredPostsArr = [...state.postsProgress];
      }
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
        postsProgress: filteredPostsArr,
      };
    case "DELETE_TODO":
      const todoUserId = action.payload.userId;
      let filteredTodosArr;
      const userProgress = state.todosProgress.find((x) => x.id === todoUserId);
      if (userProgress) {
        userProgress.todos--;
        if (userProgress.todos === 0) {
          filteredTodosArr = state.todosProgress.filter(
            (item) => item.id !== todoUserId
          );
        } else {
          filteredTodosArr = [...state.todosProgress];
        }
      }
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload._id),
        todosProgress: filteredTodosArr,
      };
    case "SHOW_LOADER":
      return {
        ...state,
        isLoading: true,
      };
    case "HIDE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "HIDE_WELCOME_SECTION":
      return {
        ...state,
        isWelcome: !action.payload,
      };
    case "SHOW_SNACK_BAR":
      return {
        ...state,
        snackBar: { open: true, massage: action.payload },
      };
    case "HIDE_SNACK_BAR":
      return {
        ...state,
        snackBar: { open: false, massage: "" },
      };
    default:
      return state;
  }
};
