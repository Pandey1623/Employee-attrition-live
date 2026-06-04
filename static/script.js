let highRiskCount = 78;
let lowRiskCount = 256;
let myDoughnutChart;

function showPage(pageId, clickedItem) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active-page"));
    document.getElementById(pageId).classList.add("active-page");
    document.querySelectorAll(".menu a").forEach(link => link.classList.remove("active"));
    if (clickedItem) clickedItem.classList.add("active");
    
    const titles = { 
        "dashboard": "Dashboard Overview", 
        "employee-form": "Employee Form", 
        "prediction": "Prediction Result", 
        "analytics": "Analytics" 
    };
    const titleElement = document.getElementById("pageTitle");
    if (titleElement) titleElement.innerText = titles[pageId] || "Dashboard";
}

async function predictDemo() {
    try {
        // Tumhari HTML ki IDs (name, overtime, satisfaction) se data uthana
        const nameValue = document.getElementById("name")?.value || "Employee";
        const overtimeValue = document.getElementById("overtime")?.value || "No";
        const satisfactionValue = document.getElementById("satisfaction")?.value || "4";

        const resText = document.getElementById('resultText');
        const resDesc = document.getElementById('resultDesc');

        // 🔥 DYNAMIC LOGIC (Dono case chalenge)
        if (overtimeValue === "Yes" || satisfactionValue === "1") {
            // CASE 1: HIGH RISK
            if (resText) {
                resText.innerText = "Risk High: High Probability of Attrition";
                resText.style.color = "#f87171"; 
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + nameValue + " completed. Warning: High risk detected due to Overtime and Low Job Satisfaction.";
            }
        } else {
            // CASE 2: LOW RISK
            if (resText) {
                resText.innerText = "Risk Low: Employee is Stable";
                resText.style.color = "#4ade80"; 
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + nameValue + " completed. Indicators show high stability.";
            }
        }

        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    } catch (e) {
        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    }
}

window.onload = function() {
    const doughnutCtx = document.getElementById('doughnutChart');
    if (doughnutCtx) {
        myDoughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: { 
                labels: ['High Risk', 'Med Risk', 'Low Risk'], 
                datasets: [{ 
                    data: [highRiskCount, 114, lowRiskCount], 
                    backgroundColor: ['#ef4444', '#f59e0b', '#22c55e'] 
                }] 
            },
            options: { plugins: { legend: { labels: { color: '#fff' } } } }
        });
    }
};
