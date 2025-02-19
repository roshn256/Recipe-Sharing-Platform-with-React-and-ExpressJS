const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectDB = async () => {
      try {
        console.log('MongoDB URI:', process.env.MONGODB_URI);  // Confirm URI here too
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');
      } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
      }
    };
    
    await mongoose.connect(process.env.MONGODB_URI, { // Fix here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
