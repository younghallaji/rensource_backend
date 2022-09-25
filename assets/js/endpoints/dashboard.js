const url = 'https://18.193.182.151:4431/api/v1/'
function getExecutives() {
    return axios.get(`${url}ExecTeam/AllExecTeam`);
}

function getAdmin() {
    return axios.get(`${url}Admin/Alladmin`);
}
function getProject() {
    return axios.get(`${url}Projects/AllProjects?pageNumber=1&pageSize=1`);
}
function getNews() {
    return axios.get(`${url}PressRelease/AllPressRelease?pageNumber=1&pageSize=1`);
}

Promise.all([getExecutives(), getAdmin(), getProject(), getNews()])
.then(function (results) {

    const exec = (results[0].data.data == null) ? 0 : results[0].data.data.length ;
    const admin = (results[1].data.data == null) ? 0 : results[1].data.data.length
    const project = results[2].data.totalData;
    const news = results[3].data.totalData;
    const totalExec = document.getElementById('totalExec')
    const totalNews = document.getElementById('totalNews')
    const totalAdmin = document.getElementById('totalAdmin')
    const totalProject = document.getElementById('totalProject')

totalAdmin.innerHTML = admin;
totalExec.innerHTML = exec
totalProject.innerHTML = project;
totalNews.innerHTML = news
});
