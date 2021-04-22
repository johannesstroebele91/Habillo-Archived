"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
// importing the express library
const app = express_1.default();
const PORT = process.env.PORT || 4000;
// use() method helps to handle the Todos routes
app.use(cors_1.default());
app.use(routes_1.default);
// use the mongoose package to connect to MongoDB
// by appending to the URL the credentials held on the nodemon.json file
// mongodb+srv://admin:<password>@db-habillo.vlxmf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority
const uri = `mongodb+srv://christian:christian1234@db-habillo.vlxmf.mongodb.net/db-habillo?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default
    .connect(uri, options)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
