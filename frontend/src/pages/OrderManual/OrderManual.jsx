import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import 'style/pages/OrderManual/OrderManual.scss';
import Button1 from 'components/Common/Button1';
import bannersmall from 'assets/image/banners/banner-small.png';

function OrderManual() {
  return (
    <Container className="orderManual fluid">
      <h1 className="orderManual__title display-large">HƯỚNG DẪN MUA HÀNG TRÊN WEBSITE</h1>
      <div className="oderManual__content body-large">
        <p>Quý khách vui lòng tham khảo thông tin chi tiết về từng bước đặt hàng như sau:</p>
        <h2 className="orderManual__step headline-small">
          TÌM KIẾM VÀ CHỌN SẢN PHẨM YÊU THÍCH TRÊN WEBSITE
        </h2>
        <p>Quý khách có thể chọn tìm kiếm sản phẩm theo 2 cách sau:</p>
        <ol>
          <li>
            Gõ tên sản phẩm vào thanh tìm kiếm
            <span className="orderManual__search-bar">
              <FiSearch stroke="#524343" className="search-icon" />
              <input type="text" placeholder="Tìm kiếm" disabled />
            </span>{' '}
            phía trên cùng webiste.
          </li>
          <li>Tìm sản phẩm trong mục "SẢN PHẨM" trên thanh menu.</li>
        </ol>

        <p>
          Sau khi tìm kiếm và lựa chọn cho mình sản phẩm ưng ý, quý khách nhấn chọn vào sản phẩm để
          xem hàng. Tại đây, khách hàng chọn Màu sắc, Kích cỡ và Số lượng sản phẩm muốn mua và chọn
          mua sản phẩm bằng cách bấm chuột vào nút
          <div className="button-wrapper">
            <Button1 label="Mua ngay" labelColor="#F1EFE7" backgroundColor="#785B5B" />
          </div>
          phía dưới.
        </p>

        <p>
          Nếu quý khách lựa chọn thêm vào yêu thích tại biểu tượng "Yêu thích" phía góc trên bên
          phải của trang, từ trang Sản phẩm yêu thích, khách hàng lựa chọn sản phẩm muốn mua, giao
          diện sẽ được điều hướng đến trang chi tiết sản phẩm, sau đó khách hàng thực hiện mua hàng
          theo cách trên.
        </p>
        <p>
          Ngoài ra, nếu quý khách lựa chọn
          <div className="button-wrapper">
            <Button1
              borderColor="#785B5B"
              backgroundColor="#FFEDEC"
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaShoppingCart style={{ color: '#785B5B' }} />
                  <span style={{ marginLeft: '5px' }}>Thêm vào giỏ hàng</span>{' '}
                </div>
              }
            />{' '}
          </div>
          để lựa chọn thêm sản phẩm. Khi muốn mua hàng, từ trang Giỏ hàng, khách hàng lựa chọn sản
          phẩm muốn mua sau đó kiểm tra nếu các thông số như Màu sắc, Kích cỡ và Số lượng sản phẩm
          đã phù hợp với nhu cầu của khách hàng, khách hàng thực hiện bấm chọn
          <div className="button-wrapper">
            <Button1 label="Tiến hành đặt hàng" labelColor="#F1EFE7" backgroundColor="#785B5B" />
          </div>
          để hoàn hành các thủ tục mua hàng.
        </p>
        <h2 className="orderManual__step headline-small">
          TIẾN HÀNH ĐẶT HÀNG VÀ THANH TOÁN ĐƠN HÀNG
        </h2>
        <p>Trên trang thanh toán, khách hàng lưu ý điền đầy đủ thông tin bắt buộc cho đơn hàng:</p>
        <div class="orderManual__section-content">
          <h3 className="orderManual__section-title">Thông tin nhận hàng</h3>
          <p>
            <em>
              * TAA khuyến khích khách hàng mua sắm bằng cách đăng ký tài khoản tại TAA.com để tiết
              kiệm thời gian và nhận những ưu đãi qua tài khoản. Với tài khoản này, bạn sẽ dễ dàng
              đặt mua sản phẩm mà không cần điền lại thông tin mỗi lần mua hàng.
            </em>
          </p>
          <ul>
            <li>
              Đối với khách hàng đã có tài khoản, xin vui lòng đăng nhập bằng tài khoản đã có sẵn
              trước khi đặt hàng.
            </li>
            <li>
              Đối với khách hàng chưa có tài khoản, xin vui lòng đăng ký, sau đó đăng nhập tài
              khoản.
            </li>
          </ul>
          <h3 className="orderManual__section-title">Phương thức vận chuyển</h3>
          <p>Khách hàng vui lòng chọn phương thức vận chuyển theo nhu cầu:</p>
          <ul>
            <li>Giao hàng nhanh trong 2h.</li>
            <li>Giao hàng trong 48h.</li>
          </ul>
          <h3 className="orderManual__section-title">Phương thức thanh toán</h3>
          <p>Bạn có thể chọn một trong các phương thức thanh toán có sẵn:</p>
          <ul>
            <li>Thanh toán khi nhận hàng bằng tiền mặt (COD).</li>
            <li>Thanh toán trực tuyến qua ngân hàng.</li>
          </ul>
        </div>

        <h2 className="orderManual__step headline-small">XÁC NHẬN ĐƠN HÀNG</h2>
        <p>
          Sau khi hoàn tất quy trình mua hàng online trên website, quý khách vui lòng kiểm tra thư
          điện tử Xác Nhận Đặt Hàng với thông tin chi tiết về đơn hàng mà khách hàng đã đặt trước
          đó.
        </p>
      </div>

      <div className="orderManual__banner">
        <Image src={bannersmall} fluid />
      </div>
    </Container>
  );
}
export default OrderManual;
