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
        // 1. Form se live data uthana
        const overtime = document.querySelector('[name="overtime"]')?.value || "No";
        const satisfaction = document.querySelector('[name="job_satisfaction"]')?.value || "4";
        const name = document.querySelector('[name="employee_name"]')?.value || "Employee";

        const resText = document.getElementById('resultText');
        const resDesc = document.getElementById('resultDesc');

        console.log("Current Selection:", overtime, satisfaction);

        // 2. 🔥 DYNAMIC LOGIC (Jo tumne manga hai)
        
        // Agar Overtime "Yes" hai YA Satisfaction "1" (Low) hai -> HIGH RISK
        if (overtime === "Yes" || satisfaction === "1" || satisfaction.includes("Low")) {
            if (resText) {
                resText.innerText = "Risk High: High Probability of Attrition";
                resText.style.color = "#f87171"; // Red Color
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + name + " completed. High risk detected due to Overtime or Low Satisfaction.";
            }
        } 
        // Agar Overtime "No" hai aur Satisfaction "3" ya "4" hai -> LOW RISK
        else {
            if (resText) {
                resText.innerText = "Risk Low: Employee is Stable";
                resText.style.color = "#4ade80"; // Green Color
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + name + " completed. Indicators show high stability.";
            }
        }

        // Result page par jump karna
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
