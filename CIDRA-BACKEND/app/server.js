

// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRouter');
const noticeRoutes = require('./routes/noticesRouter');
const lectureRoutes = require('./routes/lectureRouter');
const complaintRoutes = require('./routes/complaintRouter');
const uploadDocRouter = require('./routes/uploadDocRouter');
const assignmentRoutes = require('./routes/assignmentRoute');
const profileRoutes = require('./routes/profileRouter');
const fetchuserRoutes = require('./routes/fetchallusers');
const searchRoutes = require('./routes/searchRouter');
const cors = require("cors");
const pdfRoutes = require('./routes/uploadDocRouter'); // New route for PDFs
const databaseConfig = require('./config/database-config');


const app = express();

// Connect to MongoDB
mongoose.connect(databaseConfig.url, databaseConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/notices', noticeRoutes); // New route for notices
app.use('/lectures', lectureRoutes);
app.use('/pdfs', pdfRoutes); // New route for PDFs
app.use('/profile', profileRoutes);
app.use('/documents', uploadDocRouter);
app.use('/assignment', assignmentRoutes);
app.use('/complaint', complaintRoutes);
app.use('/', fetchuserRoutes);
app.use('/', searchRoutes);


app.get('/', (req,res)=> {
  res.send('Root Page');
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
