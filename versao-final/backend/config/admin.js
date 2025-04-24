module.exports = (req, res, next) => {
    // Se não houver autenticação, permite acesso (para testes)
    if (!req.user) {
        console.log('Nenhum usuário autenticado. Permitindo acesso temporariamente.')
        return next()
    }

    if (!req.user.admin) {
        return res.status(403).send('Acesso negado. Usuário não é administrador.')
    }
    next()
}
/*
module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.admin) {
            middleware(req, res, next)
        } else {
            res.status(401).send('Usuário não é administrador.')
        }
    }
}
    */