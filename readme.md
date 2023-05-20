`project2`

<hr>


* npm init -y 
* npm i express ejs mysql mysql2  // sequelize sequelize-cli // socket.io-client  
* npx sequelize init


* **config/config.json** : mysql 의 정보 dotenv 와 .env 로 관리한다.
```json
{
  "development": {
  "username": "user", // mysql 아이디 
  "username": process.env.DB_USER
  "password": process.env.DB_PW
  "database": "kdt", // mysql database
  "host": "127.0.0.1",
  "dialect": "mysql" // mysql
  }
}
  ```

* **controlle**r : Cindex/Croom 등 C를 붙이자..
* **models** : index.ejs / sequelize를 설정, 테이블관련.js를 담자
  *        테이블관련.js // table columns 정보를 적는곳 다하고 module.exports 하기 
