const db = require("../database/db");

const createHoaDon = (data) => {
  // lấy thông tin phòng

  const phong = db
    .prepare(
      `
        SELECT *
        FROM PHONG
        WHERE maPhong = ?
    `,
    )
    .get(data.maPhong);

  // tính điện

  const soDien = data.chiSoDienMoi - phong.chiSoDien;

  const tienDien = soDien * 3500;

  // tính nước

  const soNuoc = data.chiSoNuocMoi - phong.chiSoNuoc;

  const tienNuoc = soNuoc * 15000;

  // tổng tiền

  const tongTien =
    data.tienPhong + tienDien + tienNuoc + data.tienVeSinh + data.tienGuiXe;

  // insert hóa đơn

  db.prepare(
    `
        INSERT INTO HOADON
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    data.maHoaDon,

    data.maHopDong,

    data.thang,
    data.nam,

    phong.chiSoDien,
    data.chiSoDienMoi,

    phong.chiSoNuoc,
    data.chiSoNuocMoi,

    data.tienPhong,
    tienDien,
    tienNuoc,

    data.tienVeSinh,
    data.tienGuiXe,

    0,

    tongTien,

    "Chưa thanh toán",
  );

  // update chỉ số mới

  db.prepare(
    `
        UPDATE PHONG
        SET
            chiSoDien = ?,
            chiSoNuoc = ?
        WHERE maPhong = ?
    `,
  ).run(data.chiSoDienMoi, data.chiSoNuocMoi, data.maPhong);
};

const getAllHoaDon = () => {
  return db
    .prepare(
      `
        SELECT *
        FROM HOADON
    `,
    )
    .all();
};

const findHoaDonByMa = (maHoaDon) => {
  return db
    .prepare(
      `
        SELECT *
        FROM HOADON
        WHERE maHoaDon = ?
    `,
    )
    .get(maHoaDon);
};

const updateTrangThaiHoaDon = (maHoaDon) => {
  db.prepare(
    `
        UPDATE HOADON
        SET trangThai = 'Đã thanh toán'
        WHERE maHoaDon = ?
    `,
  ).run(maHoaDon);
};

module.exports = {
  createHoaDon,
  getAllHoaDon,
  findHoaDonByMa,
  updateTrangThaiHoaDon,
};
