document.addEventListener('DOMContentLoaded', function() {
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const calculateBtn = document.getElementById('calculateBtn');
  const resultDiv = document.getElementById('result');
  const bmiValue = document.getElementById('bmiValue');
  const bmiCategory = document.getElementById('bmiCategory');
  const recommendation = document.getElementById('recommendation');
  const categoriesList = document.getElementById('categoriesList');
  const timestamp = document.getElementById('timestamp');
  
  // Установка текущей даты в футере
  timestamp.textContent = new Date().toLocaleString('ru-RU');
  
  // Загрузка категорий ИМТ
  loadCategories();
  
  // Обработчик кнопки расчёта
  calculateBtn.addEventListener('click', calculateAndDisplayBMI);
  
  // Также расчёт при нажатии Enter в полях ввода
  weightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateAndDisplayBMI();
  });
  
  heightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateAndDisplayBMI();
  });
  
  // Заполнение категорий ИМТ
  async function loadCategories() {
    try {
      const response = await fetch('/api/bmi/categories');
      const categories = await response.json();
      
      categoriesList.innerHTML = categories.map(cat => `
        <div class="category-item ${cat.color}">
          <span>${cat.range}</span>
          <span>${cat.category}</span>
        </div>
      `).join('');
    } catch (error) {
      categoriesList.innerHTML = '<p style="color: red;">Ошибка загрузки категорий</p>';
    }
  }
  
  // Основная функция расчёта и отображения
  async function calculateAndDisplayBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    
    // Валидация
    if (!weight || !height || weight <= 0 || height <= 0) {
      alert('Пожалуйста, введите корректные значения веса и роста');
      return;
    }
    
    try {
      const response = await fetch('/api/bmi/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ weight, height })
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
        return;
      }
      
      // Отображение результата
      bmiValue.textContent = data.bmi;
      bmiCategory.textContent = data.category;
      bmiCategory.className = `category ${data.color}`;
      recommendation.textContent = data.recommendations;
      
      // Показываем блок с результатом
      resultDiv.classList.remove('hidden');
      
      // Плавная прокрутка к результату
      resultDiv.scrollIntoView({ behavior: 'smooth' });
      
    } catch (error) {
      alert('Ошибка соединения с сервером');
      console.error('Error:', error);
    }
  }
});