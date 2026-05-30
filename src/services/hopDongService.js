const db = require("../database/db");

const createHopDong = (data) => {
  // thêm hợp đồng
  const stmt = db.prepare(`
        INSERT INTO HOPDONG
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

  stmt.run(
    data.maHopDong,
    data.maPhong,
    data.maKH,
    data.ngayBatDau,
    data.giaThue,
    data.tienCoc,
    data.chiPhiDichVu,
    "Đang thuê",
  );

  // cập nhật trạng thái phòng
  db.prepare(
    `
        UPDATE PHONG
        SET trangThai = 'Đã thuê'
        WHERE maPhong = ?
    `,
  ).run(data.maPhong);
};

const getAllHopDong = () => {
  return db
    .prepare(
      `
        SELECT *
        FROM HOPDONG
    `,
    )
    .all();
};

const getPhongTrong = () => {

    return db.prepare(`
        SELECT *
        FROM PHONG
        WHERE trangThai = 'Trống'
    `).all();
};

const findHopDongByMa = (maHopDong) => {

    return db.prepare(`
        SELECT *
        FROM HOPDONG
        WHERE maHopDong = ?
    `).get(maHopDong);
};

const deleteHopDong = (maHopDong) => {

    // tìm hợp đồng

    const hopDong = db.prepare(`
        SELECT *
        FROM HOPDONG
        WHERE maHopDong = ?
    `).get(maHopDong);

    // cập nhật phòng

    db.prepare(`
        UPDATE PHONG
        SET trangThai = 'Trống'
        WHERE maPhong = ?
    `).run(hopDong.maPhong);

    // xóa hợp đồng

    db.prepare(`
        DELETE FROM HOPDONG
        WHERE maHopDong = ?
    `).run(maHopDong);
};


module.exports = {
    createHopDong,
    getAllHopDong,
    getPhongTrong,
    findHopDongByMa,
    deleteHopDong
};
