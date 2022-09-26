function SuccessAlert(type, title, message){
    swal({
        title: title,
        text: message,
        type: type,
        showCancelButton: false,
        confirmButtonText: 'Ok',
    })
}

const url = 'https://rensource.energy:4431/api/v1/'

function getmessage(){
	const outputDiv = document.getElementById('AllMessages');
	const header = {
		'Content-type': 'application/json'
	}
	axios({
		method: 'GET',
		url: `${url}ContactUs/AllMessages`,
		withCredentials: false
	}, {header})
	.then(admins =>{
		let output = '';
		admins.data.data.forEach(admin => {
		output += ` 
			<tr>
			   <td>${admin.sendersName} </td>
			   <td>${admin.emailAddress}</td>
			   <td>${admin.phoneNumber}</td>
               <td>${admin.messageSubject}</td>
			   <td>
			   <div class="g-2">
			   <a href="open-message#${admin.id}" class="btn text-primary btn-sm"
				   data-bs-toggle="tooltip"
				   data-bs-original-title="Edit"><span
					   class="fe fe-eye fs-14"></span></a>
			   <a  class="delete btn text-danger btn-sm"
				   data-bs-toggle="tooltip"
				   data-bs-original-title="Delete"><span id=${admin.id}
					   class="delete fe fe-trash-2 fs-14"></span></a>
		   </div>  
			   </td>
		   </tr>`;
		   outputDiv.innerHTML = output;
		});
	})
	.catch(err=>alert(err));
}



// Delete Messages

$('#AllMessages').on('click', '.delete', function() {
    if (confirm('Are You Sure')) {
        const roleID = this.id;
        $.ajax({
            url: `${url}ContactUs/DeleteMessage?Id=${roleID}`,
            method: 'DELETE',
            success: function (response) {
                console.log(response)
                if (response.statusCode == 200) {
                    SuccessAlert('success', 'Success', response.statusMessage)
                    window.location.href = 'messages.html'
                } else {
                    SuccessAlert('error', 'Error', response.statusMessage)
                    window.location = 'messages';
                }
            }
        })
    }
	return false;

})

// Message Details

function messageDetails(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}ContactUs/Message?Id=${id}`,
        success: function(response){
            let dateArray = response.data.dateCreated.split("T")
            let date = dateArray[0]
            let time = dateArray[1].split('.')[0]
            let datetime = date +" " +time
            console.log(datetime)
            $('#subject').html(response.data.messageSubject)
            $('#email').html("("+response.data.emailAddress+")")
            $('#number').html(response.data.phoneNumber)
            $('#body').html(response.data.message)
            $('#name').html("Sender: "+response.data.sendersName)
            $('#date').html(datetime)
        }
    })
}