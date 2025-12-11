const express = require('express');
const router = express.Router();
const { calculateBMI, getBMICategories } = require('../controllers/bmiController');

// GET для получения категорий ИМТ
router.get('/categories', getBMICategories);

// POST для расчёта ИМТ
router.post('/calculate', calculateBMI);

// GET с query параметрами для быстрого расчёта
router.get('/quick', (req, res) => {
  const { weight, height } = req.query;
  if (!weight || !height) {
    return res.status(400).json({ error: 'Укажите weight и height в query параметрах' });
  }
  
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  res.json({ bmi: parseFloat(bmi) });
});

module.exports = router;