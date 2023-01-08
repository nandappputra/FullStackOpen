import { addAnecdoteToList } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(addAnecdoteToList(content));
    dispatch(setNotification(`You added "${content}"`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
