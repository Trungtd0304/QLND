function NguoiDungServices() {
  this.getListEmployerApi = function () {
    return axios({
      url: "https://60bc9acfb8ab37001759f4d5.mockapi.io/api/QLND",
      method: "GET",
    });
  };
  this.addEmployerApi = function (employer) {
    return axios({
      url: "https://60bc9acfb8ab37001759f4d5.mockapi.io/api/QLND",
      method: "POST",
      data: employer,
    });
  };
  this.deleteEmployerApi = function (id) {
    return axios({
      url: `https://60bc9acfb8ab37001759f4d5.mockapi.io/api/QLND/${id}`,
      method: "DELETE",
    });
  };
  this.getEmployerApi = function (id) {
    return axios({
      url: `https://60bc9acfb8ab37001759f4d5.mockapi.io/api/QLND/${id}`,
      method: "GET",
    });
  };
  this.updateEmployerApi = function (employer) {
    return axios({
      url: `https://60bc9acfb8ab37001759f4d5.mockapi.io/api/QLND/${employer.id}`,
      method: "PUT",
      data: employer,
    });
  };
}
