import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboardRoutes";   
import productRoutes from "./routes/productRoutes"
import expenseRoutes from "./routes/expenseRoutes";
import userRoutes from "./routes/userRoutes";


// Route Imports
//  Configurations
dotenv.config();
const app =express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));   
app.use(cors());


// ROUTES
// app.get("/hello",(req,res)=>{
//     res.send("hello world");
// });
app.use("/dashboard",dashboardRoutes);
app.use("/products",productRoutes) //http://localhost:8000/dashboard
const port =Number(process.env.PORT)|| 3001;//http://localhost:8000/product
app.use("/users", userRoutes); // http://localhost:8000/users
app.use("/expenses", expenseRoutes); // http://localhost:8000/expenses
app.listen(port,"0.0.0.0",()=>{
    console.log(`Server running on port ${port}`);

});
