const app = require('./app') // Aplicacion real express
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
});