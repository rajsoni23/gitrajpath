import { testCatalogue } from '../config/config.js';

let doctorsDirectory = JSON.parse(localStorage.getItem('path_doctors')) || ['Dr. A. K. Sharma', 'Dr. R. P. Gupta'];
let allBillsData = JSON.parse(localStorage.getItem('path_bills')) || [];
let activeTests = ['CBC'];
let currentSelectedBill = null;

// Tab Component File Mapping
const tabFiles = {
    'tab-register': '../components/register.html',
    'tab-doctors': '../components/doctors.html',
    'tab-billing': '../components/billing.html'
};

// Initial App Load
window.onload = async () => {
    await loadTabContent('tab-register');
};

// Component Fetch Loader
async function loadTabContent(tabId) {
    const container = document.getElementById('tab-content-container');
    const filePath = tabFiles[tabId];

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("Component load failed");

        const html = await response.text();
        container.innerHTML = html;

        // Populate elements after HTML inserts into DOM
        if (tabId === 'tab-register') {
            renderBadges();
            renderInputs();
        } else if (tabId === 'tab-doctors') {
            updateDoctorReferralTable();
        } else if (tabId === 'tab-billing') {
            updateBillingTable();
        }
    } catch (err) {
        if (container) {
            container.innerHTML = `<p style="color:red; text-align:center;">Error loading component template.</p>`;
        }
        console.error("Tab Load Error:", err);
    }
}

// Global Tab Switcher
window.switchTab = async function(tabId, evt) {
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    if (evt && evt.target) evt.target.classList.add('active');

    await loadTabContent(tabId);
};

// Doctor Autocomplete Search
window.handleDoctorSearch = function(e) {
    const val = e.target.value.toLowerCase().trim();
    const listContainer = document.getElementById('doctor-suggestions');
    if (!listContainer) return;
    if (val.length === 0) { listContainer.style.display = 'none'; return; }

    const matches = doctorsDirectory.filter(d => d.toLowerCase().includes(val));
    if (matches.length > 0) {
        let html = "";
        matches.forEach(d => {
            html += `<div class="autocomplete-item" onclick="selectDoctor('${d}')">${d}</div>`;
        });
        listContainer.innerHTML = html;
        listContainer.style.display = 'block';
    } else {
        listContainer.style.display = 'none';
    }
};

window.selectDoctor = function(name) {
    const docInput = document.getElementById('p-doctor');
    const listContainer = document.getElementById('doctor-suggestions');
    if (docInput) docInput.value = name;
    if (listContainer) listContainer.style.display = 'none';
};

// Test Shortcode Autocomplete Suggestions
window.handleTestSearch = function(e) {
    const val = e.target.value.toUpperCase().trim();
    const listContainer = document.getElementById('test-suggestions');
    if (!listContainer) return;
    if (val.length === 0) { listContainer.style.display = 'none'; return; }

    const matches = Object.keys(testCatalogue).filter(code => 
        code.includes(val) || testCatalogue[code].name.toUpperCase().includes(val)
    );

    if (matches.length > 0) {
        let html = "";
        matches.forEach(code => {
            html += `<div class="autocomplete-item" onclick="selectTestCode('${code}')"><b>${code}</b> - ${testCatalogue[code].name}</div>`;
        });
        listContainer.innerHTML = html;
        listContainer.style.display = 'block';
    } else {
        listContainer.style.display = 'none';
    }
};

window.selectTestCode = function(code) {
    if (!activeTests.includes(code)) {
        activeTests.push(code);
        renderBadges();
        renderInputs();
    }
    const input = document.getElementById('test-code-input');
    const listContainer = document.getElementById('test-suggestions');
    if (input) input.value = '';
    if (listContainer) listContainer.style.display = 'none';
};

window.handleTestCode = function(e) {
    if (e.key === 'Enter') {
        const code = e.target.value.toUpperCase().trim();
        if (testCatalogue[code] && !activeTests.includes(code)) {
            activeTests.push(code);
            e.target.value = '';
            renderBadges();
            renderInputs();
        } else if (!testCatalogue[code]) {
            alert("Invalid Code! Try CBC, KFT, or LFT.");
        }
    }
};

function renderBadges() {
    let html = "";
    activeTests.forEach(code => {
        html += `<span class="badge">${testCatalogue[code].name}</span>`;
    });
    const target = document.getElementById('selected-tests-container');
    if (target) target.innerHTML = html;
}

function renderInputs() {
    let containerHtml = "";
    activeTests.forEach(code => {
        const testObj = testCatalogue[code];
        containerHtml += `<div class="section-title">📌 ${testObj.name}</div><div class="grid-4">`;
        testObj.params.forEach(param => {
            const pName = typeof param === 'object' ? param.name : param;
            containerHtml += `
                <div>
                    <label>${pName}</label>
                    <input type="text" data-test="${code}" data-param="${pName}" placeholder="Value">
                </div>
            `;
        });
        containerHtml += `</div>`;
    });
    const target = document.getElementById('test-inputs-container');
    if (target) target.innerHTML = containerHtml;
}

// Direct Save & Print Functionality
window.saveAndPrintReport = function() {
    const nameEl = document.getElementById('p-name');
    if (!nameEl || !nameEl.value.trim()) { alert("Please enter patient name"); return; }

    const name = nameEl.value.trim();
    const age = document.getElementById('p-age') ? document.getElementById('p-age').value || 0 : 0;
    const gender = document.getElementById('p-gender') ? document.getElementById('p-gender').value : 'Male';
    const docInput = (document.getElementById('p-doctor') && document.getElementById('p-doctor').value.trim()) || "Self";

    if (!doctorsDirectory.includes(docInput)) {
        doctorsDirectory.push(docInput);
        localStorage.setItem('path_doctors', JSON.stringify(doctorsDirectory));
    }

    let subtotal = 0;
    let testDetails = [];

    activeTests.forEach(code => {
        subtotal += testCatalogue[code].price;
        let paramValues = {};
        const inputs = document.querySelectorAll(`input[data-test="${code}"]`);
        
        inputs.forEach(inp => {
            const val = inp.value.trim();
            // Skip empty/blank inputs and "-"
            if (val !== "" && val !== "-") {
                paramValues[inp.dataset.param] = val;
            }
        });

        if (Object.keys(paramValues).length > 0) {
            testDetails.push({ testName: testCatalogue[code].name, values: paramValues });
        }
    });

    if (testDetails.length === 0) {
        alert("Kripya kam se kam ek test parameter ki value enter karein!");
        return;
    }

    const newBill = {
        id: 'BILL-' + Math.floor(100000 + Math.random() * 900000),
        patientName: name,
        age: parseInt(age),
        gender: gender,
        doctorName: docInput,
        tests: testDetails,
        subtotal: subtotal,
        discount: 0,
        netAmount: subtotal,
        createdAt: new Date().toISOString()
    };

    allBillsData.unshift(newBill);
    localStorage.setItem('path_bills', JSON.stringify(allBillsData));

    // Populate Print Template
    const printDate = document.getElementById('print-date');
    const printPName = document.getElementById('print-p-name');
    const printPAgeGender = document.getElementById('print-p-age-gender');
    const printDocName = document.getElementById('print-doc-name');

    if (printDate) printDate.innerText = new Date(newBill.createdAt).toLocaleDateString('en-GB');
    if (printPName) printPName.innerText = newBill.patientName;
    if (printPAgeGender) printPAgeGender.innerText = `${newBill.age}/${newBill.gender.charAt(0)}`;
    if (printDocName) printDocName.innerText = newBill.doctorName;

    let printTestsHtml = "";
    newBill.tests.forEach(t => {
        const codeKey = Object.keys(testCatalogue).find(k => testCatalogue[k].name === t.testName);
        const catalogueParams = codeKey ? testCatalogue[codeKey].params : [];

        printTestsHtml += `
            <div style="text-align: center; font-weight: bold; margin: 15px 0 10px 0; text-decoration: underline; font-size: 14px; text-transform: uppercase;">
                ${t.testName}
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px;">
                <thead>
                    <tr style="border-top: 1px solid #000; border-bottom: 1px solid #000; text-align: left;">
                        <th style="padding: 6px 0; width: 45%;">INVESTIGATION</th>
                        <th style="padding: 6px 0; width: 20%;">RESULT</th>
                        <th style="padding: 6px 0; width: 15%;">UNIT</th>
                        <th style="padding: 6px 0; width: 20%;">NORMAL RANGE</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const [pName, pVal] of Object.entries(t.values)) {
            const paramObj = catalogueParams.find(p => (typeof p === 'object' ? p.name : p) === pName);
            const unit = (paramObj && paramObj.unit) ? paramObj.unit : '';
            const range = (paramObj && paramObj.range) ? paramObj.range : '';

            printTestsHtml += `
                <tr>
                    <td style="padding: 4px 0; font-weight: bold; text-transform: uppercase;">${pName}</td>
                    <td style="padding: 4px 0; font-weight: bold;">${pVal}</td>
                    <td style="padding: 4px 0;">${unit}</td>
                    <td style="padding: 4px 0;">${range}</td>
                </tr>
            `;
        }
        printTestsHtml += `</tbody></table>`;
    });

    const printContainer = document.getElementById('print-tests-container');
    if (printContainer) printContainer.innerHTML = printTestsHtml;

    // Trigger Print Window
    window.print();

    // Reset Form
    if (nameEl) nameEl.value = '';
    if (document.getElementById('p-age')) document.getElementById('p-age').value = '';
    if (document.getElementById('p-doctor')) document.getElementById('p-doctor').value = '';
    
    activeTests = ['CBC'];
    renderBadges();
    renderInputs();
};

window.savePatientRecord = window.saveAndPrintReport;

function updateDoctorReferralTable() {
    const report = {};
    allBillsData.forEach(b => {
        if (!report[b.doctorName]) report[b.doctorName] = { count: 0, business: 0 };
        report[b.doctorName].count += 1;
        report[b.doctorName].business += b.subtotal;
    });

    let html = "";
    for (const [doc, data] of Object.entries(report)) {
        html += `<tr><td><b>${doc}</b></td><td>${data.count}</td><td>₹${data.business}</td></tr>`;
    }
    if (Object.keys(report).length === 0) {
        html = `<tr><td colspan="3" style="text-align: center; color: #94a3b8;">No records found.</td></tr>`;
    }
    const target = document.getElementById('doctor-report-body');
    if (target) target.innerHTML = html;
}

function updateBillingTable(filteredList = null) {
    const list = filteredList || allBillsData;
    let html = "";
    list.forEach((b) => {
        const index = allBillsData.indexOf(b);
        const testNamesList = b.tests.map(t => t.testName).join(', ');
        html += `
            <tr>
                <td>${b.id}</td>
                <td>${b.patientName}</td>
                <td>${b.doctorName}</td>
                <td>${testNamesList}</td>
                <td>₹${b.netAmount}</td>
                <td><button class="btn" style="padding: 4px 8px; font-size:11px;" onclick="openBill(${index})">Select & Bill</button></td>
            </tr>
        `;
    });
    if (list.length === 0) {
        html = `<tr><td colspan="6" style="text-align: center; color: #94a3b8;">No bills found.</td></tr>`;
    }
    const target = document.getElementById('billing-table-body');
    if (target) target.innerHTML = html;
}

window.filterBillsTable = function() {
    const query = document.getElementById('search-bill-input').value.toLowerCase().trim();
    const filtered = allBillsData.filter(b => 
        b.patientName.toLowerCase().includes(query) || b.id.toLowerCase().includes(query)
    );
    updateBillingTable(filtered);
};

window.openBill = function(index) {
    currentSelectedBill = allBillsData[index];
    const billCard = document.getElementById('bill-view-card');
    if (billCard) billCard.style.display = 'block';

    document.getElementById('bill-patient-info').innerText = currentSelectedBill.patientName;
    document.getElementById('bill-age-gender').innerText = `${currentSelectedBill.age} Yrs / ${currentSelectedBill.gender}`;
    document.getElementById('bill-doctor-info').innerText = currentSelectedBill.doctorName;

    let summaryHtml = "";
    currentSelectedBill.tests.forEach(t => {
        summaryHtml += `<b>➡️ ${t.testName}</b><br>`;
        for (const [pName, pVal] of Object.entries(t.values)) {
            summaryHtml += `&nbsp;&nbsp;&nbsp;&nbsp;• ${pName}: <b>${pVal}</b><br>`;
        }
    });
    document.getElementById('bill-tests-summary-box').innerHTML = summaryHtml;
    document.getElementById('bill-subtotal').value = currentSelectedBill.subtotal;
    document.getElementById('bill-discount').value = currentSelectedBill.discount || 0;
    calculateFinalBill();
};

// Print Generator for Billing Tab
window.calculateFinalBill = function() {
    const sub = parseFloat(document.getElementById('bill-subtotal')?.value) || 0;
    const disc = parseFloat(document.getElementById('bill-discount')?.value) || 0;
    const net = Math.max(0, sub - disc);
    
    if (document.getElementById('bill-net')) {
        document.getElementById('bill-net').value = net;
    }

    if (currentSelectedBill) {
        document.getElementById('print-date').innerText = new Date(currentSelectedBill.createdAt).toLocaleDateString('en-GB');
        document.getElementById('print-p-name').innerText = currentSelectedBill.patientName;
        document.getElementById('print-p-age-gender').innerText = `${currentSelectedBill.age}/${currentSelectedBill.gender.charAt(0)}`;
        document.getElementById('print-doc-name').innerText = currentSelectedBill.doctorName;

        let printTestsHtml = "";
        currentSelectedBill.tests.forEach(t => {
            const codeKey = Object.keys(testCatalogue).find(k => testCatalogue[k].name === t.testName);
            const catalogueParams = codeKey ? testCatalogue[codeKey].params : [];

            printTestsHtml += `
                <div style="text-align: center; font-weight: bold; margin: 15px 0 10px 0; text-decoration: underline; font-size: 14px; text-transform: uppercase;">
                    ${t.testName}
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px;">
                    <thead>
                        <tr style="border-top: 1px solid #000; border-bottom: 1px solid #000; text-align: left;">
                            <th style="padding: 6px 0; width: 45%;">INVESTIGATION</th>
                            <th style="padding: 6px 0; width: 20%;">RESULT</th>
                            <th style="padding: 6px 0; width: 15%;">UNIT</th>
                            <th style="padding: 6px 0; width: 20%;">NORMAL RANGE</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (const [pName, pVal] of Object.entries(t.values)) {
                // Skip if blank value exists in legacy records
                if (!pVal || pVal === "-") continue;

                const paramObj = catalogueParams.find(p => (typeof p === 'object' ? p.name : p) === pName);
                const unit = (paramObj && paramObj.unit) ? paramObj.unit : '';
                const range = (paramObj && paramObj.range) ? paramObj.range : '';

                printTestsHtml += `
                    <tr>
                        <td style="padding: 4px 0; font-weight: bold; text-transform: uppercase;">${pName}</td>
                        <td style="padding: 4px 0; font-weight: bold;">${pVal}</td>
                        <td style="padding: 4px 0;">${unit}</td>
                        <td style="padding: 4px 0;">${range}</td>
                    </tr>
                `;
            }
            printTestsHtml += `</tbody></table>`;
        });

        document.getElementById('print-tests-container').innerHTML = printTestsHtml;
    }
};
