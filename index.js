const express =  require("express");
const dotenv =  require("dotenv");
const cors =  require("cors");
const router =  require("./router.js");
const errorHandlingMiddleware =  require("./Middlewares/errorHandlingMiddleware.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('*', errorHandlingMiddleware);

app.get('/', (req, res) => res.redirect('/api'));
app.use('/api', router);


app.listen(process.env.PORT || 5000, () => console.log("Server is listening on port 5000"));

module.exports = app;