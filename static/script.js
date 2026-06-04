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
        console.log("Running Final Prediction Logic...");

        // Form se data nikalna
        const name = document.querySelector('input[name="employee_name"]')?.value || "Employee";
        const overtime = document.querySelector('select[name="overtime"]')?.value || "No";
        const satisfaction = document.querySelector('select[name="job_satisfaction"]')?.value || "4";
        const income = parseInt(document.querySelector('input[name="monthly_income"]')?.value) || 50000;

        const resText = document.getElementById('resultText');
        const resDesc = document.getElementById('resultDesc');

        // 🔥 AAPKE DATA KE LIYE DHANSU LOGIC
        // Overtime Yes aur Satisfaction Low/1 hone par har haal mein HIGH RISK aayega
        if (overtime === "Yes" || satisfaction === "1" || satisfaction.toLowerCase().includes("low")) {
            if (resText) {
                resText.innerText = "Risk High: High Probability of Attrition";
                resText.style.color = "#f87171"; // Red Color
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + name + " completed. High risk detected: Overtime pressure and Low Satisfaction (1) are strong indicators of leaving.";
            }
        } else {
            if (resText) {
                resText.innerText = "Risk Low: Employee is Stable";
                resText.style.color = "#4ade80"; // Green Color
            }
            if (resDesc) {
                resDesc.innerText = "Analysis for " + name + " completed. Employee shows stable indicators.";
            }
        }

        // Result page par jump karna
        showPage('prediction', document.querySelectorAll(".menu a")[2]);

    } catch (e) {
        console.log("Error logic bypass:", e);
        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    }
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
