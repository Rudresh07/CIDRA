// // Frontend/pages/Home.js
// import React from "react";
// import { Link } from "react-router-dom";
// import Himg from "../images/day1.jpg";
// import i1 from "../images/assignment.jpg";
// import i2 from "../images/docs.jpg";
// import i3 from "../images/lecture.jpg";
// import i4 from "../images/profile.jpg";
// import i5 from "../images/lecture.jpg";
// import i6 from "../images/complaint.jpg";


// import "../cSS/home.css";

// function Home() {
//   return (
//     <div className="home-container">
//       <header>
//         <nav className="navbar">
//           <Link to="/login">Logout</Link>
//           <Link to="/about">About</Link>
//         </nav>
//       </header>
//       <div className="main-content">
//         <div className="img">
//           <img src={Himg} alt="Logo" />
//         </div>
//         <div className="cont">
//         <div className="navpg" style={{ backgroundImage: `url(${i4})` }}>
//             <Link to="/profile" className="option">
//               <span id = "opts">Profile</span>
//             </Link>
//           </div>
//           <div className="navpg" style={{ backgroundImage: `url(${i2})` }}>
//             <Link to="/notices" className="option">
//               <span id = "opts">Notices</span>
//             </Link>
//           </div>
//           <div className="navpg" style={{ backgroundImage: `url(${i3})` }}>
//             <Link to="/lectures" className="option">
             
//               <span id = "opts">Lectures</span>
//             </Link>
//           </div>
//           <div className="navpg" style={{ backgroundImage: `url(${i1})` }}>
//             <Link to="/assignments" className="option">
              
//               <span id = "opts">Assignments</span>
//             </Link>
//           </div>
//           <div className="navpg" style={{ backgroundImage: `url(${i2})` }}>
//             <Link to="/documents" className="option">

//               <span id = "opts">Documents</span>
//             </Link>
//           </div>
//           <div className="navpg" style={{ backgroundImage: `url(${i6})` }}>
//             <Link to="/complaints" className="option">
            
//               <span id = "opts">Complaints</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
