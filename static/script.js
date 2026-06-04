let highRiskCount = 78;
let lowRiskCount = 256;
let myDoughnutChart;

// 1. Page change karne ka function
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

// 2. Main Logic: Jo High Risk aur Low Risk dono dikhayega
async function predictDemo() {
    try {
        console.log("Prediction logic running...");

        // Form se data nikalna
        const name = document.querySelector('[name="employee_name"]')?.value || "Employee";
        const overtime = document.querySelector('[name="overtime"]')?.value || "No";
        const satisfaction = document.querySelector('[name="job_satisfaction"]')?.value || "4";

        const resText = document.getElementById('resultText');
        const resDesc = document.getElementById('resultDesc');

        // 🔥 DONO CASE FIX: High Risk aur Low Risk
        if (overtime === "Yes" || overtime === "yes" || satisfaction === "1" || satisfaction.toLowerCase().includes("low") || satisfaction.includes("1")) {
            // CASE 1: HIGH RISK
            if (resText) {
                resText.innerText = "Risk High: High Probability of Attrition";
                resText.style.color = "#f87171"; // Red
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + name + " completed. Warning: High risk detected due to Overtime and Low Job Satisfaction.";
            }
        } else {
            // CASE 2: LOW RISK
            if (resText) {
                resText.innerText = "Risk Low: Employee is Stable";
                resText.style.color = "#4ade80"; // Green
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + name + " completed. Indicators show that the employee is likely to stay.";
            }
        }

        // Result page par le jao
        showPage('prediction', document.querySelectorAll(".menu a")[2]);

    } catch (e) {
        console.log("Error:", e);
        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    }
}

// 3. Chart setup
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
