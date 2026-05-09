const Message = require('../models/Message');
const axios = require('axios');

/**
 * Send email via Web3Forms (free, no password needed).
 * The user only needs to provide a free access key from https://web3forms.com
 */
const sendViaWeb3Forms = async ({ name, email, phone, subject, message }) => {
  const response = await axios.post('https://api.web3forms.com/submit', {
    access_key: process.env.WEB3FORMS_KEY,
    name,
    email,
    phone: phone || 'Not provided',
    subject: `📩 New Portfolio Message: ${subject}`,
    message,
    // Auto-response to the visitor
    from_name: 'Portfolio Contact',
    botcheck: '',
  });

  if (!response.data.success) {
    throw new Error(response.data.message || 'Web3Forms submission failed');
  }

  console.log(`✅ Email sent via Web3Forms to your inbox!`);
};

exports.submitContact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Basic server-side validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, subject, and message are required.',
    });
  }

  let savedToDb = false;
  let emailSent = false;
  let emailError = null;

  // 1. Save to MongoDB
  try {
    const newMessage = new Message({ name, email, phone, subject, message });
    await newMessage.save();
    savedToDb = true;
    console.log(`✅ Message saved to DB from: ${email}`);
  } catch (dbError) {
    console.error('⚠️  MongoDB save failed:', dbError.message);
  }

  // 2. Send email via Web3Forms (no password needed!)
  if (process.env.WEB3FORMS_KEY && process.env.WEB3FORMS_KEY !== 'your_web3forms_key_here') {
    try {
      await sendViaWeb3Forms({ name, email, phone, subject, message });
      emailSent = true;
    } catch (err) {
      emailError = err.message;
      console.error('⚠️  Web3Forms email failed:', err.message);
    }
  } else {
    console.warn('⚠️  WEB3FORMS_KEY not set in backend/.env');
  }

  // 3. Respond to client
  if (!savedToDb && !emailSent) {
    return res.status(500).json({
      success: false,
      message: 'Could not save message. Please try again.',
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Message received successfully! I will get back to you soon.',
    emailSent,
  });
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Server error, could not fetch messages.' });
  }
};
