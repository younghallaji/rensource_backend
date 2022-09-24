// CREATING NEW ADMINISTRATOR
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
const addExecutive = document.getElementById('executive-role');
if (addExecutive != undefined) {
    addExecutive.addEventListener('submit', (event)=>{
        if (addExecutive.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            addExecutive.classList.add('was-validated');
        } else {
            document.getElementById('addExecutiveBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            addExecutive.classList.add('was-validated');
    
            axios({
                method: 'post',
                url: `${url}ExecRole/CreateExecRole`,
                data: {
                    executiveRoleName: rolename.value,
                    createdBy: addedby,
                    
                    }
                })
                .then(res =>{
                    console.log(res.sta)
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('addExecutiveBtn').innerHTML = 'Submit';
                        addExecutive.classList.remove('was-validated');
                    } else if(res.data.statusCode===400){
                        document.getElementById('addExecutiveBtn').innerHTML = 'Submit';
                        addExecutive.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('addExecutiveBtn').innerHTML = 'Submit';
                        addExecutive.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', res.data.statusMessage)
                    document.getElementById('addExecutiveBtn').innerHTML = 'Submit';})
                    addExecutive.classList.remove('was-validated');
            
        }
    });
}

// Get Executive Roles

const roleTable = document.getElementById('roles');
if (roleTable != undefined && roleTable != null) {
    const header = {
        'Content-type': 'application/json'
    }
    let output = "";
    axios({
        method: 'GET',
        url: `${url}ExecRole/AllExecRoles`,
        withCredentials: false
    }, {header})
    .then(executives =>{
        for(let executive of executives.data.data) {
            let splitDate = executive.dateCreated.split("T");
            let date = splitDate[0]
            let time = splitDate[1].split(".")[0];
            let datetime = date + " " + time
           output +=  `<tr>
                            <td>${executive.executiveRoleName}</td>
                            <td>${datetime}</td>
                            <td>
                                <div class="g-2">
                                <a href='edit-role#${executive.id}' class="btn text-primary btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-original-title="Edit"><span
                                        class="fe fe-edit fs-14"></span></a>
                                <a  class="delete btn text-danger btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-original-title="Delete"><span id=${executive.id}
                                        class="delete fe fe-trash-2 fs-14"></span></a>
                                </div>  
                            </td>
                        </tr>`
            
            roleTable.innerHTML = output
        }
    })
}

// DELETE EXECUTIVE ROLE
$('#roles').on('click', '.delete', function() {
    if (confirm('Are You Sure')) {
        const roleID = this.id;
        $.ajax({
            url: `${url}ExecRole/DeleteExecRole?Id=${roleID}`,
            method: 'DELETE',
            success: function (response) {
                console.log(response)
                if (response.statusCode == 200) {
                    SuccessAlert('success', 'Success', response.statusMessage)
                    alert(response.statusMessage);
                } else {
                    SuccessAlert('error', 'Error', response.statusMessage)
                    window.location = 'executive-role';
                }
            }
        })
    }
	return false;

})

function getRoleDetails(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}ExecRole/ExecRole?Id=${id}`,
        success: function(response){
            $('#rolename').val(response.data.executiveRoleName)
        }
    })
}



// Update Role

const updateForm = document.getElementById('update-role');
if (updateForm != undefined) {
    updateForm.addEventListener('submit', (event) => {
        if (updateForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            updateForm.classList.add('was-validated');
        } else {
            document.getElementById('updateFormBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            updateForm.classList.add('was-validated');
            let id = window.location.toString().split('#')[1];
            axios({
                method: 'put',
                url: `${url}ExecRole/UpdateExecRole`,
                data: {
                    executiveRoleName: $('#rolename').val(),
                    id: id,
                    updatedBy: addedby
                }
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('updateFormBtn').innerHTML = 'Submit';
                        updateForm.classList.remove('was-validated');
                    } else if(res.data.statusCode===400){
                        document.getElementById('updateFormBtn').innerHTML = 'Submit';
                        updateForm.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('updateFormBtn').innerHTML = 'Submit';
                        updateForm.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', res.data.statusMessage)
                    document.getElementById('updateFormBtn').innerHTML = 'Submit';})
                    updateForm.classList.remove('was-validated');
            
        }
        
    })
}

// Create Executive Category
const createCategory = document.getElementById('createCategory')
if (createCategory != undefined) {
    let categoryname = document.getElementById('categoryname');
    createCategory.addEventListener('submit', (event)=>{
        if (createCategory.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            createCategory.classList.add('was-validated');
        } else {
            event.preventDefault()
            document.getElementById('createCategoryBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            createCategory.classList.add('was-validated');

            axios({
                method: 'post',
                url: `${url}ExecTeamCategory/CreateExecCategory`,
                data: {
                    executiveTeamCategoryName: categoryname.value,
                    createdBy: addedby,
                    
                }
            })

            .then(res =>{
                if (res.data.statusCode === 200) {
                    SuccessAlert('success', 'Success', res.data.statusMessage)
                    document.getElementById('createCategoryBtn').innerHTML = 'Submit';
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
            .catch(err=>{
                SuccessAlert('error', 'Error', err.response.statusText)
                document.getElementById('createCategoryBtn').innerHTML = 'Submit';})
                createCategory.classList.remove('was-validated');
        }
    })
}

    
            
            

// Get Executive Categories
const categoryTable = document.getElementById('categoryTable');
if (categoryTable != undefined && categoryTable != null) {
    const header = {
        'Content-type': 'application/json'
    }
    let output = "";
    axios({
        method: 'GET',
        url: `${url}ExecTeamCategory/AllExecCategory`,
        withCredentials: false
    }, {header})
    .then(executives =>{
        let arraykeys = Object.keys(executives.data.data)
        console.log(executives.data.data.reverse())
        for(let executive of executives.data.data) {
            let splitDate = executive.executiveTeamCategory.dateCreated.split("T");
            let date = splitDate[0]
            let time = splitDate[1].split(".")[0];
            let datetime = date + " " + time
           output +=  `<tr>
                            <td>${executive.executiveTeamCategory.executiveTeamCategoryName}</td>
                            <td>${datetime}</td>
                            <td>
                                <div class="g-2">
                                <a href='edit-category#${executive.id}' class="btn text-primary btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-original-title="Edit"><span
                                        class="fe fe-edit fs-14"></span></a>
                                <a  class="delete btn text-danger btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-original-title="Delete"><span id=${executive.id}
                                        class="delete fe fe-trash-2 fs-14"></span></a>
                                </div>  
                            </td>
                        </tr>`
            
            categoryTable.innerHTML = output
        }
    })
}

// Delete Executive Category
$('#categoryTable').on('click', '.delete', function() {
    if (confirm('Are You Sure')) {
        const categoryID = this.id;
        console.log(categoryID)
        $.ajax({
            url: `${url}ExecTeamCategory/DeleteExecCategory?Id=${categoryID}`,
            method: 'DELETE',
            success: function (response) {
                console.log(response)
                if (response.statusCode == 200) {
                    SuccessAlert('success', 'Success', response.statusMessage)
                    window.location = 'executive-category';
                } else {
                    SuccessAlert('error', 'Error', response.statusMessage)
                }
            }
        })
    }
	return false;

})

// Get Single Category details
function getCategoryDetails(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}ExecTeamCategory/ExecCategory?Id=${id}`,
        success: function(response){
            $('#catname').val(response.data.executiveTeamCategoryName)
        }
    })
}



// Update Category

const updateCat = document.getElementById('updateCat');
if (updateCat != undefined) {
    updateCat.addEventListener('submit', (event) => {
        if (updateCat.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            updateCat.classList.add('was-validated');
        } else {
            document.getElementById('updateCatBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            updateCat.classList.add('was-validated');
            let id = window.location.toString().split('#')[1];
            axios({
                method: 'put',
                url: `${url}ExecTeamCategory/UpdateExecCategory`,
                data: {
                    executiveTeamCategoryName: $('#catname').val(),
                    id: id,
                    updatedBy: addedby
                }
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('updateCatBtn').innerHTML = 'Update';
                        updateCat.classList.remove('was-validated');
                    } else if(res.data.statusCode===400){
                        document.getElementById('updateCatBtn').innerHTML = 'Update';
                        updateCat.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('updateCatBtn').innerHTML = 'Update';
                        updateCat.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', res.data.statusMessage)
                    document.getElementById('updateCatBtn').innerHTML = 'Update';})
                    updateCat.classList.remove('was-validated');
            
        }
        
    })
}

// Get EXECUTIVE ROLE AND CATEGORY
function getRoles() {
    return axios.get(`${url}ExecRole/AllExecRoles`);
}

function getCategory() {
    return axios.get(`${url}ExecTeamCategory/AllExecCategory`);
}

Promise.all([getRoles(), getCategory()])
.then(function (results) {
let roleOutput = '';
let catOutput = '';
const roles = results[0].data.data;
const categories = results[1].data.data;
const selectRole = document.getElementById('role')
const selectCategory = document.getElementById('category')
for (const role of roles) {
  roleOutput += `<option value=${role.id}>${role.executiveRoleName}</option>`
}

for (const category of categories) {
  catOutput += `<option value=${category.executiveTeamCategory.id}>${category.executiveTeamCategory.executiveTeamCategoryName}</option>`
}
selectRole.innerHTML = roleOutput;
selectCategory.innerHTML = catOutput
console.log(role)
console.log(category)
});

// Add Executive Team
let createTeam = document.getElementById('createTeam');
if (createTeam != undefined) {
    createTeam.addEventListener('submit', (event)=>{
        if (createTeam.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            createTeam.classList.add('was-validated');
        } else {
            document.getElementById('createTeamBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            createTeam.classList.add('was-validated');
            const formData = new FormData(createTeam)
            formData.append('createdBy', addedby)
            console.log([...formData])
           
            axios({
                method: 'post',
                url: `${url}ExecTeam/CreateExecTeam`,
                data: formData
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('createTeamBtn').innerHTML = 'Submit';
                        createTeam.classList.remove('was-validated');
                    } else if(res.data.statusCode===400){
                        document.getElementById('createTeamBtn').innerHTML = 'Submit';
                        createTeam.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('createTeamBtn').innerHTML = 'Submit';
                        createTeam.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', err.statusMessage)
                    document.getElementById('createTeamBtn').innerHTML = 'Submit';})
                    createTeam.classList.remove('was-validated');
            
        }
    });
}

// GET EXECUTIVE TEAM
let execTeam = document.getElementById('execTeam')
if (execTeam != undefined && execTeam != null) {
    const header = {
        'Content-type': 'application/json'
    }
    let output = "";
    axios({
        method: 'GET',
        url: `${url}ExecTeam/AllExecTeam`,
        withCredentials: false
    }, {header})
    .then(executives =>{
        for(let executive of executives.data.data) {
           output +=  `<div class="col-md-6 col-xl-4">
           <div class="card">
               <div class="product-grid6">
                   <div class="product-image6 p-5">
                       <ul class="icons">
                           <li>
                               <a href="view-executive#${executive.id}" class="bg-primary text-white border-primary border"> <i class="fe fe-eye">  </i> </a>
                           </li>
                           <li><a href="edit-executive#${executive.id}" class="bg-success text-white border-success border"><i  class="fe fe-edit"></i></a></li>
                           <li>
                               <a href="javascript:void(0)" id=${executive.id} class="bg-danger text-white border-danger delete-team border"><i class="fe fe-trash"></i></a>
                           </li>
                       </ul>
                       <a href="#" class="bg-light">
                           <img class="img-fluid br-7 w-100" src=${executive.image} alt="img">
                       </a>
                   </div>
                   <div class="card-body pt-0">
                       <div class="product-content text-center">
                           <h1 class="title fw-bold fs-20">${executive.firstName + " " + executive.lastName + " " + executive.otherName }</h1>
                           <div class="price pt-0">${executive.executiveRoles.executiveRoleName}</div>
                       </div>
                   </div>
               </div>
           </div>
       </div>`
            
            execTeam.innerHTML = output
        }
    })
}

// DELETE EXECUTIVE MEMBER
$('#execTeam').on('click', '.delete-team', function() {
    if (confirm('Are You Sure')) {
        const teamID = this.id;
        $('#loading').trigger('click');
        $.ajax({
            url: `${url}ExecTeam/DeleteExecTeam?Id=${teamID}`,
            method: 'DELETE',
            success: function (response) {
                if (response.statusCode == 200) {
                    SuccessAlert('success', 'Success', response.statusMessage)
                    window.location = 'all-executive';
                } else {
                    SuccessAlert('error', 'Error', response.statusMessage)
                }
            }
        })
    }
	return false;

})

// Get Executive Team Details For Update

function getMemberDetails(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}ExecTeam/ExecTeam?Id=${id}`,
        success: function(response){
            console.log(response)
            $('#firstname').val(response.data.firstName)
            $('#lastname').val(response.data.lastName)
            $('#othername').val(response.data.otherName)
            $('#linkedin').val(response.data.linkedIn)
            // $('#firstname').val(response.data.firstName)
        }
    })
}

let updateTeam = document.getElementById('updateTeam');
if (updateTeam != undefined) {
    let id = window.location.toString().split('#')[1];
    updateTeam.addEventListener('submit', (event)=>{
        if (updateTeam.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            updateTeam.classList.add('was-validated');
        } else {
            document.getElementById('updateTeamBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            updateTeam.classList.add('was-validated');
            const formData = new FormData(updateTeam)
            formData.append('updatedBy', addedby)
            formData.append('id', id)
            console.log(formData);
           
            axios({
                method: 'put',
                url: `${url}ExecTeam/UpdateExecTeam`,
                data: formData
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('updateTeamBtn').innerHTML = 'Submit';
                        updateTeam.classList.remove('was-validated');
                    } else if(res.data.statusCode===400){
                        document.getElementById('updateTeamBtn').innerHTML = 'Submit';
                        updateTeam.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('updateTeamBtn').innerHTML = 'Submit';
                        updateTeam.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', err.statusMessage)
                    document.getElementById('updateTeamBtn').innerHTML = 'Submit';})
                    updateTeam.classList.remove('was-validated');
            
        }
    });
}

