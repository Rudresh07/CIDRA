// Frontend/pages/Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Himg1 from "../images/day1.jpg";
import Himg2 from "../images/day2.jpg";
import Himg3 from "../images/day3.jpg";
import Himg4 from "../images/day4.jpeg";

import { BsFillPersonFill,BsPin,
  BsPen,BsFiletypeDoc,BsPersonCircle
  } from "react-icons/bs";

import {ImPushpin} from "react-icons/im"
import { FaRegUser } from "react-icons/fa";
import {TbBrandGoogleBigQuery} from "react-icons/tb"
import {PiChalkboardTeacherFill,PiChalkboardTeacherLight} from "react-icons/pi"
import { FiUsers } from "react-icons/fi";
import { LuUserCircle2 } from "react-icons/lu";

import "../cSS/home.css";

function Home() {

  const [currentImage, setCurrentImage] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  const images = [Himg1, Himg2, Himg3, Himg4];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setFadeClass("fade-in");
      }, 500); // Change image after 1s
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);



  return (
    <div className="home-container">
      <header>
        <nav className="navbar">
          <Link to="/login">Logout</Link>
          <Link to="https://www.iiitbh.ac.in/">About</Link>
        </nav>
      </header>
      <div className="main-content">
        {/* <div className="img">
          <img src={Himg} alt="Logo" />
        </div> */}
        <h1 style={{ textAlign: 'center', color: '#0c356a' }}>Admin Interface</h1>
        <div className="cont">
          <div className="navpg">
            <Link to="/profiles" className="option">
              <LuUserCircle2 size={70} />
              <span id="opts">Profile</span>
            </Link>
          </div>
          <div className="navpg">
            <Link to="/users" className="option">
              <FiUsers size={70} />
              <span id="opts">Users</span>
            </Link>
          </div>
          <div className="navpg">
            <Link to="/notices" className="option">
              <BsPin size={70} />
              <span id="opts">Notices</span>
            </Link>
          </div>
          <div className="navpg">
            <Link to="/lectures" className="option">
              <PiChalkboardTeacherLight size={90} style={{ margin: '-10px' }} />
              <span id="opts">Lectures</span>
            </Link>
          </div>
          <div className="navpg">
            <Link to="/assignments" className="option">
              <BsPen size={60} />
              <span id="opts">Assignments</span>
            </Link>
          </div>
          <div className="navpg">
            <Link to="/documents" className="option">
              <BsFiletypeDoc size={70} />
              <span id="opts">Documents</span>
            </Link>
          </div>
          <div className="navpg">
            <Link to="/complaints" className="option">
              <TbBrandGoogleBigQuery size={70} />
              <span id="opts">Complaints</span>
            </Link>
          </div>
        </div>
        <div className="cont2">
          <div className="imgroll">
          <img
            id="iroll"
            className={`fade ${fadeClass}`}
            src={images[currentImage]}
            alt="Slideshow"
          />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
