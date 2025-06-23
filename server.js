const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Replace this with your actual NetSuite Scriptlet URL
const NETSUITE_URL = 'https://8869626-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=3554&deploy=1&compid=8869626_SB1&ns-at=AAEJ7tMQRW8GhQpSh88qRov5IWOGJFAcclF9k2jwFWXfnMw7RIM';

app.post('/approve', async (req, res) => {
  try {
    const response = await axios.post(NETSUITE_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0' // Bypass NetSuite User-Agent restriction
      }
    });

    res.status(200).json({
      message: '✅ Forwarded to NetSuite',
      response: response.data
    });
  } catch (error) {
    console.error("❌ Proxy Error:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      detail: error.response?.data || 'Failed forwarding to NetSuite'
    });
  }
});

app.get('/', (req, res) => {
  res.send('✅ NetSuite approval proxy is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
