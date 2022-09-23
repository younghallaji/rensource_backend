const singleSideMenu = document.getElementById('side-menu')
    fetch('includes/side-menu.html')
    .then( (response) => {
        return response.text();
    })
    .then((html)=>{
        singleSideMenu.innerHTML = html
    })
    .catch(err => console.error(err));

$('#side-menu').on('click', '.side-menu .slide',function(){
	$(this).toggleClass('is-expanded');
});

let adminName = document.getElementById('adminName')
let roleName = document.getElementById('admin-role')
if (adminName != undefined && roleName != undefined) {
    console.log('first')
    const role = (sessionStorage.roleId === 2 ) ? 'Administrator' : 'Super Administrator'
    adminName.innerHTML = sessionStorage.firstName + ' ' + sessionStorage.lastName;
    roleName.innerHTML = role
}

const logout = document.getElementById('logoutBtn');
        logout.addEventListener('click', (e)=>{
            e.preventDefault();
            console.log('clicked');
            sessionStorage.clear();
            window.location.href='index.html';
        })