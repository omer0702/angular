const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const permissionRoutes = require('./routes/permission.routes');
const userPermissionRoutes = require('./routes/userPermission.routes');

const logger = require('./middleware/logger.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/user-permissions', userPermissionRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
