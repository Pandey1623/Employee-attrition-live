let highRiskCount = 78;
let lowRiskCount = 256;
let myDoughnutChart;

function showPage(pageId, clickedItem) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active-page"));
    document.getElementById(pageId).classList.add("active-page");
    document.querySelectorAll(".menu a").forEach(link => link.classList.remove("active"));
    if (clickedItem) clickedItem.classList.add("active");
    const titles = { "dashboard": "Dashboard Overview", "employee-form": "Employee Form", "prediction": "Prediction Result", "analytics": "Analytics" };
    document.getElementById("pageTitle").innerText = titles[pageId] || "Dashboard";
}

async function predictDemo() {
    const employeeName = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const salary = document.getElementById('salary').value;
    const experience = document.getElementById('experience').value; 

    if (!employeeName || !age || !salary || !experience) { 
        alert("Please fill all details!"); 
        return; 
    }

    const formData = {
        "Age": parseInt(age),
        "MonthlyIncome": parseFloat(salary),
        "JobSatisfaction": parseInt(document.getElementById('satisfaction').value),
        "Overtime_ yes": document.getElementById('overtime').value === "Yes" ? 1 : 0,
        "TotalWorkingYears": parseInt(experience)
    };

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.status === "success") {
            const resText = document.getElementById('resultText');
            resText.innerText = data.message;
            resText.style.color = (data.risk_level === "high") ? "#f87171" : "#4ade80";
            document.getElementById('resultDesc').innerText = "Analysis for " + employeeName + " completed.";
            updateAnalyticsChart(data.risk_level);
            showPage('prediction', document.querySelectorAll(".menu a")[2]);
        }
    } catch (e) {
        console.log("Backend offline. Running Advanced Logic...");

        // 1. Form se data uthana (Exact names matches your HTML)
        const overtime = document.querySelector('select[name="overtime"]')?.value || "No";
        const satisfaction = document.querySelector('select[name="job_satisfaction"]')?.value || "4";
        const income = parseInt(document.querySelector('input[name="monthly_income"]')?.value) || 50000;
        const name = document.querySelector('input[name="employee_name"]')?.value || "Employee";

        const resText = document.getElementById('resultText');
        const resDesc = document.getElementById('resultDesc');

        // 2. 🔥 SMART LOGIC
        let riskScore = 0;
        if (overtime === "Yes") riskScore += 50;
        if (satisfaction === "1" || satisfaction === "2" || satisfaction.includes("Low")) riskScore += 40;
        if (income < 30000) riskScore += 10;

        // 3. 🎯 RESULT DISPLAY
        if (riskScore >= 60) {
            if (resText) { resText.innerText = "Risk High: High Probability of Attrition"; resText.style.color = "#f87171"; }
            if (resDesc) { resDesc.innerText = Analysis for ${name}: High risk detected due to Overtime and Low Satisfaction.; }
        } else if (riskScore >= 40) {
            if (resText) { resText.innerText = "Risk Medium: Monitor Closely"; resText.style.color = "#fbbf24"; }
            if (resDesc) { resDesc.innerText = Analysis for ${name}: Moderate risk due to individual stress factors.; }
        } else {
            if (resText) { resText.innerText = "Risk Low: Employee is Stable"; resText.style.color = "#4ade80"; }
            if (resDesc) { resDesc.innerText = Analysis for ${name}: Employee shows high stability indicators.; }
        }

        // 4. Page Switch
        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    }
}

function updateAnalyticsChart(riskLevel) {
    riskLevel === "high" ? highRiskCount++ : lowRiskCount++;
    document.getElementById('atRiskCount').innerText = highRiskCount;
    document.getElementById('lowRiskCount').innerText = lowRiskCount;
    if (myDoughnutChart) {
        myDoughnutChart.data.datasets[0].data = [highRiskCount, 114, lowRiskCount];
        myDoughnutChart.update();
    }
}

window.onload = function() {
    const lineCtx = document.getElementById('lineChart');
    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ label: 'Risk Trend', data: [45, 52, 60, 55, 70, 78], borderColor: '#7c3aed', tension: 0.4 }] },
            options: { plugins: { legend: { labels: { color: '#fff' } } } }
        });
    }
    const doughnutCtx = document.getElementById('doughnutChart');
    if (doughnutCtx) {
        myDoughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: { labels: ['High Risk', 'Med Risk', 'Low Risk'], datasets: [{ data: [highRiskCount, 114, lowRiskCount], backgroundColor: ['#ef4444', '#f59e0b', '#22c55e'] }] },
            options: { plugins: { legend: { labels: { color: '#fff' } } } }
        });
    }
};
