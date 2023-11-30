import { useState, useContext } from "react";
import { appContext } from "./Table";

const TableTopStatusBar = () => {
   const { setFetchData, saveToLS, loadFromLS, statusAll, setStatusAll, statusNew, setStatusNew, statusInWorking, setStatusInWorking, statusComplete, setStatusComplete } = useContext(appContext);

   const [filterProduct, setFilterProduct] = useState(loadFromLS("product"));

   return (
      <form action="">
         <div className="row mb-3 justify-content-start">
            <div className="col">
               <div id="topStatusBar" className="btn-group" role="group" aria-label="...">
                  <a
                     href="#"
                     data-value="all"
                     onClick={(e) => {
                        saveToLS("status", e.target.getAttribute("data-value"));
                        setStatusAll(true);
                        setStatusNew(false);
                        setStatusInWorking(false);
                        setStatusComplete(false);
                        setFetchData((value) => !value);
                     }}
                     className={`btn btn-light ${statusAll || loadFromLS("status") === "all" ? "active" : null}`}>
                     Все
                  </a>
                  <a
                     href="#"
                     data-value="new"
                     onClick={(e) => {
                        saveToLS("status", e.target.getAttribute("data-value"));
                        setStatusAll(false);
                        setStatusNew(true);
                        setStatusInWorking(false);
                        setStatusComplete(false);
                        setFetchData((value) => !value);
                     }}
                     className={`btn btn-light ${statusNew || loadFromLS("status") === "new" ? "active" : null}`}>
                     Новые
                  </a>
                  <a
                     href="#"
                     data-value="inwork"
                     onClick={(e) => {
                        saveToLS("status", e.target.getAttribute("data-value"));
                        setStatusAll(false);
                        setStatusNew(false);
                        setStatusInWorking(true);
                        setStatusComplete(false);
                        setFetchData((value) => !value);
                     }}
                     className={`btn btn-light ${statusInWorking || loadFromLS("status") === "inwork" ? "active" : null}`}>
                     В работе
                  </a>
                  <a
                     href="#"
                     data-value="complete"
                     onClick={(e) => {
                        saveToLS("status", e.target.getAttribute("data-value"));
                        setStatusAll(false);
                        setStatusNew(false);
                        setStatusInWorking(false);
                        setStatusComplete(true);
                        setFetchData((value) => !value);
                     }}
                     className={`btn btn-light ${statusComplete || loadFromLS("status") === "complete" ? "active" : null}`}>
                     Завершенные
                  </a>
               </div>
            </div>

            <div className="col">
               <select
                  onChange={(e) => {
                     saveToLS("product", e.target.value);
                     setFilterProduct(e.target.value);
                     setFetchData((value) => !value);
                  }}
                  value={filterProduct}
                  className="custom-select"
                  id="productSelect">
                  <option value="all">Все продукты</option>
                  <option value="course-html">Курс по верстке</option>
                  <option value="course-js">Курс по JavaScript</option>
                  <option value="course-vue">Курс по VUE JS</option>
                  <option value="course-php">Курс по PHP</option>
                  <option value="course-wordpress">Курс по WordPress</option>
               </select>
            </div>
         </div>
      </form>
   );
};

export default TableTopStatusBar;
