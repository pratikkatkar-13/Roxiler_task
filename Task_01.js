const axios = require('axios');
const { Product } = require('./models'); 


app.get('/api/init', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;
        await Product.bulkCreate(products); 
        res.status(200).json({ message: 'Database initialized successfully with seed data' });
    } catch (error) {
        res.status(500).json({ error: 'Error initializing database', details: error });
    }
});
