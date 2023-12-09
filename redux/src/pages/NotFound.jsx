import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <div className="text-center">
      <div className="text-5xl font-bold">Not found</div>
      <Link to=".." className="underline mt-4 text-2xl">
        Back
      </Link>
    </div>
  );
};
