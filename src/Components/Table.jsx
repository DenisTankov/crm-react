import { useState, createContext } from "react";
import TableRequests from "./TableRequests";
import TableLeftPanel from "./TableLeftPanel";
import TableTopStatusBar from "./TableTopStatusBar";

export const appContext = createContext(null);

const Table = () => {
   //данные с сервера
   const [data, setData] = useState(null);
   //флаг для useEffect
   const [fetchData, setFetchData] = useState(true);

   const saveToLS = (filter, value) => {
      localStorage.setItem(filter, JSON.stringify(value));
   };

   function loadFromLS(filter) {
      const data = localStorage.getItem(filter);
      if (data) return JSON.parse(data);
      else return null;
   }

   //statuses
   const [statusAll, setStatusAll] = useState(false);
   const [statusNew, setStatusNew] = useState(false);
   const [statusInWorking, setStatusInWorking] = useState(false);
   const [statusComplete, setStatusComplete] = useState(false);

   return (
      <appContext.Provider value={{ data, setData, fetchData, setFetchData, saveToLS, loadFromLS, statusAll, setStatusAll, statusNew, setStatusNew, statusInWorking, setStatusInWorking, statusComplete, setStatusComplete }}>
         <div className="with-nav body--dashboard">
            <TableLeftPanel />
            <div className="main-wrapper">
               <div className="container-fluid">
                  <div className="admin-heading-1">Все заявки</div>
                  <TableTopStatusBar />
                  <TableRequests />
               </div>
            </div>
         </div>
      </appContext.Provider>
   );
};

export default Table;
