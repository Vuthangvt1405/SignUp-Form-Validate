document.addEventListener("DOMContentLoaded", function () {
    var firstnameError = document.getElementById("firstnameErrorMessage");
    var lastNameError = document.getElementById("lastnameErrorMessage");
    var emailError = document.getElementById("emailErrorMessage");
    var errorPassword = document.getElementById("errorPassword");

    var pass = document.querySelector(".pass");
    var firstNameInput = document.querySelector(".firstName");
    var lastNameInput = document.querySelector(".lastName");
    var emailInput = document.querySelector(".emailAdd");

    const success = document.querySelector(".success");

    // Hàm kiểm tra input chung
    function validateInput(input, errorSpan, regex, message) {
        const value = input.value;

        if (value.length === 0) {
            errorSpan.innerHTML = `${input.placeholder} is required`;
            input.classList.add("red");
            return false;
        }

        // Kiểm tra regex chỉ khi regex được cung cấp
        if (regex && !regex.test(value)) {
            errorSpan.innerHTML = message;
            input.classList.add("red");
            return false;
        }

        errorSpan.innerHTML = "";
        input.classList.remove("red");
        input.classList.remove("firstTime");
        return true;
    }

    // Các hàm validate cho từng input
    function validateFirstName() {
        return validateInput(
            firstNameInput,
            firstnameError,
            /^[A-Za-z]+$/,
            "First Name is not valid"
        );
    }

    function validateLastName() {
        return validateInput(
            lastNameInput,
            lastNameError,
            /^[A-Za-z]+$/,
            "Last Name is not valid"
        );
    }

    function validateEmail() {
        return validateInput(
            emailInput,
            emailError,
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Email is not valid"
        );
    }

    function validatePassword() {
        return validateInput(
            pass,
            errorPassword,
            /^.{6,}$/,
            "Password must be at least 6 characters"
        );
    }

    // Gắn event listener cho các input
    firstNameInput.addEventListener("input", validateFirstName);
    lastNameInput.addEventListener("input", validateLastName);
    emailInput.addEventListener("input", validateEmail);
    pass.addEventListener("input", validatePassword);

    // Xử lý khi submit form
    document.querySelector(".submit").addEventListener("click", (event) => {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        // Gọi các hàm validate để kiểm tra tất cả input
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        // Kiểm tra xem có input nào còn lỗi hay không
        if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
            success.innerHTML = "Chúc Mừng Bạn Đã Đăng Kí Thành Công ✅";
            success.classList.add("show");
        } else {
            success.innerHTML = "Vui Lòng Kiểm Tra Lại Thông Tin Của Bạn";
            success.classList.remove("show");
        }
    });
});
