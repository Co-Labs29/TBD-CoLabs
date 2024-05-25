import ChildSignUp from "./components/ChildSignUp/ChildSignUp"
import ParentLogin from "./components/ParentLogin/login"
import ParentSignup from "./components/Parent_SignUp/signup"

const App = () => {
  return (
    <div>
      <ParentLogin />
      <ChildSignUp />
    </div>
  )
}
export default App