document.addEventListener("DOMContentLoaded", function (event) {

    // Get the modal
    //Drawer
    const drawer = document.querySelector(".drawer");

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
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

    const columnSelect = document.querySelector('select[name="column"]');
    populateFiltersAndValue(columnSelect);

    // Add change event listener to column select
    columnSelect.addEventListener('change', function () {
        populateFiltersAndValue(this);
    });

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
                <option value="column_field">Select Column</option>
                <option value="teacher_id">ID</option>
                <option value="tsc_number">TSC NUMBER</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="title">Title</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="address">Address</option>
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
            </select>
        </td>
        <td style="display:flex;gap:6px;"> 
            <input type="text" placeholder="value.." name="value">
            <input type="text" placeholder="value.." style="display:none" name="value">
        </td>
        <td>
            <button class="removeRowBtn">
                <span class="material-symbols-rounded icon removeRowBtn">delete</span>
            </button>
        </td>
    `;
        table.appendChild(newRow);

        const columnSelect = newRow.querySelector('select[name="column"]');
        columnSelect.addEventListener('change', function () {
            console.log("Value changed")
            populateFiltersAndValue(this);
        });


    });

    function populateFiltersAndValue(selectElement) {
        const column = selectElement.value;
        const parentTr = selectElement.closest('tr'); // Find the parent tr element
        const filterSelect = parentTr.querySelector('select[name="filter"]');
        const parentTd = parentTr.lastElementChild.previousElementSibling;


        const valueInputs = parentTr.querySelectorAll('input[name="value"]');
        const secondValueInput = valueInputs[1];
        const firstValueInput = valueInputs[0];

        // Clear previous options and hide the second input field
        filterSelect.innerHTML = '<option value="filter-field">Select Filter Type</option>';
        if (secondValueInput) {
            secondValueInput.style.display = 'none';
            secondValueInput.value = '';
            secondValueInput.placeholder = ' to ';
        }

        // If the user has not entered any value manually, clear both input fields
        if (valueInputs.length > 0 && valueInputs[0].value === '' && valueInputs[1].value === '') {
            valueInputs.forEach(input => {
                input.value = '';
            });
        } else if (valueInputs.length > 1) {
            valueInputs[1].value = '';
        }

        // Populate filters based on column type
        switch (column) {
            case 'teacher_id':
                addOption(filterSelect, ':eq:', 'Equals');
                addOption(filterSelect, ':nq:', 'Not equal to');
                addOption(filterSelect, ':gt:', 'Greater than');
                addOption(filterSelect, ':gte:', 'Greater or equal to');
                addOption(filterSelect, ':lt:', 'Less than');
                addOption(filterSelect, ':lte:', 'Less than or equal to');
                addOption(filterSelect, ':bt:', 'Between');
                break;
            case 'phone':
            case 'postal_code':
                addOption(filterSelect, ':eq:', 'Equals');
                addOption(filterSelect, ':nq:', 'Not equal to');
                addOption(filterSelect, ':gt:', 'Greater than');
                addOption(filterSelect, ':gte:', 'Greater or equal to');
                addOption(filterSelect, ':lt:', 'Less than');
                addOption(filterSelect, ':lte:', 'Less than or equal to');
                addOption(filterSelect, ':bt:', 'Between');
                break;
            case 'firstName':
            case 'lastName':
            case 'title':
            case 'email':
            case 'address':
            case 'city':
            case 'tsc_number':
            case 'national_insurance_number':
                addOption(filterSelect, ':eq:', 'Equals');
                addOption(filterSelect, ':nq:', 'Not equal to');
                addOption(filterSelect, ':sw:', 'Starts with');
                addOption(filterSelect, ':ew:', 'Ends with');
                addOption(filterSelect, ':lm:', 'Contains');
                break;
            case 'date_of_birth':
            case 'date_created':
            case 'date_modified':
                addOption(filterSelect, ':eq:', 'Equals');
                addOption(filterSelect, ':gt:', 'Greater than');
                addOption(filterSelect, ':gte:', 'Greater or equal to');
                addOption(filterSelect, ':lt:', 'Less than');
                addOption(filterSelect, ':lte:', 'Less than or equal to');
                addOption(filterSelect, ':bt:', 'Between');
                break;
            default:
                break;
        }

        // Adjust value input type and show second input field if necessary
        if (['teacher_id', 'phone', 'postal_code'].includes(column)) {
            valueInputs.forEach(input => {
                input.type = 'number';
            });
            if (secondValueInput) { // Ensure secondValueInput exists
                secondValueInput.type = 'number';
            }
        } else if (['date_of_birth', 'date_created', 'date_modified'].includes(column)) {
            valueInputs.forEach(input => {
                input.type = 'date';
            });
            if (secondValueInput) { // Ensure secondValueInput exists
                secondValueInput.type = 'date';
            }
        } else {
            valueInputs.forEach(input => {
                input.type = 'text';
            });
            if (secondValueInput) { // Ensure secondValueInput exists
                secondValueInput.type = 'text';
            }
        }
        firstValueInput.placeholder = "value....";
        // Show second input field if "Between" option is selected
        filterSelect.addEventListener('change', function () {
            const selectedFilter = this.value;
            if (selectedFilter === ':bt:' && secondValueInput) {
                secondValueInput.style.display = 'inline-block';
                firstValueInput.placeholder = "from";
            } else if (secondValueInput) {
                secondValueInput.style.display = 'none';
                secondValueInput.value = '';
                firstValueInput.placeholder = "value....";
            }
        });
        console.log(parentTd);
        parentTd.style.display = 'flex';
    }


    function addOption(selectElement, value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.text = text;
        selectElement.appendChild(option);
    }

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

        let filter = "";

        rows.forEach(row => {
            const [joinSelect, columnSelect, filterSelect, valueInput] = row.querySelectorAll('td');
            const joinValue = joinSelect.querySelector('select') && joinSelect ? joinSelect.querySelector('select').value : ''; // Get join value if exists
            const columnValue = columnSelect.querySelector('select').value;
            const filterValue = filterSelect.querySelector('select').value;
            const inputValue = valueInput.querySelector('input').value;
            const inputValue2 = valueInput.querySelectorAll('input')[1].value;

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

                var value = "";
                if (filterValue === ":bt:") {
                    value = inputValue + "," + inputValue2;
                } else {
                    value = inputValue;
                }
                const rowString = `${joinValue}${columnValue}${filterValue}${value}`;
                filter += rowString;
            }
        });

        if (errors.length === 0) {
            filter = '&filter=(' + filter + ')';
            AdvancedSearch(filter);
            console.log(filter);
            drawer.classList.toggle("show");
            drawer_btn.classList.add("active");
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
        populateFiltersAndValue(columnSelect);
        drawer_btn.classList.remove("active");
    }
    );

    const clearBtn = document.getElementById('clear_ad_filter');
    clearBtn.addEventListener('click', function () {
         document.getElementById("second_input_field").style.display = "none";
        resettable();
        drawer_btn.classList.remove("active");
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

    var dropDown = document.getElementById("pageSize");
    var pageElement = document.getElementById("page");
    var pagesElement = document.getElementById("pages");

    var nextbtn = document.getElementById("nxtbtn");
    var prevbtn = document.getElementById("prevbtn");
    var firstbtn = document.getElementById("firstbtn");
    var lastbtn = document.getElementById("lastbtn");

    nextbtn.addEventListener("click", function next() {
        var pagesize = parseInt(dropDown.value);
        var page = parseInt(pageElement.innerHTML.replace(/,/g, ''));
        var pages = parseInt(pagesElement.innerHTML.replace(/,/g, ''));

        if (isNaN(page)) {
            page = 1;
        }
        var nextPage = page + 1;
        Data(nextPage, pagesize);
    });

    firstbtn.addEventListener("click", function next() {
        var pagesize = parseInt(dropDown.value);
        var page = parseInt(pageElement.innerHTML.replace(/,/g, ''));
        var pages = parseInt(pagesElement.innerHTML.replace(/,/g, ''));
        Data(1, pagesize);
    });

    lastbtn.addEventListener("click", async function next() {
        var page = parseInt(pagesElement.innerHTML.replace(/,/g, ''));
        var pagesize = parseInt(dropDown.value);
        if (isNaN(page)) {
            page = 1;
        }
        await Data(page, pagesize);
    });

    prevbtn.addEventListener("click", function next() {
        var pagesize = parseInt(dropDown.value);
        var page = parseInt(pageElement.innerHTML.replace(/,/g, ''));
        if (isNaN(page)) {
            page = 1;
        }

        var prePage = page - 1;

        if (prePage > 0) {
            Data(prePage, pagesize);
        }
    });

    var pageCount = document.getElementById("pageCount");

    pageCount.addEventListener("change",
        function onChange() {
            var pagesize = parseInt(dropDown.value);
            var page = parseInt(pageElement.innerHTML.replace(/,/g, ''));
            if (isNaN(page)) {
                page = 1;
            }
            var nextPage = page;
            Data(nextPage, pagesize);
        })

    Data(1, 10);

}) 