const { Pool } = require('pg');

// ฟังก์ชั่นสำหรับเชื่อมต่อกับฐานข้อมูล PostgreSQL
function getDbPool() {
    return new Pool({
        user: 'postgres',           // เปลี่ยนเป็น user ของคุณ
        host: 'localhost',          // เปลี่ยนเป็น host ของคุณ
        database: 'KsiPo',          // ชื่อฐานข้อมูล
        password: 'Oo860009186',    // เปลี่ยนเป็นรหัสผ่านของคุณ
        port: 5432,                 // เปลี่ยนเป็น port ของคุณ (ค่าเริ่มต้นคือ 5432)
    });
}

module.exports = getDbPool;

// ฟังก์ชั่นทดสอบการเชื่อมต่อ
async function testConnection() {
    const pool = getDbPool();
    try {
        await pool.query('SELECT 1');
        console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
    } catch (err) {
        console.error('เชื่อมต่อฐานข้อมูลล้มเหลว:', err);
    } finally {
        await pool.end();
    }
}

// เรียกใช้ฟังก์ชั่นทดสอบ (uncomment เพื่อทดสอบ)
testConnection();