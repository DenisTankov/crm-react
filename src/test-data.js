function getTestData() {
   const testData = [
      {
         name: "Денис Таньков",
         phone: "9231315013",
         email: "denis_tankoff@mail.ru",
         product: "course-js",
      },
      {
         name: "Василий Васильев",
         phone: "9834345050",
         email: "vasilij@mail.ru",
         product: "course-wordpress",
      },
      {
         name: "Петр Петров",
         phone: "9231505050",
         email: "petrov@mail.ru",
         product: "course-php",
      },
      {
         name: "Екатерина Иванова",
         phone: "9691406767",
         email: "ekaterina_ivanova@gmail.com",
         product: "course-vue",
      },
      {
         name: "Елена Федорова",
         phone: "9034566787",
         email: "elena_f@gmail.com",
         product: "course-html",
      },
   ];

   function getRandomInt(max) {
      return Math.floor(Math.random() * max);
   }

   const randomIndex = getRandomInt(testData.length);
   return testData[randomIndex];
}

export default getTestData;
