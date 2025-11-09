import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabaseConnection } from './config/db.js';
// Route Files
import inventoryRoutes from "./routes/inventoryRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import orderItemsRoutes from "./routes/orderItemsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount Routers
app.use("/api/inventory", inventoryRoutes);
app.use("/api/customers", customerRoutes);
// API Routes
app.use("/api/staff", staffRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemsRoutes);
app.use("/api/payments", paymentRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Server is running ✅');
});

const startServer = async () => {
    // Test the Supabase connection and wait for it to finish
    await supabaseConnection();
    
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();