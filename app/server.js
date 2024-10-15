const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Aplinkos kintamųjų konfigūracija
dotenv.config();

const app = express();
app.use(express.json());  // Leidžia JSON užklausų apdorojimą
app.use(cors());  // Leidžia CORS

// Prisijungimas prie MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// API maršrutai
const categoryRoutes = require('./routes/categoryRoutes');
const businessRoutes = require('./routes/businessRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/userRoutes');

app.use('/api/category', categoryRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/user', authRoutes);

// Serverio paleidimas
const PORT = process.env.PORT || 5600;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
