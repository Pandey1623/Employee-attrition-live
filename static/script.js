let lowRiskCount = 256;
let myDoughnutChart;

function showPage(pageId, clickedItem) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active-page"));
    document.getElementById(pageId).classList.add("active-page");
    document.querySelectorAll(".menu a").forEach(link => link.classList.remove("active"));
    if (clickedItem) clickedItem.classList.add("active");
    const titles = { "dashboard": "Dashboard Overview", "employee-form": "Employee Form", "prediction": "Prediction Result", "analytics": "Analytics" };
    if (document.getElementById("pageTitle")) document.getElementById("pageTitle").innerText = titles[pageId] || "Dashboard";
}

async function predictDemo() {
    try {
        // 1. DATA NIKALNE KA SABSE MAJBOOT TARIKA
        const overtimeValue = document.getElementsByName("overtime")[0].value;
        const satisfactionValue = document.getElementsByName("job_satisfaction")[0].value;
        const nameValue = document.getElementsByName("employee_name")[0].value || "Employee";

        console.log("Captured Data:", overtimeValue, satisfactionValue); // Browser console mein check ke liye

        const resText = document.getElementById('resultText');
        const resDesc = document.getElementById('resultDesc');

        // 2. 🔥 NO-FAIL LOGIC
        // Humne ab har tarah ki spelling (Yes/yes) aur number (1) ko check kar liya hai
        if (overtimeValue.toLowerCase() === "yes" || satisfactionValue.includes("1") || satisfactionValue.toLowerCase().includes("low")) {
            if (resText) {
                resText.innerText = "Risk High: High Probability of Attrition";
                resText.style.color = "#f87171"; // Red
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + nameValue + " completed. High risk detected due to Overtime and Low Satisfaction.";
            }
        } else {
            if (resText) {
                resText.innerText = "Risk Low: Employee is Stable";
                resText.style.color = "#4ade80"; // Green
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + nameValue + " completed. Indicators show stability.";
            }
        }

        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    } catch (e) {
        console.log("Error:", e);
        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    }
}

window.onload = function() {
    const doughnutCtx = document.getElementById('doughnutChart');
    if (doughnutCtx) {
        myDoughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: { labels: ['High Risk', 'Med Risk', 'Low Risk'], datasets: [{ data: [highRiskCount, 114, lowRiskCount], backgroundColor: ['#ef4444', '#f59e0b', '#22c55e'] }] },
            options: { plugins: { legend: { labels: { color: '#fff' } } } }
        });
    }
};
