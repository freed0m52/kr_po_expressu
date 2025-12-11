const express = require('express');
const bmiRoutes = require('./src/routes/bmiRoutes');
const logger = require('./src/middlewares/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(logger);

app.use('/api/bmi', bmiRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});