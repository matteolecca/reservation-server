"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHECK_REGISTRATION = exports.UPDATE_USER_REGISTERED_DEVICE = exports.REGISTER_USER_DEVICE = exports.GET_NEXT_BOOKINGS = exports.GET_PAST_BOOKINGS = exports.DELETE_BOOKING = exports.INSERT_BOOKING = exports.GET_BOOKING = exports.GET_BOOKINGS = exports.CHECK_EMAIL = exports.CHECK_USERNAME = exports.UPDATE_PASSWORD = exports.GET_USER_BY_ID = exports.CREATE_USER = exports.GET_USER = exports.GET_USERS = void 0;
exports.GET_USERS = 'SELECT * FROM user';
exports.GET_USER = 'SELECT * FROM user  WHERE email = ? OR username = ?';
exports.CREATE_USER = 'INSERT INTO user (id, email, username, password) values(?,?,?,?)';
exports.GET_USER_BY_ID = 'SELECT email, username FROM user  WHERE ID = ? LIMIT 1';
exports.UPDATE_PASSWORD = 'UPDATE user SET password = ? WHERE id = ?';
exports.CHECK_USERNAME = 'SELECT COUNT(*) as exist FROM user WHERE username = ?';
exports.CHECK_EMAIL = 'SELECT COUNT(*) as exist FROM user WHERE email = ?';
/* USER BOOKINGS*/
exports.GET_BOOKINGS = 'SELECT * FROM bookings bookings.date, bookings.desk, sites.siteName as site FROM bookings JOIN sites WHERE bookings.site = sites.id AND userId = ? ORDER BY date LIMIT 10';
exports.GET_BOOKING = 'SELECT  bookings.id, bookings.date, bookings.desk, sites.siteName as site FROM bookings JOIN sites WHERE bookings.site = sites.id AND userId = ? AND bookings.id = ? LIMIT 1';
exports.INSERT_BOOKING = 'INSERT INTO bookings ( date, site, desk, userId) values(?,?,?,?)';
exports.DELETE_BOOKING = 'DELETE FROM bookings WHERE id = ? AND userID = ?';
exports.GET_PAST_BOOKINGS = 'SELECT  bookings.id, bookings.date, bookings.desk, sites.siteName as site FROM bookings JOIN sites WHERE bookings.site = sites.id  AND userId = ? and date < curdate() ORDER BY DATE(date) DESC LIMIT 10 OFFSET ? ';
exports.GET_NEXT_BOOKINGS = 'SELECT  bookings.id, bookings.date, bookings.desk, sites.siteName as site FROM bookings JOIN sites WHERE bookings.site = sites.id  AND userId = ? and date >= curdate() ORDER BY DATE(date) ASC ';
/**NOTIFICATIONS */
exports.REGISTER_USER_DEVICE = 'INSERT into registered_devices (userId, deviceToken) VALUES (?,?)';
exports.UPDATE_USER_REGISTERED_DEVICE = 'UPDATE registered_devices SET userId = ? WHERE deviceToken = ?';
exports.CHECK_REGISTRATION = 'SELECT COUNT(*) AS count from registered_devices WHERE deviceToken = ?';
