import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../redux/notes/action";
import { selectUserId } from "../redux/user/selectors";
import { selectNotesError } from "../redux/notes/selectors";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddNote = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const error = useSelector(selectNotesError);
  const [form, setForm] = useState({ title: "", text: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      dispatch({
        type: "SET/NOTES/ERROR",
        payload: new Error("Please fill in this field"),
      });
      return;
    }
    dispatch(addNote({ ...form, createdAt: Date.now(), userId }));
    navigate("/notes");
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <Link to=".." className="underline">
        Back
      </Link>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h1 className="text-center">Add Note</h1>
        <input
          type="text"
          className="border border-black p-2"
          name="title"
          defaultValue={form.title}
          onChange={handleChange}
          placeholder="Title"
        />
        {error?.message && <div className="text-red-500">{error?.message}</div>}
        <textarea
          className="border border-black resize-none h-[55vh] p-1"
          name="text"
          defaultValue={form.text}
          onChange={handleChange}
          placeholder="Text"
        />
        <button className="border p-1 mx-auto border-black rounded-sm bg-green-500 text-white my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;