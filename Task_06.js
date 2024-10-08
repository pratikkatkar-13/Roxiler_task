app.get('/api/combined-data', async (req, res) => {
    const { month } = req.query;

    try {
       
        const statistics = await axios.get(`/api/statistics?month=${month}`);
        const priceRange = await axios.get(`/api/price-range?month=${month}`);
        const categoryDistribution = await axios.get(`/api/category-distribution?month=${month}`);

        res.status(200).json({
            statistics: statistics.data,
            priceRange: priceRange.data,
            categoryDistribution: categoryDistribution.data
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching combined data', details: error });
    }
});
