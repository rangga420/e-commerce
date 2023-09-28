npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,role:string

npx sequelize-cli model:generate --name Product --attributes nameProduct:string,imgProduct:string,price:integer,description:string,stock:integer

npx sequelize-cli model:generate --name Conjunction --attributes UserId:integer,ProductId:integer

npx sequelize-cli model:generate --name Transaction --attributes detailOrder:string,price:integer,UserId:integer

npx sequelize-cli model:generate --name Balance --attributes balance:integer,role:string

npx sequelize-cli migration:generate --name balance-addFk

npx sequelize-cli seed:generate --name product-seed


npm run start > running server express

npm run start-css > running watch tailwind css

npm run start-db > migrate all database and seeding

npm run del-db > delete all database colom

```json
FORM REGISTER

METHOD GET: localhost:3000/registers/users
render page registers users

METHOD POST: localhost:3000/registers/users
create new user to database
```

```json 
FORM LOGIN
METHOD GET: localhost:3000/login/users
render page login user

METHOD POST: localhost:3000/login/users
login page ecommerce
```

```json 
SHOW PRODUCT
METHOD GET: localhost:3000/products

```
```json

additional : Add column Category

```
