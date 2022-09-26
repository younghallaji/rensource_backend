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
const createFaq = document.getElementById('createFaq');
if (createFaq != undefined) {
    createFaq.addEventListener('submit', (event)=>{
        event.preventDefault()
        if (createFaq.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            createFaq.classList.add('was-validated');
        } else {
            document.getElementById('createFaqBtn').innerHTML = 'Loading...';
            $('.alert').hide();
            event.preventDefault();
            createFaq.classList.add('was-validated');
            

            axios({
                method: 'post',
                url: `${url}FAQs/createFAQ`,
                data: {
                    question: $('#title').val(),
                    answer: $('#content').val(),
                    createdBy: addedby
                }
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('createFaqBtn').innerHTML = 'Submit';
                        createFaq.classList.remove('was-validated');
                        createFaq.reset()
                        // window.location.href='add-press'
                    } else if(res.data.statusCode===400){
                        document.getElementById('createFaqBtn').innerHTML = 'Submit';
                        createFaq.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('createFaqBtn').innerHTML = 'Submit';
                        createFaq.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    SuccessAlert('error', 'Error', err.statusMessage)
                    document.getElementById('createFaqBtn').innerHTML = 'Submit';})
                    createFaq.classList.remove('was-validated');
        }
    })
}


// Get Faqs

let faqList = document.getElementById('faq-list')
if (faqList != undefined && faqList != null) {
    const header = {
        'Content-type': 'application/json'
    }
    let output = "";
    axios({
        method: 'GET',
        url: `${url}FAQs/AllFAQ`,
        withCredentials: false
    }, {header})
    .then(presses =>{
        console.log(presses)
        for(let press of presses.data.data) {
           output +=  `<div class="col-md-12">
                            <div class="card row">
                                <div class="card-body ">
                                    <h4><b>${press.question}</b></h4>
                                    <p>${press.answer}</p>
                                    <hr />
                                    
                                <a href="edit-faq#${press.id}" class="bg-success text-white border-success border m-2"><i  class="fe fe-edit"></i></a>
                                        
                                <a href="javascript:void(0)" id=${press.id} class="bg-danger text-white border-danger m-2 delete-team border"><i class="fe fe-trash"></i></a>
                                </div>
                                
                            </div>
                        </div>`
            
       faqList.innerHTML = output
        }
    })
}

// Delete FAQ

$('#faq-list').on('click', '.delete-team', function() {
    if (confirm('Are You Sure')) {
        const teamID = this.id;
        $('#loading').trigger('click');
        $.ajax({
            url: `${url}FAQs/DeleteFAQ?Id=${teamID}`,
            method: 'DELETE',
            success: function (response) {
                if (response.statusCode == 200) {
                    SuccessAlert('success', 'Success', response.statusMessage)
                    window.location = 'faq-list.html';
                } else {
                    SuccessAlert('error', 'Error', response.statusMessage)
                }
            }
        })
    }
	return false;

})

// Get FAQ Details

function getFAQ(){
    let id = window.location.toString().split('#')[1];
    $.ajax({
        url: `${url}FAQs/FAQ?Id=${id}`,
        success: function(response){
            console.log(response)
            $('#question').val(response.data.question)
            $('#answer').val(response.data.answer)
            
        }
    })
}

// Update FAQ

let editFaq = document.getElementById('editFaq');
if (editFaq != undefined) {
    
    let id = window.location.toString().split('#')[1];
    editFaq.addEventListener('submit', (event)=>{
        if (editFaq.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.alert').show();
            editFaq.classList.add('was-validated');
        } else {
            const btn = document.getElementById('editFaqBtn')
            btn.innerHTML = 'Loading...';
            btn.setAttribute('disabled', 'disabled')
            $('.alert').hide();
            event.preventDefault();
            editFaq.classList.add('was-validated');
            
           
            axios({
                method: 'put',
                url: `${url}FAQs/UpdateFAQ`,
                data: {
                    question: $('#question').val(),
                    answer: $('#answer').val(),
                    id: id,
                    updatedBy: addedby,
                    
                }
                })
                .then(res =>{
                    if (res.data.statusCode === 200) {
                        SuccessAlert('success', 'Success', res.data.statusMessage)
                        document.getElementById('editFaqBtn').innerHTML = 'Submit';
                        editFaq.classList.remove('was-validated');
                    } else if(res.data.statusCode===400){
                        document.getElementById('editFaqBtn').innerHTML = 'Submit';
                        editFaq.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }else {
                        document.getElementById('editFaqBtn').innerHTML = 'Submit';
                        editFaq.classList.remove('was-validated');
                        SuccessAlert('error', 'Error', res.data.statusMessage)
                    }
                })
                .catch(err=>{
                    console.log(err)
                    SuccessAlert('error', 'Error', err.response.statusText)
                    document.getElementById('editFaqBtn').innerHTML = 'Submit';})
                    editFaq.classList.remove('was-validated');
            
        }
    });
}