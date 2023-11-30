import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import serverPath from "../serverPath";

const Edit = () => {
   const navigate = useNavigate();
   const { id } = useParams();

   const [request, setRequest] = useState(null);

   //состояние для временной блокировки кнопки при отправке формы
   // const [isPanding, setIsPanding] = useState(false);

   useEffect(() => {
      fetch(serverPath + "requests/" + id)
         .then((res) => res.json())
         .then((data) => setRequest(data));
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch(serverPath + "requests/" + id, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(request),
      }).then((res) => {
         if (res.ok) navigate("/table");
      });
   };

   const deleteRequest = (e) => {
      e.preventDefault();
      fetch(serverPath + "requests/" + id, {
         method: "DELETE",
      }).then((res) => {
         if (res.ok) navigate("/table");
      });
   };

   return (
      <div className="with-nav">
         <div className="form-wrapper">
            <div className="container-fluid">
               <div className="row justify-content-between align-items-center">
                  <div className="col">
                     <div className="admin-heading-1">Работа с заявкой</div>
                  </div>
                  <div className="col text-right">
                     <a href="/table" className="btn btn-link">
                        Вернуться назад
                     </a>
                  </div>
               </div>
               <div className="row">
                  <div className="col">
                     {request && (
                        <form id="form">
                           <div className="card mb-4">
                              <div className="card-header">Данные о заявке</div>
                              <div className="card-body">
                                 <div className="row mb-3">
                                    <div className="col-md-2">
                                       <strong>ID:</strong>
                                    </div>
                                    <div className="col">
                                       Заявка №<span id="number">{request.id}</span>
                                    </div>
                                    <input name="id" type="hidden" id="id" />
                                 </div>

                                 <div className="row mb-3">
                                    <div className="col-md-2">
                                       <strong>Дата создания:</strong>
                                    </div>
                                    <div className="col" id="date">
                                       {request.date}
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <div className="col-md-2">
                                       <strong>Продукт:</strong>
                                    </div>
                                    <div className="col">
                                       <select
                                          id="product"
                                          name="product"
                                          className="custom-select"
                                          value={request.product}
                                          onChange={(e) => {
                                             setRequest({
                                                ...request,
                                                product: e.target.value,
                                             });
                                          }}>
                                          <option value="course-html">Курс по верстке</option>
                                          <option value="course-js">Курс по JavaScript</option>
                                          <option value="course-vue">Курс по VUE JS</option>
                                          <option value="course-php">Курс по PHP</option>
                                          <option value="course-wordpress">Курс по WordPress</option>
                                       </select>
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <div className="col-md-2">
                                       <strong>Имя:</strong>
                                    </div>
                                    <div className="col">
                                       <input
                                          type="text"
                                          className="form-control"
                                          value={request.name}
                                          onChange={(e) => {
                                             setRequest({
                                                ...request,
                                                name: e.target.value,
                                             });
                                          }}
                                          id="name"
                                          name="name"
                                       />
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <div className="col-md-2">
                                       <strong>Email:</strong>
                                    </div>
                                    <div className="col">
                                       <input
                                          type="text"
                                          className="form-control"
                                          value={request.email}
                                          onChange={(e) => {
                                             setRequest({
                                                ...request,
                                                email: e.target.value,
                                             });
                                          }}
                                          id="email"
                                          name="email"
                                       />
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <div className="col-md-2">
                                       <strong>Телефон:</strong>
                                    </div>
                                    <div className="col">
                                       <input
                                          type="text"
                                          className="form-control"
                                          value={request.phone}
                                          onChange={(e) => {
                                             setRequest({
                                                ...request,
                                                phone: e.target.value,
                                             });
                                          }}
                                          id="phone"
                                          name="phone"
                                       />
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <div className="col-md-2">
                                       <strong>Статус заявки:</strong>
                                    </div>
                                    <div className="col">
                                       <select
                                          className="custom-select"
                                          id="status"
                                          name="status"
                                          value={request.status}
                                          onChange={(e) => {
                                             setRequest({
                                                ...request,
                                                status: e.target.value,
                                             });
                                          }}>
                                          <option>Выберите...</option>
                                          <option value="new">Новая</option>
                                          <option value="inwork">В работе</option>
                                          <option value="complete">Завершена</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="row justify-content-between">
                              <div className="col text-right">
                                 <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                                    Сохранить изменения
                                 </button>
                                 <button type="submit" onClick={deleteRequest} className="btn btn-primary btn-del">
                                    Удалить заявку
                                 </button>
                              </div>
                           </div>
                        </form>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Edit;
