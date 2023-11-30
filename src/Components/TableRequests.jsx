import { useEffect, useContext } from "react";
import { appContext } from "./Table";
import { Link } from "react-router-dom";
import serverPath from "../serverPath";

const TableRequests = () => {
   const { data, setData, fetchData, loadFromLS } = useContext(appContext);

   const products = {
      "course-html": "Курс по верстке",
      "course-js": "Курс по JavaScript",
      "course-vue": "Курс по VUE JS",
      "course-php": "Курс по PHP",
      "course-wordpress": "Курс по WordPress",
   };

   const statuses = {
      new: "Новая",
      inwork: "В работе",
      complete: "Завершена",
   };

   const filterProduct = loadFromLS("product");
   const filterStatus = loadFromLS("status");

   useEffect(() => {
      fetch(serverPath + "requests")
         .then((res) => res.json())
         .then((data) => {
            setData(
               data.filter((request) => {
                  if (filterProduct === "all" && filterStatus === "all") return request;
                  else if (filterProduct === "all" && filterStatus !== "all") return request.status === filterStatus;
                  else if (filterProduct !== "all" && filterStatus === "all") return request.product === filterProduct;
                  else return request.product === filterProduct && request.status === filterStatus;
               })
            );
         });
   }, [fetchData]);

   return (
      <table className="table fs-14">
         <thead>
            <tr>
               <th>ID</th>
               <th>дата</th>
               <th>продукт</th>
               <th>имя</th>
               <th>email</th>
               <th>телефон</th>
               <th>статус</th>
               <th></th>
            </tr>
         </thead>
         <tbody id="tbody">
            {data &&
               data.map((request) => {
                  return (
                     <tr key={request.id}>
                        <th scope="row">{request.id}</th>
                        <td>{request.date}</td>
                        <td>{products[request.product]}</td>
                        <td>{request.name}</td>
                        <td>{request.email}</td>
                        <td>{request.phone}</td>
                        <td>
                           <div className={`status-${request.status} badge badge-pill`}>{statuses[request.status]}</div>
                        </td>
                        <td>
                           <Link to={`/edit/${request.id}`}>
                              <p>Редактировать</p>
                           </Link>
                        </td>
                     </tr>
                  );
               })}
         </tbody>
      </table>
   );
};

export default TableRequests;
