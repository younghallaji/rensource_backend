function SuccessAlert(type, title, message){
    swal({
        title: title,
        text: message,
        type: type,
        showCancelButton: false,
        confirmButtonText: 'Ok',
    })
}

const url = 'https://18.193.182.151:4431/api/v1/'
const addedby = sessionStorage.getItem('id');
const createPress = document.getElementById('createPress');
if (createPress != undefined) {
    createPress.addEventListener('submit', (event)=>{
        event.preventDefault()
        let tags = $('#tags').val();
        let tagsArray = tags.split(',');
        if (createPress.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            createPress.classList.add('was-validated');
        } else {
            document.getElementById('createPressBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            createPress.classList.add('was-validated');
            const formData = new FormData(createPress)
            formData.append('createdBy', addedby)
            formData.append('tags', tagsArray)
            console.log([...formData])

            axios({
                method: 'post',
                url: `${url}PressRelease/CreatePressRelease`,
                data: formData
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('createPressBtn').innerHTML = 'Submit';
                        createPress.classList.remove('was-validated');
                        window.location.href='add-press'
                    } else if(res.data.statusCode===400){
                        document.getElementById('createPressBtn').innerHTML = 'Submit';
                        createPress.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('createPressBtn').innerHTML = 'Submit';
                        createPress.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', err.statusMessage)
                    document.getElementById('createPressBtn').innerHTML = 'Submit';})
                    createPress.classList.remove('was-validated');
        }
    })
}

// GET News

let pressReleaseList = document.getElementById('pressReleaseList')
if (pressReleaseList != undefined && pressReleaseList != null) {
    console.log('pressRelease')
    const header = {
        'Content-type': 'application/json'
    }
    let output = "";
    axios({
        method: 'GET',
        url: `${url}PressRelease/AllPressRelease?pageNumber=1&pageSize=20`,
        withCredentials: false
    }, {header})
    .then(presses =>{
        console.log(presses)
        for(let press of presses.data.data) {
           output +=  `<div class="col-md-6 col-xl-4">
           <div class="card">
               <div class="product-grid6">
                   <div class="product-image6 p-5">
                       <ul class="icons">
                           <li>
                               <a href="view-press#${press.id}" class="bg-primary text-white border-primary border"> <i class="fe fe-eye">  </i> </a>
                           </li>
                           <li><a href="edit-press#${press.id}" class="bg-success text-white border-success border"><i  class="fe fe-edit"></i></a></li>
                           <li>
                               <a href="javascript:void(0)" id=${press.id} class="bg-danger text-white border-danger delete-team border"><i class="fe fe-trash"></i></a>
                           </li>
                       </ul>
                       <a href="#" class="bg-light">
                           <img class="img-fluid br-7 w-100" src=${press.image} alt="img">
                       </a>
                   </div>
                   <div class="card-body pt-0">
                       <div class="product-content text-center">
                           <h1 class="title fw-bold fs-20">${press.title }</h1>
                       </div>
                   </div>
               </div>
           </div>
       </div>`
            
       pressReleaseList.innerHTML = output
        }
    })
}

// Delete News

$('#pressReleaseList').on('click', '.delete-team', function() {
    if (confirm('Are You Sure')) {
        const teamID = this.id;
        $('#loading').trigger('click');
        $.ajax({
            url: `${url}PressRelease/DeletePressRelease?Id=${teamID}`,
            method: 'DELETE',
            success: function (response) {
                if (response.statusCode == 200) {
                    SuccessAlert('success', 'Success', response.statusMessage)
                    window.location = 'press-list';
                } else {
                    SuccessAlert('error', 'Error', response.statusMessage)
                }
            }
        })
    }
	return false;

})

// Single view Press

function getPressDetails(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}PressRelease/PressRelease?Id=${id}`,
        success: function(response){
            console.log(response)
            $('#title').html(response.data.title)
            $('#content').html(response.data.content)
            // $('#firstname').val(response.data.firstName)
        }
    })
}

// PressDetails for Edit
function pressDetails(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}PressRelease/PressRelease?Id=${id}`,
        success: function(response){
            console.log(response)
            $('#title').val(response.data.title)
            $('textarea').text(response.data.content)
            $('#previousImage').attr('src', response.data.image)
            $('#tags').val(response.data.tags)
        }
    })
}

// Update News

let updatePress = document.getElementById('updatePress');
if (updatePress != undefined) {
    
    let id = window.location.toString().split('#')[1];
    updatePress.addEventListener('submit', (event)=>{
        if (updatePress.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            updatePress.classList.add('was-validated');
        } else {
            document.getElementById('updatePressBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            updatePress.classList.add('was-validated');
            let tags = $('#tags').val();
            let tagsArray = tags.split(',');
            console.log(tagsArray)
            const formData = new FormData(updatePress)
            formData.append('updatedBy', addedby)
            formData.append('id', id)
            formData.append('tags', tagsArray)
            console.log([...formData]);
           
            axios({
                method: 'put',
                url: `${url}PressRelease/UpdatePressRelease`,
                data: formData
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('updatePressBtn').innerHTML = 'Submit';
                        updatePress.classList.remove('was-validated');
                    } else if(res.data.statusCode===400){
                        document.getElementById('updatePressBtn').innerHTML = 'Submit';
                        updatePress.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('updatePressBtn').innerHTML = 'Submit';
                        updatePress.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', err.statusMessage)
                    document.getElementById('updatePressBtn').innerHTML = 'Submit';})
                    updatePress.classList.remove('was-validated');
            
        }
    });
}