import { addAnecdoteToList } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const submitAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.addAnecdoteToList(content);
    props.setNotificationWithTimeout(`You added "${content}"`, 5000);
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

const mapDispatchToProps = {
  addAnecdoteToList,
  setNotificationWithTimeout,
};

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default connectedAnecdoteForm;
