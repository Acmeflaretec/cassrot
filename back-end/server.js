const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes');
require('dotenv').config();

const app = express();  
const PORT = process.env.PORT || 5000;


// const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL];


// const corsOptions = {
//   origin: function (origin, callback) {    
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// };

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', imageRoutes);

mongoose.connect(process.env.MONGO_URI)  
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);     
    });    
  })
  .catch(err => console.log(err));

      