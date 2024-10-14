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
    const { name, image, manufacturer, year_of_issue, screen_diagonal, country_of_manufacture, memory_capacity, screen_refresh_rate, NFC, ESIM, wireless_charging, price} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO phones (name, image, manufacturer, year_of_issue, screen_diagonal, country_of_manufacture, memory_capacity, screen_refresh_rate, NFC, ESIM, wireless_charging, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [name, image, manufacturer, year_of_issue, screen_diagonal, country_of_manufacture, memory_capacity, screen_refresh_rate, NFC, ESIM, wireless_charging, price]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Обновление телефона по ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, image, manufacturer, year_of_issue, screen_diagonal, country_of_manufacture, memory_capacity, screen_refresh_rate, NFC, ESIM, wireless_charging, price} = req.body;
    try {
        const result = await pool.query(
            'UPDATE phones SET name = $1, image = $2, manufacturer = $3, year_of_issue = $4, screen_diagonal = $5, country_of_manufacture = $6, memory_capacity = $7, screen_refresh_rate = $8, NFC = $9, ESIM = $10, wireless_charging = $11, feature10 = $12 WHERE id = $13 RETURNING *',
            [name, image, manufacturer, year_of_issue, screen_diagonal, country_of_manufacture, memory_capacity, screen_refresh_rate, NFC, ESIM, wireless_charging, price, id]
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
