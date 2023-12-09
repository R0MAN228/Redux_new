import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserId } from "../redux/user/selectors";
import { selectNotesData } from "../redux/notes/selectors";
import { deleteNotes } from "../redux/notes/action";
import { useEffect } from "react";
import { setNotes } from "../redux/notes/action";

const Notes = () => {
  const userId = useSelector(selectUserId);
  const notes = useSelector(selectNotesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNotes(userId));
  }, [dispatch, userId]);

  const handleDelete = (id) => {
    dispatch(deleteNotes(id, userId));
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-center mb-4">Notes</h1>

      <div className="text-center">
        <Link
          to="add"
          className="underline text-2xl mx-auto mb-4 text-green-500"
        >
          Добавить заметку
        </Link>
      </div>

      <ul className="flex flex-col gap-3 mt-4">
        {notes.map((note) => (
          <li
            className="border border-green-500 bg-green-100 rounded-xl p-3 flex justify-between items-center"
            key={note.id}
          >
            <Link className="flex-grow" to={`${note.id}`}>
              <strong className="text-lg break-all">{note.title}</strong>
              <span className="ml-2 text-xs text-gray-500">
                {new Date(note.createdAt).toLocaleDateString("ru-Ru", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </Link>
            <div className="text-lg">
              <Link
                to={`${note.id}/edit`}
                className="text-blue-500 mr-2 hover:underline"
              >
                ✍️
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;