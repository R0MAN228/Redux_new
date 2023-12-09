import { connect, useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../redux/user/selectors";
const Home = ({ user }) => {
  return (
    <div className="flex flex-col w-2/3 mx-auto">
      <h1 className="text-center mb-5">About</h1>
      <p>
        <span className="font-bold">email: </span>
        <span>{user.email}</span>
      </p>
      <p>
        <span className="font-bold">createdAt: </span>
        <span>
          {new Date(user.createdAt).toLocaleDateString("ru-Ru", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({ user: selectUserData(state) });
export default connect(mapStateToProps, null)(Home);
