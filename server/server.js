const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const config = require('./utils/config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');
const machineRoutes = require('./routes/machineRoutes');
const personRoutes = require('./routes/personRoutes');
const lendingRoutes = require('./routes/lendingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/lendings', lendingRoutes);

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});