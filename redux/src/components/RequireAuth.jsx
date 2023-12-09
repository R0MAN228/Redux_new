import { connect } from "react-redux";
import { selectUserId, selectUserLoading } from "../redux/user/selectors";
import { Navigate } from "react-router-dom";
const RequireAuth = ({ id, loading, children }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!id) return <Navigate to="login" replace />;
  return children;
};

const mapStateToProps = (state) => ({
  id: selectUserId(state),
  loading: selectUserLoading(state),
});

export default connect(mapStateToProps, null)(RequireAuth);
