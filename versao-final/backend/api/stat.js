module.exports = app => {
    
    
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    });

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0
                };
                res.json(stat || defaultStat);
            });
    };

    /*
    // Função temporária para retornar uma mensagem enquanto o MongoDB não está configurado
    const get = (req, res) => {
        res.status(200).json({ message: 'Rota /stats desativada temporariamente até configurar o MongoDB' });
    };
*/
    return { Stat, get };
};