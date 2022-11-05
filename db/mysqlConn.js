var mysql = require('mysql')
var MsqConn = mysql.createConnection({
  host: process.env.MySQL_HOST,
  user: process.env.MySQL_USER,
  password: process.env.MySQL_PASS,
  database: process.env.MySQL_DB,
  multipleStatements: true
});

MsqConn.connect((err) => {
  if(!err){
    console.log('Connected to MySQL Sucessfully.')
  }
  else{
    console.log('MySQL not connected!',err)
  }
});

module.exports = MsqConn;