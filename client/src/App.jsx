import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Header from "./components/Header";
import PrivateRoute from "./pages/PrivateRoute";
import CreateListing from "./pages/createListing";
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/> }/>
      <Route path="/about" element= {<About/> }/>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/create-listing" element={<CreateListing/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
