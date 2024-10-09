const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const PORT = 5000;
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 200);
    });
    next();
});

// Эндпоинт для логина
server.post('/api/login', (req, res) => {
    try {
        const {login, password} = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const {users = []} = db;

        const userFromBd = users.find(
            (user) => user.login === login && user.password === password,
        );

        if (userFromBd) {
            const {accessToken, refreshToken} = userFromBd;
            return res.json({
                accessToken,
                refreshToken
            });
        }

        return res.status(403).json({message: 'User not found'});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
});

server.get('/api/profiles', (req, res) => {
    try {
        const {authorization} = req.headers
        const token = authorization.split('Bearer ')[1];

        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const {profiles = []} = db;

        console.log(token, profiles)

        const profileFromBd = profiles.find(
            (user) => user.accessToken === token,
        );

        if (profileFromBd) {
            delete profileFromBd.accessToken;
            return res.status(200).json({
                ...profileFromBd
            });
        }

        return res.status(403).json({message: 'Token is dead'});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
})


server.use(router);

// запуск сервера
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
});