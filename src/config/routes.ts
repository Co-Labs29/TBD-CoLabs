import ParentSignup from "../components/Parent_SignUp/signup";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Landing from "../pages/Landing";

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string
}

const routes: RouteType[] = [
    {
        path: "/",
        component: Landing,
        name: "Landing page"
    },
    {
        path:"/parentSignup",
        component: ParentSignup,
        name: "Parent Signup"
    },
    {
        path:"/Login",
        component: Login,
        name: "Login"
    },
    {
        path:"/Dashboard",
        component: Dashboard,
        name: "Dashboard"
    }
];

export default routes

