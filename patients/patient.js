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
        if(container) {
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
        containerHtml += `<div class="section-title">📌 ${testObj.name}</div>`;
        containerHtml += `<div class="grid-4">`;
        testObj.params.forEach(param => {
            containerHtml += `
                <div>
                    <label>${param}</label>
                    <input type="text" data-test="${code}" data-param="${param}" placeholder="Value">
                </div>
            `;
        });
        containerHtml += `</div>`;
    });
    const target = document.getElementById('test-inputs-container');
    if (target) target.innerHTML = containerHtml;
}

window.savePatientRecord = function() {
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
            paramValues[inp.dataset.param] = inp.value || "-";
        });
        testDetails.push({ testName: testCatalogue[code].name, values: paramValues });
    });

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

    alert("✅ Patient & Test Records Saved Successfully!");
    if (nameEl) nameEl.value = '';
    if (document.getElementById('p-age')) document.getElementById('p-age').value = '';
    if (document.getElementById('p-doctor')) document.getElementById('p-doctor').value = '';
    
    activeTests = ['CBC'];
    renderBadges();
    renderInputs();
};

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

window.calculateFinalBill = function() {
    const sub = parseFloat(document.getElementById('bill-subtotal').value) || 0;
    const disc = parseFloat(document.getElementById('bill-discount').value) || 0;
    const net = Math.max(0, sub - disc);
    
    if (document.getElementById('bill-net')) {
        document.getElementById('bill-net').value = net;
    }

    if (currentSelectedBill) {
        document.getElementById('print-bill-id').innerText = currentSelectedBill.id;
        document.getElementById('print-date').innerText = new Date(currentSelectedBill.createdAt).toLocaleDateString();
        document.getElementById('print-p-name').innerText = currentSelectedBill.patientName;
        document.getElementById('print-p-age-gender').innerText = `${currentSelectedBill.age} Yrs / ${currentSelectedBill.gender}`;
        document.getElementById('print-doc-name').innerText = currentSelectedBill.doctorName;
        document.getElementById('print-sub').innerText = sub;
        document.getElementById('print-disc').innerText = disc;
        document.getElementById('print-net').innerText = net;

        let printTestsHtml = "";
        currentSelectedBill.tests.forEach(t => {
            printTestsHtml += `<div style="margin-bottom: 8px;"><b>${t.testName}</b><table style="width:100%; border-collapse:collapse; margin-top:2px;">`;
            for (const [pName, pVal] of Object.entries(t.values)) {
                printTestsHtml += `<tr><td style="border:1px solid #ddd; padding:4px;">${pName}</td><td style="border:1px solid #ddd; padding:4px;"><b>${pVal}</b></td></tr>`;
            }
            printTestsHtml += `</table></div>`;
        });
        document.getElementById('print-tests-container').innerHTML = printTestsHtml;
    }
};
