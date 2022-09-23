const url = 'http://younghallaji-001-site1.btempurl.com/api/v1/'
const singleSideMenu = document.getElementById('side-menu')
    fetch('includes/side-menu.html')
    .then( (response) => {
        return response.text();
    })
    .then((html)=>{
        singleSideMenu.innerHTML = html
    })
    .catch(err => console.error(err));

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
		const title = document.getElementById('title');
		const video = document.getElementById('video');
		const image = document.getElementById('image');
		const content = document.getElementById('content');

		axios({
		method: 'post',
		url: `${url}PressRelease/CreatePressRelease`,
		data: {
			title: title.value,
			content: content.value,
			image: image.value,
			videoLink: video.value,
            createdBy: sessionStorage.id
			}
		})
		.then(res =>{
			if (res.status === 200) {
				alert(res.data.statusMessage)
				document.getElementById('submitBtn').innerHTML = 'Submit';
			} else if(res.status===400){
				document.getElementById('submitBtn').innerHTML = 'Submit';
				alert(res.data.statusMessage)
			}else {
				document.getElementById('submitBtn').innerHTML = 'Submit';
				alert('Invalid Data')
			}
			console.log(res)
		})
		.catch(err=>{alert(err.response.statusText);
			document.getElementById('submitBtn').innerHTML = 'Submit';})
	}
}, false)

});