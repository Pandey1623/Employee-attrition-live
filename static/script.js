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
    try {
        console.log("Simulating Employee Attrition Logic...");

        // 1. Form se data nikalna
        const name = document.querySelector('input[name="employee_name"]')?.value || "Employee";
        const overtime = document.querySelector('select[name="overtime"]')?.value || "No";
        const satisfaction = document.querySelector('select[name="job_satisfaction"]')?.value || "4";
        const income = parseInt(document.querySelector('input[name="monthly_income"]')?.value) || 50000;

        const resText = document.getElementById('resultText');
        const resDesc = document.getElementById('resultDesc');

        // 2. 🔥 SMART LOGIC: Ram jaise cases ke liye
        let riskScore = 0;
        if (overtime === "Yes") riskScore += 50; 
        if (satisfaction === "1" || satisfaction.includes("Low")) riskScore += 40; 
        if (income < 30000) riskScore += 10; 

        // 3. 🎯 RESULT UPDATER
        if (riskScore >= 60) {
            if (resText) { 
                resText.innerText = "Risk High: High Probability of Attrition"; 
                resText.style.color = "#f87171"; 
            }
            if (resDesc) { 
                resDesc.innerText = "Analysis for " + name + " completed. High risk detected due to work pressure and low job satisfaction."; 
            }
        } else {
            if (resText) { 
                resText.innerText = "Risk Low: Employee is Stable"; 
                resText.style.color = "#4ade80"; 
            }
            if (resDesc) { 
                resDesc.innerText = "Analysis for " + name + " completed. The employee shows stable indicators."; 
            }
        }

        // 4. Page change
        showPage('prediction', document.querySelectorAll(".menu a")[2]);

    } catch (e) {
        console.log("System Error:", e);
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
