// // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }

// // // export default App;


// // import { useEffect } from "react";
// // import axios from "axios";

// // // 👇 YAHI SE AUTH CHECK HOGA
// // function App() {

// //   useEffect(() => {
// //     axios
// //       .get(
// //         "https://zerodha-backend.onrender.com/api/auth/check",
// //         { withCredentials: true }
// //       )
// //       .catch(() => {
// //         // ❌ login nahi hai → frontend login page
// //         window.location.href =
// //           "https://your-frontend.vercel.app/login";
// //       });
// //   }, []);

// //   return (
// //     <div>
// //       {/* ✅ Yaha tumhara pura dashboard UI aayega */}
// //     </div>
// //   );
// // }

// // export default App;


// import { useEffect } from "react";
// import axios from "axios";

// function App() {
//   useEffect(() => {
//     // 🔥 URL se demo flag nikalo
//     const params = new URLSearchParams(window.location.search);
//     const isDemo = params.get("demo");

//     // ✅ Demo mode → auth check SKIP
//     if (isDemo === "true") {
//       console.log("Demo mode: auth check skipped");
//       return;
//     }

//     // ✅ Real user → auth check
//     axios
//       .get(
//         "https://zerodha-backend.onrender.com/api/auth/check",
//         { withCredentials: true }
//       )
//       .catch(() => {
//         window.location.href =
//           "https://your-frontend.vercel.app/login";
//       });
//   }, []);

//   return (
//     <div>
//       {/* 🔥 YAHAN TUMHARA PURA DASHBOARD UI */}
//     </div>
//   );
// }

// export default App;


function App() {
  return (
    <div>
      {/* dashboard UI */}
    </div>
  );
}

export default App;
