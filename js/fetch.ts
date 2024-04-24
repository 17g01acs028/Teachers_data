const publicKeyPem: string = `-----BEGIN RSA PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApl+uxNNb0lREYHDyg+Ug1EJGOoU+s6Rpz1SxEi74wcDVWS/Qj4mG9ocn0nkTyezpoZySJX3hRA/5Re6BbPZ4p6QWWqYds3f1L7hQknizlVbIjxM5LzWgr5LCRa06QTF8PaxaIXp/A2W40PA25NyvD4gfP80Izxm8/RJPGRlXGzar8Jpg34SDaITGoo2JPKQgjY2St/VDfi7/qYzqBfAkHW0sl+vN+/jE9/TmpuXo9GFYdDqW6T96wyJ15wPNvXQFv9ppJofZ9NBbuj+eZLSUPyqOaV021gpQyCCw1+zxL/5Atv1AmZe7M0xoDVQQK8Kffd9nOEGVddf2XWcp8LavZwIDAQAB
  -----END RSA PUBLIC KEY-----`;


var filter: string = "";
var page = 1;
var pages = 1;

var url = "http://172.20.94.26:5000";

const Data = async (i: any, y: any) => {

  await searchData(i, y, filter);

}

function search(event: any) {
  event.preventDefault();

  var data: any = new FormData(event.target);
  var dropDown = document.getElementById("pageSize") as HTMLSelectElement;
  var pagesize = parseInt(dropDown && dropDown?.value);

  if ((data.get("column_name") !== "" || data.get("value") !== "") && (data.get("column_name").trim() !== "all")) {
    const value = data.get("value");
    const column_name = data.get("column_name");
    filter = '&filter=(' + column_name + ':eq:' + value + ')';
  }

  searchData(1, pagesize, filter);

}

const filter_clear = document.getElementById("filter_delete_btn") as HTMLButtonElement;

filter_clear.addEventListener("click", function clearSearch() {
  console.log("clicked");
  const selectElement = document.getElementById('search_filter') as HTMLSelectElement;
  const inputElement = document.getElementById('search_value_field') as HTMLInputElement;

  // Reset the selected value of the select element to the first option
  selectElement.selectedIndex = 0;

  // Clear the input value
  inputElement.value = '';

  AdvancedSearch("");
})

function AdvancedSearch(fil) {
  filter = fil;
  var dropDown = document.getElementById("pageSize") as HTMLSelectElement;
  var pagesize = parseInt(dropDown.value);

  searchData(1, pagesize, filter)
}

function disabler(page, pages) {
  var nextbtn = document.getElementById("nxtbtn") as HTMLButtonElement;
  var prevbtn = document.getElementById("prevbtn") as HTMLButtonElement;
  var firstbtn = document.getElementById("firstbtn") as HTMLButtonElement;
  var lastbtn = document.getElementById("lastbtn") as HTMLButtonElement;

  if (page <= 1) {
    prevbtn.disabled = true;
    firstbtn.disabled = true;
    prevbtn.classList.add("disable");
    firstbtn.classList.add("disable");
  } else {
    prevbtn.disabled = false;
    firstbtn.disabled = false;
    prevbtn.classList.remove("disable");
    firstbtn.classList.remove("disable");
  }

  if (parseInt(page) + 1 > parseInt(pages)) {
    console.log("In the truth block");
    nextbtn.disabled = true;
    lastbtn.disabled = true;
    nextbtn.classList.add("disable");
    lastbtn.classList.add("disable");
  } else {
    nextbtn.disabled = false;
    lastbtn.disabled = false;
    nextbtn.classList.remove("disable");
    lastbtn.classList.remove("disable");
  }

  console.log("Page " + page + " and Pages is " + pages)

}


async function searchData(page, pageSize, filter) {
  //Display Error Message
  var alert = document.getElementById("error") as HTMLElement;
  var msg_body = document.querySelector("#error p span") as HTMLElement;
  alert.style.display = "none";

  //Reset table data and create new Instance
  var tbody = document.getElementById("data-table-body") as HTMLElement;
  tbody.innerText = "";

  //show Loading menu
  var loader = document.querySelector(".loader_main") as HTMLElement;
  loader.style.display = "flex";


  await fetch(url + '/api/teachers?pagesize=' + pageSize + '&page=' + page + filter,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      }
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

      function appendDataToTable(data) {
        var pageElement = document.getElementById("page") as HTMLElement;
        var pagesElement = document.getElementById("pages") as HTMLElement;
        pageElement.innerText = parseInt(data.page).toLocaleString();
        pagesElement.innerText = parseInt(data["pages"]).toLocaleString()

        page = parseInt(data.page);
        pages = parseInt(data["pages"]);

        disabler(page, pages);

        if (Array.isArray(data.data)) {
          // Loop through the data array
          data.data.forEach(function (item: any) {


            var row = document.createElement("tr");

            console.log(item);

            // Construct the fullname
            var fullName = item.firstname + " " + item.lastname;

            // Manually append each data field as a table cell
            var idCell = document.createElement("td");
            idCell.textContent = item.teacher_id;
            row.appendChild(idCell);

            var tscNumberCell = document.createElement("td");
            tscNumberCell.textContent = item.tsc_number;
            row.appendChild(tscNumberCell);

            var fullNameCell = document.createElement("td");
            fullNameCell.textContent = fullName;
            row.appendChild(fullNameCell);

            var idNumberCell = document.createElement("td");
            idNumberCell.textContent = item.id_number;
            row.appendChild(idNumberCell);

            var phoneCell = document.createElement("td");
            phoneCell.textContent = item.phone;
            row.appendChild(phoneCell);

            var emailCell = document.createElement("td");
            emailCell.textContent = item.email;
            row.appendChild(emailCell);

            var titleCell = document.createElement("td");
            titleCell.textContent = item.title;
            row.appendChild(titleCell);

            var addressCell = document.createElement("td");
            addressCell.textContent = item.address;
            row.appendChild(addressCell);

            var cityCell = document.createElement("td");
            cityCell.textContent = item.city;
            row.appendChild(cityCell);

            var postalCodeCell = document.createElement("td");
            postalCodeCell.textContent = item.postal_code;
            row.appendChild(postalCodeCell);

            var nhifCell = document.createElement("td");
            nhifCell.textContent = item.national_insurance_number;
            row.appendChild(nhifCell);

            var usernameCell = document.createElement("td");
            usernameCell.textContent = item.username;
            row.appendChild(usernameCell);

            var dateCreatedCell = document.createElement("td");
            dateCreatedCell.textContent = item.date_created;
            row.appendChild(dateCreatedCell);

            var dateModifiedCell = document.createElement("td");
            dateModifiedCell.textContent = item.date_modified;
            row.appendChild(dateModifiedCell);

            // Append the row to the table body
            tbody.appendChild(row);
          });

        } else if (typeof data.data === 'object') {
          // Process as object
          // Assuming it's a single object, you can directly access its properties
          var item = data.data;

          var row = document.createElement("tr");

          // Construct the fullname
          var fullName = item.firstname + " " + item.lastname;

          // Manually append each data field as a table cell
          var idCell = document.createElement("td");
          idCell.textContent = item.teacher_id;
          row.appendChild(idCell);

          var tscNumberCell = document.createElement("td");
          tscNumberCell.textContent = item.tsc_number;
          row.appendChild(tscNumberCell);

          var fullNameCell = document.createElement("td");
          fullNameCell.textContent = fullName;
          row.appendChild(fullNameCell);

          var idNumberCell = document.createElement("td");
          idNumberCell.textContent = item.id_number;
          row.appendChild(idNumberCell);

          var phoneCell = document.createElement("td");
          phoneCell.textContent = item.phone;
          row.appendChild(phoneCell);

          var emailCell = document.createElement("td");
          emailCell.textContent = item.email;
          row.appendChild(emailCell);

          var titleCell = document.createElement("td");
          titleCell.textContent = item.title;
          row.appendChild(titleCell);

          var addressCell = document.createElement("td");
          addressCell.textContent = item.address;
          row.appendChild(addressCell);

          var cityCell = document.createElement("td");
          cityCell.textContent = item.city;
          row.appendChild(cityCell);

          var postalCodeCell = document.createElement("td");
          postalCodeCell.textContent = item.postal_code;
          row.appendChild(postalCodeCell);

          var nhifCell = document.createElement("td");
          nhifCell.textContent = item.national_insurance_number;
          row.appendChild(nhifCell);

          var dateOfBirthCell = document.createElement("td");
          dateOfBirthCell.textContent = item.username;
          row.appendChild(dateOfBirthCell);

          var usernameCell = document.createElement("td");
          usernameCell.textContent = item.username;
          row.appendChild(usernameCell);

          var dateCreatedCell = document.createElement("td");
          dateCreatedCell.textContent = item.date_created;
          row.appendChild(dateCreatedCell);

          var dateModifiedCell = document.createElement("td");
          dateModifiedCell.textContent = item.date_modified;
          row.appendChild(dateModifiedCell);

          // Append the row to the table body
          tbody.appendChild(row);
        } else {
          // Handle other types or unexpected data
          console.error('Unexpected data type:', typeof data);
        }


      }

      // Call the function to append the data to the table
      appendDataToTable(data);
      loader.style.display = "none";
      console.log('Data received:', data);
    })
    .catch(error => {
      loader.style.display = "none";
      msg_body.innerText = error;
      alert.style.display = "block";
      setInterval(function () { alert.style.display = "none"; }, 10000)
      console.error('There was a problem with the fetch operation:', error);
    });
}


function resettable() {
  filter = "";
  const table = document.getElementById('filter_table') as HTMLTableElement;

  const rows = table.querySelectorAll('tr');
  const filter_label = document.getElementById("filter_lable") as HTMLLabelElement;

  filter_label.innerText = "";

  // Remove all rows except the first one
  for (let i = rows.length - 1; i > 0; i--) {
    rows[i].remove();
  }

  // Reset the first row
  const firstRow = rows[0];
  const selects = firstRow.querySelectorAll('select');
  const inputs = firstRow.querySelectorAll('input');

  selects.forEach(select => {
    select.selectedIndex = 0;
  });

  inputs.forEach(input => {
    input.value = '';
  });

  var dropDown = document.getElementById("pageSize") as HTMLSelectElement;
  var pagesize = parseInt(dropDown.value);

  searchData(1, pagesize, filter);
  console.log(filter);

}

//Login and other staffs



function login(e: any) {

  e.preventDefault();

  const data = new FormData(e.target);

  var alert = document.getElementById("error") as HTMLElement;
  var msg_body = document.querySelector("#error p span") as HTMLElement;

  var error = "";
  var err:boolean = false;
  const form = e.target;
  form.elements['password'].style.border = '1px solid #ccc';
  form.elements['username'].style.border = '1px solid #ccc';


  if (data.get("username") === "") {
    err = true;
    const usernameError = document.getElementById("usernameError") as HTMLSpanElement;
    usernameError.innerText = "Please enter Username!!!";
    setTimeout(()=>{usernameError.innerText = ""},4000)
    usernameError.style.color = "red";

    form.elements['username'].style.border = '1px solid red';
  }

  if (data.get("password") === "") {
    err = true;
    const passwordError = document.getElementById("passwordError") as HTMLSpanElement;
    passwordError.innerText = "Please enter Password!!!";
    passwordError.style.color = "red";

    setTimeout(()=>{passwordError.innerText = ""},4000);
    form.elements['password'].style.border = '1px solid red';
    
  }

  if(err){
    console.log(err)
    return
  }

  if (error === "" || error === null ) {
  } else {
    msg_body.innerHTML = "<ul>" + error + "</ul>";
    alert.style.display = "block";
    return;
  }

  fetch(url + '/api/authentication/login',
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

function changePassword(event: any) {
  event.preventDefault();
  console.log("checking password")
  const data = new FormData(event.target);

  console.log(data.get("password"))
  var alert = document.getElementById("error") as HTMLElement;
  var msg_body = document.querySelector("#error p span") as HTMLElement;

  var error = "";
  const form = event.target;
  form.elements['password'].style.border = '1px solid #ccc';
  form.elements['newPassword'].style.border = '1px solid #ccc';
  form.elements['confirmPassword'].style.border = '1px solid #ccc';

  if (data.get("password") === "" || data.get("password") === null) {

    error += "<li>Old password Field required</li>"
    const passwordInput = form.elements['password'];
    passwordInput.style.border = '1px solid red';
  }

  if (data.get("newPassword") === "" || data.get("newPassword") === null) {

    error += "<li>New password Field required</li>"
    const passwordInput = form.elements['newPassword'];
    passwordInput.style.border = '1px solid red';
  } else {
    let point = 0;
    let value = form.elements['newPassword'].value;
    if (value.length >= 6) {
      let arrayTest =
        [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
      arrayTest.forEach((item) => {
        if (item.test(value)) {
          point += 1;
        }
      });
    }

    console.log(point);

    if (point < 4) {
      error += "<li>Weak password please enter Strong Password</li>"
    }
    const passwordInput = form.elements['newPassword'];
    passwordInput.style.border = '1px solid red';
  }


  if (data.get("confirmPassword") === "" || data.get("confirmPassword") === null) {

    error += "<li>Confirm password Field required</li>"
    const passwordInput = form.elements['confirmPassword'];
    passwordInput.style.border = '1px solid red';
  } else if (data.get("newPassword") !== data.get("confirmPassword")) {
    error += "Passwords do not match, try again!!!";
  }

  if (error != "") {
    msg_body.innerHTML = "<ul>" + error + "</ul>";
    alert.style.display = "block";
    return false;
  }


  fetch(url + '/api/authentication/reset_password',
    {

      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        password: encryptMessage(data.get("password")?.toString, publicKeyPem),
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
    const response = await fetch(url + '/api/authentication/refresh', {
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

async function logOut() {
  try {
    const response = await fetch(url + '/api/authentication/logout', {
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
  } finally {
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



function encryptMessage(message: any, publicKeyPem: string) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedData = publicKey.encrypt(message, 'RSAES-PKCS1-v1_5');


  return forge.util.encode64(encryptedData);
}

