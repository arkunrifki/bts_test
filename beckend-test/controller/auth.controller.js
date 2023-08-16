const User = require("../models/User.model"); // Sesuaikan dengan model yang Anda gunakan

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari pengguna berdasarkan username
    const user = await User.findOne({ username });

    // Jika pengguna ditemukan dan password cocok
    if (user && user.password === password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Periksa apakah username atau email sudah ada dalam basis data
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      res.status(409).json({ error: "Username or email already exists" });
    } else {
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: "Registration successful" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
