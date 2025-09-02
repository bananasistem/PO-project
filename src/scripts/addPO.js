const express = require('express');
const bodyParser = require('body-parser');
const getDbPool = require('./dbConnect');
const path = require('path');

const app = express();
const pool = getDbPool();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../public')));

// ฟังก์ชั่นสำหรับบันทึกข้อมูล PO
app.post('/add-po', async (req, res) => {
    const { poNumber, prNumber, date, vendor, amount } = req.body;
    try {
        await pool.query(
            'INSERT INTO purchase_orders (po_number, pr_number, date, vendor, amount) VALUES ($1, $2, $3, $4, $5)',
            [poNumber, prNumber, date, vendor, amount]
        );
        res.redirect('/index.html');
    } catch (err) {
        res.status(500).send('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
});


// ฟังก์ชั่นสำหรับแสดงข้อมูล PO ในตารางหน้า po-list.html
app.get('/api/purchase-orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT po_number, pr_number, date, vendor, amount FROM purchase_orders ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
});


app.listen(3000, () => {
    console.log('PO server running on port 3000');
});

