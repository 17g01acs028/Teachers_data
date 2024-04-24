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
var _this = this;
var publicKeyPem = "-----BEGIN RSA PUBLIC KEY-----\n  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApl+uxNNb0lREYHDyg+Ug1EJGOoU+s6Rpz1SxEi74wcDVWS/Qj4mG9ocn0nkTyezpoZySJX3hRA/5Re6BbPZ4p6QWWqYds3f1L7hQknizlVbIjxM5LzWgr5LCRa06QTF8PaxaIXp/A2W40PA25NyvD4gfP80Izxm8/RJPGRlXGzar8Jpg34SDaITGoo2JPKQgjY2St/VDfi7/qYzqBfAkHW0sl+vN+/jE9/TmpuXo9GFYdDqW6T96wyJ15wPNvXQFv9ppJofZ9NBbuj+eZLSUPyqOaV021gpQyCCw1+zxL/5Atv1AmZe7M0xoDVQQK8Kffd9nOEGVddf2XWcp8LavZwIDAQAB\n  -----END RSA PUBLIC KEY-----";
var filter = "";
var page = 1;
var pages = 1;
var url = "http://172.20.94.26:5000";
var Data = function (i, y) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, searchData(i, y, filter)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
function search(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    var dropDown = document.getElementById("pageSize");
    var pagesize = parseInt(dropDown && (dropDown === null || dropDown === void 0 ? void 0 : dropDown.value));
    if ((data.get("column_name") !== "" || data.get("value") !== "") && (data.get("column_name").trim() !== "all")) {
        var value = data.get("value");
        var column_name = data.get("column_name");
        filter = '&filter=(' + column_name + ':eq:' + value + ')';
    }
    searchData(1, pagesize, filter);
}
var filter_clear = document.getElementById("filter_delete_btn");
filter_clear.addEventListener("click", function clearSearch() {
    console.log("clicked");
    var selectElement = document.getElementById('search_filter');
    var inputElement = document.getElementById('search_value_field');
    // Reset the selected value of the select element to the first option
    selectElement.selectedIndex = 0;
    // Clear the input value
    inputElement.value = '';
    AdvancedSearch("");
});
function AdvancedSearch(fil) {
    filter = fil;
    var dropDown = document.getElementById("pageSize");
    var pagesize = parseInt(dropDown.value);
    searchData(1, pagesize, filter);
}
function disabler(page, pages) {
    var nextbtn = document.getElementById("nxtbtn");
    var prevbtn = document.getElementById("prevbtn");
    var firstbtn = document.getElementById("firstbtn");
    var lastbtn = document.getElementById("lastbtn");
    if (page <= 1) {
        prevbtn.disabled = true;
        firstbtn.disabled = true;
        prevbtn.classList.add("disable");
        firstbtn.classList.add("disable");
    }
    else {
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
    }
    else {
        nextbtn.disabled = false;
        lastbtn.disabled = false;
        nextbtn.classList.remove("disable");
        lastbtn.classList.remove("disable");
    }
    console.log("Page " + page + " and Pages is " + pages);
}
function searchData(page, pageSize, filter) {
    return __awaiter(this, void 0, void 0, function () {
        var alert, msg_body, tbody, loader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alert = document.getElementById("error");
                    msg_body = document.querySelector("#error p span");
                    alert.style.display = "none";
                    tbody = document.getElementById("data-table-body");
                    tbody.innerText = "";
                    loader = document.querySelector(".loader_main");
                    loader.style.display = "flex";
                    return [4 /*yield*/, fetch(url + '/api/teachers?pagesize=' + pageSize + '&page=' + page + filter, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                            }
                        })
                            .then(function (response) {
                            if (!response.ok) {
                                // If response is not ok, handle the error
                                return response.json().then(function (errorData) {
                                    // Extract error message from the error data
                                    var errorMessage = errorData.message || 'Something went wrong';
                                    throw new Error(errorMessage);
                                });
                            }
                            return response.json();
                        })
                            .then(function (data) {
                            function appendDataToTable(data) {
                                var pageElement = document.getElementById("page");
                                var pagesElement = document.getElementById("pages");
                                pageElement.innerText = parseInt(data.page).toLocaleString();
                                pagesElement.innerText = parseInt(data["pages"]).toLocaleString();
                                page = parseInt(data.page);
                                pages = parseInt(data["pages"]);
                                disabler(page, pages);
                                if (Array.isArray(data.data)) {
                                    // Loop through the data array
                                    data.data.forEach(function (item) {
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
                                }
                                else if (typeof data.data === 'object') {
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
                                }
                                else {
                                    // Handle other types or unexpected data
                                    console.error('Unexpected data type:', typeof data);
                                }
                            }
                            // Call the function to append the data to the table
                            appendDataToTable(data);
                            loader.style.display = "none";
                            console.log('Data received:', data);
                        })
                            .catch(function (error) {
                            loader.style.display = "none";
                            msg_body.innerText = error;
                            alert.style.display = "block";
                            setInterval(function () { alert.style.display = "none"; }, 10000);
                            console.error('There was a problem with the fetch operation:', error);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function resettable() {
    filter = "";
    var table = document.getElementById('filter_table');
    var rows = table.querySelectorAll('tr');
    var filter_label = document.getElementById("filter_lable");
    filter_label.innerText = "";
    // Remove all rows except the first one
    for (var i = rows.length - 1; i > 0; i--) {
        rows[i].remove();
    }
    // Reset the first row
    var firstRow = rows[0];
    var selects = firstRow.querySelectorAll('select');
    var inputs = firstRow.querySelectorAll('input');
    selects.forEach(function (select) {
        select.selectedIndex = 0;
    });
    inputs.forEach(function (input) {
        input.value = '';
    });
    var dropDown = document.getElementById("pageSize");
    var pagesize = parseInt(dropDown.value);
    searchData(1, pagesize, filter);
    console.log(filter);
}
//Login and other staffs
function login(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    var alert = document.getElementById("error");
    var msg_body = document.querySelector("#error p span");
    var error = "";
    var err = false;
    var form = e.target;
    form.elements['password'].style.border = '1px solid #ccc';
    form.elements['username'].style.border = '1px solid #ccc';
    if (data.get("username") === "") {
        err = true;
        var usernameError_1 = document.getElementById("usernameError");
        usernameError_1.innerText = "Please enter Username!!!";
        setTimeout(function () { usernameError_1.innerText = ""; }, 4000);
        usernameError_1.style.color = "red";
        form.elements['username'].style.border = '1px solid red';
    }
    if (data.get("password") === "") {
        err = true;
        var passwordError_1 = document.getElementById("passwordError");
        passwordError_1.innerText = "Please enter Password!!!";
        passwordError_1.style.color = "red";
        setTimeout(function () { passwordError_1.innerText = ""; }, 4000);
        form.elements['password'].style.border = '1px solid red';
    }
    if (err) {
        console.log(err);
        return;
    }
    if (error === "" || error === null) {
    }
    else {
        msg_body.innerHTML = "<ul>" + error + "</ul>";
        alert.style.display = "block";
        return;
    }
    fetch(url + '/api/authentication/login', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: data.get("username"),
            password: encryptMessage(data.get("password"), publicKeyPem),
        })
    })
        .then(function (response) {
        if (!response.ok) {
            // If response is not ok, handle the error
            return response.json().then(function (errorData) {
                // Extract error message from the error data
                var errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            });
        }
        return response.json();
    })
        .then(function (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("expire_at", data.expire_time);
        localStorage.setItem("username", data.username);
        window.location.href = '/dashboard';
    }).catch(function (error) {
        msg_body.innerText = error;
        alert.style.display = "block";
        console.error(error);
    });
}
function changePassword(event) {
    var _a;
    event.preventDefault();
    console.log("checking password");
    var data = new FormData(event.target);
    console.log(data.get("password"));
    var alert = document.getElementById("error");
    var msg_body = document.querySelector("#error p span");
    var error = "";
    var form = event.target;
    form.elements['password'].style.border = '1px solid #ccc';
    form.elements['newPassword'].style.border = '1px solid #ccc';
    form.elements['confirmPassword'].style.border = '1px solid #ccc';
    if (data.get("password") === "" || data.get("password") === null) {
        error += "<li>Old password Field required</li>";
        var passwordInput = form.elements['password'];
        passwordInput.style.border = '1px solid red';
    }
    if (data.get("newPassword") === "" || data.get("newPassword") === null) {
        error += "<li>New password Field required</li>";
        var passwordInput = form.elements['newPassword'];
        passwordInput.style.border = '1px solid red';
    }
    else {
        var point_1 = 0;
        var value_1 = form.elements['newPassword'].value;
        if (value_1.length >= 6) {
            var arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
            arrayTest.forEach(function (item) {
                if (item.test(value_1)) {
                    point_1 += 1;
                }
            });
        }
        console.log(point_1);
        if (point_1 < 4) {
            error += "<li>Weak password please enter Strong Password</li>";
        }
        var passwordInput = form.elements['newPassword'];
        passwordInput.style.border = '1px solid red';
    }
    if (data.get("confirmPassword") === "" || data.get("confirmPassword") === null) {
        error += "<li>Confirm password Field required</li>";
        var passwordInput = form.elements['confirmPassword'];
        passwordInput.style.border = '1px solid red';
    }
    else if (data.get("newPassword") !== data.get("confirmPassword")) {
        error += "Passwords do not match, try again!!!";
    }
    if (error != "") {
        msg_body.innerHTML = "<ul>" + error + "</ul>";
        alert.style.display = "block";
        return false;
    }
    fetch(url + '/api/authentication/reset_password', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify({
            username: localStorage.getItem("username"),
            password: encryptMessage((_a = data.get("password")) === null || _a === void 0 ? void 0 : _a.toString, publicKeyPem),
            newPassword: encryptMessage(data.get("newPassword"), publicKeyPem),
        })
    })
        .then(function (response) {
        if (!response.ok) {
            // If response is not ok, handle the error
            return response.json().then(function (errorData) {
                // Extract error message from the error data
                var errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            });
        }
        return response.json();
    })
        .then(function (data) {
        localStorage.setItem("token", "");
        localStorage.setItem("expire_at", "");
        localStorage.setItem("username", "");
        window.location.href = '/forms/signin.html';
    }).catch(function (error) {
        msg_body.innerText = error;
        alert.style.display = "block";
        console.error('There was a problem with the fetch operation:', error);
    });
}
function shouldRefreshToken() {
    var token = localStorage.getItem('token');
    var expirationTime = localStorage.getItem('expire_at');
    if (!token || !expirationTime) {
        return false;
    }
    var expirationDate = new Date(expirationTime);
    expirationDate.setSeconds(expirationDate.getSeconds() - 60);
    return expirationDate <= new Date();
}
// Function to refresh the token
function refreshToken() {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorData, errorMessage, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch(url + '/api/authentication/refresh', {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    errorMessage = errorData.message || 'Something went wrong';
                    throw new Error(errorMessage);
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("expire_at", data.expire_time);
                    localStorage.setItem("username", data.username);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('There was a problem with the fetch operation:', error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function logOut() {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorData, errorMessage, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    return [4 /*yield*/, fetch(url + '/api/authentication/logout', {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    errorMessage = errorData.message || 'Something went wrong';
                    throw new Error(errorMessage);
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    localStorage.setItem("token", "");
                    localStorage.setItem("expire_at", "");
                    localStorage.setItem("username", "");
                    window.location.href = '/forms/signin.html';
                    return [3 /*break*/, 7];
                case 5:
                    error_2 = _a.sent();
                    console.error('There was a problem with the fetch operation:', error_2);
                    return [3 /*break*/, 7];
                case 6:
                    localStorage.setItem("token", "");
                    localStorage.setItem("expire_at", "");
                    localStorage.setItem("username", "");
                    window.location.href = '/forms/signin.html';
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function checkAndRefreshToken() {
    if (shouldRefreshToken()) {
        refreshToken();
    }
}
setInterval(checkAndRefreshToken, 20000);
function encryptMessage(message, publicKeyPem) {
    var publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    var encryptedData = publicKey.encrypt(message, 'RSAES-PKCS1-v1_5');
    return forge.util.encode64(encryptedData);
}
