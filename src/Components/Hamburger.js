import React, { useState } from "react";
import { Link } from "react-router-dom";
import FindPoll from "../Pages/FindPoll";
import Home from "../Pages/Home";
import CreatePoll from "../Pages/CreatePoll";

const Hamburger = () => {
  //to change burger classes
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked")
  const [menuClass, setMenuClass] = useState("menu hidden")
  const [isMenuClicked, setIstMenuClicked] = useState(false)

  //toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked")
      setMenuClass("menu visible")
    }
    else {
      setBurgerClass("burger-bar unclicked")
      setMenuClass("menu hidden")
    }
    setIstMenuClicked(!isMenuClicked)
  }

  return (
    <div className="hamburger-nav">
      <h1>
        <Link className="h1-link menu-link-ham" to={`/`} element={<Home />}> Whatever Floats Your Vote </Link>
      </h1>
      <div className="burger-container">
        <nav className="burger-nav">
          <button className="burger-menu" onClick={updateMenu}>
            <div className={burgerClass}></div>
            <div className={burgerClass}></div>
            <div className={burgerClass}></div>
          </button>
        </nav>
        <div className={menuClass}>
          <Link className="menu-link" to={`/createpoll`} element={<CreatePoll />}> Create A Poll</Link>
          <Link className="menu-link" to={`/findpoll`} element={<FindPoll />}> Find A Poll</Link>
        </div>
      </div>
    </div>
  )
}

export default Hamburger;