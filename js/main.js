document.addEventListener("DOMContentLoaded", function (event) {
  var modal = document.getElementById('id01');
  modal.style.display = "none";
  /**
   * toggle active class on header
   * when clicked nav-toggle-btn
   */

  const header = document.querySelector("[data-header]");
  const navToggleBtn = document.querySelector("[data-menu-toggle-btn]");

  navToggleBtn.addEventListener("click", function () {
    header.classList.toggle("active");
  });



  /**
   * toggle ctx-menu when click on card-menu-btn
   */

  const menuBtn = document.querySelectorAll("[data-menu-btn]");

  for (let i = 0; i < menuBtn.length; i++) {
    menuBtn[i].addEventListener("click", function () {
      this.nextElementSibling.classList.toggle("active");
    });
  }


  var setUsername = document.getElementById("username");

  setUsername.innerText = localStorage.getItem("username");


  var setWelcome = document.getElementById("Welcome");
  setWelcome.innerText = "Hi " + localStorage.getItem("username");

  // Get the modal
  //Drawer
  const drawer = document.querySelector(".drawer");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }

    if (event.target == drawer) {
      drawer.classList.toggle("show");
    }
  }


  const drawer_btn = document.querySelector(".drawer_btn");

  drawer_btn.onclick = function () {
    drawer.classList.toggle("show");
  }

  const addRowBtn = document.getElementById('addRowBtn');
  const table = document.getElementById('filter_table');
  const filter_label = document.getElementById("filter_lable");


  addRowBtn.addEventListener('click', () => {
    if (filter_label.innerText == "") filter_label.innerText = "Join With";
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td> 
      <select name="joinValue">
        <option value="[OR]">OR</option>
        <option value="[AND]">AND</option>
      </select>
  </td>
  <td>
      <select name="column">
        <option value="teacher_id">ID</option>
        <option value="tsc_number">TSC NUMBER</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="title">Title</option>
        <option value="phone">Phone</option>
        <option value="email">Email</option>
        <option value="address">Address/option>
        <option value="city">City</option>
        <option value="postal_code">Postal Code</option>
        <option value="national_insurance_number">NHIF</option>
        <option value="date_of_birth">Date of birth</option>
        <option value="date_created">Date Created</option>
        <option value="date_modified">Date Modified</option>
      </select>
    </td>
    <td>
      <select name="filter">
        <option value="filter-field">Select Filter Type</option>
        <option value=":eq:">Equals</option>
        <option value=":nq:">Not equal to</option>
        <option value=":gt:">Greater than</option>
        <option value=":gte:">Greater or equal to</option>
        <option value=":lt:">Less than</option>
        <option value=":lte:">Less than or equal to</option>
        <option value=":bt:">Between</option>
        <option value=":sw:">Starts with</option>
        <option value=":ew:">Ends with</option>
        <option value=":lm:">Contains</option>
      </select>
    </td>
    <td> 
      <input type="text" placeholder="value.." name="value">
    </td>
    <td>
      <button class="removeRowBtn">
        <span class="material-symbols-rounded icon removeRowBtn">
        delete
        </span>
      </button>
    </td>
  `;
    table.appendChild(newRow);
  });

  table.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeRowBtn')) {
      const row = event.target.closest('tr');
      if (row !== table.rows[0]) {
        row.remove();
        const remainingRows = table.querySelectorAll('tr').length;
        if (remainingRows === 1) {
          filter_label.innerText = "";
        }
      }
    }
  });

  function validateAndSubmit() {
    const table = document.getElementById('filter_table');
    const rows = table.querySelectorAll('tr');
    const errors = [];

    let filter ="";

    rows.forEach(row => {
      const [joinSelect, columnSelect, filterSelect, valueInput] = row.querySelectorAll('td');
      const joinValue = joinSelect.querySelector('select') &&  joinSelect ? joinSelect.querySelector('select').value : ''; // Get join value if exists
      const columnValue = columnSelect.querySelector('select').value;
      const filterValue = filterSelect.querySelector('select').value;
      const inputValue = valueInput.querySelector('input').value;

      if (joinValue === '' && row !== rows[0]) { // Ignore first row if join value is empty
        return;
      }

      if (columnValue === 'column_field' || filterValue === 'filter-field' || inputValue.trim() === '') {
        // Add red outline to the select elements with errors
        if (columnValue === 'column_field') {
            columnSelect.querySelector('select').style.outline = '2px solid red';
        } else {
            columnSelect.querySelector('select').style.outline = 'none';
        }
        if (filterValue === 'filter-field') {
            filterSelect.querySelector('select').style.outline = '2px solid red';
        } else {
            filterSelect.querySelector('select').style.outline = 'none';
        }
        if (inputValue.trim() === '') {
            valueInput.querySelector('input').style.outline = '2px solid red';
        } else {
            valueInput.querySelector('input').style.outline = 'none';
        }
        errors.push('Error: Please fill in all fields in each row.');
    } else {
        // Construct the string and print it in the console
        const rowString = `${joinValue}${columnValue}${filterValue}${inputValue}`;
        filter += rowString;
    }
    });

    if (errors.length === 0) {
      filter = '&filter=(' + filter + ')';
      AdvancedSearch(filter);
      console.log(filter);
      // Submit the form or perform any other action if there are no errors
    } else {
      // Display errors or handle them as needed
      console.log(errors);
    }
  }

  // Add event listener to the submit button
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', function () {
    console.log("clicked");
    validateAndSubmit()
  }
  );

   // Add event listener to the submit button
   const canceBtn = document.getElementById('cancelBtn');
   canceBtn.addEventListener('click', function () {
    drawer.classList.toggle("show");
   }
   );

    // Add event listener to the submit button
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', function () {
      resettable();
  }
  );

  table.addEventListener('input', (event) => {
    const target = event.target;
    if (target.tagName === 'SELECT') {
      target.style.outline = 'none'; 
    }
    
    if (target.tagName === 'INPUT') {
      target.style.outline = 'none'; 
    }
  });

});


