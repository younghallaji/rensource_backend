function addPressRelease() {
    let tags = document.getElementById('tags').value;
    return tags.split(",")
}

const url = 'https://18.193.182.151:4431/api/v1/'
const addedby = sessionStorage.getItem('id');
const createPress = document.getElementById('createPress');
let tagArray = addPressRelease()
if (createPress != undefined) {
        let tags = document.getElementById()
        createPress.addEventListener('submit', (event)=>{
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
                console.log([...formData])
               
                // axios({
                //     method: 'post',
                //     url: `${url}ExecTeam/CreateExecTeam`,
                //     data: formData
                //     })
                //     .then(res =>{
                //         if (res.data.statusCode === 200) {
                //             SuccessAlert('success', 'Success', res.data.statusMessage)
                //             document.getElementById('createPressBtn').innerHTML = 'Submit';
                //             createPress.classList.remove('was-validated');
                //         } else if(res.data.statusCode===400){
                //             document.getElementById('createPressBtn').innerHTML = 'Submit';
                //             createPress.classList.remove('was-validated');
                //             SuccessAlert('error', 'Error', res.data.statusMessage)
                //         }else {
                //             document.getElementById('createPressBtn').innerHTML = 'Submit';
                //             createPress.classList.remove('was-validated');
                //             SuccessAlert('error', 'Error', res.data.statusMessage)
                //         }
                //     })
                //     .catch(err=>{
                //         SuccessAlert('error', 'Error', err.statusMessage)
                //         document.getElementById('createPressBtn').innerHTML = 'Submit';})
                //         createPress.classList.remove('was-validated');
                
            }
        });
}