function Validation() {
  // tài khoản không được để trống
  this.kiemTraTrong = function (input, divID, mess) {
    if (input.trim() === "") {
      getEle(divID).innerHTML = mess;
      getEle(divID).className = "alert alert-danger";
      return false;
    }
    getEle(divID).innerHTML = "";
    getEle(divID).className = "";
    return true;
  };
  // kiểm tra tên không chứa số và ký tự đặt biệt
  this.kiemTraTen = function (input, divId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (input.match(letter)) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  // kiểm tra định dạng mật khẩu
  this.kiemTraMatKhau = function (input, divId, mess, max, min) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (input.match(letter) && input.length >= min && input.length <= max) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  // kiểm tra định dạng email
  this.kiemTraEmail = function (input, divId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(letter)) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  // kiểm tra section có lựa chọn
  this.kiemTraLoai = function (idslect, divId, mess) {
    if (getEle(idslect).selectedIndex != 0) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  // kiểm tra độ dài ký tự
  this.kiemTraKyTu = function (input, divId, mess, max, min) {
    if (input.length >= min && input.length <= max) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  this.kiemTraTrung = function (input, divId, mess, arr) {
    var status = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].taiKhoan === input) {
        status = false;
        break;
      }
    }
    if (status) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
}
