import React from "react"
import './App.css';
import AppSearch from "./pages/AppSearch";
import HomePage from "./pages/HomePage";
import Tutorials from "./pages/Tutorials"
import User from "./pages/User";
import Sessions from "./pages/User/existing"
import Confirm from "./pages/User/confirm"
import NoMobile from "./components/NoMobile"
import Contact from "./pages/Contact"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Edit from "./pages/User/edit"
import { useMediaQuery } from "react-responsive"
import Registration from "./pages/Registration"


function App() {
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const [appsData, setAppsData] = React.useState([])
  React.useEffect(() => {
    fetch('./apps.json')
      .then(res => res.json())
      .then((data) => {
        setAppsData(data)
      })
  }, [])

  if(!isMobile)
    return <NoMobile />
  return (
    <div className="App">
      <div className="sub">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<AppSearch/>}/>
          <Route path="/tutorials" element={<Tutorials/>}/>
          <Route path="/session" element={<Tutorials/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/sessions" element={<Sessions/>}/>
          <Route path="/confirm" element={<Confirm/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
        </div>
    </div>
  );
}

export default App;
