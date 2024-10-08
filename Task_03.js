app.get('/api/statistics', async (req, res) => {
    const { month } = req.query; 

    try {
        const transactions = await Product.findAll({
            where: sequelize.where(sequelize.fn('MONTHNAME', sequelize.col('dateOfSale')), month)
        });

        const totalSales = transactions.filter(item => item.sold).reduce((sum, item) => sum + item.price, 0);
        const soldItems = transactions.filter(item => item.sold).length;
        const unsoldItems = transactions.filter(item => !item.sold).length;

        res.status(200).json({
            totalSaleAmount: totalSales,
            totalSoldItems: soldItems,
            totalUnsoldItems: unsoldItems
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching statistics', details: error });
    }
});
