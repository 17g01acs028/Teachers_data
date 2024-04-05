
const publicKeyPem = `-----BEGIN RSA PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApl+uxNNb0lREYHDyg+Ug1EJGOoU+s6Rpz1SxEi74wcDVWS/Qj4mG9ocn0nkTyezpoZySJX3hRA/5Re6BbPZ4p6QWWqYds3f1L7hQknizlVbIjxM5LzWgr5LCRa06QTF8PaxaIXp/A2W40PA25NyvD4gfP80Izxm8/RJPGRlXGzar8Jpg34SDaITGoo2JPKQgjY2St/VDfi7/qYzqBfAkHW0sl+vN+/jE9/TmpuXo9GFYdDqW6T96wyJ15wPNvXQFv9ppJofZ9NBbuj+eZLSUPyqOaV021gpQyCCw1+zxL/5Atv1AmZe7M0xoDVQQK8Kffd9nOEGVddf2XWcp8LavZwIDAQAB
  -----END RSA PUBLIC KEY-----`;

 
function login(e) {

    e.preventDefault();

    const data = new FormData(e.target);

    var alert = document.getElementById("error");
    var msg_body = document.querySelector("#error p span");


    if(data.get("username")==="" || data.get("password") === ""){
        msg_body.innerText = "All fields Required!!";
        alert.style.display = "block";
        return;
    }

    fetch('http://172.20.94.26:5000/api/authentication/login',
        {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.get("username"),
                password: encryptMessage(data.get("password"), publicKeyPem),
            })
        }
    )
        .then(response => {
            if (!response.ok) {
                // If response is not ok, handle the error
                return response.json().then(errorData => {
                    // Extract error message from the error data
                    const errorMessage = errorData.message || 'Something went wrong';
                    throw new Error(errorMessage);
                });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("token", data.token)
            localStorage.setItem("expire_at", data.expire_time)
            localStorage.setItem("username", data.username)
            window.location.href = '/dashboard';

        }).catch(error => {
            msg_body.innerText = error;
            alert.style.display = "block";
            console.error(error);
        });
}

function changePassword(event) {
    event.preventDefault();
    console.log("checking password")
    const data = new FormData(event.target);

    console.log(data.get("password"))
    var alert = document.getElementById("error");
    var msg_body = document.querySelector("#error p span");

    if (data.get("password") === "" || data.get("password") === null || data.get("newPassword") === "" || data.get("newPassword") === null || data.get("confirmPassword") === "" || data.get("confirmPassword") === null) {

        msg_body.innerText = "All Fields are required";
        alert.style.display = "block";
        return false;
    }

    if (data.get("newPassword") !== data.get("confirmPassword")) {
        msg_body.innerText = "Passwords do not match, try again!!!";
        alert.style.display = "block";
        return false;
    }
    fetch('http://172.20.94.26:5000/api/authentication/reset_password',
        {

            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                username: localStorage.getItem("username"),
                password: encryptMessage(data.get("password"), publicKeyPem),
                newPassword: encryptMessage(data.get("newPassword"), publicKeyPem),
            })
        }
    )
        .then(response => {
            if (!response.ok) {
                // If response is not ok, handle the error
                return response.json().then(errorData => {
                    // Extract error message from the error data
                    const errorMessage = errorData.message || 'Something went wrong';
                    throw new Error(errorMessage);
                });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("token", "")
            localStorage.setItem("expire_at", "")
            localStorage.setItem("username", "")
            window.location.href = '/forms/signin.html';
        }).catch(error => {
            msg_body.innerText = error;
            alert.style.display = "block";
            console.error('There was a problem with the fetch operation:', error);
        });
}





function shouldRefreshToken() {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expire_at');
    if (!token || !expirationTime) {
        return false;
    }

    const expirationDate = new Date(expirationTime);
    expirationDate.setSeconds(expirationDate.getSeconds() - 60);

    return expirationDate <= new Date();
}

// Function to refresh the token
async function refreshToken() {
    try {
        const response = await fetch('http://172.20.94.26:5000/api/authentication/refresh', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Something went wrong';
            throw new Error(errorMessage);
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("expire_at", data.expire_time);
        localStorage.setItem("username", data.username);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

}

async function logOut(){
    try {
        const response = await fetch('http://172.20.94.26:5000/api/authentication/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Something went wrong';
            throw new Error(errorMessage);
        }

        const data = await response.json();

        localStorage.setItem("token", "")
        localStorage.setItem("expire_at", "")
        localStorage.setItem("username", "")
        window.location.href = '/forms/signin.html';
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }finally{
        localStorage.setItem("token", "")
        localStorage.setItem("expire_at", "")
        localStorage.setItem("username", "")
        window.location.href = '/forms/signin.html';
    }

}

function checkAndRefreshToken() {
    if (shouldRefreshToken()) {
        refreshToken();
    }
}

setInterval(checkAndRefreshToken, 20000);



function encryptMessage(message, publicKeyPem) {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encryptedData = publicKey.encrypt(message, 'RSAES-PKCS1-v1_5');


    return forge.util.encode64(encryptedData);
}

