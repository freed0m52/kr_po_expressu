const express = require('express');
const bmiRoutes = require('./src/routes/bmiRoutes');
const logger = require('./src/middlewares/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(logger);

// Маршруты
app.use('/api/bmi', bmiRoutes);

// Старт сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});