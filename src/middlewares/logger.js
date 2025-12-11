const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  
  // Логируем тело запроса для POST
  if (method === 'POST' && req.body) {
    console.log('📦 Body:', req.body);
  }
  
  // Логируем query параметры
  if (Object.keys(req.query).length > 0) {
    console.log('❓ Query:', req.query);
  }
  
  next(); // Передаём управление дальше
};

module.exports = logger;