"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const artwork_1 = __importDefault(require("./routes/artwork"));
const upload_1 = __importDefault(require("./routes/upload"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = Number(process.env.PORT) || 5000;
// Debugging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    if (req.body)
        console.log('Body:', req.body);
    next();
});
// CORS configuration
app.use((0, cors_1.default)({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        port: PORT
    });
});
// API routes
app.use('/api', artwork_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use(upload_1.default);
// Error handling
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});
// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press CTRL+C to stop');
}).on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    }
    console.error('Server error:', error);
    process.exit(1);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Closing server...');
    server.close(() => {
        console.log('Server closed');
        prisma.$disconnect();
        process.exit(0);
    });
});
