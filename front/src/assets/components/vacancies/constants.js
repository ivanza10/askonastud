// src/data/cityAndDirections.js
export const cities = [
    { name: "Москва", code: "1" },
    { name: "Санкт-Петербург", code: "2" },
    { name: "Екатеринбург", code: "3" },
    { name: "Ковров", code: "1724" },
    { name: "Челябинск", code: "104" },
    { name: "Обухово (Московская область)", code: "5116" },
  ];
  
  export const directions = [
    {
      name: "Производство",
      code: "production",
      apiUrl: `https://api.hh.ru/vacancies?text="Производство"&area=1724&employer_id=544224`,
      query: "Производство",
      subtext: 'Это самое сердце Асконы!',
      text: 'Именно здесь создаются товары для сна, которые дарят миллионам семей полноценный отдых и уют'
    },
    {
      name: "Логистика и сервис",
      code: "logistics",
      apiUrl: `https://api.hh.ru/vacancies?text="Логистика"&area=1724&employer_id=544224`,
      query: "Логистика",
      subtext: 'Это гордость Асконы!',
      text: 'В современном мире скорость значит очень многое, а скорость доставки тем более'
    },
    {
      name: "Офис",
      code: "office",
      apiUrl: `https://api.hh.ru/vacancies?text="Офис"&area=1724&employer_id=544224`,
      query: "Офис",
      subtext: 'Это стратегический центр Асконы!',
      text: 'Именно здесь создаются проекты для успешного развития компании'
    },
    {
      name: "Продажи",
      code: "realization",
      apiUrl: `https://api.hh.ru/vacancies?text="Продажи"&area=1724&employer_id=544224`,
      query: "Продажи",
      subtext: 'Это лицо Асконы!',
      text: 'Именно здесь создаётся и развивается лучший цифровой опыт как для внутренних сотрудников, так и для клиентов компании'
    },
    {
      name: "IT",
      code: "it",
      apiUrl: `https://api.hh.ru/vacancies?text="IT"&area=1724&employer_id=544224`,
      query: "IT",
      subtext: 'Это digital-двигатель  Асконы!',
      text: 'Именно здесь создаётся и развивается лучший цифровой опыт как для внутренних сотрудников, так и для клиентов компании'
    },
  ];
  