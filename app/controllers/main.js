var service = new NguoiDungServices();
// Tạo hàm kiểm tra validation
var validation = new Validation();
var arrQLUeser = [];

function getEle(id) {
  return document.getElementById(id);
}

function getClass(id) {
  return document.getElementsByClassName(id);
}

function getData() {
  //tạo hàm đưa data lên sever và hiển thị ra màn hình UI
  service
    .getListEmployerApi()
    .then(function (result) {
      console.log(result.data);
      renderEmployer(result.data);
      arrQLUeser = result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getData();

// đưa danh sách người dùng có trong data ra UI
function renderEmployer(list) {
  var contentHTML = "";
  list.forEach(function (employer, index) {
    contentHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${employer.taiKhoan}</td>
        <td>${employer.matKhau}</td>
        <td>${employer.hoTen}</td>
        <td>${employer.email}</td>
        <td>${employer.ngonNgu}</td>
        <td>${employer.loaiND}</td>
        <td>${employer.moTa}</td>
        <td>
            <img src="./../../assets/img/${employer.hinhAnh}" width="50" />
        </td>
        <td>
          <button class="btn btn-info" onclick="suaNguoiDung(${
            employer.id
          })" data-toggle="modal" data-target="#myModal">Sửa</button>
          <button class="btn btn-danger" onclick="xoaNguoiDung(${
            employer.id
          })">Xoá</button>
        </td>
      </tr>
      `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

// chỉnh sửa giao diện khi nhấn nút thêm mới
getEle("btnThemNguoiDung").addEventListener("click", function () {
  getClass("modal-title")[0].innerHTML = "Thêm người dùng";
  var footer =
    '<button class="btn btn-success" onclick="addEmployer()">Thêm người dùng</button>';
  getClass("modal-footer")[0].innerHTML = footer;
});

// lấy dữ liệu từ input
function layDuLieuDauVao(isAdd, id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = true;

  // kiểm tra tài khoản
  if (isAdd) {
    isValid &=
      validation.kiemTraTrong(
        taiKhoan,
        "divTK",
        "()* Tài khoản không được để trống "
      ) &&
      validation.kiemTraTrung(
        taiKhoan,
        "divTK",
        "()* Tài khoản bị trùng ",
        arrQLUeser
      );
  }

  //kiểm tra họ tên
  isValid &=
    validation.kiemTraTrong(hoTen, "divHT", "()* Họ tên không được để trống") &&
    validation.kiemTraTen(
      hoTen,
      "divHT",
      "()* Họ tên không được chứa số và ký tự"
    );

  // kiểm tra mật khẩu
  isValid &=
    validation.kiemTraTrong(
      matKhau,
      "divMK",
      "()* Mật khẩu không được để trống"
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "divMK",
      "()* Mật khẩu từ 6-8 ký tự",
      8,
      6
    );

  // kiểm tra email
  isValid &=
    validation.kiemTraTrong(
      email,
      "divEmail",
      "()* Email không được để trống"
    ) &&
    validation.kiemTraEmail(
      email,
      "divEmail",
      "()* Email không đúng định dạng"
    );

  // kiểm tra hình ảnh
  isValid &= validation.kiemTraTrong(
    hinhAnh,
    "divHinh",
    "()* Hình ảnh không được để trống"
  );

  // kiểm tra loại người dùng
  isValid &= validation.kiemTraLoai(
    "loaiNguoiDung",
    "divLoaiNguoiDung",
    "()* Vui lòng chọn loại người dùng"
  );

  // kiểm tra tra loại ngôn ngữ
  isValid &= validation.kiemTraLoai(
    "loaiNgonNgu",
    "divLoaiNgonNgu",
    "()* Vui lòng chọn loại ngôn ngữ"
  );

  // kiểm tra tra mô tả
  isValid &=
    validation.kiemTraTrong(moTa, "divMoTa", "()* Mô tả không được để trống") &&
    validation.kiemTraKyTu(
      moTa,
      "divMoTa",
      "()* Mô tả không vượt quá 60 ký tự",
      60,
      0
    );

  if (isValid) {
    //
    var nguoiDung = new NguoiDung(
      id,
      taiKhoan,
      hoTen,
      matKhau,
      email,
      loaiNguoiDung,
      loaiNgonNgu,
      moTa,
      hinhAnh
    );
    return nguoiDung;
  }
  return null;
}

// thêm người dùng mới
function addEmployer() {
  var nguoiDung = layDuLieuDauVao(true);

  if (nguoiDung) {
    //nếu người dùng khác null thì mới request api
    getClass("close")[0].click(); //đóng popup ngay khi đã lấy đc nguoiDung
    service
      .addEmployerApi(nguoiDung)
      .then(function (result) {
        // đóng trang
        //làm mới trang web
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// nút xoá người dùng
function xoaNguoiDung(id) {
  service
    .deleteEmployerApi(id)
    .then(function () {
      getData();
      alert("Xoá thành công");
    })
    .catch(function (error) {
      console.log(error);
    });
}

// nút sửa người dùng
function suaNguoiDung(id) {
  // chỉnh sửa giao diện khi nhấn nút sửa
  getClass("modal-title")[0].innerHTML = "Sửa thông tin người dùng";
  var footer = `<button class="btn btn-success" onclick="capNhatND(${id})">Cập nhật</button>`;
  getClass("modal-footer")[0].innerHTML = footer;

  // lấy id của người dùng cần sửa
  service
    .getEmployerApi(id)
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// nút cập nhật lại thông tin người dùng đã sửa
function capNhatND(id) {
  var nguoiDung = layDuLieuDauVao(false, id);

  service
    .updateEmployerApi(nguoiDung)
    .then(function (result) {
      alert("Cập nhật thành công");
      getClass("close")[0].click();
      getData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// nhấn close clear dữ liệu người dùng
getClass("close")[0].addEventListener("click", function () {
  getEle("TaiKhoan").value = "";
  getEle("HoTen").value = "";
  getEle("MatKhau").value = "";
  getEle("Email").value = "";
  getEle("HinhAnh").value = "";
  getEle("loaiNguoiDung").value = "";
  getEle("loaiNgonNgu").value = "";
  getEle("MoTa").value = "";
});
