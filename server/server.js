const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const config = require('./utils/config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});