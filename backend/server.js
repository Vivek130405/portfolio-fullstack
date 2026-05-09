const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    emailService: process.env.WEB3FORMS_KEY && process.env.WEB3FORMS_KEY !== 'your_web3forms_key_here'
      ? 'Web3Forms ✅'
      : 'Not configured ⚠️',
  });
});

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('⚠️  MongoDB error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Backend running → http://localhost:${PORT}`);

  const keySet = process.env.WEB3FORMS_KEY && process.env.WEB3FORMS_KEY !== 'your_web3forms_key_here';
  if (keySet) {
    console.log('✅ Web3Forms email: configured');
  } else {
    console.log('\n⚠️  Email not yet active!');
    console.log('   Get your FREE key in 30 seconds:');
    console.log('   👉  https://web3forms.com');
    console.log('   Enter kakadev055@gmail.com → check inbox for key');
    console.log('   Then paste it in backend/.env as WEB3FORMS_KEY=...\n');
  }
});
