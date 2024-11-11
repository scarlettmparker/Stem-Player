import express from 'express';
import fs from 'fs';
import path from 'path';
const cors = require('cors');

const app = express();
const port = 4000;
const routesDirectory = path.join(__dirname, 'routes');

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

fs.readdirSync(routesDirectory).forEach((file) => {
  if (file.endsWith('.ts')) {
    const routeName = file.replace('.ts', '');
    const routePath = path.join(routesDirectory, file);
    const routeModule = require(routePath);

    app.use(`/${routeName}`, routeModule.default);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
