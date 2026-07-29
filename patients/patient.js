import { testCatalogue } from '../config/config.js';

let doctorsDirectory = JSON.parse(localStorage.getItem('path_doctors')) || [];
let allReportsData = JSON.parse(localStorage.getItem('path_reports')) || [];
let activeTests = [];
let currentSelectedReport = null;

let currentDoctorFocusIndex = -1;
let currentTestFocusIndex = -1;

const tabFiles = {
    'tab-register': '../components/register.html',
    'tab-doctors': '../components/doctors.html',
    'tab-billing': '../components/billing.html'
};

// -------------------------------------------------------------
// GLOBAL KEYBOARD SHORTCUTS (F3 & CTRL + B)
// -------------------------------------------------------------
document.addEventListener('keydown', (e) => {
    if (e.key === 'F3') {
        e.preventDefault();
        saveAndPrintReport();
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        const billingBtn = document.querySelector('[onclick*="tab-billing"]');
        switchTab('tab-billing', { target: billingBtn });
    }
});

window.onload = async () => {
    await loadTabContent('tab-register');
};

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

window.switchTab = async function(tabId, evt) {
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    if (evt && evt.target) {
        evt.target.classList.add('active');
    } else {
        const targetBtn = document.querySelector(`[onclick*="${tabId}"]`);
        if (targetBtn) targetBtn.classList.add('active');
    }

    await loadTabContent(tabId);
};

// -------------------------------------------------------------
// KEYBOARD NAVIGATION HANDLER
// -------------------------------------------------------------
function handleKeyboardNavigation(e, container, type) {
    const items = container.querySelectorAll('.autocomplete-item');
    if (!items.length) return;

    let currentIndex = type === 'doctor' ? currentDoctorFocusIndex : currentTestFocusIndex;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        currentIndex++;
        if (currentIndex >= items.length) currentIndex = 0;
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        currentIndex--;
        if (currentIndex < 0) currentIndex = items.length - 1;
    } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentIndex > -1 && items[currentIndex]) {
            items[currentIndex].click();
        }
        return;
    }

    items.forEach(el => el.classList.remove('active'));
    if (items[currentIndex]) {
        items[currentIndex].classList.add('active');
        items[currentIndex].scrollIntoView({ block: 'nearest' });
    }

    if (type === 'doctor') currentDoctorFocusIndex = currentIndex;
    else currentTestFocusIndex = currentIndex;
}

// -------------------------------------------------------------
// AUTOCOMPLETE (DOCTOR)
// -------------------------------------------------------------
window.handleDoctorSearch = function(e) {
    const listContainer = document.getElementById('doctor-suggestions');
    if (!listContainer) return;

    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
        handleKeyboardNavigation(e, listContainer, 'doctor');
        return;
    }

    const val = e.target.value.toLowerCase().trim();
    currentDoctorFocusIndex = -1;

    if (val.length === 0) { listContainer.style.display = 'none'; return; }

    const matches = doctorsDirectory.filter(d => d.toLowerCase().includes(val));
    if (matches.length > 0) {
        let html = "";
        matches.forEach((d, idx) => {
            html += `<div class="autocomplete-item" id="doc-item-${idx}" onclick="selectDoctor('${d}')">${d}</div>`;
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
    currentDoctorFocusIndex = -1;
};

// -------------------------------------------------------------
// AUTOCOMPLETE (TEST SHORTCODES)
// -------------------------------------------------------------
window.handleTestSearch = function(e) {
    const listContainer = document.getElementById('test-suggestions');
    if (!listContainer) return;

    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
        handleKeyboardNavigation(e, listContainer, 'test');
        return;
    }

    const val = e.target.value.toUpperCase().trim();
    currentTestFocusIndex = -1;

    if (val.length === 0) { listContainer.style.display = 'none'; return; }

    const matches = Object.keys(testCatalogue).filter(code => 
        code.includes(val) || testCatalogue[code].name.toUpperCase().includes(val)
    );

    if (matches.length > 0) {
        let html = "";
        matches.forEach((code, idx) => {
            html += `<div class="autocomplete-item" id="test-item-${idx}" onclick="selectTestCode('${code}')"><b>${code}</b> - ${testCatalogue[code].name}</div>`;
        });
        listContainer.innerHTML = html;
        listContainer.style.display = 'block';
    } else {
        listContainer.style.display = 'none';
    }
};

window.handleTestCode = window.handleTestSearch;

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
    currentTestFocusIndex = -1;
};

function renderBadges() {
    let html = "";
    activeTests.forEach(code => {
        if (testCatalogue[code]) {
            html += `<span class="badge">${testCatalogue[code].name}</span>`;
        }
    });
    const target = document.getElementById('selected-tests-container');
    if (target) target.innerHTML = html;
}

function renderInputs() {
    let containerHtml = "";
    activeTests.forEach(code => {
        const testObj = testCatalogue[code];
        if (!testObj) return;

        containerHtml += `<div class="section-title">📌 ${testObj.name}</div><div class="grid-4">`;
        testObj.params.forEach(param => {
            const pName = typeof param === 'object' ? param.name : param;
            const safeParam = encodeURIComponent(pName);
            containerHtml += `
                <div>
                    <label>${pName}</label>
                    <input type="text" data-test="${code}" data-param="${safeParam}" placeholder="Value">
                </div>
            `;
        });
        containerHtml += `</div>`;
    });
    const target = document.getElementById('test-inputs-container');
    if (target) target.innerHTML = containerHtml;
}

// -------------------------------------------------------------
// SAVE PATIENT & TRIGGER REPORT PRINT
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
        if (!testCatalogue[code]) return;

        subtotal += testCatalogue[code].price || 0;
        let paramValues = {};
        const inputs = document.querySelectorAll(`input[data-test="${code}"]`);
        
        inputs.forEach(inp => {
            const val = inp.value.trim();
            if (val !== "" && val !== undefined) {
                const originalParamName = decodeURIComponent(inp.dataset.param);
                paramValues[originalParamName] = val;
            }
        });

        if (Object.keys(paramValues).length > 0) {
            testDetails.push({ 
                testCode: code,
                testName: testCatalogue[code].name, 
                values: paramValues 
            });
        }
    });

    if (testDetails.length === 0) {
        alert("Please fill at least one parameter value!");
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

    openReportPrint(0);

    if (nameEl) nameEl.value = '';
    if (document.getElementById('p-age')) document.getElementById('p-age').value = '';
    if (document.getElementById('p-doctor')) document.getElementById('p-doctor').value = '';
    
    activeTests = [];
    renderBadges();
    renderInputs();
};

window.savePatientRecord = window.saveAndPrintReport;

// -------------------------------------------------------------
// DOCTOR REFERRAL TABLE
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
// BILLING & PATIENT LIST
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
// PRINT DIAGNOSTIC REPORT (FULL REPORT DATA IN QR CODE)
// -------------------------------------------------------------
window.openReportPrint = function(index) {
    const reportData = allReportsData[index];
    if (!reportData) return;

    const formattedDate = new Date(reportData.createdAt).toLocaleDateString('en-GB');
    let fullReportHtml = "";

    reportData.tests.forEach((t, i) => {
        let catalogueParams = [];
        
        if (t.testCode && testCatalogue[t.testCode]) {
            catalogueParams = testCatalogue[t.testCode].params || [];
        } else {
            const matchedKey = Object.keys(testCatalogue).find(k => 
                testCatalogue[k].name.toLowerCase().trim() === t.testName.toLowerCase().trim()
            );
            if (matchedKey) catalogueParams = testCatalogue[matchedKey].params || [];
        }

        const isLast = i === reportData.tests.length - 1;
        let tableRowsHtml = "";
        let qrDataRows = [];

        if (t.values && Object.keys(t.values).length > 0) {
            for (const [pName, pVal] of Object.entries(t.values)) {
                
                const cleanStr = str => String(str).toLowerCase().replace(/[^a-z0-9]/g, '');

                const paramObj = catalogueParams.find(p => {
                    const cName = typeof p === 'object' ? p.name : p;
                    return cleanStr(cName) === cleanStr(pName);
                });

                const unit = (paramObj && typeof paramObj === 'object' && paramObj.unit) ? paramObj.unit : '';
                const range = (paramObj && typeof paramObj === 'object' && paramObj.range) ? paramObj.range : '';

                // Table HTML Generation
                tableRowsHtml += `
                    <tr style="border: none !important;">
                        <td style="padding: 5px 0; font-weight: bold; text-transform: uppercase; border: none !important;">${pName}</td>
                        <td style="padding: 5px 0; font-weight: bold; border: none !important;">${pVal}</td>
                        <td style="padding: 5px 0; border: none !important;">${unit}</td>
                        <td style="padding: 5px 0; border: none !important;">${range}</td>
                    </tr>
                `;

                // Store complete parameter detail for QR payload
                qrDataRows.push(`${pName}: ${pVal} | Unit: ${unit || '-'} | Range: ${range || '-'}`);
            }
        }

        // Complete QR payload with Patient Info, Doctor, Date, and Test Results
        const fullPageQrContent = `Report ID: ${reportData.id}
Date: ${formattedDate}
Patient: ${reportData.patientName} (${reportData.age} Yrs / ${reportData.gender})
Ref. Dr: ${reportData.doctorName}
Test: ${t.testName}
----------------------------------------
${qrDataRows.join('\n')}`;

        fullReportHtml += `
            <div class="report-page" style="${!isLast ? 'page-break-after: always; break-after: page;' : ''}">
                <div style="border-bottom: 1.5px solid #000; padding-bottom: 8px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <table style="width: 80%; font-size: 13px; font-weight: bold; border: none !important; border-collapse: collapse; line-height: 1.6;">
                        <tr style="border: none !important;">
                            <td style="width: 55%; padding: 2px 0; border: none !important;">Patient's Name : <span style="text-transform: uppercase;">${reportData.patientName}</span></td>
                            <td style="width: 45%; padding: 2px 0; border: none !important; text-align: right;">Age/Sex : ${reportData.age} Yrs / ${reportData.gender}</td>
                        </tr>
                        <tr style="border: none !important;">
                            <td style="width: 55%; padding: 2px 0; border: none !important;">Reff.Dr : ${reportData.doctorName}</td>
                            <td style="width: 45%; padding: 2px 0; border: none !important; text-align: right;">Date : ${formattedDate}</td>
                        </tr>
                    </table>
                    <input type="hidden" id="qr-text-${i}" value="${encodeURIComponent(fullPageQrContent)}">
                    <div id="report-qr-${i}" style="width: 85px; height: 85px; margin-left: 10px;"></div>
                </div>

                <div style="text-align: center; font-weight: bold; margin: 15px 0 10px 0; text-decoration: underline; font-size: 14px; text-transform: uppercase;">
                    ${t.testName}
                </div>

                <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px; border: none !important;">
                    <thead>
                        <tr style="border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; text-align: left;">
                            <th style="padding: 6px 0; width: 45%; border: none !important;">INVESTIGATION</th>
                            <th style="padding: 6px 0; width: 20%; border: none !important;">RESULT</th>
                            <th style="padding: 6px 0; width: 15%; border: none !important;">UNIT</th>
                            <th style="padding: 6px 0; width: 20%; border: none !important;">NORMAL RANGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRowsHtml}
                    </tbody>
                </table>
            </div>
        `;
    });

    let printContainer = document.getElementById('print-template-container');
    if (!printContainer) {
        printContainer = document.createElement('div');
        printContainer.id = 'print-template-container';
        document.body.appendChild(printContainer);
    }

    printContainer.innerHTML = fullReportHtml;

    // QR Code rendering
    reportData.tests.forEach((t, i) => {
        const qrContainer = document.getElementById(`report-qr-${i}`);
        const textInput = document.getElementById(`qr-text-${i}`);

        if (qrContainer && textInput && window.QRCode) {
            qrContainer.innerHTML = "";
            let qrText = decodeURIComponent(textInput.value);

            try {
                new window.QRCode(qrContainer, {
                    text: qrText,
                    width: 85,
                    height: 85,
                    correctLevel: window.QRCode.CorrectLevel.L
                });
            } catch (err) {
                console.warn("QR matrix capacity reached, applying fallback:", err);
                qrContainer.innerHTML = "";
                
                // Truncates gracefully if data exceeds maximum QR capability
                const fallbackText = qrText.substring(0, 1200);
                new window.QRCode(qrContainer, {
                    text: fallbackText,
                    width: 85,
                    height: 85,
                    correctLevel: window.QRCode.CorrectLevel.L
                });
            }
        }
    });

    setTimeout(() => { window.print(); }, 300);
};

// -------------------------------------------------------------
// PRINT BILL ONLY
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
        const testCode = t.testCode || Object.keys(testCatalogue).find(k => testCatalogue[k].name === t.testName);
        summaryHtml += `<b>➡️ ${t.testName}</b> (₹${testCatalogue[testCode]?.price || 0})<br>`;
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
    const receiptId = 'INV-' + Math.floor(100000 + Math.random() * 900000);

    const billHtml = `
        <div style="padding: 10px; font-family: Arial, sans-serif;">
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
                    <td style="text-align: right;"><b>Receipt ID:</b> ${receiptId}</td>
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
                    ${currentSelectedReport.tests.map(t => {
                        const code = t.testCode || Object.keys(testCatalogue).find(k => testCatalogue[k].name === t.testName);
                        return `
                        <tr>
                            <td style="padding: 6px 0;">${t.testName}</td>
                            <td style="text-align: right; padding: 6px 0;">₹${testCatalogue[code]?.price || 0}</td>
                        </tr>
                        `;
                    }).join('')}
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

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                <div id="bill-qr-container" style="width: 80px; height: 80px;"></div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold; font-size: 12px;">Authorized Signatory</p>
                    <p style="margin: 3px 0; font-size: 11px;">Pathology Lab</p>
                </div>
            </div>

            <p style="text-align: center; margin-top: 25px; font-weight: bold; font-size: 12px;">Thank you for trusting us. Get well soon!</p>
        </div>
    `;

    let printContainer = document.getElementById('print-template-container');
    if (!printContainer) {
        printContainer = document.createElement('div');
        printContainer.id = 'print-template-container';
        document.body.appendChild(printContainer);
    }

    printContainer.innerHTML = billHtml;

    const qrContainer = document.getElementById('bill-qr-container');
    if (qrContainer && window.QRCode) {
        const testsList = currentSelectedReport.tests.map(t => t.testName).join(', ');
        const billPayload = `Receipt: ${receiptId}\nPatient: ${currentSelectedReport.patientName}\nTests: ${testsList}\nSubtotal: Rs.${sub}\nDiscount: Rs.${disc}\nNet Amount: Rs.${net}\nDate: ${formattedDate}`;

        new window.QRCode(qrContainer, {
            text: billPayload,
            width: 80,
            height: 80,
            correctLevel: window.QRCode.CorrectLevel.M
        });
    }

    setTimeout(() => { window.print(); }, 250);

    const billCard = document.getElementById('bill-view-card');
    if (billCard) billCard.style.display = 'none';
};
