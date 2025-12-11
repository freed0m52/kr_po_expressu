const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  
  if (method === 'POST' && req.body) {
    console.log('📦 Body:', req.body);
  }
  
  if (Object.keys(req.query).length > 0) {
    console.log('❓ Query:', req.query);
  }
  
  next();
};

module.exports = logger;