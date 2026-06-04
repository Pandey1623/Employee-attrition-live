let highRiskCount = 78;
let lowRiskCount = 256;
let myDoughnutChart;

// 1. Sidebar Buttons Logic
function showPage(pageId, clickedItem) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active-page"));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add("active-page");
    
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

// 2. Prediction Logic (Jo "No Prediction" fix karta hai)
async function predictDemo() {
    try {
        const nameValue = document.getElementById("name")?.value || "Employee";
        const overtimeValue = document.getElementById("overtime")?.value || "No";
        const satisfactionValue = document.getElementById("satisfaction")?.value || "4";

        const resText = document.getElementById('resultText');
        const resDesc = document.getElementById('resultDesc');

        if (resText) {
            if (overtimeValue === "Yes" || satisfactionValue === "1") {
                resText.innerText = "Risk High: Employee might leave";
                resText.style.color = "#f87171"; 
                resDesc.innerText = "Analysis for " + nameValue + " completed. High risk detected due to Overtime or Low Satisfaction.";
            } else {
                resText.innerText = "Risk Low: Employee will stay";
                resText.style.color = "#4ade80"; 
                resDesc.innerText = "Analysis for " + nameValue + " completed. Indicators show high stability.";
            }
        }
        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    } catch (e) {
        showPage('prediction', document.querySelectorAll(".menu a")[2]);
    }
}

// 3. 📈 ANALYTICS CHARTS (Isse khali part bhar jayega)
window.onload = function() {
    // A. Risk Trend (Line Chart)
    const lineCtx = document.getElementById('lineChart');
    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{ 
                    label: 'Risk Trend', 
                    data: [45, 52, 60, 48, 55, 42], 
                    borderColor: '#38bdf8', 
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(56, 189, 248, 0.1)'
                }]
            },
            options: { 
                responsive: true,
                plugins: { legend: { labels: { color: '#fff' } } },
                scales: {
                    y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
                    x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    // B. Risk Distribution (Doughnut Chart)
    const doughnutCtx = document.getElementById('doughnutChart');
    if (doughnutCtx) {
        myDoughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: { 
                labels: ['High Risk', 'Med Risk', 'Low Risk'], 
                datasets: [{ 
                    data: [highRiskCount, 114, lowRiskCount], 
                    backgroundColor: ['#ef4444', '#f59e0b', '#22c55e'],
                    borderWidth: 0
                }] 
            },
            options: { 
                responsive: true,
                plugins: { legend: { labels: { color: '#fff' } } } 
            }
        });
    }
  
};
