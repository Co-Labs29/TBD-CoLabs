import ParentSignup from "../components/Parent_SignUp/signup";
import Login from "../components/Login";

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string
}

const routes: RouteType[] = [
    {
        path:"/parentSignup",
        component: ParentSignup,
        name: "Parent Signup"
    },
    {
        path:"/Login",
        component: Login,
        name: "Login"
    }
];

export default routes

