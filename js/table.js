var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener("DOMContentLoaded", function (event) {
    // Get the modal
    //Drawer
    var drawer = document.querySelector(".drawer");
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == drawer) {
            drawer.classList.toggle("show");
        }
    };
    var drawer_btn = document.querySelector(".drawer_btn");
    drawer_btn.onclick = function () {
        drawer.classList.toggle("show");
    };
    var addRowBtn = document.getElementById('addRowBtn');
    var table = document.getElementById('filter_table');
    var filter_label = document.getElementById("filter_lable");
    var columnSelect = document.querySelector('select[name="column"]');
    populateFiltersAndValue(columnSelect);
    // Add change event listener to column select
    columnSelect.addEventListener('change', function () {
        populateFiltersAndValue(this);
    });
    addRowBtn.addEventListener('click', function () {
        if (filter_label.innerText == "")
            filter_label.innerText = "Join With";
        var newRow = document.createElement('tr');
        newRow.innerHTML = "\n        <td> \n            <select name=\"joinValue\">\n                <option value=\"[OR]\">OR</option>\n                <option value=\"[AND]\">AND</option>\n            </select>\n        </td>\n        <td>\n            <select name=\"column\">\n                <option value=\"column_field\">Select Column</option>\n                <option value=\"teacher_id\">ID</option>\n                <option value=\"tsc_number\">TSC NUMBER</option>\n                <option value=\"firstName\">First Name</option>\n                <option value=\"lastName\">Last Name</option>\n                <option value=\"title\">Title</option>\n                <option value=\"phone\">Phone</option>\n                <option value=\"email\">Email</option>\n                <option value=\"address\">Address</option>\n                <option value=\"city\">City</option>\n                <option value=\"postal_code\">Postal Code</option>\n                <option value=\"national_insurance_number\">NHIF</option>\n                <option value=\"date_created\">Date Created</option>\n                <option value=\"date_modified\">Date Modified</option>\n            </select>\n        </td>\n        <td>\n            <select name=\"filter\">\n                <option value=\"filter-field\">Select Filter Type</option>\n            </select>\n        </td>\n        <td style=\"display:flex;gap:6px;\"> \n            <input type=\"text\" placeholder=\"value..\" name=\"value\">\n            <input type=\"text\" placeholder=\"value..\" style=\"display:none\" name=\"value\">\n        </td>\n        <td>\n            <button class=\"removeRowBtn\">\n                <span class=\"material-symbols-rounded icon removeRowBtn\">delete</span>\n            </button>\n        </td>\n    ";
        table.appendChild(newRow);
        var columnSelect = newRow.querySelector('select[name="column"]');
        columnSelect.addEventListener('change', function () {
            console.log("Value changed");
            populateFiltersAndValue(this);
        });
    });
    function populateFiltersAndValue(selectElement) {
        var column = selectElement.value;
        var parentTr = selectElement.closest('tr'); // Find the parent tr element
        var filterSelect = parentTr.querySelector('select[name="filter"]');
        var parentTd = parentTr.lastElementChild.previousElementSibling;
        var valueInputs = parentTr.querySelectorAll('input[name="value"]');
        var secondValueInput = valueInputs[1];
        var firstValueInput = valueInputs[0];
        // Clear previous options and hide the second input field
        filterSelect.innerHTML = '<option value="filter-field">Select Filter Type</option>';
        if (secondValueInput) {
            secondValueInput.style.display = 'none';
            secondValueInput.value = '';
            secondValueInput.placeholder = ' to ';
        }
        // If the user has not entered any value manually, clear both input fields
        if (valueInputs.length > 0 && valueInputs[0].value === '' && valueInputs[1].value === '') {
            valueInputs.forEach(function (input) {
                input.value = '';
            });
        }
        else if (valueInputs.length > 1) {
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
            valueInputs.forEach(function (input) {
                input.type = 'number';
            });
            if (secondValueInput) { // Ensure secondValueInput exists
                secondValueInput.type = 'number';
            }
        }
        else if (['date_of_birth', 'date_created', 'date_modified'].includes(column)) {
            valueInputs.forEach(function (input) {
                input.type = 'date';
            });
            if (secondValueInput) { // Ensure secondValueInput exists
                secondValueInput.type = 'date';
            }
        }
        else {
            valueInputs.forEach(function (input) {
                input.type = 'text';
            });
            if (secondValueInput) { // Ensure secondValueInput exists
                secondValueInput.type = 'text';
            }
        }
        firstValueInput.placeholder = "value....";
        // Show second input field if "Between" option is selected
        filterSelect.addEventListener('change', function () {
            var selectedFilter = this.value;
            if (selectedFilter === ':bt:' && secondValueInput) {
                secondValueInput.style.display = 'inline-block';
                firstValueInput.placeholder = "from";
            }
            else if (secondValueInput) {
                secondValueInput.style.display = 'none';
                secondValueInput.value = '';
                firstValueInput.placeholder = "value....";
            }
        });
        console.log(parentTd);
        parentTd.style.display = 'flex';
    }
    function addOption(selectElement, value, text) {
        var option = document.createElement('option');
        option.value = value;
        option.text = text;
        selectElement.appendChild(option);
    }
    table.addEventListener('click', function (event) {
        if (event.target.classList.contains('removeRowBtn')) {
            var row = event.target.closest('tr');
            if (row !== table.rows[0]) {
                row.remove();
                var remainingRows = table.querySelectorAll('tr').length;
                if (remainingRows === 1) {
                    filter_label.innerText = "";
                }
            }
        }
    });
    function validateAndSubmit() {
        var table = document.getElementById('filter_table');
        var rows = table.querySelectorAll('tr');
        var errors = [];
        var filter = "";
        rows.forEach(function (row) {
            var _a = row.querySelectorAll('td'), joinSelect = _a[0], columnSelect = _a[1], filterSelect = _a[2], valueInput = _a[3];
            var joinValue = joinSelect.querySelector('select') && joinSelect ? joinSelect.querySelector('select').value : ''; // Get join value if exists
            var columnValue = columnSelect.querySelector('select').value;
            var filterValue = filterSelect.querySelector('select').value;
            var inputValue = valueInput.querySelector('input').value;
            var inputValue2 = valueInput.querySelectorAll('input')[1].value;
            if (joinValue === '' && row !== rows[0]) { // Ignore first row if join value is empty
                return;
            }
            if (columnValue === 'column_field' || filterValue === 'filter-field' || inputValue.trim() === '') {
                // Add red outline to the select elements with errors
                if (columnValue === 'column_field') {
                    columnSelect.querySelector('select').style.outline = '2px solid red';
                }
                else {
                    columnSelect.querySelector('select').style.outline = 'none';
                }
                if (filterValue === 'filter-field') {
                    filterSelect.querySelector('select').style.outline = '2px solid red';
                }
                else {
                    filterSelect.querySelector('select').style.outline = 'none';
                }
                if (inputValue.trim() === '') {
                    valueInput.querySelector('input').style.outline = '2px solid red';
                }
                else {
                    valueInput.querySelector('input').style.outline = 'none';
                }
                errors.push('Error: Please fill in all fields in each row.');
            }
            else {
                // Construct the string and print it in the console
                var value = "";
                if (filterValue === ":bt:") {
                    value = inputValue + "," + inputValue2;
                }
                else {
                    value = inputValue;
                }
                var rowString = "".concat(joinValue).concat(columnValue).concat(filterValue).concat(value);
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
        }
        else {
            // Display errors or handle them as needed
            console.log(errors);
        }
    }
    // Add event listener to the submit button
    var submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function () {
        console.log("clicked");
        validateAndSubmit();
    });
    // Add event listener to the submit button
    var canceBtn = document.getElementById('cancelBtn');
    canceBtn.addEventListener('click', function () {
        drawer.classList.toggle("show");
    });
    // Add event listener to the submit button
    var resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', function () {
        resettable();
        populateFiltersAndValue(columnSelect);
        drawer_btn.classList.remove("active");
    });
    var clearBtn = document.getElementById('clear_ad_filter');
    clearBtn.addEventListener('click', function () {
        var sinput = document.getElementById("second_input_field");
        sinput.style.display = "none";
        resettable();
        drawer_btn.classList.remove("active");
    });
    table.addEventListener('input', function (event) {
        var target = event.target;
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
    lastbtn.addEventListener("click", function next() {
        return __awaiter(this, void 0, void 0, function () {
            var page, pagesize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = parseInt(pagesElement.innerHTML.replace(/,/g, ''));
                        pagesize = parseInt(dropDown.value);
                        if (isNaN(page)) {
                            page = 1;
                        }
                        return [4 /*yield*/, Data(page, pagesize)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
    pageCount.addEventListener("change", function onChange() {
        var pagesize = parseInt(dropDown.value);
        var page = parseInt(pageElement.innerHTML.replace(/,/g, ''));
        if (isNaN(page)) {
            page = 1;
        }
        var nextPage = page;
        Data(nextPage, pagesize);
    });
    Data(1, 10);
});
