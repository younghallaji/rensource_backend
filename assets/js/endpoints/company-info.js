function SuccessAlert(type, title, message){
	swal({
		title: title,
		text: message,
		type: type,
		showCancelButton: false,
		confirmButtonText: 'Ok',
	})
}

const url = "https://18.193.182.151:4431/api/v1/"

var forms = document.getElementsByClassName('needs-validation');
var validation = Array.prototype.filter.call(forms, function(form) {
	form.addEventListener('submit', function(event) {
	if (form.checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();
		$('.alert').show();
        console.log('clicked')
		form.classList.add('was-validated');
	} else{
		$('.alert').hide();
		event.preventDefault();
		form.classList.add('was-validated');
		document.getElementById('submitBtn').innerHTML = 'Loading...';
		const officeAddress = document.getElementById('officeAddress');
		const headOffice = document.getElementById('headOffice');
		const number1 = document.getElementById('number1');
		const email = document.getElementById('email');
		const number2 = document.getElementById('number2');
		const facebook = document.getElementById('facebook');
		const linkedin = document.getElementById('linkedin');
		const twitter = document.getElementById('twitter');
		const instagram = document.getElementById('instagram');

		axios({
		method: 'post',
		url: `${url}CompanyInfo/CreateUpdateCompanyInfo`,
		data: {
            officeAddress: officeAddress.value,
            headOfficeAddress: headOffice.value,
            emailAddress: email.value,
            phoneNumber1: number1.value,
            phoneNumber2: number2.value,
            linkedIn: linkedin.value,
            twitter: twitter.value,
            instagram: instagram.value,
            facebook: facebook.value,
            updatedBy: sessionStorage.id
          }
		})
		.then(res =>{
			if (res.data.statusCode === 200) {
				SuccessAlert('success', 'Success', res.data.statusMessage)
				document.getElementById('createCategoryBtn').innerHTML = 'Submit';
				window.location = 'dashboard'
				createCategory.classList.remove('was-validated');
			} else if(res.data.statusCode===400){
				document.getElementById('createCategoryBtn').innerHTML = 'Submit';
				createCategory.classList.remove('was-validated');
				SuccessAlert('error', 'Error', res.data.statusMessage)
			}else {
				document.getElementById('createCategoryBtn').innerHTML = 'Submit';
				createCategory.classList.remove('was-validated');
				SuccessAlert('error', 'Error', res.data.statusMessage)
			}
		})
		.catch(err=>{console.log(err);
            console.log(sessionStorage.id)
			document.getElementById('submitBtn').innerHTML = 'Submit';})
	}
}, false)

});

// Get Infomations
function getDetails(){
    $.ajax({
        url: `${url}CompanyInfo/CompanyInfo`,
        success: function(response){
            
            $('#officeAddress').val(response.data.officeAddress)
            $('#headOffice').val(response.data.headOfficeAddress)
			$('#email').val(response.data.emailAddress)
            $('#number1').val(response.data.phoneNumber1)
            $('#number2').val(response.data.phoneNumber2)
            $('#facebook').val(response.data.facebook)
            $('#twitter').val(response.data.twitter)
            $('#instagram').val(response.data.instagram)
            $('#linkedin').val(response.data.linkedIn)
        }
    })
}