const express = require('express');
const router = express.Router();
const pool = require('../db');

// Получение всех телефонов
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM phones');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Добавление нового телефона
router.post('/', async (req, res) => {
    const { name, image, feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9, feature10 } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO phones (name, image, feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9, feature10) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [name, image, feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9, feature10]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Обновление телефона по ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, image, feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9, feature10 } = req.body;
    try {
        const result = await pool.query(
            'UPDATE phones SET name = $1, image = $2, feature1 = $3, feature2 = $4, feature3 = $5, feature4 = $6, feature5 = $7, feature6 = $8, feature7 = $9, feature8 = $10, feature9 = $11, feature10 = $12 WHERE id = $13 RETURNING *',
            [name, image, feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9, feature10, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Удаление телефона по ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM phones WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
