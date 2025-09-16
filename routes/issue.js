const express = require("express");
const router = express.Router();

// POST /issue - Mock issue route
router.post("/issue", (req, res) => {
	res.json({
		message: {
			ack: {
				status: "ACK"
			}
		},
		error: {
			type: "CONTEXT-ERROR",
			code: "string",
			path: "string",
			message: "string"
		}
	});
});

module.exports = router;

// POST /status-proxy - Send issuestatus.json to http://localhost:8000/issue/decide
router.post("/status-proxy", async (req, res) => {
	const path = require("path");
	const fs = require("fs");
	const fetch = require("node-fetch");
	const filePath = path.join(__dirname, "../data/issuestatus.json");
	fs.readFile(filePath, "utf8", async (err, data) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: "Failed to read issuestatus.json",
				error: err.message
			});
		}
		try {
			const payload = JSON.parse(data);
			const response = await fetch("http://localhost:8000/issue/decide", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const result = await response.json();
			res.json(result);
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Failed to send data to /issue/decide",
				error: error.message
			});
		}
	});
});

// POST /mock-onissue - Respond with onissue.json data
router.post("/mock-onissue", (req, res) => {
	const path = require("path");
	const fs = require("fs");
	const filePath = path.join(__dirname, "../data/onissue.json");
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: "Failed to read onissue.json",
				error: err.message
			});
		}
		try {
			const payload = JSON.parse(data);
			res.json(payload);
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Failed to parse onissue.json",
				error: error.message
			});
		}
	});
});

// POST /decide-proxy - Proxy request body to http://localhost:8000/issue/decide
router.post("/decide-proxy", async (req, res) => {
	const path = require("path");
	const fs = require("fs");
	const fetch = require("node-fetch");
	const filePath = path.join(__dirname, "../data/issue.json");
	fs.readFile(filePath, "utf8", async (err, data) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: "Failed to read issue.json",
				error: err.message
			});
		}
		try {
			const payload = JSON.parse(data);
			const response = await fetch("http://localhost:8000/issue/decide", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const result = await response.json();
			res.json(result);
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Failed to send data to /issue/decide",
				error: error.message
			});
		}
	});
});

// POST /onissue - Send onissue.json to http://localhost:8000/issue/decide
const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

router.post("/onissue", async (req, res) => {
	const filePath = path.join(__dirname, "../data/onissue.json");
	fs.readFile(filePath, "utf8", async (err, data) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: "Failed to read onissue.json",
				error: err.message
			});
		}
		try {
			const payload = JSON.parse(data);
			const response = await fetch("http://localhost:8000/issue/decide", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const result = await response.json();
			res.json(result);
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Failed to send data to /issue/decide",
				error: error.message
			});
		}
	});
});