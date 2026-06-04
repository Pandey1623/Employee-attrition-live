let highRiskCount = 78;
let lowRiskCount = 256;
let myDoughnutChart;

// 1. Pages ke beech mein switch karne ka function (Buttons ke liye)
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

// 2. Main Prediction Logic Function (Dono High/Low Risk aur Button Fix)
async function predictDemo() {
    try {
        console.log("Running Final Prediction Logic...");

        // Form se data nikalna (HTML inputs se connect karne ke liye)
        const name = document.querySelector('input[name="employee_name"]')?.value || "Employee";
        const overtime = document.querySelector('select[name="overtime"]')?.value || "No";
        const satisfaction = document.querySelector('select[name="job_satisfaction"]')?.value || "4";
        const income = parseInt(document.querySelector('input[name="monthly_income"]')?.value) || 50000;

        const resText = document.getElementById('resultText');
        const resDesc = document.getElementById('resultDesc');

        // 🔥 DYNAMIC HIGH & LOW RISK LOGIC (Jo bharoge, wahi sahi answer aayega)
        if (overtime === "Yes" || satisfaction === "1" || satisfaction.toLowerCase().includes("low")) {
            // CASE A: Agar Overtime 'Yes' hai YA Satisfaction 'Low/1' hai -> 100% HIGH RISK
            if (resText) {
                resText.innerText = "Risk High: High Probability of Attrition";
                resText.style.color = "#f87171"; // Ekdum Laal Danger Color
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + name + " completed. High risk detected: Overtime pressure and Low Satisfaction are strong indicators of leaving.";
            }
        } else {
            // CASE B: Agar Overtime 'No' hai aur Satisfaction achhi hai -> 100% LOW RISK
            if (resText) {
                resText.innerText = "Risk Low: Employee is Stable";
                resText.style.color = "#4ade80"; // Ekdum Hara Safe Color
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + name + " completed. Employee shows stable indicators and is likely to stay.";
            }
        }

        // 🎯 BUTTON FIX: Form submit hote ہی result waale page par le jayega
        showPage('prediction', document.querySelectorAll(".menu a")[2]);

    } catch (e) {
        console.log("Error logic bypass:", e);
        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    }
}

// 3. Page load hone par Chart banane ka sahi function (Brackets error fixed)
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
