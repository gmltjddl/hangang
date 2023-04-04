showInput();

function showInput() {
  let el = document.querySelectorAll(".input");
  for (let e of el) {
    e.classList.remove("invisible");
  }

  el = document.querySelectorAll(".edit");
  for (let e of el) {
    e.classList.add("invisible");
  }
}

function showEdit() {
  let el = document.querySelectorAll(".input");
  for (let e of el) {
    e.classList.add("invisible");
  }

  el = document.querySelectorAll(".edit");
  for (let e of el) {
    e.classList.remove("invisible");
  }
}

function validatePassword(password) {
  // 비밀번호 정규식 패턴
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
  return passwordPattern.test(password);
}

function validateForm() {
  const form = document.querySelector("#hangang-form");
  const formData = new FormData(form);

  var email = document.getElementById("email").value;
  var password = document.getElementById("pwd").value;
  var repassword = document.getElementById("repwd").value;
  var name = document.getElementsByName("name")[0].value;

  // 이메일 유효성 검사
  var email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email_regex.test(email)) {
    alert("올바른 이메일 주소를 입력해주세요.");
    return false;
  }

  // 비밀번호 유효성 검사
  if (password.length < 8) {
    alert("비밀번호는 최소 8자 이상이어야 합니다.");
    return false;
  }

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
  if (!passwordPattern.test(password)) {
    alert("비밀번호는 8~20자의 영문 대소문자, 숫자, 특수문자 조합이어야 합니다.");
    return false;

  }

  // 비밀번호와 재입력한 비밀번호가 일치하는지 검사
  if (password !== repassword) {
    alert("비밀번호와 재입력한 비밀번호가 일치하지 않습니다.");
    return false;
  }

  // 이름이 입력되었는지 검사
  if (name === "") {
    alert("이름을 입력해주세요.");
    return false;
  }

  // 모든 유효성 검사가 통과되면 true를 반환
  return true;
}

document.querySelector("#btn-regist").onclick = () => {
  if (validateForm()) {
    // 모든 유효성 검사가 통과되면, 회원가입을 진행
    const form = document.querySelector("#hangang-form");
    const formData = new FormData(form);
    let json = JSON.stringify(Object.fromEntries(formData));

    fetch("../members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.status == "success") {
          location.reload();
          location.href = "login.html";
        } else {
          alert("입력 실패!");
          console.log(result.data);
        }
      })
      .catch((exception) => {
        alert("입력 중 오류가 발생했습니다.");
        console.log(exception);
      });
  }
};

const cancelbuttun = document.querySelector("#btn-cancel");
cancelbuttun.addEventListener("click", () => {
  location.href = "login.html";
})



