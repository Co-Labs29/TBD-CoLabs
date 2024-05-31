
import {Routes, Route, HashRouter} from "react-router-dom"
import routes from "./config/routes"



const App = () => {
  return (
    // change to HashRouter before deployment
    <HashRouter>
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
  </HashRouter>
)
}
export default App