const Database = require("better-sqlite3");

const db = new Database("nhatro.db");

db.prepare(
  `
CREATE TABLE IF NOT EXISTS PHONG (
    maPhong TEXT PRIMARY KEY,
    loaiPhong TEXT,
    giaThue REAL,
    chiSoDien INTEGER,
    chiSoNuoc INTEGER,
    trangThai TEXT
)
`,
).run();

db.prepare(
  `
CREATE TABLE IF NOT EXISTS KHACHHANG (
    maKH TEXT PRIMARY KEY,
    hoTen TEXT,
    ngaySinh TEXT,
    cccd TEXT,
    sdt TEXT,
    queQuan TEXT
)
`,
).run();

db.prepare(
  `
CREATE TABLE IF NOT EXISTS HOPDONG (
    maHopDong TEXT PRIMARY KEY,

    maPhong TEXT,

    maKH TEXT,

    ngayBatDau TEXT,

    giaThue REAL,

    tienCoc REAL,

    tienVeSinh REAL,

    tienGuiXe REAL,

    tienDienMotSo REAL,

    tienNuocMotKhoi REAL,

    trangThai TEXT
)
`,
).run();

db.prepare(
  `
CREATE TABLE IF NOT EXISTS HOADON (
    maHoaDon TEXT PRIMARY KEY,

    maHopDong TEXT,

    thang INTEGER,
    nam INTEGER,

    chiSoDienCu INTEGER,
    chiSoDienMoi INTEGER,

    chiSoNuocCu INTEGER,
    chiSoNuocMoi INTEGER,

    tienPhong REAL,
    tienDien REAL,
    tienNuoc REAL,

    tienVeSinh REAL,
    tienGuiXe REAL,

    noThangTruoc REAL,

    tongTien REAL,

    trangThai TEXT
)
`,
).run();

db.prepare(
  `
CREATE TABLE IF NOT EXISTS THANHTOAN (
    maThanhToan TEXT PRIMARY KEY,

    maHoaDon TEXT,

    ngayThanhToan TEXT,

    soTien REAL,

    FOREIGN KEY (maHoaDon)
    REFERENCES HOADON(maHoaDon)
)
`,
).run();

db.prepare(
  `
CREATE TABLE IF NOT EXISTS CONGNO (
    maCongNo TEXT PRIMARY KEY,

    maHoaDon TEXT,

    noGoc REAL,
    tienLai REAL,
    tongNo REAL,

    FOREIGN KEY (maHoaDon)
    REFERENCES HOADON(maHoaDon)
)
`,
).run();
module.exports = db;

// ======================
// XÓA TOÀN BỘ DỮ LIỆU CŨ
// ======================

db.prepare(`DELETE FROM CONGNO`).run();

db.prepare(`DELETE FROM THANHTOAN`).run();

db.prepare(`DELETE FROM HOADON`).run();

db.prepare(`DELETE FROM HOPDONG`).run();

db.prepare(`DELETE FROM KHACHHANG`).run();

db.prepare(`DELETE FROM PHONG`).run();
