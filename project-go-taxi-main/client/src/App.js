import React from "react";
import { Route, Routes } from "react-router-dom";

import Edit from "./components/edit";
import Create from "./components/create";
import EmployeeList from "./components/employees";

const App = () => {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<EmployeeList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    );
   };
    
   export default App;