const loginBtn = document.getElementById('loginBtn');
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          loginBtn.innerHTML = 'Loading...'
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } 
          event.preventDefault();
          form.classList.add('was-validated'); 
          axios({
            method: 'post',
            url: 'http://18.193.182.151:8080/api/v1/Users/UserLogin',
            data: {
                emailAddress: email.value,
                password: password.value,
              }
          })
          .then(res =>{
            loginBtn.innerHTML = 'Login';
            if (res.data.statusCode == 400) {
              swal({
                title: 'Error Logining',
                text: res.data.statusMessage,
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok',
            })
            password.value = "";
                // alert(res.data.statusMessage)
                // document.getElementsByClassName('alert-danger').removeAttribute('style');
                // document.getElementById('error-message').innerHTML = `<strong>Danger!</strong> ${res.data.statusMessage}`;
            }else{
              sessionStorage.setItem('id', res.data.data.id);
              sessionStorage.setItem('firstName', res.data.data.firstName);
              sessionStorage.setItem('lastName', res.data.data.lastName);
              sessionStorage.setItem('middleName', res.data.data.middleName);
              sessionStorage.setItem('emailAddress', res.data.data.emailAddress);
              sessionStorage.setItem('phoneNumber', res.data.data.phoneNumber);
              sessionStorage.setItem('roleId', res.data.data.userRole.roleId);
              if (res.data.isActive = true) {
                window.location.href='dashboard'
              } else {
                swal({
                  title: 'Error Logining',
                  text: 'Account Deactivated',
                  type: 'error',
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
              })
                // alert('Account Deactivated');
              }
            }
          })
          .catch(err=>console.error(err))
        }, false);
      });
    }, false);