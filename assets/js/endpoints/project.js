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
const addedby = sessionStorage.getItem('id');
const createProject = document.getElementById('createProject');
if (createProject != undefined) {
    createProject.addEventListener('submit', (event)=>{
        event.preventDefault()
        if (createProject.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            createProject.classList.add('was-validated');
        } else {
            document.getElementById('createProjectBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            createProject.classList.add('was-validated');
            const formData = new FormData(createProject)
            formData.append('createdBy', addedby)
            console.log([...formData])

            axios({
                method: 'post',
                url: `${url}Projects/CreateProject`,
                data: formData
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('createProjectBtn').innerHTML = 'Submit';
                        createProject.classList.remove('was-validated');
                        createProject.reset()
                    } else if(res.data.statusCode===400){
                        document.getElementById('createProjectBtn').innerHTML = 'Submit';
                        createProject.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('createProjectBtn').innerHTML = 'Submit';
                        createProject.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', err.statusMessage)
                    document.getElementById('createProjectBtn').innerHTML = 'Submit';})
                    createProject.classList.remove('was-validated');
        }
    })
}


// Get project 

let projectList = document.getElementById('projectList')
if (projectList != undefined && projectList != null) {
    const header = {
        'Content-type': 'application/json'
    }
    let output = "";
    axios({
        method: 'GET',
        url: `${url}Projects/AllProjects?pageNumber=1&pageSize=4`,
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
                               <a href="view-project#${press.id}" class="bg-primary text-white border-primary border"> <i class="fe fe-eye">  </i> </a>
                           </li>
                           <li><a href="edit-project#${press.id}" class="bg-success text-white border-success border"><i  class="fe fe-edit"></i></a></li>
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
            
       projectList.innerHTML = output
        }
    })
}

// Delete project

$('#projectList').on('click', '.delete-team', function() {
    if (confirm('Are You Sure')) {
        const teamID = this.id;
        $('#loading').trigger('click');
        $.ajax({
            url: `${url}Projects/DeleteProject?Id=${teamID}`,
            method: 'DELETE',
            success: function (response) {
                if (response.statusCode == 200) {
                    SuccessAlert('success', 'Success', response.statusMessage)
                    window.location = 'project-list.html';
                } else {
                    SuccessAlert('error', 'Error', response.statusMessage)
                }
            }
        })
    }
	return false;

})

// Get Projects
function getProject(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}Projects/Project?Id=${id}`,
        success: function(response){
            console.log(response)
            $('#title').html(response.data.title)
            $('#content').html(response.data.description)
            $('#overview').html(response.data.projectOverview)
            $('#information').html(response.data.technicalInformation)
            $('#benefits').html(response.data.practicalBenefits)
            $('#image').attr('src',response.data.image)
        }
    })
}

function getProjectEdit(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}Projects/Project?Id=${id}`,
        success: function(response){
            console.log(response)
            $('#title').val(response.data.title)
            $('#video').val(response.data.videoLink)
            $('#description').val(response.data.description)
            $('#projectOverview').val(response.data.projectOverview)
            $('#technicalInformation').val(response.data.technicalInformation)
            $('#practicalBenefits').val(response.data.practicalBenefits)
            $('#previousImage').attr('src',response.data.image)
        }
    })
}


// Update Project

let editProject = document.getElementById('editProject');
if (editProject != undefined) {
    
    let id = window.location.toString().split('#')[1];
    editProject.addEventListener('submit', (event)=>{
        if (editProject.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            editProject.classList.add('was-validated');
        } else {
            document.getElementById('editProjectBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            editProject.classList.add('was-validated');
            const formData = new FormData(editProject)
            formData.append('updatedBy', addedby)
            formData.append('id', id)
            console.log([...formData]);
           
            axios({
                method: 'put',
                url: `${url}Projects/UpdateProject`,
                data: formData
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('editProjectBtn').innerHTML = 'Submit';
                        editProject.classList.remove('was-validated');
                    } else if(res.data.statusCode===400){
                        document.getElementById('editProjectBtn').innerHTML = 'Submit';
                        editProject.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('editProjectBtn').innerHTML = 'Submit';
                        editProject.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', err.statusMessage)
                    document.getElementById('editProjectBtn').innerHTML = 'Submit';})
                    editProject.classList.remove('was-validated');
            
        }
    });
}