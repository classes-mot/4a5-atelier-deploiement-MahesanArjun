import dotenv from "dotenv";
dotenv.config();
//express et mongoose
import express from 'express';
import { connectDB } from './util/bd.js';

import messageRoutes from './routes/messages-routes.js';




// Connexion à MongoDB
await connectDB(process.env.MONGODB_URI);


const app = express();
// chercher les variables d'environnemnt
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/db-deploy';

// section des middlewares

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // header et value * quels domaines peuvent acceder a notre serveur
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  ); //quel header sont autorisés ( pourait etre * pour tout)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); // quelles methodes HTTP sont autorisées
  next();
});

app.use('/api/messages', messageRoutes);

//connexion BD + demarrage serveur web

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
