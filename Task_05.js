app.get('/api/category-distribution', async (req, res) => {
    const { month } = req.query;

    try {
        const transactions = await Product.findAll({
            where: sequelize.where(sequelize.fn('MONTHNAME', sequelize.col('dateOfSale')), month)
        });

        const categoryCount = transactions.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json(categoryCount);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category distribution', details: error });
    }
});
