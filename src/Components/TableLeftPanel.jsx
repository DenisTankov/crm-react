import { useEffect, useState, useContext } from "react";
import { appContext } from "./Table";
import serverPath from "../serverPath";

const TableLeftPanel = () => {
   const { setFetchData, saveToLS, loadFromLS, statusAll, setStatusAll, statusNew, setStatusNew, statusInWorking, setStatusInWorking, statusComplete, setStatusComplete } = useContext(appContext);

   const [badgeNew, setBadgeNew] = useState(null);

   useEffect(() => {
      fetch(serverPath + "requests")
         .then((res) => res.json())
         .then((data) => {
            setBadgeNew(data.filter((request) => request.status === "new").length);
         });
   }, []);

   return (
      <div className="left-panel blue-skin">
         <div className="left-panel__logo">
            <div className="left-panel__logo-title">CRM заявки</div>
         </div>

         <div className="left-panel__user clearfix">
            <div className="left-panel__user-photo">
               <img src="avatar.jpg" alt="Avatar" />
            </div>
            <div className="left-panel__user-name">
               Денис <br />
               Таньков
            </div>
         </div>

         <div className="left-panel__navigation">
            <div className="left-panel__navigation-title">Заявки</div>
            <ul>
               <li>
                  <a
                     onClick={(e) => {
                        saveToLS("status", e.target.getAttribute("data-value"));
                        setStatusAll(true);
                        setStatusNew(false);
                        setStatusInWorking(false);
                        setStatusComplete(false);
                        setFetchData((value) => !value);
                     }}
                     data-value="all"
                     data-role="left-status"
                     href="#"
                     className={statusAll || loadFromLS("status") === "all" ? "active" : null}>
                     Все вместе
                  </a>
               </li>
               <li>
                  <a
                     data-value="new"
                     data-role="left-status"
                     href="#"
                     onClick={(e) => {
                        saveToLS("status", e.target.getAttribute("data-value"));
                        setStatusAll(false);
                        setStatusNew(true);
                        setStatusInWorking(false);
                        setStatusComplete(false);
                        setFetchData((value) => !value);
                     }}
                     className={statusNew || loadFromLS("status") === "new" ? "active" : null}>
                     Новые
                     <div className="badge" id="badge-new">
                        {badgeNew !== 0 ? badgeNew : ""}
                     </div>
                  </a>
               </li>
               <li>
                  <a
                     data-value="inwork"
                     data-role="left-status"
                     href="#"
                     onClick={(e) => {
                        saveToLS("status", e.target.getAttribute("data-value"));
                        setStatusAll(false);
                        setStatusNew(false);
                        setStatusInWorking(true);
                        setStatusComplete(false);
                        setFetchData((value) => !value);
                     }}
                     className={statusInWorking || loadFromLS("status") === "inwork" ? "active" : null}>
                     В работе
                  </a>
               </li>
               <li>
                  <a
                     data-value="complete"
                     data-role="left-status"
                     href="#"
                     onClick={(e) => {
                        saveToLS("status", e.target.getAttribute("data-value"));
                        setStatusAll(false);
                        setStatusNew(false);
                        setStatusInWorking(false);
                        setStatusComplete(true);
                        setFetchData((value) => !value);
                     }}
                     className={statusComplete || loadFromLS("status") === "complete" ? "active" : null}>
                     Завершенные
                  </a>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default TableLeftPanel;
