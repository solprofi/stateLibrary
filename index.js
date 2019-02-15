// LIBRARY CODE
const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}

// CONSTANTS

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

//ACTION CREATORS

const addTodo = todo => ({
  type: ADD_TODO,
  todo,
})

const removeTodo = id => ({
  type: REMOVE_TODO,
  id
})

const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
})

const addGoal = goal => ({
  type: ADD_GOAL,
  goal,
})

const removeGoal = id => ({
  type: REMOVE_GOAL,
  id
})


// REDUCERS
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
}

const goalsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat(action.goal);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}


//COMBINED REDUCERS
const rootReducer = (state = {}, action) => {
  return {
    todos: todosReducer(state.todos, action),
    goals: goalsReducer(state.goals, action),
  }
}