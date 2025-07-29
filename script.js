// Budget Tool JavaScript
class BudgetTool {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadDefaultValues();
        this.calculateBudget();
        this.initializeCharts();
        this.calculateFinancialIndependence();
    }

    initializeElements() {
        // Overview elements
        this.netWorthElement = document.getElementById('netWorth');
        this.homeEquityElement = document.getElementById('homeEquity');
        this.investmentsElement = document.getElementById('investments');
        this.vehiclesElement = document.getElementById('vehicles');

        // Income elements
        this.currentSalaryInput = document.getElementById('currentSalary');
        this.investmentIncomeInput = document.getElementById('investmentIncome');
        this.otherIncomeInput = document.getElementById('otherIncome');
        this.totalIncomeElement = document.getElementById('totalIncome');

        // Fixed expenses elements
        this.mortgagePaymentInput = document.getElementById('mortgagePayment');
        this.propertyTaxInput = document.getElementById('propertyTax');
        this.homeInsuranceInput = document.getElementById('homeInsurance');
        this.electricityInput = document.getElementById('electricity');
        this.internetInput = document.getElementById('internet');
        this.cellPhoneInput = document.getElementById('cellPhone');
        this.vanParkingInput = document.getElementById('vanParking');
        this.totalFixedExpensesElement = document.getElementById('totalFixedExpenses');

        // Variable expenses elements
        this.groceriesInput = document.getElementById('groceries');
        this.diningOutInput = document.getElementById('diningOut');
        this.transportationInput = document.getElementById('transportation');
        this.entertainmentInput = document.getElementById('entertainment');
        this.healthcareInput = document.getElementById('healthcare');
        this.creditCardPaymentsInput = document.getElementById('creditCardPayments');
        this.totalVariableExpensesElement = document.getElementById('totalVariableExpenses');

        // Savings elements
        this.retirement401kInput = document.getElementById('retirement401k');
        this.iraContributionInput = document.getElementById('iraContribution');
        this.emergencyFundInput = document.getElementById('emergencyFund');
        this.brokerageInvestmentInput = document.getElementById('brokerageInvestment');
        this.totalSavingsElement = document.getElementById('totalSavings');

        // Summary elements
        this.summaryIncomeElement = document.getElementById('summaryIncome');
        this.summaryExpensesElement = document.getElementById('summaryExpenses');
        this.summarySavingsElement = document.getElementById('summarySavings');
        this.netCashFlowElement = document.getElementById('netCashFlow');

        // FI Calculator elements
        this.annualExpensesElement = document.getElementById('annualExpenses');
        this.fiTargetElement = document.getElementById('fiTarget');
        this.currentPortfolioElement = document.getElementById('currentPortfolio');
        this.yearsToFIElement = document.getElementById('yearsToFI');

        // Modal elements
        this.modal = document.getElementById('expenseModal');
        this.addExpenseBtn = document.getElementById('addExpenseBtn');
        this.closeBtn = document.querySelector('.close');
        this.expenseForm = document.getElementById('expenseForm');

        // Charts
        this.expenseChart = null;
        this.incomeExpenseChart = null;
        this.netWorthChart = null;
        this.savingsChart = null;
    }

    setupEventListeners() {
        // Budget calculation listeners
        const budgetInputs = [
            this.currentSalaryInput, this.investmentIncomeInput, this.otherIncomeInput,
            this.mortgagePaymentInput, this.propertyTaxInput, this.homeInsuranceInput,
            this.electricityInput, this.internetInput, this.cellPhoneInput, this.vanParkingInput,
            this.groceriesInput, this.diningOutInput, this.transportationInput,
            this.entertainmentInput, this.healthcareInput, this.creditCardPaymentsInput,
            this.retirement401kInput, this.iraContributionInput, this.emergencyFundInput,
            this.brokerageInvestmentInput
        ];

        budgetInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.calculateBudget();
                this.updateCharts();
                this.calculateFinancialIndependence();
            });
        });

        // Modal listeners
        this.addExpenseBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.expenseForm.addEventListener('submit', (e) => this.handleExpenseSubmit(e));

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Action items listeners
        const actionCheckboxes = document.querySelectorAll('.action-item input[type="checkbox"]');
        actionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateActionProgress());
        });
    }

    loadDefaultValues() {
        // Set default values based on Craig's profile
        this.currentSalaryInput.value = 120000; // Assuming $120K salary
        this.investmentIncomeInput.value = 2500; // Monthly dividends from $1M+ portfolio
        this.mortgagePaymentInput.value = 1500; // Estimated monthly payment
        this.propertyTaxInput.value = 800; // Monthly average
        this.homeInsuranceInput.value = 150; // Monthly premium
        this.groceriesInput.value = 600; // Monthly groceries
        this.diningOutInput.value = 400; // Monthly dining
        this.transportationInput.value = 200; // Gas and maintenance
        this.entertainmentInput.value = 300; // Entertainment budget
        this.healthcareInput.value = 200; // Healthcare costs
        this.creditCardPaymentsInput.value = 500; // Credit card payments
        this.retirement401kInput.value = 1500; // 401K contribution
        this.iraContributionInput.value = 500; // IRA contribution
        this.emergencyFundInput.value = 1000; // Emergency fund contribution
        this.brokerageInvestmentInput.value = 2000; // Additional investments

        // Update calculations
        this.calculateBudget();
    }

    calculateBudget() {
        // Calculate income
        const currentSalary = parseFloat(this.currentSalaryInput.value) || 0;
        const investmentIncome = parseFloat(this.investmentIncomeInput.value) || 0;
        const otherIncome = parseFloat(this.otherIncomeInput.value) || 0;
        const totalIncome = currentSalary + investmentIncome + otherIncome;

        // Calculate fixed expenses
        const mortgagePayment = parseFloat(this.mortgagePaymentInput.value) || 0;
        const propertyTax = parseFloat(this.propertyTaxInput.value) || 0;
        const homeInsurance = parseFloat(this.homeInsuranceInput.value) || 0;
        const electricity = parseFloat(this.electricityInput.value) || 0;
        const internet = parseFloat(this.internetInput.value) || 0;
        const cellPhone = parseFloat(this.cellPhoneInput.value) || 0;
        const vanParking = parseFloat(this.vanParkingInput.value) || 0;
        const totalFixedExpenses = mortgagePayment + propertyTax + homeInsurance + 
                                 electricity + internet + cellPhone + vanParking;

        // Calculate variable expenses
        const groceries = parseFloat(this.groceriesInput.value) || 0;
        const diningOut = parseFloat(this.diningOutInput.value) || 0;
        const transportation = parseFloat(this.transportationInput.value) || 0;
        const entertainment = parseFloat(this.entertainmentInput.value) || 0;
        const healthcare = parseFloat(this.healthcareInput.value) || 0;
        const creditCardPayments = parseFloat(this.creditCardPaymentsInput.value) || 0;
        const totalVariableExpenses = groceries + diningOut + transportation + 
                                    entertainment + healthcare + creditCardPayments;

        // Calculate savings
        const retirement401k = parseFloat(this.retirement401kInput.value) || 0;
        const iraContribution = parseFloat(this.iraContributionInput.value) || 0;
        const emergencyFund = parseFloat(this.emergencyFundInput.value) || 0;
        const brokerageInvestment = parseFloat(this.brokerageInvestmentInput.value) || 0;
        const totalSavings = retirement401k + iraContribution + emergencyFund + brokerageInvestment;

        // Calculate totals
        const totalExpenses = totalFixedExpenses + totalVariableExpenses;
        const netCashFlow = totalIncome - totalExpenses - totalSavings;

        // Update display
        this.totalIncomeElement.textContent = this.formatCurrency(totalIncome);
        this.totalFixedExpensesElement.textContent = this.formatCurrency(totalFixedExpenses);
        this.totalVariableExpensesElement.textContent = this.formatCurrency(totalVariableExpenses);
        this.totalSavingsElement.textContent = this.formatCurrency(totalSavings);
        this.summaryIncomeElement.textContent = this.formatCurrency(totalIncome);
        this.summaryExpensesElement.textContent = this.formatCurrency(totalExpenses);
        this.summarySavingsElement.textContent = this.formatCurrency(totalSavings);
        this.netCashFlowElement.textContent = this.formatCurrency(netCashFlow);

        // Update net cash flow color
        this.netCashFlowElement.className = netCashFlow >= 0 ? 'positive' : 'negative';
    }

    calculateFinancialIndependence() {
        const totalExpenses = parseFloat(this.summaryExpensesElement.textContent.replace(/[$,]/g, '')) || 0;
        const annualExpenses = totalExpenses * 12;
        const fiTarget = annualExpenses * 25; // 4% rule
        const currentPortfolio = 1020000; // $1.02M total investments
        const monthlySavings = parseFloat(this.totalSavingsElement.textContent.replace(/[$,]/g, '')) || 0;
        const annualSavings = monthlySavings * 12;

        // Calculate years to FI using the 4% rule
        let yearsToFI = 0;
        let projectedPortfolio = currentPortfolio;
        
        while (projectedPortfolio < fiTarget && yearsToFI < 50) {
            projectedPortfolio += annualSavings;
            projectedPortfolio *= 1.07; // 7% annual return
            yearsToFI++;
        }

        // Update display
        this.annualExpensesElement.textContent = this.formatCurrency(annualExpenses);
        this.fiTargetElement.textContent = this.formatCurrency(fiTarget);
        this.currentPortfolioElement.textContent = this.formatCurrency(currentPortfolio);
        this.yearsToFIElement.textContent = yearsToFI === 0 ? 'Already FI!' : `${yearsToFI} years`;
    }

    initializeCharts() {
        this.createExpenseChart();
        this.createIncomeExpenseChart();
        this.createNetWorthChart();
        this.createSavingsChart();
    }

    createExpenseChart() {
        const ctx = document.getElementById('expenseChart').getContext('2d');
        this.expenseChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Fixed Expenses', 'Variable Expenses', 'Savings'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    createIncomeExpenseChart() {
        const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
        this.incomeExpenseChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expenses', 'Savings'],
                datasets: [{
                    label: 'Monthly Amount',
                    data: [0, 0, 0],
                    backgroundColor: [
                        '#48bb78',
                        '#f56565',
                        '#4299e1'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    createNetWorthChart() {
        const ctx = document.getElementById('netWorthChart').getContext('2d');
        this.netWorthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Current', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years'],
                datasets: [{
                    label: 'Net Worth Projection',
                    data: [1020000, 1100000, 1180000, 1260000, 1340000, 1420000],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    createSavingsChart() {
        const ctx = document.getElementById('savingsChart').getContext('2d');
        this.savingsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['401K', 'IRA', 'Emergency Fund', 'Brokerage', 'Real Estate'],
                datasets: [{
                    label: 'Current Allocation',
                    data: [350000, 450000, 50000, 220000, 580000],
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderColor: '#667eea',
                    borderWidth: 2,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    updateCharts() {
        // Update expense chart
        const totalFixed = parseFloat(this.totalFixedExpensesElement.textContent.replace(/[$,]/g, '')) || 0;
        const totalVariable = parseFloat(this.totalVariableExpensesElement.textContent.replace(/[$,]/g, '')) || 0;
        const totalSavings = parseFloat(this.totalSavingsElement.textContent.replace(/[$,]/g, '')) || 0;
        const totalIncome = parseFloat(this.totalIncomeElement.textContent.replace(/[$,]/g, '')) || 0;

        if (this.expenseChart) {
            this.expenseChart.data.datasets[0].data = [totalFixed, totalVariable, totalSavings];
            this.expenseChart.update();
        }

        if (this.incomeExpenseChart) {
            this.incomeExpenseChart.data.datasets[0].data = [totalIncome, totalFixed + totalVariable, totalSavings];
            this.incomeExpenseChart.update();
        }
    }

    openModal() {
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.expenseForm.reset();
    }

    handleExpenseSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('expenseName').value;
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;

        // Add the expense to the appropriate category
        this.addCustomExpense(name, amount, category);
        
        this.closeModal();
        this.calculateBudget();
        this.updateCharts();
    }

    addCustomExpense(name, amount, category) {
        // Create a new input field for the custom expense
        const container = document.querySelector(`.budget-card:has(h3:contains("${category === 'fixed' ? 'Fixed' : category === 'variable' ? 'Variable' : 'Savings'}"))`);
        
        if (container) {
            const budgetItems = container.querySelector('.budget-total');
            const newItem = document.createElement('div');
            newItem.className = 'budget-item';
            newItem.innerHTML = `
                <span>${name}</span>
                <input type="number" value="${amount}" placeholder="Amount" onchange="budgetTool.calculateBudget()">
            `;
            
            budgetItems.parentNode.insertBefore(newItem, budgetItems);
        }
    }

    updateActionProgress() {
        const checkboxes = document.querySelectorAll('.action-item input[type="checkbox"]');
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalCount = checkboxes.length;
        const progress = (checkedCount / totalCount) * 100;

        // You could add a progress bar or update some UI element here
        console.log(`Action progress: ${progress}% (${checkedCount}/${totalCount})`);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}

// Initialize the budget tool when the page loads
let budgetTool;
document.addEventListener('DOMContentLoaded', () => {
    budgetTool = new BudgetTool();
});

// Add some utility functions for better user experience
function addNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    if (type === 'success') {
        notification.style.background = '#48bb78';
    } else if (type === 'error') {
        notification.style.background = '#f56565';
    } else {
        notification.style.background = '#4299e1';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                addNotification('Budget saved!', 'success');
                break;
            case 'r':
                e.preventDefault();
                budgetTool.loadDefaultValues();
                addNotification('Budget reset to defaults', 'info');
                break;
        }
    }
});

// Add data export functionality
function exportBudgetData() {
    const data = {
        income: {
            currentSalary: budgetTool.currentSalaryInput.value,
            investmentIncome: budgetTool.investmentIncomeInput.value,
            otherIncome: budgetTool.otherIncomeInput.value
        },
        fixedExpenses: {
            mortgagePayment: budgetTool.mortgagePaymentInput.value,
            propertyTax: budgetTool.propertyTaxInput.value,
            homeInsurance: budgetTool.homeInsuranceInput.value,
            electricity: budgetTool.electricityInput.value,
            internet: budgetTool.internetInput.value,
            cellPhone: budgetTool.cellPhoneInput.value,
            vanParking: budgetTool.vanParkingInput.value
        },
        variableExpenses: {
            groceries: budgetTool.groceriesInput.value,
            diningOut: budgetTool.diningOutInput.value,
            transportation: budgetTool.transportationInput.value,
            entertainment: budgetTool.entertainmentInput.value,
            healthcare: budgetTool.healthcareInput.value,
            creditCardPayments: budgetTool.creditCardPaymentsInput.value
        },
        savings: {
            retirement401k: budgetTool.retirement401kInput.value,
            iraContribution: budgetTool.iraContributionInput.value,
            emergencyFund: budgetTool.emergencyFundInput.value,
            brokerageInvestment: budgetTool.brokerageInvestmentInput.value
        },
        summary: {
            totalIncome: budgetTool.totalIncomeElement.textContent,
            totalExpenses: budgetTool.summaryExpensesElement.textContent,
            totalSavings: budgetTool.summarySavingsElement.textContent,
            netCashFlow: budgetTool.netCashFlowElement.textContent
        }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'budget-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    addNotification('Budget data exported successfully!', 'success');
}

// Add the export function to the global scope
window.exportBudgetData = exportBudgetData; 