import { testCatalogue } from '../config/config.js';

let doctorsDirectory = JSON.parse(localStorage.getItem('path_doctors')) || ['Dr. A. K. Sharma', 'Dr. R. P. Gupta'];
let allReportsData = JSON.parse(localStorage.getItem('path_reports')) || [];
let allBillsData = JSON.parse(localStorage.getItem('path_bills')) || [];
let activeTests = ['CBC'];
let currentSelectedReport = null;

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

// Test Shortcode Search
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

// -------------------------------------------------------------
// SAVE PATIENT REPORT RECORD ONLY (Registration Screen)
// -------------------------------------------------------------
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
            if (val !== "" && val !== "-" && val !== undefined) {
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

    const newReport = {
        id: 'REP-' + Math.floor(100000 + Math.random() * 900000),
        patientName: name,
        age: parseInt(age),
        gender: gender,
        doctorName: docInput,
        tests: testDetails,
        subtotal: subtotal,
        createdAt: new Date().toISOString()
    };

    allReportsData.unshift(newReport);
    localStorage.setItem('path_reports', JSON.stringify(allReportsData));

    // Instant Report Print
    openReportPrint(0);

    // Reset Form
    if (nameEl) nameEl.value = '';
    if (document.getElementById('p-age')) document.getElementById('p-age').value = '';
    if (document.getElementById('p-doctor')) document.getElementById('p-doctor').value = '';
    
    activeTests = ['CBC'];
    renderBadges();
    renderInputs();
};

window.savePatientRecord = window.saveAndPrintReport;

// -------------------------------------------------------------
// DOCTOR REFERRAL REPORT
// -------------------------------------------------------------
function updateDoctorReferralTable() {
    const report = {};
    allReportsData.forEach(r => {
        if (!report[r.doctorName]) report[r.doctorName] = { count: 0, business: 0 };
        report[r.doctorName].count += 1;
        report[r.doctorName].business += r.subtotal;
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

// -------------------------------------------------------------
// BILLING & PATIENT LIST TABLE RENDER
// -------------------------------------------------------------
function updateBillingTable(filteredList = null) {
    const list = filteredList || allReportsData;
    let html = "";
    list.forEach((r) => {
        const index = allReportsData.indexOf(r);
        const testNamesList = r.tests.map(t => t.testName).join(', ');
        html += `
            <tr>
                <td>${r.id}</td>
                <td><b>${r.patientName}</b></td>
                <td>${r.doctorName}</td>
                <td>${testNamesList}</td>
                <td>₹${r.subtotal}</td>
                <td style="text-align: center; white-space: nowrap;">
                    <button class="btn" style="padding: 5px 10px; font-size: 11px; background: #0284c7; margin-right: 5px;" onclick="openReportPrint(${index})">
                        📄 Print Report
                    </button>
                    <button class="btn" style="padding: 5px 10px; font-size: 11px; background: #10b981;" onclick="openBill(${index})">
                        🧾 Generate Bill
                    </button>
                </td>
            </tr>
        `;
    });
    if (list.length === 0) {
        html = `<tr><td colspan="6" style="text-align: center; color: #94a3b8;">No reports found.</td></tr>`;
    }
    const target = document.getElementById('billing-table-body');
    if (target) target.innerHTML = html;
}

window.filterBillsTable = function() {
    const query = document.getElementById('search-bill-input').value.toLowerCase().trim();
    const filtered = allReportsData.filter(r => 
        r.patientName.toLowerCase().includes(query) || r.id.toLowerCase().includes(query)
    );
    updateBillingTable(filtered);
};

// -------------------------------------------------------------
// ACTION 1: PRINT DIAGNOSTIC REPORT ONLY (PER-TEST PAGE BREAK)
// -------------------------------------------------------------
window.openReportPrint = function(index) {
    const reportData = allReportsData[index];
    if (!reportData) return;

    const formattedDate = new Date(reportData.createdAt).toLocaleDateString('en-GB');
    let fullReportHtml = "";

    reportData.tests.forEach((t, i) => {
        const codeKey = Object.keys(testCatalogue).find(k => testCatalogue[k].name === t.testName);
        const catalogueParams = codeKey ? testCatalogue[codeKey].params : [];
        const isLast = i === reportData.tests.length - 1;

        fullReportHtml += `
            <div class="report-page" style="${!isLast ? 'page-break-after: always; break-after: page;' : ''} padding: 10px;">
                
                <!-- Single Header -->
                <div style="border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 15px;">
                    <table style="width: 100%; font-size: 13px; font-weight: bold; border: none !important;">
                        <tr style="border: none !important;">
                            <td style="width: 50%; padding: 3px 0; border: none !important;">Patient Name: <span style="text-transform: uppercase;">${reportData.patientName}</span></td>
                            <td style="width: 50%; padding: 3px 0; border: none !important; text-align: right;">Date: ${formattedDate}</td>
                        </tr>
                        <tr style="border: none !important;">
                            <td style="width: 50%; padding: 3px 0; border: none !important;">Age/Gender: ${reportData.age} Yrs / ${reportData.gender}</td>
                            <td style="width: 50%; padding: 3px 0; border: none !important; text-align: right;">Referred By: ${reportData.doctorName}</td>
                        </tr>
                    </table>
                </div>

                <!-- Test Title -->
                <div style="text-align: center; font-weight: bold; margin: 15px 0 10px 0; text-decoration: underline; font-size: 15px; text-transform: uppercase;">
                    ${t.testName}
                </div>

                <!-- Test Results Table -->
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

            fullReportHtml += `
                <tr>
                    <td style="padding: 6px 0; font-weight: bold; text-transform: uppercase;">${pName}</td>
                    <td style="padding: 6px 0; font-weight: bold;">${pVal}</td>
                    <td style="padding: 6px 0;">${unit}</td>
                    <td style="padding: 6px 0;">${range}</td>
                </tr>
            `;
        }

        fullReportHtml += `
                    </tbody>
                </table>
            </div>
        `;
    });

    const printContainer = document.getElementById('print-template-container') || document.getElementById('printable-report');
    if (printContainer) {
        printContainer.innerHTML = fullReportHtml;
    }

    setTimeout(() => {
        window.print();
    }, 150);
};

// -------------------------------------------------------------
// ACTION 2: GENERATE CASH RECEIPT / BILL ONLY
// -------------------------------------------------------------
window.openBill = function(index) {
    currentSelectedReport = allReportsData[index];
    const billCard = document.getElementById('bill-view-card');
    if (billCard) billCard.style.display = 'block';

    document.getElementById('bill-patient-info').innerText = currentSelectedReport.patientName;
    document.getElementById('bill-age-gender').innerText = `${currentSelectedReport.age} Yrs / ${currentSelectedReport.gender}`;
    document.getElementById('bill-doctor-info').innerText = currentSelectedReport.doctorName;

    let summaryHtml = "";
    currentSelectedReport.tests.forEach(t => {
        summaryHtml += `<b>➡️ ${t.testName}</b> (₹${testCatalogue[Object.keys(testCatalogue).find(k => testCatalogue[k].name === t.testName)]?.price || 0})<br>`;
    });
    
    document.getElementById('bill-tests-summary-box').innerHTML = summaryHtml;
    document.getElementById('bill-subtotal').value = currentSelectedReport.subtotal;
    document.getElementById('bill-discount').value = 0;
    calculateFinalBill();
};

window.calculateFinalBill = function() {
    const sub = parseFloat(document.getElementById('bill-subtotal')?.value) || 0;
    const disc = parseFloat(document.getElementById('bill-discount')?.value) || 0;
    const net = Math.max(0, sub - disc);
    
    if (document.getElementById('bill-net')) {
        document.getElementById('bill-net').value = net;
    }
};

window.confirmAndSaveBill = function() {
    if (!currentSelectedReport) return;

    const sub = parseFloat(document.getElementById('bill-subtotal')?.value) || 0;
    const disc = parseFloat(document.getElementById('bill-discount')?.value) || 0;
    const net = Math.max(0, sub - disc);

    const formattedDate = new Date().toLocaleDateString('en-GB');

    const billHtml = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
                <h2 style="margin: 0; text-transform: uppercase;">PATHOLOGY PAYMENT RECEIPT</h2>
                <p style="margin: 3px 0; font-size: 12px;">Invoice Date: ${formattedDate}</p>
            </div>
            <table style="width: 100%; font-size: 13px; margin-bottom: 15px; border: none !important;">
                <tr>
                    <td><b>Patient Name:</b> ${currentSelectedReport.patientName}</td>
                    <td style="text-align: right;"><b>Age/Sex:</b> ${currentSelectedReport.age} / ${currentSelectedReport.gender}</td>
                </tr>
                <tr>
                    <td><b>Referred By:</b> ${currentSelectedReport.doctorName}</td>
                    <td style="text-align: right;"><b>Receipt ID:</b> INV-${Math.floor(100000 + Math.random() * 900000)}</td>
                </tr>
            </table>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
                <thead>
                    <tr style="border-top: 1px solid #000; border-bottom: 1px solid #000;">
                        <th style="text-align: left; padding: 6px 0;">Test Name</th>
                        <th style="text-align: right; padding: 6px 0;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${currentSelectedReport.tests.map(t => `
                        <tr>
                            <td style="padding: 6px 0;">${t.testName}</td>
                            <td style="text-align: right; padding: 6px 0;">₹${testCatalogue[Object.keys(testCatalogue).find(k => testCatalogue[k].name === t.testName)]?.price || 0}</td>
                        </tr>
                    `).join('')}
                    <tr style="border-top: 1px solid #000;">
                        <td style="padding: 6px 0; font-weight: bold;">Subtotal</td>
                        <td style="text-align: right; padding: 6px 0; font-weight: bold;">₹${sub}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0;">Discount</td>
                        <td style="text-align: right; padding: 6px 0;">- ₹${disc}</td>
                    </tr>
                    <tr style="border-top: 2px solid #000; border-bottom: 2px solid #000; font-size: 14px; font-weight: bold;">
                        <td style="padding: 8px 0;">Net Payable</td>
                        <td style="text-align: right; padding: 8px 0;">₹${net}</td>
                    </tr>
                </tbody>
            </table>
            <p style="text-align: center; margin-top: 30px; font-weight: bold; font-size: 12px;">Thank you for trusting us. Get well soon!</p>
        </div>
    `;

    const printContainer = document.getElementById('print-template-container') || document.getElementById('printable-report');
    if (printContainer) printContainer.innerHTML = billHtml;

    setTimeout(() => {
        window.print();
    }, 150);

    const billCard = document.getElementById('bill-view-card');
    if (billCard) billCard.style.display = 'none';
};
