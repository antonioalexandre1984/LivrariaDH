require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "port": process.env.DB_PORT,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect":process.env.DB_DIALECT,
    define: {
    timestamps: true,
    underscored:true,
    }
    
  }
}

