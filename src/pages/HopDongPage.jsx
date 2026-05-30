import { useState } from "react";

import {
  Container,
  Form,
  Button,
  Card,
  Table,
  Row,
  Col,
} from "react-bootstrap";

// Hàm tự tạo mã hợp đồng

const generateMaHopDong = (list) => {
  if (list.length === 0) {
    return "HD01";
  }

  const lastHopDong = list[list.length - 1];

  const number = parseInt(lastHopDong.maHopDong.replace("HD", ""));

  const newNumber = number + 1;

  return `HD${String(newNumber).padStart(2, "0")}`;
};

function HopDongPage() {
  // Danh sách hợp đồng

  const [hopDongList, setHopDongList] = useState([]);

  const [searchPhong, setSearchPhong] = useState("");

  // Kiểm tra đang sửa hay không

  const [isEditing, setIsEditing] = useState(false);

  // Form data

  const [formData, setFormData] = useState({
    maHopDong: "HD06",

    maPhong: "",

    maKH: "",

    ngayBatDau: "",

    giaThue: "",

    tienCoc: "",

    tienVeSinh: "",

    tienGuiXe: "",

    tienDienMotSo: "",

    tienNuocMotKhoi: "",
  });

  // Xử lý input

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // Submit form

  const handleSubmit = () => {
    // Validation

    if (!formData.maPhong || !formData.maKH || !formData.ngayBatDau) {
      alert("Vui lòng nhập đầy đủ thông tin");

      return;
    }

    // =========================
    // CẬP NHẬT
    // =========================

    if (isEditing) {
      const updatedList = hopDongList.map((item) =>
        item.maHopDong === formData.maHopDong ? formData : item,
      );

      setHopDongList(updatedList);

      alert("Cập nhật hợp đồng thành công");

      setIsEditing(false);
    }

    // =========================
    // THÊM MỚI
    // =========================
    else {
      setHopDongList([...hopDongList, formData]);

      alert("Tạo hợp đồng thành công");
    }

    // Reset form

    setFormData({
      maHopDong: generateMaHopDong([...hopDongList, formData]),

      maPhong: "",

      maKH: "",

      ngayBatDau: "",

      giaThue: "",

      tienCoc: "",

      tienVeSinh: "",

      tienGuiXe: "",

      tienDienMotSo: "",

      tienNuocMotKhoi: "",
    });
  };

  // =========================
  // XÓA
  // =========================

  const handleDelete = (maHopDong) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa hợp đồng này?");

    if (!confirmDelete) {
      return;
    }

    const newList = hopDongList.filter((item) => item.maHopDong !== maHopDong);

    setHopDongList(newList);
  };

  // =========================
  // SỬA
  // =========================

  const handleEdit = (item) => {
    setFormData(item);

    setIsEditing(true);
  };

  const filteredHopDong = hopDongList.filter((item) =>
    item.maPhong.toLowerCase().includes(searchPhong.toLowerCase()),
  );
  return (
    <Container className="mt-5">
      {/* FORM */}

      <Card className="shadow p-4">
        <h2 className="text-center mb-4">Lập hợp đồng</h2>

        <Form>
          {/* Mã hợp đồng */}

          <Form.Group className="mb-3">
            <Form.Label>Mã hợp đồng</Form.Label>

            <Form.Control
              type="text"
              name="maHopDong"
              value={formData.maHopDong}
              readOnly
            />
          </Form.Group>

          {/* Mã phòng */}

          <Form.Group className="mb-3">
            <Form.Label>Mã phòng</Form.Label>

            <Form.Control
              type="text"
              name="maPhong"
              value={formData.maPhong}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Mã khách hàng */}

          <Form.Group className="mb-3">
            <Form.Label>Mã khách hàng</Form.Label>

            <Form.Control
              type="text"
              name="maKH"
              value={formData.maKH}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Ngày bắt đầu */}

          <Form.Group className="mb-3">
            <Form.Label>Ngày bắt đầu</Form.Label>

            <Form.Control
              type="date"
              name="ngayBatDau"
              value={formData.ngayBatDau}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Giá thuê */}

          <Form.Group className="mb-3">
            <Form.Label>Giá thuê</Form.Label>

            <Form.Control
              type="number"
              name="giaThue"
              value={formData.giaThue}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Tiền cọc */}

          <Form.Group className="mb-3">
            <Form.Label>Tiền cọc</Form.Label>

            <Form.Control
              type="number"
              name="tienCoc"
              value={formData.tienCoc}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Tiền vệ sinh + gửi xe */}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tiền vệ sinh</Form.Label>

                <Form.Control
                  type="number"
                  name="tienVeSinh"
                  value={formData.tienVeSinh}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tiền gửi xe</Form.Label>

                <Form.Control
                  type="number"
                  name="tienGuiXe"
                  value={formData.tienGuiXe}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Tiền điện + nước */}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tiền điện / số</Form.Label>

                <Form.Control
                  type="number"
                  name="tienDienMotSo"
                  value={formData.tienDienMotSo}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label>Tiền nước / khối</Form.Label>

                <Form.Control
                  type="number"
                  name="tienNuocMotKhoi"
                  value={formData.tienNuocMotKhoi}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Button */}

          <Button
            variant={isEditing ? "warning" : "primary"}
            className="w-100"
            onClick={handleSubmit}
          >
            {isEditing ? "Cập nhật hợp đồng" : "Tạo hợp đồng"}
          </Button>
        </Form>
      </Card>

      <Form.Group className="mt-5">
        <Form.Control
          type="text"
          placeholder="Tìm theo mã phòng..."
          value={searchPhong}
          onChange={(e) => setSearchPhong(e.target.value)}
        />
      </Form.Group>
      {/* TABLE */}

      <Card className="shadow p-4 mt-5">
        <h3 className="mb-4">Danh sách hợp đồng</h3>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mã HĐ</th>

              <th>Mã phòng</th>

              <th>Mã KH</th>

              <th>Ngày bắt đầu</th>

              <th>Giá thuê</th>

              <th>Tiền vệ sinh</th>

              <th>Tiền gửi xe</th>

              <th>Điện/số</th>

              <th>Nước/khối</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredHopDong.map((item, index) => (
              <tr key={index}>
                <td>{item.maHopDong}</td>

                <td>{item.maPhong}</td>

                <td>{item.maKH}</td>

                <td>{item.ngayBatDau}</td>

                <td>{Number(item.giaThue).toLocaleString()} VNĐ</td>

                <td>{Number(item.tienVeSinh).toLocaleString()} VNĐ</td>

                <td>{Number(item.tienGuiXe).toLocaleString()} VNĐ</td>

                <td>{Number(item.tienDienMotSo).toLocaleString()} VNĐ</td>

                <td>{Number(item.tienNuocMotKhoi).toLocaleString()} VNĐ</td>

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
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.maHopDong)}
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

export default HopDongPage;
