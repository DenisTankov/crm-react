import { useState } from "react";
import getTestData from "../test-data";
import serverPath from "../serverPath";

let testData = getTestData();

const Form = () => {
   const [name, setName] = useState(testData.name);
   const [phone, setPhone] = useState(testData.phone);
   const [email, setEmail] = useState(testData.email);
   const [product, setProduct] = useState(testData.product);

   //состояние для временной блокировки кнопки при отправке формы
   const [isPanding, setIsPanding] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      const request = { name, phone, email, product, date: new Date().toLocaleDateString(), status: "new" };
      setIsPanding(true);

      fetch(serverPath + "requests", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(request),
      }).then(() => {
         // console.log("new post was added");
         setIsPanding(false);

         const testData = getTestData();
         setName(testData.name);
         setPhone(testData.phone);
         setEmail(testData.email);
         setProduct(testData.product);
      });
   };

   return (
      <form onSubmit={handleSubmit} id="form" method="POST" action="">
         <label>Ваши данные:</label>
         <div className="form-group">
            <input
               id="name"
               value={name}
               onChange={(e) => {
                  setName(e.target.value);
               }}
               type="text"
               name="name"
               autoComplete="on"
               className="form-control"
               placeholder="Имя и Фамилия"
               required
            />
         </div>
         <div className="form-group">
            <input
               id="phone"
               value={phone}
               onChange={(e) => {
                  setPhone(e.target.value);
               }}
               type="text"
               name="phone"
               autoComplete="on"
               className="form-control"
               placeholder="Телефон"
            />
         </div>
         <div className="form-group">
            <input
               id="email"
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value);
               }}
               type="email"
               name="email"
               autoComplete="on"
               className="form-control"
               placeholder="Email"
               required
            />
         </div>
         <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Продукт:</label>
            <select
               id="product"
               value={product}
               onChange={(e) => {
                  setProduct(e.target.value);
               }}
               name="product"
               className="form-control">
               {/* id="exampleFormControlSelect1" */}
               <option value="course-html">Курс по верстке</option>
               <option value="course-js">Курс по JavaScript</option>
               <option value="course-vue">Курс по VUE JS</option>
               <option value="course-php">Курс по PHP</option>
               <option value="course-wordpress">Курс по WordPress</option>
            </select>
         </div>
         <div className="form-group">
            {isPanding && (
               <button type="submit" className="btn btn-lg btn-primary btn-block">
                  Добавление заявки...
               </button>
            )}
            {!isPanding && (
               <button type="submit" className="btn btn-lg btn-primary btn-block">
                  Оформить заявку
               </button>
            )}
         </div>
      </form>
   );
};

export default Form;
