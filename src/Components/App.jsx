import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Table from "./Table";
import Main from "./Main";
import Edit from "./Edit";

const App = () => {
   return (
      <Router>
         <div className="app">
            <NavBar />
            <Routes>
               <Route path="/" element={<Main />} />
               <Route path="/table" element={<Table />} />
               <Route path="/edit/:id" element={<Edit />} />
            </Routes>
         </div>
      </Router>
   );
};

export default App;
