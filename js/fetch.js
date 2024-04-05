const Data = (i, y) => {

  var tbody = document.getElementById("data-table-body");
  tbody.innerText = "";
  var loader = document.querySelector(".loader_main");
  loader.style.display = "flex";

  fetch('http://172.20.94.26:5000/api/teachers?pagesize=' + y + '&page=' + i,
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
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      function appendDataToTable(data) {
        var page = document.getElementById("page");
        var pages = document.getElementById("pages");
        page.innerText = parseInt(data.page).toLocaleString();
        pages.innerText = parseInt(data["pages"]).toLocaleString()

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
      }

      // Call the function to append the data to the table
      appendDataToTable(data);
      loader.style.display = "none";
      console.log('Data received:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

}
function search(event){
  event.preventDefault();

  var data =new FormData(event.target);
  var dropDown = document.getElementById("pageSize");
  var pagesize = parseInt(dropDown.value);

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


 //create filter and initialise it to empty
  var filter =""

console.log(data.get("column_name"));

  if((data.get("column_name")!== ""  || data.get("value")!== "" ) && (data.get("column_name").trim() !== "all")){
    const value = data.get("value");
    const column_name = data.get("column_name");
    filter = '&filter=('+column_name+':eq:'+value+')';
  }

  
  fetch('http://172.20.94.26:5000/api/teachers?pagesize=' + pagesize + '&page=' + 1 +filter,
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
          var item =data.data;

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
      setInterval(function(){alert.style.display = "none";},10000)
      console.error('There was a problem with the fetch operation:', error);
    });


}

