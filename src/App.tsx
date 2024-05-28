import ParentLogin from "./components/ParentLogin/login"
import ParentSignup from "./components/Parent_SignUp/signup"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import routes from "./config/routes"

const App = () => {
  return (
    // change to HashRouter before deployment
    <BrowserRouter>
    <Navbar />
      <Routes>
        { routes.map((route: any, index: any) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.component />
            }
            />
        )) }
      </Routes>
  </BrowserRouter>
)
}
export default App