const url = 'https://rensource.energy:4431/api/v1/'


function getadmin(){
	const outputDiv = document.getElementById('all-admin');
	const header = {
		'Content-type': 'application/json'
	}
	axios({
		method: 'GET',
		url: `${url}Admin/Alladmin`,
		withCredentials: false
	}, {header})
	.then(admins =>{
		let output = '';
		if (admins.data.data != null) {
			admins.data.data.forEach(admin => {
				output += ` 
					<tr>
					   <td>${admin.firstName} ${admin.middleName} ${admin.lastName}</td>
					   <td>${admin.emailAddress}</td>
					   <td>${admin.phoneNumber}</td>
					   <td>${admin.dateCreated}</td>
					   <td>
					   <div class="g-2">
					   <a class="btn text-primary btn-sm"
						   data-bs-toggle="tooltip"
						   data-bs-original-title="Edit"><span
							   class="fe fe-edit fs-14"></span></a>
					   <a  class="delete btn text-danger btn-sm"
						   data-bs-toggle="tooltip"
						   data-bs-original-title="Delete"><span id=${admin.id}
							   class="delete fe fe-trash-2 fs-14"></span></a>
				   </div>  
					   </td>
				   </tr>`;
				   outputDiv.innerHTML = output;
				});
		} else {
			outputDiv.innerHTML = '<tr><td colspan=5>Data Empty</td>'
		}
		
	})
	.catch(err=>alert(err));
}


// DELETE ADMINISTRATOR

$('#all-admin').on('click', '.delete', function() {
	const adminID = this.id;
	if (confirm('Are You Sure')) {
		$.ajax({
			url: `${url}Admin/DeleteAdmin?Id=${adminID}`,
			method: 'DELETE',
			success: function (response) {
				if (response.statusCode == 400) {
					alert(response.statusMessage);
				} else {
					alert(response.statusMessage);
					window.location = 'all-admin.html';
				}
			}
		})
	}else{
		return false
	}

})
// CREATING NEW ADMINISTRATOR
var forms = document.getElementsByClassName('needs-validation');
var validation = Array.prototype.filter.call(forms, function(form) {
	form.addEventListener('submit', function(event) {
	if (form.checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();
		$('.alert').show();
		form.classList.add('was-validated');
	} else{
		$('.alert').hide();
		event.preventDefault();
		form.classList.add('was-validated');
		document.getElementById('submitBtn').innerHTML = 'Loading...';
		const firstName = document.getElementById('firstname');
		const middleName = document.getElementById('middlename');
		const lastName = document.getElementById('lastname');
		const email = document.getElementById('email');
		const phoneNumber = document.getElementById('phonenumber');
		const password = document.getElementById('password');
		const cpassword = document.getElementById('cpassword');

		axios({
		method: 'post',
		url: `${url}Admin/CreateAdmin`,
		data: {
			firstName: firstName.value,
			lastName: lastName.value,
			middleName: middleName.value,
			emailAddress: email.value,
			phoneNumber: phoneNumber.value,
			password: password.value,
			confirmPassword: cpassword.value
			}
		}) 
		.then(res =>{
			if (res.status === 200) {
				swal({
					title: "Success",
		            text: res.data.statusMessage,
		            type: "success",
		            showCancelButton: false,
		            confirmButtonText: 'Ok',
				})
				// alert(res.data.statusMessage)
				document.getElementById('submitBtn').innerHTML = 'Submit';
			} else if(res.status===400){
				document.getElementById('submitBtn').innerHTML = 'Submit';
				swal({
					title: "Error",
		            text: res.data.statusMessage,
		            type: "danger",
		            showCancelButton: false,
		            confirmButtonText: 'Ok',
				})
				// alert(res.data.statusMessage)
			}else {
				document.getElementById('submitBtn').innerHTML = 'Submit';
				swal({
					title: "error",
		            text: res.data.statusMessage,
		            type: "error",
		            showCancelButton: false,
		            confirmButtonText: 'Ok',
				})
			}
			console.log(res)
		})
		.catch(err=>{
			swal({
				title: "Error",
				text: err.response.statusText,
				type: "error",
				showCancelButton: false,
				confirmButtonText: 'Ok',
			})
			document.getElementById('submitBtn').innerHTML = 'Submit';})
	}
}, false)

});




