const formDOM = document.querySelector("form");
const warnDOM = document.querySelector(".warning");
const warnExitDOM = document.querySelector(".warn-exit span");
const alertDOM = document.querySelector(".area-alert");
const alertExitDOM = document.querySelector(".alert-exit span");
const deleteAllDOM = document.querySelector(".delete-all button");
let tbodyDOM = document.querySelector("tbody");
let users = [];
let userId = 0;

let localValue = JSON.parse(localStorage.getItem("users"));
let localId = localStorage.getItem("userID");

if (localValue) {
    users = localValue;
    renderTodo(users)
}
if (localId) {
    userId = localId;
    renderTodo(users)
}

function renderTodo(param) {
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("userID", userId);
    tbodyDOM.innerHTML = ""
    param.forEach(item => {
        tbodyDOM.innerHTML += `
        <tr>
            <td class="check-box"> 
                <input type="checkbox" onclick="checkBoxClick(this,${item.id})" name="checkbox">
            </td>
            <td>${item.id}</td>
            <td>
                <input type="text">
                <span>${item.fullName}</span>
            </td>
            <td>
                <input type="email" >
                <span>${item.mail}</span>
            </td>
            <td>
                <input type="text">
                <span>**********</span>
            </td>
            <td id="btns">
                <button id="delete" onclick="deleteUser(${item.id})">Delete</button>
                <button id="edit" onclick="editUser(this,${item.id})">Edit</button>
                <button id="save" onclick="updateUser(this,${item.id})">Save</button>
            </td>
        </tr>`}
    )
}
formDOM.addEventListener("submit", (e) => {
    e.preventDefault()
    let fullNameValue = fullName.value,
        emailValue = email.value,
        passwordValue = password.value;
    if (fullNameValue === "" || emailValue === "" || passwordValue === "") {
        alertDOM.style.display = "block"
        setTimeout(() => {
            alertDOM.style.display = "none"
        }, 3000)
    } else {
        let foundUser = users.find(user => user.mail === emailValue);
        if (!foundUser) {
            users.push({
                id: ++userId,
                fullName: fullNameValue,
                mail: emailValue,
                password: passwordValue,
                checked: false
            });
            renderTodo(users)
            fullName.value = "";
            email.value = "";
            password.value = "";
        } else {
            warnDOM.style.display = "block";
            setTimeout(() => {
                warnDOM.style.display = "none";
            }, 3000);
        }
    }
})

function checkBoxClick(input, id) {
    let findUser = users.find(item => item.id === id);
    if (findUser.checked === false) {
        findUser.checked = true
        input.setAttribute("checked", "")
    } else {
        findUser.checked = false
        input.removeAttribute("checked")
    }
}

deleteAllDOM.addEventListener("click", () => {
    let filterUser = users.filter(item => item.checked !== true);
    users = filterUser;
    renderTodo(users)
})

function deleteUser(id) {
    let filteredUsers = users.filter(user => user.id !== id);
    users = filteredUsers;
    renderTodo(users)
}

function getDomElements(btn) {
    const { firstElementChild, lastElementChild, previousElementSibling } = btn.parentElement.previousElementSibling;
    let userEmail = previousElementSibling.lastElementChild,
        emailInput = userEmail.previousElementSibling;
    let userFullname = previousElementSibling.previousElementSibling.lastElementChild,
        fullnameInput = userFullname.previousElementSibling;
    return {
        firstElementChild,
        lastElementChild,
        userEmail,
        emailInput,
        userFullname,
        fullnameInput
    }
}

function editUser(editBtn, id) {
    const { firstElementChild,
        lastElementChild,
        userEmail,
        emailInput,
        userFullname,
        fullnameInput } = getDomElements(editBtn);

    //TODO: User Password & Input Password
    lastElementChild.style.display = "none"; //TODO: Password Span
    firstElementChild.style.display = "block"; //TODO: Password Input

    //TODO: User Email & Input Email
    userEmail.style.display = "none";
    emailInput.style.display = "block";

    //TODO: User Fullname & Input Fullname
    userFullname.style.display = "none";
    fullnameInput.style.display = "block";

    //TODO: Edit Button
    editBtn.style.display = "none"
    //TODO: Update Button
    editBtn.nextElementSibling.style.display = "block"

    //TODO: Found user
    let foundUser = users.find(user => user.id === id);
    firstElementChild.value = foundUser.password;
    emailInput.value = foundUser.mail;
    fullnameInput.value = foundUser.fullName
}


// ! Bug! (Birden cox update elemek isteyerken hamsi yenilenir!)
function updateUser(updateBtn, id) {
    const { firstElementChild,
        lastElementChild,
        userEmail,
        emailInput,
        userFullname,
        fullnameInput } = getDomElements(updateBtn);
    //TODO: User Password & Input Password
    lastElementChild.style.display = "block"; //TODO: Password Span
    firstElementChild.style.display = "none"; //TODO: Password Input

    //TODO: User Email & Input Email
    userEmail.style.display = "block";
    emailInput.style.display = "none";

    //TODO: User Fullname & Input Fullname
    userFullname.style.display = "block";
    fullnameInput.style.display = "none";

    //TODO: Update Button
    updateBtn.style.display = "none"
    //TODO: Edit Button
    updateBtn.previousElementSibling.style.display = "block"

    //TODO: Found user
    users.forEach(user => {
        if (user.id === id) {
            user.fullName = fullnameInput.value;
            user.mail = emailInput.value;
            user.password = firstElementChild.value;
        }
    })
    renderTodo(users);

    // let foundUser = users.find(user => user.id === id);
    // foundUser.fullName = fullnameInput.value
    // foundUser.mail = emailInput.value
    // foundUser.password = firstElementChild.value;
    // renderTodo(users)
}

console.log(users)


function exit(param, area) {
    param.addEventListener("click", () => {
        area.style.display = "none"
    })
}
exit(warnExitDOM, warnDOM);
exit(alertExitDOM, alertDOM);



