import Form from "./Form";

const Main = () => {
   return (
      <div className="main with-nav flex-center">
         <div className="white-plate white-plate--payment">
            <div className="container-fluid">
               <div className="white-plate__header text-center">
                  <p className="white-plate__logo">
                     <span>Форма</span> заявок
                  </p>
               </div>

               <div className="white-plate__line-between white-plate__line-between--main"></div>
               <Form />
            </div>
         </div>
      </div>
   );
};

export default Main;
