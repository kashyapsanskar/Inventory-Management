"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../Controllers/dashboardController");
const router = (0, express_1.Router)();
router.get("/", dashboardController_1.getDashboardMetrics); //http://localhost:8000/dashboard
exports.default = router;
