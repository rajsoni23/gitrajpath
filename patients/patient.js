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

// -------------------------------------------------------------
// RENDER PARAMETER INPUTS (DYNAMIC TABLE + SINGLE TEST SUPPORT)
// -------------------------------------------------------------
function renderInputs() {
    let containerHtml = "";

    activeTests.forEach(code => {
        const testObj = testCatalogue[code];
        if (!testObj) return;

        containerHtml += `<div class="section-title">📌 ${testObj.name}</div><div class="grid-4">`;
        
        testObj.params.forEach(param => {
            const isTableParam = (typeof param === 'object') && 
                                 (param.type === 'table' || param.isTable || param.rows !== undefined);

            // 1. TABLE GRID FOR WIDAL / SEROLOGY WIDAL
            if (isTableParam) {
                const headers = param.headers || ['ANTIGENS', '1/20', '1/40', '1/80', '1/160', '1/320'];
                const rows = param.rows || [
                    { antigen: "S.TYPHI 'O'", values: ["", "", "", "", ""] },
                    { antigen: "S.TYPHI 'H'", values: ["", "", "", "", ""] },
                    { antigen: "S.PARATYPHI 'AH'", values: ["", "", "", "", ""] },
                    { antigen: "S.PARATYPHI 'BH'", values: ["", "", "", "", ""] }
                ];

                containerHtml += `
                    <div style="grid-column: span 4; margin-top: 10px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 6px; border: 1px solid #334155;">
                        <label style="font-size: 14px; font-weight: bold; margin-bottom: 8px; display: block; color: #38bdf8;">🧪 ${param.name || 'WIDAL TEST SLIDE AGGLUTINATION'}</label>
                        <table style="width: 100%; border-collapse: collapse; text-align: center; color: #fff; font-size: 12px;">
                            <thead>
                                <tr style="background: rgba(255,255,255,0.1);">
                                    ${headers.map(h => `<th style="padding: 6px; border: 1px solid #475569;">${h}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${rows.map((r) => `
                                    <tr>
                                        <td style="font-weight: bold; text-align: left; padding: 6px; border: 1px solid #475569;">${r.antigen}</td>
                                        ${(r.values || ["","","","",""]).map((val, cIdx) => `
                                            <td style="padding: 2px; border: 1px solid #475569;">
                                                <input type="text" 
                                                    data-table-test="${code}" 
                                                    data-antigen="${encodeURIComponent(r.antigen)}" 
                                                    data-col-idx="${cIdx}" 
                                                    value="${val}" 
                                                    style="width: 100%; text-align: center; background: rgba(0,0,0,0.2); color: #fff; border: 1px solid #64748b; border-radius: 3px; padding: 4px; font-weight: bold;"
                                                    placeholder="-">
                                            </td>
                                        `).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            } else {
                // 2. STANDARD SINGLE INPUT PARAMETER
                const pName = typeof param === 'object' ? param.name : param;
                const safeParam = encodeURIComponent(pName);
                const defaultRange = (typeof param === 'object' && param.range) ? param.range : '';

                containerHtml += `
                    <div>
                        <label>${pName}</label>
                        <input type="text" data-test="${code}" data-param="${safeParam}" placeholder="${defaultRange || 'Value'}">
                    </div>
                `;
            }
        });
        containerHtml += `</div>`;
    });

    const target = document.getElementById('test-inputs-container');
    if (target) target.innerHTML = containerHtml;
}

// -------------------------------------------------------------
// SAVE PATIENT RECORD & REPORT
// -------------------------------------------------------------
window.saveAndPrintReport = function() {
    const nameEl = document.getElementById('p-name');
    
    if (!nameEl || !nameEl.value.trim()) { 
        nameEl.style.border = "2px solid #ef4444";
        nameEl.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
        nameEl.placeholder = "⚠️ Patient Name Required!";
        nameEl.focus();

        setTimeout(() => {
            nameEl.style.border = "";
            nameEl.style.backgroundColor = "";
            nameEl.placeholder = "Enter Patient Name";
        }, 3500);

        return; 
    }

    const name = nameEl.value.trim();
    const age = document.getElementById('p-age') ? document.getElementById('p-age').value || 0 : 0;
    const gender = document.getElementById('p-gender') ? document.getElementById('p-gender').value : 'Male';
    const docInput = (document.getElementById('p-doctor') && document.getElementById('p-doctor').value.trim()) || "Self";

    if (!doctorsDirectory.includes(docInput)) {
        doctorsDirectory.push(docInput);
        localStorage.setItem('path_doctors', JSON.stringify(doctorsDirectory));
    }

    let testDetails = [];
    let calculatedBaseTotal = 0;

    activeTests.forEach(code => {
        if (!testCatalogue[code]) return;

        if (testCatalogue[code].price) {
            calculatedBaseTotal += parseFloat(testCatalogue[code].price) || 0;
        }

        let paramValues = {};
        let tableValues = {};

        // 1. Gather Standard Inputs
        const inputs = document.querySelectorAll(`input[data-test="${code}"]`);
        inputs.forEach(inp => {
            const val = inp.value.trim();
            if (val !== "" && val !== undefined) {
                const originalParamName = decodeURIComponent(inp.dataset.param);
                paramValues[originalParamName] = val;
            }
        });

        // 2. Gather Dynamic Table Inputs (Widal/Serology)
        const tableInputs = document.querySelectorAll(`input[data-table-test="${code}"]`);
        tableInputs.forEach(tInp => {
            const antigen = decodeURIComponent(tInp.dataset.antigen);
            const colIdx = parseInt(tInp.dataset.colIdx);
            const val = tInp.value.trim();

            if (!tableValues[antigen]) tableValues[antigen] = ["", "", "", "", ""];
            tableValues[antigen][colIdx] = val;
        });

        if (Object.keys(paramValues).length > 0 || Object.keys(tableValues).length > 0) {
            testDetails.push({ 
                testCode: code,
                testName: testCatalogue[code].name, 
                values: paramValues,
                tableData: tableValues
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
        subtotal: calculatedBaseTotal,
        discount: 0,
        netTotal: calculatedBaseTotal,
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
        report[r.doctorName].business += (r.netTotal !== undefined ? r.netTotal : r.subtotal);
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
        const displayTotal = r.netTotal !== undefined ? r.netTotal : r.subtotal;

        html += `
            <tr>
                <td>${r.id}</td>
                <td><b>${r.patientName}</b></td>
                <td>${r.doctorName}</td>
                <td>${testNamesList}</td>
                <td>₹${displayTotal}</td>
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
// PRINT DIAGNOSTIC REPORT (UPDATED STYLING & ALIGNMENTS)
// -------------------------------------------------------------
// -------------------------------------------------------------
// PRINT DIAGNOSTIC REPORT (EXACT PRINT MATCH AS PER SAMPLE)
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

        let tableRowsHtml = "";

        catalogueParams.forEach(param => {
            const pName = typeof param === 'object' ? param.name : param;
            const isTableParam = (typeof param === 'object') && 
                                 (param.type === 'table' || param.isTable || param.rows !== undefined);
            
            // 1. WIDAL / SLIDE AGGLUTINATION TABLE
            if (isTableParam) {
                const headers = param.headers || ['ANTIGENS', '1/20', '1/40', '1/80', '1/160', '1/320'];
                const savedTableData = t.tableData || {};

                tableRowsHtml += `
                    <tr style="border: none !important;">
                        <td colspan="4" style="padding: 6px 0; border: none !important; text-align: left !important;">
                            <div style="font-weight: bold; margin-bottom: 4px; font-size: 11px; text-transform: uppercase;">
                                ${param.name || 'WIDAL TEST'}
                            </div>
                            <table border="1" style="width: 100%; border-collapse: collapse; font-size: 10px; background: white; font-weight: normal;">
                                <thead>
                                    <tr>
                                        ${headers.map((h, idx) => `<th style="padding: 3px; background: white !important; color: black !important; font-weight: bold; text-align: ${idx === 0 ? 'left' : 'center'} !important;">${h}</th>`).join('')}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${(param.rows || []).map(r => {
                                        const antigenName = r.antigen;
                                        const cellValues = savedTableData[antigenName] || r.values || ["","","","",""];
                                        return `
                                            <tr>
                                                <td style="font-weight: normal; text-align: left !important; padding: 3px;">${antigenName}</td>
                                                ${cellValues.map(v => `<td style="text-align: center !important; font-weight: normal; padding: 3px;">${v || ''}</td>`).join('')}
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                `;
            } else {
                // 2. STANDARD PARAMETER ROW (EXACT FORMATTING AS IMAGE)
                const pVal = (t.values && t.values[pName]) ? t.values[pName] : '';
                if (pVal !== "" && pVal !== undefined) {
                    const unit = (typeof param === 'object' && param.unit) ? param.unit : '';
                    const range = (typeof param === 'object' && param.range) ? param.range : '';

                    tableRowsHtml += `
                        <tr style="border: none !important;">
                            <td style="font-weight: normal; text-transform: uppercase; text-align: left !important; border: none !important; padding: 4px 0; width: 40%;">
                                ${pName}
                            </td>
                            <td style="font-weight: normal; text-align: center !important; border: none !important; padding: 4px 0; width: 20%;">
                                ${pVal}
                            </td>
                            <td style="font-weight: normal; text-align: center !important; border: none !important; padding: 4px 0; width: 15%;">
                                ${unit}
                            </td>
                            <td style="font-weight: bold; text-align: center !important; border: none !important; padding: 4px 0; width: 25%;">
                                ${range ? (range.startsWith('[') ? range : `[${range}]`) : ''}
                            </td>
                        </tr>
                    `;
                }
            }
        });

        const essentialQrContent = `Report ID: ${reportData.id}\nPatient Name: ${reportData.patientName}\nReff Doctor: ${reportData.doctorName}\nDate: ${formattedDate}\nTest Name: ${t.testName}`;

        fullReportHtml += `
            <div class="report-page">
                <div class="report-body-content">
                    <!-- PATIENT INFORMATION HEADER -->
                    <div style="border-bottom: 1.5px solid #000; padding-bottom: 6px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                        <table style="width: 80%; font-size: 12px; font-weight: bold; border: none !important; border-collapse: collapse; line-height: 1.4; background: white;">
                            <tr style="border: none !important;">
                                <td style="width: 50%; padding: 2px 0; border: none !important; text-align: left !important;">Patient's Name : <span style="text-transform: uppercase;">${reportData.patientName}</span></td>
                                <td style="width: 50%; padding: 2px 0; border: none !important; text-align: right !important;">AGE/SEX : ${reportData.age} YRS / ${reportData.gender}</td>
                            </tr>
                            <tr style="border: none !important;">
                                <td style="width: 50%; padding: 2px 0; border: none !important; text-align: left !important;">Reff.Dr : ${reportData.doctorName}</td>
                                <td style="width: 50%; padding: 2px 0; border: none !important; text-align: right !important;">DATE : ${formattedDate}</td>
                            </tr>
                        </table>
                        <input type="hidden" id="qr-text-${i}" value="${encodeURIComponent(essentialQrContent)}">
                        <div id="report-qr-${i}" style="width: 70px; height: 70px; margin-left: 10px;"></div>
                    </div>

                    <!-- TEST TITLE -->
                    <div style="text-align: center; font-weight: bold; margin-bottom: 12px; text-decoration: underline; font-size: 13px; text-transform: uppercase;">
                        ${t.testName} - REPORT
                    </div>

                    <!-- TEST PARAMETERS TABLE -->
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px; border: none !important; background: white; font-weight: normal;">
                        <thead>
                            <tr style="border-bottom: 1px solid #000; border-top: 1px solid #000; background: white;">
                                <th style="width: 40%; background: white !important; font-weight: bold; text-align: left !important; padding: 4px 0;">INVESTIGATION</th>
                                <th style="width: 20%; background: white !important; font-weight: bold; text-align: center !important; padding: 4px 0;">RESULT</th>
                                <th style="width: 15%; background: white !important; font-weight: bold; text-align: center !important; padding: 4px 0;">UNIT</th>
                                <th style="width: 25%; background: white !important; font-weight: bold; text-align: center !important; padding: 4px 0;">NORMAL RANGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRowsHtml}
                        </tbody>
                    </table>
                </div>

                <!-- BOTTOM FOOTER -->
                <div class="report-footer-section">
                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <div style="font-size: 10px; color: #333;">
                            <i>* System Generated Diagnostic Report</i>
                        </div>
                        <div style="text-align: right; font-weight: bold; font-size: 11px;">
                            <br><br>
                            <span>(Checked By / Pathologist)</span>
                        </div>
                    </div>
                </div>
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

    reportData.tests.forEach((t, i) => {
        const qrContainer = document.getElementById(`report-qr-${i}`);
        const textInput = document.getElementById(`qr-text-${i}`);

        if (qrContainer && textInput) {
            qrContainer.innerHTML = "";
            const qrText = decodeURIComponent(textInput.value);

            try {
                if (window.QRCode) {
                    new window.QRCode(qrContainer, {
                        text: qrText,
                        width: 70,
                        height: 70,
                        correctLevel: window.QRCode.CorrectLevel.M
                    });
                }
            } catch (err) {
                console.error("QR Code Error:", err);
            }
        }
    });

    setTimeout(() => { window.print(); }, 300);
};// -------------------------------------------------------------
// BILLING TAB FUNCTIONS
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
        summaryHtml += `<b>➡️ ${t.testName}</b><br>`;
    });
    document.getElementById('bill-tests-summary-box').innerHTML = summaryHtml;
    
    const subtotalEl = document.getElementById('bill-subtotal');
    const discountEl = document.getElementById('bill-discount');
    
    if (subtotalEl) subtotalEl.value = currentSelectedReport.subtotal || 0;
    if (discountEl) discountEl.value = currentSelectedReport.discount || 0;
    
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

    currentSelectedReport.subtotal = sub;
    currentSelectedReport.discount = disc;
    currentSelectedReport.netTotal = net;
    localStorage.setItem('path_reports', JSON.stringify(allReportsData));

    const formattedDate = new Date().toLocaleDateString('en-GB');
    const receiptId = 'INV-' + Math.floor(100000 + Math.random() * 900000);

    const billHtml = `
        <div style="padding: 10px; font-family: Arial, sans-serif;">
            <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
                <h2 style="margin: 0; text-transform: uppercase;">RAJ PATHOLOGY PAYMENT RECEIPT</h2>
            </div>
            
            <div style="border-bottom: 1.5px solid #000; padding-bottom: 8px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <table style="width: 80%; font-size: 13px; font-weight: bold; border: none !important; border-collapse: collapse; line-height: 1.6;">
                    <tr style="border: none !important;">
                        <td style="width: 55%; padding: 2px 0; border: none !important;">Patient Name: <span style="text-transform: uppercase;">${currentSelectedReport.patientName}</span></td>
                        <td style="width: 45%; padding: 2px 0; border: none !important; text-align: right;">Age/Sex: ${currentSelectedReport.age} Yrs / ${currentSelectedReport.gender}</td>
                    </tr>
                    <tr style="border: none !important;">
                        <td style="width: 55%; padding: 2px 0; border: none !important;">Referred By: ${currentSelectedReport.doctorName}</td>
                        <td style="width: 45%; padding: 2px 0; border: none !important; text-align: right;">Invoice Date: ${formattedDate}</td>
                    </tr>
                    <tr style="border: none !important;">
                        <td style="width: 55%; padding: 2px 0; border: none !important;">Receipt ID: ${receiptId}</td>
                        <td style="width: 45%; padding: 2px 0; border: none !important; text-align: right;"></td>
                    </tr>
                </table>
                <div id="bill-qr-container" style="width: 85px; height: 85px; margin-left: 10px;"></div>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
                <thead>
                    <tr style="border-top: 1px solid #000; border-bottom: 1px solid #000;">
                        <th style="text-align: left; padding: 6px 0;">Test Name</th>
                    </tr>
                </thead>
                <tbody>
                    ${currentSelectedReport.tests.map(t => `
                        <tr>
                            <td style="padding: 6px 0; font-weight: bold;">➡️ ${t.testName}</td>
                        </tr>
                    `).join('')}
                    <tr style="border-top: 1px solid #000;">
                        <td style="padding: 6px 0; font-weight: bold; display: flex; justify-content: space-between;">
                            <span>Subtotal</span>
                            <span>₹${sub}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; display: flex; justify-content: space-between;">
                            <span>Discount</span>
                            <span>- ₹${disc}</span>
                        </td>
                    </tr>
                    <tr style="border-top: 2px solid #000; border-bottom: 2px solid #000; font-size: 14px; font-weight: bold;">
                        <td style="padding: 8px 0; display: flex; justify-content: space-between;">
                            <span>Net Payable</span>
                            <span>₹${net}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 30px;">
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold; font-size: 12px;">Authorized Signatory</p>
                    <p style="margin: 3px 0; font-size: 11px;">RAJ Pathology Lab</p>
                    <p style="margin: 3px 0; font-size: 11px;">Mo n. 9919678133</p>
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
        const billPayload = `Receipt: ${receiptId}\nPatient: ${currentSelectedReport.patientName}\nReff Doctor: ${currentSelectedReport.doctorName}\nTests: ${testsList}\nSubtotal: Rs.${sub}\nDiscount: Rs.${disc}\nNet Amount: Rs.${net}\nDate: ${formattedDate}`;

        try {
            new window.QRCode(qrContainer, {
                text: billPayload,
                width: 85,
                height: 85,
                correctLevel: window.QRCode.CorrectLevel.M
            });
        } catch (err) {
            console.error("Bill QR error:", err);
        }
    }

    setTimeout(() => { window.print(); }, 250);

    const billCard = document.getElementById('bill-view-card');
    if (billCard) billCard.style.display = 'none';
    
    updateBillingTable();
};
