const Data = (i,y)=>{

    fetch('http://172.20.94.26:3000/api/teachers?pagesize='+y+'&page='+i)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      function appendDataToTable(data) {
          var tbody = document.getElementById("data-table-body");
          tbody.innerText = "";
          var page = document.getElementById("page");
          var pages = document.getElementById("pages");
          page.innerText =" "+ data.page+" ";
          pages.innerText =" "+  data["pages"]
  
          // Loop through the data array
          data.data.forEach(function(item) {
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
  
      console.log('Data received:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

}


