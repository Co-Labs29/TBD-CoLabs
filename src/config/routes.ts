import ParentSignup from "../components/Parent_SignUp/signup";
import ParentLogin from "../components/ParentLogin/login";
import landingPage from "../components/LandingPage/landingPage";

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
    },
    {
        path:"/",
        component: landingPage,
        name: "Landing Page"
    }
];

export default routes

