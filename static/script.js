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
    } catch (e) { alert("Server Error! Check if app.py is running."); }
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
