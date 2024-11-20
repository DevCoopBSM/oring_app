const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://oring.bsm-aripay.kr',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api',
    },
  })
);

app.listen(8080); 