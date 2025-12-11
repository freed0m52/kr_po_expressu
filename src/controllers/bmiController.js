const calculateBMI = (req, res) => {
  try {
    const { weight, height } = req.body;

    if (!weight || !height) {
      return res.status(400).json({ error: 'Введите вес и рост' });
    }
    if (weight <= 0 || height <= 0) {
      return res.status(400).json({ error: 'Вес и рост должны быть положительными числами' });
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    const bmiValue = parseFloat(bmi);

    let category = '';
    let color = '';
    
    if (bmiValue < 18.5) {
      category = 'Недостаточный вес';
      color = 'blue';
    } else if (bmiValue < 25) {
      category = 'Нормальный вес';
      color = 'green';
    } else if (bmiValue < 30) {
      category = 'Избыточный вес';
      color = 'orange';
    } else {
      category = 'Ожирение';
      color = 'red';
    }

    res.json({
      bmi: bmiValue,
      category,
      color,
      description: `Ваш ИМТ: ${bmiValue} (${category})`,
      recommendations: getRecommendations(category)
    });

  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const getBMICategories = (req, res) => {
  const categories = [
    { range: 'Менее 18.5', category: 'Недостаточный вес', color: 'blue' },
    { range: '18.5 – 24.9', category: 'Нормальный вес', color: 'green' },
    { range: '25 – 29.9', category: 'Избыточный вес', color: 'orange' },
    { range: '30 и более', category: 'Ожирение', color: 'red' }
  ];
  res.json(categories);
};

function getRecommendations(category) {
  const recommendations = {
    'Недостаточный вес': 'Рекомендуется увеличить калорийность питания, включить белковые продукты.',
    'Нормальный вес': 'Поддерживайте текущий режим питания и физической активности.',
    'Избыточный вес': 'Рекомендуется умеренная физическая активность и сбалансированное питание.',
    'Ожирение': 'Рекомендуется консультация врача, диета и регулярные физические нагрузки.'
  };
  return recommendations[category] || 'Проконсультируйтесь с врачом.';
}

module.exports = { calculateBMI, getBMICategories };