export const GET_USERS = 'SELECT * FROM user';
export const GET_USER = 'SELECT * FROM user  WHERE email = ? OR username = ?';
export const CREATE_USER = 'INSERT INTO user (id, email, username, password) values(?,?,?,?)';
export const GET_USER_BY_ID = 'SELECT email, username FROM user  WHERE ID = ? LIMIT 1';
export const UPDATE_PASSWORD = 'UPDATE user SET password = ? WHERE id = ?';
export const CHECK_USERNAME = 'SELECT COUNT(*) as exist FROM user WHERE username = ?';
export const CHECK_EMAIL = 'SELECT COUNT(*) as exist FROM user WHERE email = ?';
/* USER BOOKINGS*/
export const GET_BOOKINGS = 'SELECT * FROM bookings bookings.date, bookings.desk, sites.siteName as site FROM bookings JOIN sites WHERE bookings.site = sites.id AND userId = ? ORDER BY date LIMIT 10';
export const GET_BOOKING = 'SELECT  bookings.id, bookings.date, bookings.desk, sites.siteName as site FROM bookings JOIN sites WHERE bookings.site = sites.id AND userId = ? AND bookings.id = ? LIMIT 1';
export const INSERT_BOOKING = 'INSERT INTO bookings ( date, site, desk, userId) values(?,?,?,?)';
export const DELETE_BOOKING = 'DELETE FROM bookings WHERE id = ? AND userID = ?';
export const GET_PAST_BOOKINGS = 'SELECT  bookings.id, bookings.date, bookings.desk, sites.siteName as site FROM bookings JOIN sites WHERE bookings.site = sites.id  AND userId = ? and date < curdate() ORDER BY DATE(date) DESC LIMIT 10 OFFSET ? ';
export const GET_NEXT_BOOKINGS = 'SELECT  bookings.id, bookings.date, bookings.desk, sites.siteName as site FROM bookings JOIN sites WHERE bookings.site = sites.id  AND userId = ? and date >= curdate() ORDER BY DATE(date) ASC ';

/**NOTIFICATIONS */
export const REGISTER_USER_DEVICE = 'INSERT into registered_devices (userId, deviceToken) VALUES (?,?)';
export const UPDATE_USER_REGISTERED_DEVICE = 'UPDATE registered_devices SET userId = ? WHERE deviceToken = ?';
export const CHECK_REGISTRATION = 'SELECT COUNT(*) AS count from registered_devices WHERE deviceToken = ?';
export const GET_USER_REGISTERED_DEVICES = 'SELECT deviceToken FROM registered_devices WHERE userId = ?';
/**CRON JOBS */
export const CHECK_TOMORROW_RESERVATION = 'SELECT * FROM bookings join registered_devices where registered_devices.userId = bookings.userId and DATE(date) IN (CURDATE() + INTERVAL 1 DAY)  GROUP BY registered_devices.deviceToken;';
export const GET_EMAILS = 'SELECT email from user group by email';
