import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-5">HỆ THỐNG QUẢN LÝ NHÀ TRỌ</h1>

      <Row>
        {/* Hợp đồng */}

        <Col md={6}>
          <Card
            className="
                            shadow
                            p-4
                            text-center
                            h-100
                        "
          >
            <h3 className="mb-3">Quản lý hợp đồng</h3>

            <p>Lập và quản lý hợp đồng thuê phòng</p>

            <Button variant="primary" onClick={() => navigate("/hop-dong")}>
              Truy cập
            </Button>
          </Card>
        </Col>

        {/* Hóa đơn */}

        <Col md={6}>
          <Card
            className="
                            shadow
                            p-4
                            text-center
                            h-100
                        "
          >
            <h3 className="mb-3">Quản lý hóa đơn</h3>

            <p>Lập và quản lý hóa đơn hàng tháng</p>

            <Button variant="success" onClick={() => navigate("/hoa-don")}>
              Truy cập
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
