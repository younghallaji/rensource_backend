// Reset Password
const resetPassword = document.getElementById('resetPassword');
const resetBtn = document.getElementById('resetPasswordBtn');
let email = document.getElementById('email');
if (resetPassword != undefined) {
  resetPassword.addEventListener('submit', function(e){
    resetBtn.innerHTML = 'Loading...'
    resetBtn.setAttribute('disabled', 'disabled')
          if (resetPassword.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            resetBtn.innerHTML = 'submit'
            resetBtn.removeAttribute('disabled')
          } else {
            e.preventDefault();
            resetPassword.classList.add('was-validated'); 
            axios({
              method: 'post',
              url: 'https://18.193.182.151:4431/api/v1/Users/ForgotPassword',
              data: {
                  emailAddress: email.value,
                }
            })
            .then(res =>{
              console.log(res)
              resetBtn.innerHTML = 'submit'
              resetBtn.removeAttribute('disabled')
                if (res.data.statusCode == 200) {
                  swal({
                    title: 'Success',
                    text: res.data.statusMessage,
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                  })
                  window.location = 'set-password'
                }else {
                  resetBtn.innerHTML = 'submit'
                  resetBtn.removeAttribute('disabled')
                  swal({
                    title: 'Error',
                    text: res.data.statusMessage,
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                  })
                }
            })
            .catch(err=>console.error(err))
          }
  })
}


// Reset Password
const changePassword = document.getElementById('changePassword');
const changePasswordBtn = document.getElementById('changePasswordBtn');
let code = document.getElementById('code');
let password = document.getElementById('password')
let confirmPassword = document.getElementById('confirmPassword')
if (changePassword != undefined) {
  changePassword.addEventListener('submit', function(e){
    changePasswordBtn.innerHTML = 'Loading...'
    changePasswordBtn.setAttribute('disabled', 'disabled')
          if (changePassword.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            changePasswordBtn.innerHTML = 'submit'
            changePasswordBtn.removeAttribute('disabled')
          } else {
            e.preventDefault();
            changePassword.classList.add('was-validated'); 
            console.log(code.value, password.value, confirmPassword.value)
            axios({
              method: 'post',
              url: 'https://18.193.182.151:4431/api/v1/Users/ChangePassword',
              data: {
                  code: code.value,
                  password: password.value,
                  confirmPassword: confirmPassword.value
                }
            })
            .then(res =>{
              console.log(res)
              changePasswordBtn.innerHTML = 'submit'
              changePasswordBtn.removeAttribute('disabled')
                if (res.data.statusCode == 200) {
                  swal({
                    title: 'Success',
                    text: res.data.statusMessage,
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                  })
                  window.location = 'dashboard'
                }else {
                  changePasswordBtn.innerHTML = 'submit'
                  changePasswordBtn.removeAttribute('disabled')
                  swal({
                    title: 'Error',
                    text: res.data.statusMessage,
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                  })
                }
            })
            .catch(err=>console.error(err))
          }
  })
}