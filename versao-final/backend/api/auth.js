//const { authSecret } = require('../.env')
const authSecret = process.env.AUTH_SECRET
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    // Implementação original (mantida comentada para fácil reversão)
    // const signin = async (req, res) => {
    //     if (!req.body.email || !req.body.password) {
    //         return res.status(400).send('Informe usuário e senha!')
    //     }

    //     const user = await app.db('users')
    //         .where({ email: req.body.email })
    //         .first()

    //     if (!user) return res.status(400).send('Usuário não encontrado!')

    //     const isMatch = bcrypt.compareSync(req.body.password, user.password)
    //     if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

    //     const now = Math.floor(Date.now() / 1000)

    //     const payload = {
    //         id: user.id,
    //         name: user.name,
    //         email: user.email,
    //         admin: user.admin,
    //         iat: now,
    //         exp: now + (60 * 60 * 24 * 3)
    //     }

    //     res.json({
    //         ...payload,
    //         token: jwt.encode(payload, authSecret)
    //     })
    // }

    // Nova implementação simplificada do signin (sem autenticação)
    const signin = async (req, res) => {
        const { email, password } = req.body;
        console.log('Recebendo login:', { email, password });

        if (!email || !password) {
            return res.status(400).send('Informe usuário e senha!');
        }

        // Busca o usuário no banco
        const user = await app.db('users')
            .where({ email })
            .first();

        if (!user) {
            console.log('Usuário não encontrado:', email);
            return res.status(400).send('Usuário não encontrado!');
        }

        // Retorna um "token" fixo e os dados do usuário (sem verificar a senha)
        console.log('Login bem-sucedido para o usuário:', email);
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: 'fake-token' // Token fixo para simplificar
        });
    }

    // Implementação original do validateToken (mantida comentada)
    // const validateToken = async (req, res) => {
    //     const userData = req.body || null
    //     try {
    //         if(userData) {
    //             const token = jwt.decode(userData.token, authSecret)
    //             if(new Date(token.exp * 1000) > new Date()) {
    //                 return res.send(true)
    //             }
    //         }
    //     } catch(e) {
    //         // problema com o token
    //     }

    //     res.send(false)
    // }

    return { signin }; // Removido validateToken, já que não estamos usando autenticação
}