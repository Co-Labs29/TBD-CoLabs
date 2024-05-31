
import { BrowserRouter, Routes, Route } from "react-router-dom"
import routes from "./config/routes"



const App = () => {
  return (
    // change to HashRouter before deployment
    <BrowserRouter>
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