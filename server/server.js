const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const microAppsFilePath = path.join(__dirname, 'data', 'microapps.json');
const routesFilePath = path.join(__dirname, 'data', 'routes.json');

// 获取微应用配置
app.get('/api/microapps', (req, res) => {
  fs.readFile(microAppsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading microapps file');
      return;
    }
    res.send(JSON.parse(data));
  });
});

// 更新微应用配置
app.post('/api/microapps', (req, res) => {
  const microapps = req.body;
  fs.writeFile(microAppsFilePath, JSON.stringify(microapps, null, 2), (err) => {
    if (err) {
      res.status(500).send('Error writing microapps file');
      return;
    }
    res.send('Microapps configuration updated successfully');
  });
});

// 获取路由配置
app.get('/api/routes', (req, res) => {
  fs.readFile(routesFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading routes file');
      return;
    }
    res.send(JSON.parse(data));
  });
});

// 更新路由配置
app.post('/api/routes', (req, res) => {
  const routes = req.body;
  fs.writeFile(routesFilePath, JSON.stringify(routes, null, 2), (err) => {
    if (err) {
      res.status(500).send('Error writing routes file');
      return;
    }
    res.send('Routes configuration updated successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});