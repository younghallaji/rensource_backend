function SuccessAlert(type, title, message){
    swal({
        title: title,
        text: message,
        type: type,
        showCancelButton: false,
        confirmButtonText: 'Ok',
    })
}

const url = 'http://18.193.182.151:8080/api/v1/'
const addedby = sessionStorage.getItem('id');
const createPartner = document.getElementById('createPartner');
if (createPartner != undefined) {
    createPartner.addEventListener('submit', (event)=>{
        event.preventDefault()
        if (createPartner.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            createPartner.classList.add('was-validated');
        } else {
            document.getElementById('createPartnerBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            createPartner.classList.add('was-validated');
            const formData = new FormData(createPartner)
            formData.append('createdBy', addedby)
            console.log([...formData])

            axios({
                method: 'post',
                url: `${url}Partners/CreatePartner`,
                data: formData
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('createPartnerBtn').innerHTML = 'Submit';
                        createPartner.classList.remove('was-validated');
                        window.location.href='add-partner'
                    } else if(res.data.statusCode===400){
                        document.getElementById('createPartnerBtn').innerHTML = 'Submit';
                        createPartner.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('createPartnerBtn').innerHTML = 'Submit';
                        createPartner.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', err.statusMessage)
                    document.getElementById('createPartnerBtn').innerHTML = 'Submit';})
                    createPartner.classList.remove('was-validated');
        }
    })
}

let partners = document.getElementById('partners')
if (partners != undefined && partners != null) {
    const header = {
        'Content-type': 'application/json'
    }
    let output = "";
    axios({
        method: 'GET',
        url: `${url}Partners/AllPartner`,
        withCredentials: false
    }, {header})
    .then(presses =>{
        console.log(presses)
        for(let press of presses.data.data) {
           output +=  `<div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xxl-2">
           <div class="card overflow-hidden" >
               <a class="p-3" style="height: 120px ;"><img src="${press.image}" alt="img" class="file-manager-list w-100"></a>
               <div class="card-footer">
                   <div class="d-flex">
                       <div class="">
                           <h5 class="mb-0 fw-semibold text-break">${press.partnerName}</h5>
                       </div>
                       <div class="ms-auto my-auto">
                           <span class="text-muted mb-0">
                                <a href="edit-partner#${press.id}" class=" text-success m-2"><i  class="fe fe-edit"></i></a>
                            </span>
                            <span class="text-muted mb-0">
                                <a href="javascript:void(0)" id=${press.id} class="text-danger m-2 delete-team "><i class="fe fe-trash"></i></a>
                            </span>
                       </div>
                   </div>
               </div>
           </div>
       </div>`
            
       partners.innerHTML = output
        }
    })
}

$('#partners').on('click', '.delete-team', function() {
    if (confirm('Are You Sure')) {
        const teamID = this.id;
        $('#loading').trigger('click');
        $.ajax({
            url: `${url}Partners/DeletePartner?Id=${teamID}`,
            method: 'DELETE',
            success: function (response) {
                if (response.statusCode == 200) {
                    SuccessAlert('success', 'Success', response.statusMessage)
                    window.location = 'partner-list';
                } else {
                    SuccessAlert('error', 'Error', response.statusMessage)
                }
            }
        })
    }
	return false;

})


// Get Partner Details

function getPartner(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}Partners/Partner?Id=${id}`,
        success: function(response){
            console.log(response)
            $('#partnerName').val(response.data.partnerName)
            $('#previousImage').attr('src',response.data.image)
        }
    })
}

const updatePartner = document.getElementById('updatePartner');
if (updatePartner != undefined) {
    let id = window.location.toString().split('#')[1];
    updatePartner.addEventListener('submit', (event)=>{
        event.preventDefault()
        if (updatePartner.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            updatePartner.classList.add('was-validated');
        } else {
            document.getElementById('updatePartnerBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            updatePartner.classList.add('was-validated');
            const formData = new FormData(updatePartner)
            formData.append('updatedBy', addedby)
            formData.append('id', id)
            console.log([...formData])

            axios({
                method: 'put',
                url: `${url}Partners/UpdatePartner`,
                data: formData
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('updatePartnerBtn').innerHTML = 'Submit';
                        document.getElementById('updatePartnerBtn').setAttribute('disabled', 'disabled')
                        updatePartner.classList.remove('was-validated');
                        window.location.href='add-partner'
                    } else if(res.data.statusCode===400){
                        document.getElementById('updatePartnerBtn').innerHTML = 'Submit';
                        document.getElementById('updatePartnerBtn').removeAttribute('disabled')
                        updatePartner.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('updatePartnerBtn').innerHTML = 'Submit';
                        document.getElementById('updatePartnerBtn').removeAttribute('disabled')
                        updatePartner.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', err.statusMessage)
                    document.getElementById('updatePartnerBtn').innerHTML = 'Submit';})
                    document.getElementById('updatePartnerBtn').removeAttribute('disabled')
                    updatePartner.classList.remove('was-validated');
        }
    })
}
