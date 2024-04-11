const publicKeyPem = `-----BEGIN RSA PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApl+uxNNb0lREYHDyg+Ug1EJGOoU+s6Rpz1SxEi74wcDVWS/Qj4mG9ocn0nkTyezpoZySJX3hRA/5Re6BbPZ4p6QWWqYds3f1L7hQknizlVbIjxM5LzWgr5LCRa06QTF8PaxaIXp/A2W40PA25NyvD4gfP80Izxm8/RJPGRlXGzar8Jpg34SDaITGoo2JPKQgjY2St/VDfi7/qYzqBfAkHW0sl+vN+/jE9/TmpuXo9GFYdDqW6T96wyJ15wPNvXQFv9ppJofZ9NBbuj+eZLSUPyqOaV021gpQyCCw1+zxL/5Atv1AmZe7M0xoDVQQK8Kffd9nOEGVddf2XWcp8LavZwIDAQAB
  -----END RSA PUBLIC KEY-----`;

var filter="";
var url = "http://172.20.94.26:5000";

const Data = (i, y) => {

 searchData(i,y,filter);

}

function search(event) {
  event.preventDefault();

  var data = new FormData(event.target);
  var dropDown = document.getElementById("pageSize");
  var pagesize = parseInt(dropDown.value);

  if ((data.get("column_name") !== "" || data.get("value") !== "") && (data.get("column_name").trim() !== "all")) {
    const value = data.get("value");
    const column_name = data.get("column_name");
    filter = '&filter=(' + column_name + ':eq:' + value + ')';
  }

  searchData(1,pagesize,filter);

}

function AdvancedSearch(fil){
  filter=fil;
  var dropDown = document.getElementById("pageSize");
  var pagesize = parseInt(dropDown.value);

  searchData(1,pagesize,filter)
}

function searchData(page,pageSize,filter) {
  //Display Error Message
  var alert = document.getElementById("error");
  var msg_body = document.querySelector("#error p span");
  alert.style.display = "none";

  //Reset table data and create new Instance
  var tbody = document.getElementById("data-table-body");
  tbody.innerText = "";

  //show Loading menu
  var loader = document.querySelector(".loader_main");
  loader.style.display = "flex";


  fetch(url+'/api/teachers?pagesize=' + pageSize + '&page=' + page + filter,
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
        var page = document.getElementById("page");
        var pages = document.getElementById("pages");
        page.innerText = parseInt(data.page).toLocaleString();
        pages.innerText = parseInt(data["pages"]).toLocaleString()

        if (Array.isArray(data.data)) {
          // Loop through the data array
          data.data.forEach(function (item) {


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


function resettable(){
  filter="";
  const table = document.getElementById('filter_table');

  const rows = table.querySelectorAll('tr');
  const filter_label = document.getElementById("filter_lable");

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

  var dropDown = document.getElementById("pageSize");
  var pagesize = parseInt(dropDown.value);

 searchData(1,pagesize,filter);
 console.log(filter);

}

//Login and other staffs


 
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

  fetch(url+'/api/authentication/login',
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
  fetch(url+'/api/authentication/reset_password',
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
      const response = await fetch(url+'/api/authentication/refresh', {
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
      const response = await fetch(url+'/api/authentication/logout', {
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

