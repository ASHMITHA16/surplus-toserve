// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Atlas Connection
// const MONGODB_URI = 'mongodb+srv://ashmithau0:GAsc6jbakxa3YNb2@cluster0.pzsoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const JWT_SECRET = 'xK8aP2z$Lm7QrT9wY3vE6cJ1nB5gF0dH4sU*jA&fZ@pN';

// mongoose.connect(MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   });

// // User Schema & Model
// const userSchema = new mongoose.Schema({
//   username: { 
//     type: String, 
//     required: [true, 'Username is required'],
//     unique: true,
//     trim: true,
//     minlength: [3, 'Username must be at least 3 characters']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters']
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const User = mongoose.model('User', userSchema);

// // Auth middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
  
//   if (!token) return res.status(401).json({ message: 'Access denied. No token provided' });
  
//   try {
//     const verified = jwt.verify(token, JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// // Route: Signup
// app.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
    
//     // Validation
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     // Check if user already exists
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       if (existingUser.email === email) {
//         return res.status(400).json({ message: 'Email already registered' });
//       }
//       return res.status(400).json({ message: 'Username already taken' });
//     }
    
//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
    
//     // Create new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword
//     });
    
//     // Save user to database
//     const savedUser = await newUser.save();
    
//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: savedUser._id, username: savedUser.username },
//       JWT_SECRET,
//       { expiresIn: '24h' }
//     );
    
//     // Send response
//     res.status(201).json({
//       message: 'User registered successfully',
//       token,
//       userId: savedUser._id,
//       username: savedUser.username
//     });
    
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ 
//       message: 'Error during registration', 
//       error: error.message 
//     });
//   }
// });

// // Route: Login
// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     // Validation
//     if (!username || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     // Find user
//     const user = await User.findOne({ 
//       $or: [{ username }, { email: username }] 
//     });
    
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }
    
//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }
    
//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, username: user.username },
//       JWT_SECRET,
//       { expiresIn: '24h' }
//     );
    
//     // Send response
//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       userId: user._id,
//       username: user.username
//     });
    
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ 
//       message: 'Error during login', 
//       error: error.message 
//     });
//   }
// });

// // Protected route example
// app.get('/user', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select('-password');
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('User fetch error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// real
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors({ origin: '*' }));
// app.use(express.json());

// // Environment Variables
// const MONGODB_URI = 'mongodb+srv://ashmithau0:GAsc6jbakxa3YNb2@cluster0.pzsoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const JWT_SECRET = 'xK8aP2z$Lm7QrT9wY3vE6cJ1nB5gF0dH4sU*jA&fZ@pN';


// // MongoDB Connection
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('✅ Connected to MongoDB Atlas'))
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// // User Schema & Model
// const userSchema = new mongoose.Schema({
//   username: { 
//     type: String, 
//     required: true, 
//     unique: true, 
//     trim: true, 
//     minlength: 3 
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const User = mongoose.model('User', userSchema);

// // Donation Schema & Model
// const donationSchema = new mongoose.Schema({
//   foodType: { type: String, required: true },
//   selectedFoods: { type: [String], required: true },
//   otherItems: { type: String },
//   servings: { type: Number, required: true },
//   address: { type: String, required: true },
//   pickupTime: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const Donation = mongoose.model('Donation', donationSchema);

// // Auth Middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'Access denied. No token provided' });

//   try {
//     const verified = jwt.verify(token, JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// // Signup Route
// app.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return res.status(400).json({ message: existingUser.email === email ? 'Email already registered' : 'Username already taken' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '24h' });

//     res.status(201).json({ message: 'User registered successfully', token, userId: newUser._id, username: newUser.username });

//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Error during registration', error: error.message });
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const user = await User.findOne({ $or: [{ username }, { email: username }] });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });

//     res.status(200).json({ message: 'Login successful', token, userId: user._id, username: user.username });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Error during login', error: error.message });
//   }
// });

// // Get User Data (Protected)
// app.get('/user', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json(user);

//   } catch (error) {
//     console.error('User fetch error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // New Route: Submit Donation
// app.post('/donate', async (req, res) => {
//   try {
//     const { foodType, selectedFoods, otherItems, servings, address, pickupTime } = req.body;

//     if (!foodType || !selectedFoods.length || !servings || !address || !pickupTime) {
//       return res.status(400).json({ message: 'All required fields must be filled' });
//     }

//     const newDonation = new Donation({ foodType, selectedFoods, otherItems, servings, address, pickupTime });
//     await newDonation.save();

//     res.status(201).json({ message: 'Donation recorded successfully' });

//   } catch (error) {
//     console.error('Donation error:', error);
//     res.status(500).json({ message: 'Error saving donation', error: error.message });
//   }
// });

// // New Route: Get All Donations
// app.get('/donations', async (req, res) => {
//   try {
//     const donations = await Donation.find().sort({ createdAt: -1 });
//     res.status(200).json(donations);
//   } catch (error) {
//     console.error('Fetch donations error:', error);
//     res.status(500).json({ message: 'Error fetching donations', error: error.message });
//   }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
// real

//

//eeeeeeeeeeeeeeeeee
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");

// const app = express();

// // ✅ CORS Configuration
// app.use(cors({
//     origin: ["http://localhost:5173", "https://yourdomain.com"], // Add production frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }));

// app.use(express.json());

// // ✅ MongoDB Atlas Connection
// const MONGODB_URI = "mongodb+srv://ashmithau0:GAsc6jbakxa3YNb2@cluster0.pzsoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const JWT_SECRET = "xK8aP2z$Lm7QrT9wY3vE6cJ1nB5gF0dH4sU*jA&fZ@pN";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("✅ Connected to MongoDB Atlas");
//     } catch (err) {
//         console.error("❌ MongoDB connection error:", err);
//         process.exit(1);
//     }
// };
// connectDB();

// // =========================
// // 🔹 User Schema & Model
// // =========================
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true, minlength: 6 },
//     createdAt: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User", userSchema);

// // ========================= 
// // 🔹 Signup Route
// // =========================
// app.post("/signup", async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         if (!username || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, email, password: hashedPassword });
//         await newUser.save();

//         const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: "24h" });

//         res.status(201).json({ message: "User registered successfully", token, userId: newUser._id });
//     } catch (error) {
//         console.error("Signup error:", error);
//         res.status(500).json({ message: "Error during registration" });
//     }
// });

// // =========================
// // 🔹 Login Route
// // =========================
// app.post("/login", async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (!username || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const user = await User.findOne({ $or: [{ username }, { email: username }] });
//         if (!user) return res.status(401).json({ message: "Invalid username or password" });

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(401).json({ message: "Invalid username or password" });

//         const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "24h" });

//         res.status(200).json({ message: "Login successful", token, userId: user._id });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ message: "Error during login" });
//     }
// });

// // =========================
// // 🔹 Donor Schema & Model
// // =========================
// const donorSchema = new mongoose.Schema({
//     name: { type: String, required: true, trim: true },
//     contact: { type: String, required: true, trim: true },
//     foodType: { type: String, trim: true },
//     selectedFoods: [String],
//     otherItems: { type: String, trim: true },
//     servings: { type: Number, required: true },
//     address: { type: String, required: true, trim: true },
//     pickupTime: { type: String, required: true },
//     status: { type: String, default: "pending", enum: ["pending", "completed"] },
//     createdAt: { type: Date, default: Date.now },
// });

// const Donor = mongoose.model("Donor", donorSchema);

// // =========================
// // 🔹 Donate Route (Updated)
// // =========================
// app.post("/donate", async (req, res) => {
//     try {
//         const { name, contact, foodType, selectedFoods, otherItems, servings, address, pickupTime } = req.body;

//         if (!name || !contact || !address || !pickupTime || servings <= 0) {
//             return res.status(400).json({ message: "All fields are required and servings must be greater than 0" });
//         }

//         const newDonation = new Donor({
//             name,
//             contact,
//             foodType,
//             selectedFoods,
//             otherItems,
//             servings,
//             address,
//             pickupTime,
//         });

//         await newDonation.save();
//         res.status(201).json({ message: "Donation recorded successfully", points: 10 });
//     } catch (error) {
//         console.error("Donation error:", error);
//         res.status(500).json({ message: "Error saving donation" });
//     }
// });

// // =========================
// // 🔹 Fetch All Donors
// // =========================
// app.get("/donors", async (req, res) => {
//     try {
//         const donors = await Donor.find().sort({ createdAt: -1 }).limit(20);
//         res.status(200).json(donors);
//     } catch (error) {
//         console.error("Fetch donors error:", error);
//         res.status(500).json({ message: "Error fetching donors" });
//     }
// });

// // =========================
// // 🔹 Start Server
// // =========================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const axios = require("axios");
const app = express();
const twilio = require('twilio');
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Add this route


// ✅ CORS Configuration (Supports Multiple Frontend URLs)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://yourdomain.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

// ✅ MongoDB Atlas Connection
const MONGODB_URI = "mongodb+srv://ashmithau0:GAsc6jbakxa3YNb2@cluster0.pzsoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "xK8aP2z$Lm7QrT9wY3vE6cJ1nB5gF0dH4sU*jA&fZ@pN";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB Atlas");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
};
connectDB();

// =========================
// 🔹 User Schema & Model
// =========================
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ==========================
// 🔹 Signup Route
// ==========================
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ message: "All fields are required" });

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: "24h" });

        res.status(201).json({ message: "User registered successfully", token, userId: newUser._id });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Error during registration" });
    }
});


app.delete('/donors/:id', async (req, res) => {
    try {
        const donorId = req.params.id;
        await Donor.findByIdAndDelete(donorId);
        res.json({ success: true, message: 'Donor removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing donor', error: error.message });
    }
});


// =========================
// 🔹 Login Route
// =========================
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid username or password" });

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error during login" });
    }
});

// =========================
// 🔹 Donor Schema & Model
// =========================
const donorSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    foodType: { type: String, trim: true },
    servings: { type: Number, required: true },
});


const Donor = mongoose.model("Donor", donorSchema);

// =========================
// 🔹 NGO Schema & Secret Key
// =========================
const ngoSchema = new mongoose.Schema({
    ngoName: { type: String, required: true, unique: true },
    contact:{type:String,required:true},
    address: { type: String, required: true },
    secretKey: { type: String, required: true },
});

const NGO = mongoose.model("NGO", ngoSchema);

// =========================
// 🔹 NGO Registration Route
// =========================
// 🔹 Register NGO
// filepath: c:\Users\Ashmitha U\Desktop\trii\backend\server.js
// Update the verify-ngo endpoint
// 🔹 Register NGO
// ===================================
app.post("/register-ngo", async (req, res) => {
    try {
        const { ngoName, contact, address, secretKey } = req.body;
        if (!ngoName || !contact || !address || !secretKey) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingNgo = await NGO.findOne({ ngoName });
        if (existingNgo) {
            return res.status(400).json({ success: false, message: "NGO already exists" });
        }

        // Convert secretKey to lowercase and trim before saving
        const newNgo = new NGO({ 
            ngoName, 
            contact, 
            address, 
            secretKey: secretKey.trim().toLowerCase() 
        });

        await newNgo.save();
        res.status(201).json({ success: true, message: "NGO registered successfully" });
    } catch (error) {
        console.error("NGO Registration error:", error);
        res.status(500).json({ success: false, message: "Error registering NGO" });
    }
});
function formatPhoneNumber(phone) {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('91')) {
        return `+91${cleaned}`; // Add India country code
    }
    return `+${cleaned}`;
}
// Add these near the top of your file after other imports

// Add this route to handle notifications
// Add this debugging middleware
app.use((req, res, next) => {
    console.log('Request body:', req.body);
    next();
});

// Add this debugging middleware at the top of your routes
app.post("/notify-donors", async (req, res) => {
    try {
        const { donors } = req.body;
        
        // Debug logs
        console.log('Environment variables:', {
            sid: process.env.TWILIO_ACCOUNT_SID ? 'Set' : 'Missing',
            token: process.env.TWILIO_AUTH_TOKEN ? 'Set' : 'Missing',
            phone: process.env.TWILIO_PHONE_NUMBER
        });
        
        console.log('Received donors:', donors);

        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
            throw new Error('Twilio credentials are not properly configured');
        }

        if (!donors || donors.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No donors provided"
            });
        }

        const notifications = await Promise.allSettled(
            donors.map(async (donor) => {
                try {
                    const formattedPhone = formatPhoneNumber(donor.contact);
                    console.log(`Attempting to send SMS to ${formattedPhone}`);

                    const message = await client.messages.create({
                        body: `Dear ${donor.name}, Thank you for your food donation! Your donation of ${donor.servings} servings has been accepted.`,
                        to: formattedPhone,
                        from: process.env.TWILIO_PHONE_NUMBER
                    });

                    console.log(`SMS sent successfully to ${donor.name}, SID: ${message.sid}`);
                    
                    // Remove donor from database
                    await Donor.findByIdAndDelete(donor._id);
                    
                    return { success: true, sid: message.sid, phone: formattedPhone };
                } catch (err) {
                    console.error(`Failed to send SMS to ${donor.name}:`, err);
                    return { success: false, error: err.message, phone: donor.contact };
                }
            })
        );

        const successCount = notifications.filter(n => n.status === 'fulfilled').length;

        res.json({
            success: successCount > 0,
            message: `Successfully notified ${successCount} out of ${donors.length} donors`,
            details: notifications
        });

    } catch (error) {
        console.error("Notification error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send notifications",
            error: error.message
        });
    }
});

// Update phone formatting function
function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Add India country code if not present
    if (!cleaned.startsWith('91')) {
        cleaned = '91' + cleaned;
    }
    
    // Ensure it starts with +
    if (!cleaned.startsWith('+')) {
        cleaned = '+' + cleaned;
    }
    
    console.log(`Formatted phone number: ${cleaned}`);
    return cleaned;
}
// 🔹 Verify NGO Secret Key
app.post("/verify-ngo", async (req, res) => {
    try {
        let { secretKey } = req.body;
        if (!secretKey || !secretKey.trim()) {
            return res.status(400).json({ success: false, message: "Secret key is required" });
        }
        // Ensure same case as saved
        secretKey = secretKey.trim().toLowerCase();
    
        const ngo = await NGO.findOne({ secretKey });
        if (ngo) {
            res.json({ 
                success: true, 
                message: "Secret key verified successfully",
                ngo: { name: ngo.ngoName, address: ngo.address }
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: "Invalid secret key"
            });
        }
    } catch (error) {
        console.error("NGO verification error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error during verification"
        });
    }
});
// 🔹 API to verify secret key for NGO Dashboard access
// In your server.js file, update the verify-ngo endpoint
// app.post("/verify-ngo", async (req, res) => {
//     try {
//         const { secretKey } = req.body;
//         if (!secretKey) {
//             return res.status(400).json({ success: false, message: "Secret key is required" });
//         }

//         const ngo = await NGO.findOne({ secretKey });
//         if (ngo) {
//             res.json({ 
//                 success: true, 
//                 message: "Secret key verified successfully",
//                 ngo: { name: ngo.name, address: ngo.address }
//             });
//         } else {
//             res.json({ 
//                 success: false, 
//                 message: "Invalid secret key"
//             });
//         }
//     } catch (error) {
//         console.error("NGO verification error:", error);
//         res.status(500).json({ 
//             success: false, 
//             message: "Server error during verification"
//         });
//     }
// });

// ✅ Update Donor Status when NGO selects them
app.post("/select-donor", async (req, res) => {
    try {
        const { donorId } = req.body;
        const donor = await Donor.findById(donorId);

        if (!donor) return res.status(404).json({ message: "Donor not found" });

        donor.status = "Selected";
        await donor.save();

        res.status(200).json({ message: "Donor has been selected and notified." });
    } catch (error) {
        console.error("Error selecting donor:", error);
        res.status(500).json({ message: "Error selecting donor" });
    }
});  

// ✅ Get Donors including their status
// Update the donors endpoint with better error handling
app.get("/donors", async (req, res) => {
    try {
        const donors = await Donor.find().sort({ createdAt: -1 });
        console.log("Fetched donors:", donors.length); // Debug log
        res.status(200).json(donors);
    } catch (error) {
        console.error("Fetch donors error:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching donors",
            error: error.message 
        });
    }
});

app.post("/send-notifications", async (req, res) => {
    const { donorIds } = req.body;

    // ✅ Update the database to mark selected donors as notified
    await Donor.updateMany(
        { _id: { $in: donorIds } },
        { $set: { notified: true } }
    );

    res.json({ success: true, message: "Notifications sent successfully!" });
});

app.post("/donate", async (req, res) => {
    try {
        const { name, contact, address, email, foodType, servings } = req.body;
        
        // Validate input
        if (!name || !contact || !address || !email || !foodType || !servings) {
            console.log("Missing fields:", { name, contact, address, email, foodType, servings });
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // Create new donation
        const newDonation = new Donor({
            name,
            contact,
            address,
            email,
            foodType,
            servings: Number(servings)
        });

        // Save to database
        await newDonation.save();
        
        res.status(201).json({ 
            success: true, 
            message: "Donation submitted successfully!" 
        });
    } catch (error) {
        console.error("Donation submission error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error submitting donation", 
            error: error.message 
        });
    }
});

app.post("/notify-donor/:id", async (req, res) => {
    try {
        const donorId = req.params.id;
        console.log(`Notification sent to donor: ${donorId}`);
        res.json({ success: true, message: "Notification sent!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending notification" });
    }
});



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
