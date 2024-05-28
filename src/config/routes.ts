import ParentSignup from "../components/Parent_SignUp/signup";
import ParentLogin from "../components/ParentLogin/login";

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
        path:"/parentLogin",
        component: ParentLogin,
        name: "Parent Login"
    }
];

export default routes

