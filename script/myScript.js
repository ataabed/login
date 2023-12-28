// user array 
var systemUsers = [];
var userData = { name: '', email: '', password: '' };
var frmUserName = document.querySelector('#userName');
var frmUserEmail = document.querySelector('#userEmail');
var frmUserPassword = document.querySelector('#userPassword');
var userLoginState = false;
var currentUserData = {};
const emailPattern = /^[\w\.]+@([\w]+\.)+[\w]{2,4}$/ig;
const namePattern = /^[\w]{4,}$/ig;

/* check pattern*/
function check_emailValid(s) {
    if ( emailPattern.test(s) == true) {
        return true;
    }
    else {
        return false;
    }
}
function check_nameValid(s) {
    if (s.length>3&& namePattern.test(s) == true) {
        return true;
    }
    else {
        return false;
    }
}

function check_password (s)
{

    if ( s.length<5||s==null) {
        applyNotValid(frmUserPassword)
    }
    else {
        applyValid(frmUserPassword)
    }

}


/** Local Storage **/
// store data to local storage

function saveToLocalStorage(keyName, data) {
    if (typeof (Storage) != 'undefined') {
        localStorage.setItem(keyName, JSON.stringify(data));
    }
}
// read data from local storage

function readFromLocalStorage(keyName) {
    if (typeof (Storage) != 'undefined') {
        return JSON.parse(localStorage.getItem(keyName));
    }

}
//  remove data from local storage
function removeFromLocalStorage(keyName) {
    if (typeof (Storage) != 'undefined') {
        return localStorage.removeItem(keyName)
    }
}

// clear local storage

function emptyLocalStorage(keyName) {
    if (typeof (Storage) != 'undefined') {
        return localStorage.clear();
    }
}
/* End of local storage */


// get saved user from locastorage 
function getSavedUser() {
    if (systemUsers.length > 0) {
        systemUsers.splice(0);
    }
    const temp = readFromLocalStorage('systemUsers');
    if (temp !== null && temp.length > 0) {
        systemUsers = [...temp];
    }


}
getSavedUser();

// login_register model
const myModal = new bootstrap.Modal(document.getElementById('myModal'))

document.addEventListener('DOMContentLoaded', () => {
    myModal.show()


})
document.querySelector('#btnSignUp').addEventListener('click', () => {
    document.querySelector('#p_login').classList.replace('d-block', 'd-none');
    document.querySelector('#p_signUp').classList.replace('d-none', 'd-block');
    document.querySelector('#userName').classList.replace('d-none', 'd-block')
    document.querySelector('#btnMemberLogin').classList.replace('d-block', 'd-none');
    document.querySelector('#btnNewMemberAdd').classList.replace('d-none', 'd-block');
    hide_userIncorrectData();
    clear_Form();

})
document.querySelector('#btnShowLogin').addEventListener('click', () => {
    document.querySelector('#p_signUp').classList.replace('d-block', 'd-none');
    document.querySelector('#p_login').classList.replace('d-none', 'd-block');
    document.querySelector('#userName').classList.replace('d-block', 'd-none')

    document.querySelector('#btnNewMemberAdd').classList.replace('d-block', 'd-none');
    document.querySelector('#btnMemberLogin').classList.replace('d-none', 'd-block');

    hide_userIncorrectData();
    clear_Form();


})

//check input is valid 







// home page 
function show_HomePage() {

    document.querySelector('#home_welcome').innerHTML = 'Welcome';
    document.querySelector('#btnLogOut').classList.toggle('d-none');

    document.querySelector('#home_Welcome_User').innerHTML += userData.name;

    document.querySelector('#divHomeContent').classList.replace('d-none', 'd-flex')

}
function hide_HomePage() {
    document.querySelector('#home_welcome').innerHTML = '';
    document.querySelector('#home_Welcome_User').innerHTML = '';
    document.querySelector('#btnLogOut').classList.toggle('d-none');
    document.querySelector('#divHomeContent').classList.replace('d-flex', 'd-none')

}
function clear_Form() {
    frmUserEmail.value = "";
    frmUserName.value = "";
    frmUserPassword.value = "";
    frmUserEmail.classList.remove('is-valid');
    frmUserEmail.classList.remove('is-invalid');
    frmUserName.classList.remove('is-valid');
    frmUserName.classList.remove('is-invalid');
    frmUserPassword.classList.remove('is-valid');
    frmUserPassword.classList.remove('is-invalid');
}
// login button


document.querySelector("#btnMemberLogin").addEventListener('click', () => {
    // check inputs are valid 

    // if not valid call showw incorrect(1)

    // if valid
    // is user saved in array  in or no 
    if (systemUsers.length > 0) {
        for (let i = 0; i < systemUsers.length; i++) {
            if (systemUsers[i].email == frmUserEmail.value
                && systemUsers[i].password == frmUserPassword.value
            ) {
                hide_userIncorrectData()
                userData = { ...systemUsers[i] };

                userLoginState = true;
                myModal.hide();
                clear_Form();

                show_HomePage();

                return 0;;

            }
            else {
                show_userIncorrectData(1);
            }
        }
    }
    else {
        show_userIncorrectData(1);
    }

})

//if not saved show data like you not registered user 
// 
//if saved 


//  document.querySelector('#divHomeContent').classList.replace('d-none', 'd-flex')



//

//signUp button
document.querySelector('#btnNewMemberAdd').addEventListener('click', () => {
    userData.name = frmUserName.value;
    userData.email = frmUserEmail.value;
    userData.password = frmUserPassword.value;
    // check user data is valid 

    if (systemUsers.length > 0) {
        for (let i = 0; i < systemUsers.length > 0; i++) {
            if (systemUsers[i].email == userData.email) {

                show_userIncorrectData(3);
                return 0;
            }

        }
    }

    // save new user data 
    show_userIncorrectData(4);
    saveNewUser(userData);

    // console.log(JSON.stringify(userData));
})


function saveNewUser(data) {
    systemUsers.push(data);
    saveToLocalStorage('systemUsers', systemUsers);


}
function Span_incorrectColor() {
    const temp = document.querySelector('#span_inCorrect_data');
    if (temp.classList.contains('text-success')) {
        temp.classList.replace('text-success', 'text-danger');

    }

}

function show_userIncorrectData(i) {
    const temp = document.querySelector('#span_inCorrect_data');
    switch (i) {
        case 1:// login form
            temp.innerHTML = 'incorrect email or password';
            Span_incorrectColor();
            break;
        case 2:// signUp form
            temp.innerHTML = 'All inputs is required';
            Span_incorrectColor();

            break;
        case 3:// signUp form email exis
            temp.innerHTML = 'email aleray exist';
            Span_incorrectColor();



            break;
        case 4:// signUp form success
            temp.innerHTML = 'Success';
            temp.classList.replace('text-danger', 'text-success');


            break;
    }
    document.querySelector('#span_inCorrect_data').classList.replace('d-none', 'd-block')

    // document.querySelector('#span_inCorrect_data').classList.toggle('d-none')
}
function hide_userIncorrectData() {
    document.querySelector('#span_inCorrect_data').classList.replace('d-block', 'd-none');


}
function getUserData() {
    // check if inputs are valid
    let f = 0;
    for (let i = 0; i < systemUsers.length; i++) {
        if (systemUsers[i].email == frmUserEmail.value
            && systemUsers[i].password == frmUserPassword.value
        ) {
            userData = { ...systemUsers[i] };

            userLoginState = true;
            myModal.hide();
            f = 1;
            break;

        }
    }
    if (f = 0) {

        show_userIncorrectData(1);
    }

}

//logout button
document.querySelector('#btnLogOut').addEventListener('click', () => {
    userData.email = '';
    userData.name = '';
    userData.password = '';
    hide_HomePage()
    clear_Form();
    myModal.show();
})

/* input validation section*/
function applyNotValid(e) {
    e.classList.remove('is-valid')
    e.classList.add('is-invalid')
}
function applyValid(e) {
    e.classList.add('is-valid')
    e.classList.remove('is-invalid')
}
frmUserEmail.addEventListener('change', () => {
    const temp = frmUserEmail.value;
    if (check_emailValid(temp) == false) {
        applyNotValid(frmUserEmail)
    }
    else {
        applyValid(frmUserEmail)
    }

})

frmUserName.addEventListener('change', () => {

    const temp = frmUserName.value;
    if (check_nameValid(temp) == false) {
        applyNotValid(frmUserName)
    }
    else {
        applyValid(frmUserName)
    }

})

frmUserPassword.addEventListener('change', () => {

    const temp = frmUserPassword.value;
   check_password(temp);

})