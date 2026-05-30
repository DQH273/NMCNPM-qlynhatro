const db = require("./src/database/db");

console.log("Database connected!");

// ======================
// DỮ LIỆU PHÒNG
// ======================

db.prepare(
  `
INSERT OR IGNORE INTO PHONG
VALUES (
    'P101',
    'Phòng đơn',
    2500000,
    120,
    30,
    'Đã thuê'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO PHONG
VALUES (
    'P102',
    'Phòng đôi',
    3500000,
    200,
    45,
    'Đã thuê'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO PHONG
VALUES (
    'P103',
    'Phòng đôi',
    5000000,
    150,
    35,
    'Trống'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO PHONG
VALUES (
    'P104',
    'Phòng đơn',
    2700000,
    180,
    40,
    'Đã thuê'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO PHONG
VALUES (
    'P105',
    'Phòng đôi',
    3800000,
    210,
    50,
    'Trống'
)
`,
).run();

// ======================
// DỮ LIỆU KHÁCH HÀNG
// ======================

db.prepare(
  `
INSERT OR IGNORE INTO KHACHHANG
VALUES (
    'KH01',
    'Nguyen Van A',
    '2003-05-10',
    '001203001111',
    '0901111111',
    'Ha Noi'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO KHACHHANG
VALUES (
    'KH02',
    'Tran Thi B',
    '2002-08-15',
    '001203002222',
    '0902222222',
    'Hai Phong'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO KHACHHANG
VALUES (
    'KH03',
    'Le Van C',
    '2001-02-20',
    '001203003333',
    '0903333333',
    'Da Nang'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO KHACHHANG
VALUES (
    'KH04',
    'Pham Thi D',
    '2004-11-01',
    '001203004444',
    '0904444444',
    'Nghe An'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO KHACHHANG
VALUES (
    'KH05',
    'Hoang Van E',
    '2000-07-07',
    '001203005555',
    '0905555555',
    'Nam Dinh'
)
`,
).run();

// ======================
// DỮ LIỆU HỢP ĐỒNG
// ======================

db.prepare(
  `
INSERT OR IGNORE INTO HOPDONG
VALUES (
    'HD01',
    'P101',
    'KH01',
    '2025-01-01',
    2500000,
    2500000,
    50000,
    100000,
    3500,
    15000,
    'Đang thuê'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO HOPDONG
VALUES (
    'HD02',
    'P102',
    'KH02',
    '2025-02-01',
    3500000,
    3500000,
    50000,
    150000,
    3500,
    15000,
    'Đang thuê'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO HOPDONG
VALUES (
    'HD03',
    'P104',
    'KH03',
    '2025-03-01',
    2700000,
    2700000,
    50000,
    100000,
    3500,
    15000,
    'Đang thuê'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO HOPDONG
VALUES (
    'HD04',
    'P101',
    'KH04',
    '2025-04-01',
    2500000,
    2500000,
    50000,
    100000,
    3500,
    15000,
    'Hết hạn'
)
`,
).run();

db.prepare(
  `
INSERT OR IGNORE INTO HOPDONG
VALUES (
    'HD05',
    'P102',
    'KH05',
    '2025-05-01',
    3500000,
    3500000,
    50000,
    150000,
    3500,
    15000,
    'Đang thuê'
)
`,
).run();
