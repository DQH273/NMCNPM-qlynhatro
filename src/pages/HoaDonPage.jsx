import { useState } from "react";

import {
  Container,
  Form,
  Button,
  Card,
  Table,
  Row,
  Col,
  Badge,
} from "react-bootstrap";

// =========================
// DỮ LIỆU HỢP ĐỒNG
// =========================

const hopDongData = {
  P101: {
    maHopDong: "HD01",

    tienPhong: 2500000,

    chiSoDienCu: 120,

    chiSoNuocCu: 30,

    tienVeSinh: 50000,

    tienGuiXe: 100000,

    tienDienMotSo: 3500,

    tienNuocMotKhoi: 15000,
  },

  P102: {
    maHopDong: "HD02",

    tienPhong: 3500000,

    chiSoDienCu: 200,

    chiSoNuocCu: 45,

    tienVeSinh: 70000,

    tienGuiXe: 150000,

    tienDienMotSo: 4000,

    tienNuocMotKhoi: 18000,
  },
};

// =========================
// TẠO MÃ HÓA ĐƠN
// =========================

const generateMaHoaDon = (list) => {
  if (list.length === 0) {
    return "HDON01";
  }

  const lastHoaDon = list[list.length - 1];

  const number = parseInt(lastHoaDon.maHoaDon.replace("HDON", ""));

  const newNumber = number + 1;

  return `HDON${String(newNumber).padStart(2, "0")}`;
};

function HoaDonPage() {
  // =========================
  // DANH SÁCH HÓA ĐƠN
  // =========================

  const [hoaDonList, setHoaDonList] = useState([]);

  const [searchPhong, setSearchPhong] = useState("");

  // =========================
  // EDIT MODE
  // =========================

  const [isEditing, setIsEditing] = useState(false);

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    maHoaDon: "HDON01",

    ngayTao: new Date().toLocaleString("vi-VN"),

    maHopDong: "",

    maPhong: "",

    chiSoDienCu: 0,

    chiSoDienMoi: "",

    chiSoNuocCu: 0,

    chiSoNuocMoi: "",

    tienPhong: "",

    tienVeSinh: "",

    tienGuiXe: "",

    tienDienMotSo: "",

    tienNuocMotKhoi: "",

    trangThai: "Chưa thanh toán",
  });

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nếu nhập mã phòng

    if (name === "maPhong") {
      const room = hopDongData[value];

      // Nếu tìm thấy phòng

      if (room) {
        setFormData({
          ...formData,

          maPhong: value,

          maHopDong: room.maHopDong,

          tienPhong: room.tienPhong,

          chiSoDienCu: room.chiSoDienCu,

          chiSoNuocCu: room.chiSoNuocCu,

          tienVeSinh: room.tienVeSinh,

          tienGuiXe: room.tienGuiXe,

          tienDienMotSo: room.tienDienMotSo,

          tienNuocMotKhoi: room.tienNuocMotKhoi,
        });

        return;
      }
    }

    // Input thường

    setFormData({
      ...formData,

      [name]: value,
    });
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = () => {
    // Validation

    if (
      !formData.maHopDong ||
      !formData.maPhong ||
      !formData.chiSoDienMoi ||
      !formData.chiSoNuocMoi
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");

      return;
    }

    // =========================
    // TÍNH ĐIỆN
    // =========================

    const soDien = formData.chiSoDienMoi - formData.chiSoDienCu;

    const tienDien = soDien * formData.tienDienMotSo;

    // =========================
    // TÍNH NƯỚC
    // =========================

    const soNuoc = formData.chiSoNuocMoi - formData.chiSoNuocCu;

    const tienNuoc = soNuoc * formData.tienNuocMotKhoi;

    // =========================
    // TỔNG TIỀN
    // =========================

    const tongTien =
      Number(formData.tienPhong) +
      tienDien +
      tienNuoc +
      Number(formData.tienVeSinh) +
      Number(formData.tienGuiXe);

    // =========================
    // OBJECT HÓA ĐƠN
    // =========================

    const newHoaDon = {
      ...formData,

      tienDien,

      tienNuoc,

      tongTien,
    };

    // =========================
    // UPDATE
    // =========================

    if (isEditing) {
      const updatedList = hoaDonList.map((item) =>
        item.maHoaDon === formData.maHoaDon ? newHoaDon : item,
      );

      setHoaDonList(updatedList);

      setIsEditing(false);

      alert("Cập nhật hóa đơn thành công");
    }

    // =========================
    // CREATE
    // =========================
    else {
      setHoaDonList([...hoaDonList, newHoaDon]);

      alert("Tạo hóa đơn thành công");
    }

    // =========================
    // RESET FORM
    // =========================

    setFormData({
      maHoaDon: generateMaHoaDon([...hoaDonList, newHoaDon]),

      ngayTao: new Date().toLocaleString("vi-VN"),

      maHopDong: "",

      maPhong: "",

      chiSoDienCu: 0,

      chiSoDienMoi: "",

      chiSoNuocCu: 0,

      chiSoNuocMoi: "",

      tienPhong: "",

      tienVeSinh: "",

      tienGuiXe: "",

      tienDienMotSo: "",

      tienNuocMotKhoi: "",

      trangThai: "Chưa thanh toán",
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (maHoaDon) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa hóa đơn này?");

    if (!confirmDelete) {
      return;
    }

    const newList = hoaDonList.filter((item) => item.maHoaDon !== maHoaDon);

    setHoaDonList(newList);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (item) => {
    setFormData(item);

    setIsEditing(true);
  };

  // =========================
  // THANH TOÁN
  // =========================

  const handlePaid = (maHoaDon) => {
    const updatedList = hoaDonList.map((item) => {
      if (item.maHoaDon === maHoaDon) {
        return {
          ...item,

          trangThai: "Đã thanh toán",
        };
      }

      return item;
    });

    setHoaDonList(updatedList);
  };

  // =========================
  // SEARCH
  // =========================

  const filteredHoaDon = hoaDonList.filter((item) =>
    item.maPhong.toLowerCase().includes(searchPhong.toLowerCase()),
  );

  return (
    <Container className="mt-5">
      {/* FORM */}

      <Card className="shadow p-4">
        <h2 className="text-center mb-4">Lập hóa đơn</h2>

        <Form>
          {/* MÃ HÓA ĐƠN + NGÀY TẠO */}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mã hóa đơn</Form.Label>

                <Form.Control type="text" value={formData.maHoaDon} readOnly />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ngày tạo</Form.Label>

                <Form.Control type="text" value={formData.ngayTao} readOnly />
              </Form.Group>
            </Col>
          </Row>

          {/* MÃ HĐ + PHÒNG */}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mã hợp đồng</Form.Label>

                <Form.Control type="text" value={formData.maHopDong} readOnly />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mã phòng</Form.Label>

                <Form.Control
                  type="text"
                  name="maPhong"
                  value={formData.maPhong}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* TIỀN PHÒNG */}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tiền phòng</Form.Label>

                <Form.Control
                  type="number"
                  value={formData.tienPhong}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          {/* CHỈ SỐ ĐIỆN */}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Chỉ số điện cũ</Form.Label>

                <Form.Control
                  type="number"
                  value={formData.chiSoDienCu}
                  readOnly
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Chỉ số điện mới</Form.Label>

                <Form.Control
                  type="number"
                  name="chiSoDienMoi"
                  value={formData.chiSoDienMoi}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* CHỈ SỐ NƯỚC */}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Chỉ số nước cũ</Form.Label>

                <Form.Control
                  type="number"
                  value={formData.chiSoNuocCu}
                  readOnly
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Chỉ số nước mới</Form.Label>

                <Form.Control
                  type="number"
                  name="chiSoNuocMoi"
                  value={formData.chiSoNuocMoi}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* PHÍ DỊCH VỤ */}

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Tiền vệ sinh</Form.Label>

                <Form.Control
                  type="number"
                  value={formData.tienVeSinh}
                  readOnly
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Tiền gửi xe</Form.Label>

                <Form.Control
                  type="number"
                  value={formData.tienGuiXe}
                  readOnly
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Giá điện / số</Form.Label>

                <Form.Control
                  type="number"
                  value={formData.tienDienMotSo}
                  readOnly
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Giá nước / khối</Form.Label>

                <Form.Control
                  type="number"
                  value={formData.tienNuocMotKhoi}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          {/* BUTTON */}

          <Button
            variant={isEditing ? "warning" : "success"}
            className="w-100"
            onClick={handleSubmit}
          >
            {isEditing ? "Cập nhật hóa đơn" : "Tạo hóa đơn"}
          </Button>
        </Form>
      </Card>

      {/* SEARCH */}

      <Form.Group className="mt-4">
        <Form.Control
          type="text"
          placeholder="Tìm theo mã phòng..."
          value={searchPhong}
          onChange={(e) => setSearchPhong(e.target.value)}
        />
      </Form.Group>

      {/* TABLE */}

      <Card className="shadow p-4 mt-4">
        <h3 className="mb-4">Danh sách hóa đơn</h3>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Mã HD</th>

              <th>Ngày tạo</th>

              <th>Mã phòng</th>

              <th>Tiền điện</th>

              <th>Tiền nước</th>

              <th>Tổng tiền</th>

              <th>Trạng thái</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredHoaDon.map((item, index) => (
              <tr key={index}>
                <td>{item.maHoaDon}</td>

                <td>{item.ngayTao}</td>

                <td>{item.maPhong}</td>

                <td>{item.tienDien.toLocaleString()} VNĐ</td>

                <td>{item.tienNuoc.toLocaleString()} VNĐ</td>

                <td className="fw-bold text-success">
                  {item.tongTien.toLocaleString()} VNĐ
                </td>

                <td>
                  <Badge
                    bg={
                      item.trangThai === "Đã thanh toán" ? "success" : "warning"
                    }
                  >
                    {item.trangThai}
                  </Badge>
                </td>

                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      Sửa
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handlePaid(item.maHoaDon)}
                    >
                      Thanh toán
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.maHoaDon)}
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default HoaDonPage;
