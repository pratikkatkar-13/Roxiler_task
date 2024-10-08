app.get('/api/transactions', async (req, res) => {
    const { search, page = 1, per_page = 10 } = req.query;
    const offset = (page - 1) * per_page;
    
    const queryOptions = {
        offset,
        limit: parseInt(per_page),
    };

    if (search) {
        queryOptions.where = {
            [Op.or]: [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
                { price: { [Op.eq]: parseFloat(search) } }
            ]
        };
    }

    try {
        const transactions = await Product.findAndCountAll(queryOptions);
        res.status(200).json({
            total: transactions.count,
            data: transactions.rows
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions', details: error });
    }
});
