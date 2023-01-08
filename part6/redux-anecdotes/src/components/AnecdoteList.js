import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(
      setNotification(
        `You voted "${
          anecdotes.find((anecdote) => anecdote.id === id).content
        }"`
      )
    );
    dispatch(voteAnecdote(id));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
