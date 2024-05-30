import ParentSignup from "../components/Parent_SignUp/signup";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import ChildSignUp from "../components/ChildSignUp/ChildSignUp";

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string
}

const routes: RouteType[] = [
    {
        path: "/",
        component: LandingPage,
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
    },
    {
        path:'/childSignUp',
        component: ChildSignUp,
        name: "child Sign up"
    }
];

export default routes

