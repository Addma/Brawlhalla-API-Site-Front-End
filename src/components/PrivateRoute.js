import { AuthContext } from "../context/AuthContext";

const { useContext } = require("react");
const { Navigate } = require("react-router-dom");

const PrivateRoute = (props) => {
    const {isAuthenticated, loading} = useContext(AuthContext);
    if (loading) {
        return <div>Loading...</div>
    }
    return isAuthenticated ? props : <Navigate to="/"/>;
}
export default PrivateRoute