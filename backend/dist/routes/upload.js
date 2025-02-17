"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${(0, uuid_1.v4)()}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        res.json({
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`
        });
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});
exports.default = router;
