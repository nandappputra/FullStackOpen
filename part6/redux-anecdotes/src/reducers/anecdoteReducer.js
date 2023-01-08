const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      return [
        ...state.map((anecdote) =>
          anecdote.id === action.data.id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        ),
      ].sort((a, b) => b.votes - a.votes);

    case "NEW":
      return state.concat(action.data);

    case "SET":
      return action.data;

    default:
      return state;
  }
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const addAnecdote = (content) => {
  return {
    type: "NEW",
    data: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export const setAnecdote = (anecdotes) => {
  return {
    type: "NEW",
    data: anecdotes,
  };
};

export default anecdoteReducer;
