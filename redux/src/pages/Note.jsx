import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNotesData } from "../redux/notes/selectors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectUserId } from "../redux/user/selectors";
import { deleteNotes } from "../redux/notes/action";

const Note = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const notes = useSelector(selectNotesData);
  const userId = useSelector(selectUserId);
  const [note, setNote] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedNote = notes.find((x) => x.id === +id);
    if (!selectedNote) navigate("/notes");
    setNote(selectedNote);
  }, [notes, id]);

  const handleDelete = (id) => {
    dispatch(deleteNotes(id, userId));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Link to=".." className="text-blue-500 hover:underline">
          Back
        </Link>
        <div>
          <Link to="edit" className="text-blue-500 hover:underline mr-2">
            ✍️
          </Link>
          <button
            onClick={() => handleDelete(note.id)}
            className="text-red-500 hover:text-red-700"
          >
            🗑
          </button>
        </div>
      </div>
      <h1 className="text-center text-2xl mb-4">{note?.title}</h1>
      <div className="text-lg">{note?.text}</div>
    </div>
  );
};

export default Note;