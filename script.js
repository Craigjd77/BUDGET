// Budget Tool JavaScript
class BudgetTool {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadDefaultValues();
        this.updateOverviewCards();
        this.updatePortfolioTotal(); // Initialize portfolio total
        this.calculateBudget();
        this.initializeCharts();
        this.updateCharts(); // Update charts with initial data
        this.calculateFinancialIndependence();
    }

    initializeElements() {
        // Overview elements
        this.netWorthElement = document.getElementById('netWorth');
        this.homeEquityElement = document.getElementById('homeEquity');
        this.investmentsElement = document.getElementById('investments');
        this.vehiclesElement = document.getElementById('vehicles');

        // Income elements
        this.grossSalaryInput = document.getElementById('grossSalary');
        this.netSalaryInput = document.getElementById('netSalary');
        this.investmentIncomeInput = document.getElementById('investmentIncome');
        this.otherIncomeInput = document.getElementById('otherIncome');
        this.commissionsInput = document.getElementById('commissions');
        this.totalIncomeElement = document.getElementById('totalIncome');

        // Home equity elements
        this.homeValueInput = document.getElementById('homeValue');
        this.mortgagePrincipalInput = document.getElementById('mortgagePrincipal');
        this.calculatedHomeEquityElement = document.getElementById('calculatedHomeEquity');

        // Fixed expenses elements
        this.mortgagePaymentInput = document.getElementById('mortgagePayment');
        this.propertyTaxInput = document.getElementById('propertyTax');
        this.homeInsuranceInput = document.getElementById('homeInsurance');
        this.electricityInput = document.getElementById('electricity');
        this.internetInput = document.getElementById('internet');
        this.cellPhoneInput = document.getElementById('cellPhone');
        this.vanParkingInput = document.getElementById('vanParking');
        this.youtubePremiumInput = document.getElementById('youtubePremium');
        this.siriusXmInput = document.getElementById('siriusXm');
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
        this.grossSalaryDisplay = document.getElementById('grossSalaryDisplay');
        this.netSalaryDisplay = document.getElementById('netSalaryDisplay');
        


        // FI Calculator elements
        this.annualExpensesElement = document.getElementById('annualExpenses');
        this.annualExpensesDisplay = document.getElementById('annualExpensesDisplay');
        this.fiTargetElement = document.getElementById('fiTarget');
        this.currentPortfolioElement = document.getElementById('currentPortfolio');
        this.portfolioGapElement = document.getElementById('portfolioGap');
        this.yearsToFIElement = document.getElementById('yearsToFI');
        this.monthlyPortfolioIncomeElement = document.getElementById('monthlyPortfolioIncome');

        // Modal elements
        this.modal = document.getElementById('expenseModal');
        this.addExpenseBtn = document.getElementById('addExpenseBtn');
        this.closeBtn = document.querySelector('.close');
        this.expenseForm = document.getElementById('expenseForm');
        this.exportReportBtn = document.getElementById('exportReportBtn');

        // Charts
        this.expenseChart = null;
        this.incomeExpenseChart = null;
        this.netWorthChart = null;
        this.savingsChart = null;

        // Portfolio elements
        this.fidelity401kInput = document.getElementById('fidelity401k');
        this.goldmanIraInput = document.getElementById('goldmanIra');
        this.goldmanBrokerageInput = document.getElementById('goldmanBrokerage');
        this.schwabRothInput = document.getElementById('schwabRoth');
        this.schwabBrokerageInput = document.getElementById('schwabBrokerage');
        this.cryptoCoinbaseInput = document.getElementById('cryptoCoinbase');
    }

    setupEventListeners() {
        // Budget calculation listeners
        const budgetInputs = [
            this.grossSalaryInput, this.netSalaryInput, this.investmentIncomeInput, this.otherIncomeInput, this.commissionsInput,
            this.mortgagePaymentInput, this.propertyTaxInput, this.homeInsuranceInput,
            this.electricityInput, this.internetInput, this.cellPhoneInput, this.vanParkingInput,
            this.youtubePremiumInput, this.siriusXmInput,
            this.groceriesInput, this.diningOutInput, this.transportationInput,
            this.entertainmentInput, this.healthcareInput, this.creditCardPaymentsInput,
            this.retirement401kInput, this.iraContributionInput, this.emergencyFundInput,
            this.brokerageInvestmentInput, this.homeValueInput, this.mortgagePrincipalInput
        ];

        const portfolioInputs = [
            this.fidelity401kInput, this.goldmanIraInput, this.goldmanBrokerageInput,
            this.schwabRothInput, this.schwabBrokerageInput, this.cryptoCoinbaseInput
        ];

        budgetInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.calculateBudget();
                this.updateCharts();
                this.calculateFinancialIndependence();
            });
        });

        portfolioInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updatePortfolioTotal();
                this.updateCharts();
                this.calculateFinancialIndependence();
            });
        });

        // Modal listeners
        this.addExpenseBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.expenseForm.addEventListener('submit', (e) => this.handleExpenseSubmit(e));
        this.exportReportBtn.addEventListener('click', () => this.exportReport());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

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
        // Set default values based on Craig's current profile from screenshot
        this.grossSalaryInput.value = 130000; // Annual gross salary - $130,000
        this.netSalaryInput.value = 7630; // Monthly net salary after MA taxes
        this.investmentIncomeInput.value = 0; // No investment income currently
        this.otherIncomeInput.value = 0; // No other income sources
        this.commissionsInput.value = 0; // No commission income currently
        this.mortgagePaymentInput.value = 2650; // Monthly payment (includes property tax)
        this.propertyTaxInput.value = 0; // Property tax included in mortgage payment
        this.homeInsuranceInput.value = 150; // Monthly premium
        this.electricityInput.value = 250; // Monthly average
        this.internetInput.value = 79; // Monthly bill
        this.cellPhoneInput.value = 80; // Monthly bill
        this.vanParkingInput.value = 140; // Monthly fee
        this.groceriesInput.value = 600; // Monthly groceries
        this.diningOutInput.value = 400; // Monthly dining
        this.transportationInput.value = 200; // Gas and maintenance
        this.entertainmentInput.value = 300; // Entertainment budget
        this.healthcareInput.value = 200; // Healthcare costs
        this.creditCardPaymentsInput.value = 500; // Credit card payments
        this.retirement401kInput.value = 8; // 401K contribution - 8% of bi-weekly paycheck
        this.iraContributionInput.value = 583; // IRA contribution - maxed at $7,000 annually ($583/month)
        this.emergencyFundInput.value = 1000; // Rolled coins savings
        this.brokerageInvestmentInput.value = 2000; // Additional investments

        // Update calculations
        this.calculateBudget();
    }

    updateOverviewCards() {
        // Calculate current values dynamically
        const homeEquity = parseFloat(this.homeEquityElement.textContent.replace(/[$,]/g, '')) || 0;
        const investments = parseFloat(this.investmentsElement.textContent.replace(/[$,]/g, '')) || 0;
        const vehicles = parseFloat(this.vehiclesElement.textContent.replace(/[$,]/g, '')) || 0;
        const netWorth = homeEquity + investments + vehicles;
        
        // Update with current calculated values
        this.animateValueChange(this.netWorthElement, netWorth);
        this.animateValueChange(this.homeEquityElement, homeEquity);
        this.animateValueChange(this.investmentsElement, investments);
        this.animateValueChange(this.vehiclesElement, vehicles);
    }

    updateCareerTransitionPlanning() {
        // Get current values
        const totalExpenses = parseFloat(this.summaryExpensesElement.textContent.replace(/[$,]/g, '')) || 0;
        const totalIncome = parseFloat(this.totalIncomeElement.textContent.replace(/[$,]/g, '')) || 0;
        const currentPortfolio = parseFloat(this.investmentsElement.textContent.replace(/[$,]/g, '')) || 0;
        const emergencyFund = parseFloat(this.emergencyFundInput.value) || 0;
        
        // Calculate emergency fund targets
        const emergencyFund6Months = totalExpenses * 6;
        const emergencyFund12Months = totalExpenses * 12;
        const emergencyFundGap = emergencyFund12Months - emergencyFund;
        
        // Calculate portfolio income (4% rule)
        const portfolioMonthlyIncome = (currentPortfolio * 0.04) / 12;
        const incomeGap = totalIncome - portfolioMonthlyIncome;
        const portfolioCoverage = totalIncome > 0 ? (portfolioMonthlyIncome / totalIncome) * 100 : 0;
        
        // Update display elements
        const currentMonthlyExpenses = document.getElementById('currentMonthlyExpenses');
        const emergencyFund6MonthsElement = document.getElementById('emergencyFund6Months');
        const emergencyFund12MonthsElement = document.getElementById('emergencyFund12Months');
        const currentEmergencyFundElement = document.getElementById('currentEmergencyFund');
        const emergencyFundGapElement = document.getElementById('emergencyFundGap');
        const currentMonthlyIncomeElement = document.getElementById('currentMonthlyIncome');
        const portfolioMonthlyIncomeElement = document.getElementById('portfolioMonthlyIncome');
        const incomeGapElement = document.getElementById('incomeGap');
        const portfolioCoverageElement = document.getElementById('portfolioCoverage');
        const additionalIncomeNeededElement = document.getElementById('additionalIncomeNeeded');
        
        if (currentMonthlyExpenses) this.animateValueChange(currentMonthlyExpenses, totalExpenses);
        if (emergencyFund6MonthsElement) this.animateValueChange(emergencyFund6MonthsElement, emergencyFund6Months);
        if (emergencyFund12MonthsElement) this.animateValueChange(emergencyFund12MonthsElement, emergencyFund12Months);
        if (currentEmergencyFundElement) this.animateValueChange(currentEmergencyFundElement, emergencyFund);
        if (emergencyFundGapElement) this.animateValueChange(emergencyFundGapElement, emergencyFundGap);
        if (currentMonthlyIncomeElement) this.animateValueChange(currentMonthlyIncomeElement, totalIncome);
        if (portfolioMonthlyIncomeElement) this.animateValueChange(portfolioMonthlyIncomeElement, portfolioMonthlyIncome);
        if (incomeGapElement) this.animateValueChange(incomeGapElement, incomeGap);
        if (portfolioCoverageElement) portfolioCoverageElement.textContent = `${portfolioCoverage.toFixed(0)}%`;
        if (additionalIncomeNeededElement) additionalIncomeNeededElement.textContent = this.formatCurrency(incomeGap);
    }

    calculateBudget() {
        // Calculate income
        const grossSalary = parseFloat(this.grossSalaryInput.value) || 0;
        const netSalary = parseFloat(this.netSalaryInput.value) || 0;
        const investmentIncome = parseFloat(this.investmentIncomeInput.value) || 0;
        const otherIncome = parseFloat(this.otherIncomeInput.value) || 0;
        const commissions = parseFloat(this.commissionsInput.value) || 0;
        const totalIncome = netSalary + investmentIncome + otherIncome + commissions; // Use net salary for cash flow

        // Calculate fixed expenses
        const mortgagePayment = parseFloat(this.mortgagePaymentInput.value) || 0;
        const propertyTax = parseFloat(this.propertyTaxInput.value) || 0;
        const homeInsurance = parseFloat(this.homeInsuranceInput.value) || 0;
        const electricity = parseFloat(this.electricityInput.value) || 0;
        const internet = parseFloat(this.internetInput.value) || 0;
        const cellPhone = parseFloat(this.cellPhoneInput.value) || 0;
        const vanParking = parseFloat(this.vanParkingInput.value) || 0;
        const youtubePremium = parseFloat(this.youtubePremiumInput.value) || 0;
        const siriusXm = parseFloat(this.siriusXmInput.value) || 0;
        
        // Calculate fixed expenses - just use the standard inputs for now
        const totalFixedExpenses = mortgagePayment + propertyTax + homeInsurance + 
                                 electricity + internet + cellPhone + vanParking + youtubePremium + siriusXm;

        // Calculate variable expenses
        const groceries = parseFloat(this.groceriesInput.value) || 0;
        const diningOut = parseFloat(this.diningOutInput.value) || 0;
        const transportation = parseFloat(this.transportationInput.value) || 0;
        const entertainment = parseFloat(this.entertainmentInput.value) || 0;
        const healthcare = parseFloat(this.healthcareInput.value) || 0;
        const creditCardPayments = parseFloat(this.creditCardPaymentsInput.value) || 0;
        
        // Calculate variable expenses - just use the standard inputs for now
        const totalVariableExpenses = groceries + diningOut + transportation + 
                                    entertainment + healthcare + creditCardPayments;

        // Calculate savings
        const retirement401kPercentage = parseFloat(this.retirement401kInput.value) || 0;
        const biWeeklyPaycheck = grossSalary / 26; // 26 pay periods per year - use gross for 401K calculation
        const retirement401k = (biWeeklyPaycheck * retirement401kPercentage) / 100; // Calculate as percentage of bi-weekly paycheck
        const iraContribution = parseFloat(this.iraContributionInput.value) || 0; // Back to dollar amount
        const emergencyFund = parseFloat(this.emergencyFundInput.value) || 0;
        const brokerageInvestment = parseFloat(this.brokerageInvestmentInput.value) || 0;
        
        // Calculate savings - just use the standard inputs for now
        const totalSavings = retirement401k + iraContribution + emergencyFund + brokerageInvestment;

        // Calculate totals
        const totalExpenses = totalFixedExpenses + totalVariableExpenses;
        const netCashFlow = totalIncome - totalExpenses - totalSavings;

        // Update display with animation
        this.animateValueChange(this.totalIncomeElement, totalIncome);
        this.animateValueChange(this.totalFixedExpensesElement, totalFixedExpenses);
        this.animateValueChange(this.totalVariableExpensesElement, totalVariableExpenses);
        this.animateValueChange(this.totalSavingsElement, totalSavings);
        this.animateValueChange(this.summaryIncomeElement, totalIncome);
        this.animateValueChange(this.summaryExpensesElement, totalExpenses);
        this.animateValueChange(this.summarySavingsElement, totalSavings);
        this.animateValueChange(this.netCashFlowElement, netCashFlow);
        
        // Update salary displays
        this.grossSalaryDisplay.textContent = this.formatCurrency(grossSalary);
        this.netSalaryDisplay.textContent = this.formatCurrency(netSalary);

        // Update net cash flow color and add visual feedback
        this.netCashFlowElement.className = netCashFlow >= 0 ? 'positive' : 'negative';
        

        this.netCashFlowElement.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            this.netCashFlowElement.style.animation = '';
        }, 600);
        
        // Calculate home equity
        this.calculateHomeEquity();
        
        // Update all related components
        this.updateCharts();
        this.calculateFinancialIndependence();
        this.updateActionProgress();
        
        // Update overview cards to reflect current values
        this.updateOverviewCards();
        
        // Update career transition planning
        this.updateCareerTransitionPlanning();
    }

    calculateHomeEquity() {
        const homeValue = parseFloat(this.homeValueInput.value) || 0;
        const mortgagePrincipal = parseFloat(this.mortgagePrincipalInput.value) || 0;
        const homeEquity = homeValue - mortgagePrincipal;
        
        this.animateValueChange(this.calculatedHomeEquityElement, homeEquity);
        this.animateValueChange(this.homeEquityElement, homeEquity);
        
        // Update net worth calculation
        this.updateNetWorth();
    }

    updateNetWorth() {
        const homeEquity = parseFloat(this.homeEquityElement.textContent.replace(/[$,]/g, '')) || 0;
        const investments = parseFloat(this.investmentsElement.textContent.replace(/[$,]/g, '')) || 0;
        const vehicles = parseFloat(this.vehiclesElement.textContent.replace(/[$,]/g, '')) || 0;
        const netWorth = homeEquity + investments + vehicles;
        
        this.animateValueChange(this.netWorthElement, netWorth);
    }



    updatePortfolioTotal() {
        const fidelity401k = parseFloat(this.fidelity401kInput.value) || 0;
        const goldmanIra = parseFloat(this.goldmanIraInput.value) || 0;
        const goldmanBrokerage = parseFloat(this.goldmanBrokerageInput.value) || 0;
        const schwabRoth = parseFloat(this.schwabRothInput.value) || 0;
        const schwabBrokerage = parseFloat(this.schwabBrokerageInput.value) || 0;
        const cryptoCoinbase = parseFloat(this.cryptoCoinbaseInput.value) || 0;
        
        const totalPortfolio = fidelity401k + goldmanIra + goldmanBrokerage + schwabRoth + schwabBrokerage + cryptoCoinbase;
        
        // Update the investments element in the overview section
        this.animateValueChange(this.investmentsElement, totalPortfolio);
        
        // Update the detailed breakdown text in the overview card
        const investmentsCard = this.investmentsElement.closest('.overview-card');
        if (investmentsCard) {
            const changeElement = investmentsCard.querySelector('.change');
            if (changeElement) {
                changeElement.textContent = `401K (Fidelity): $${(fidelity401k/1000).toFixed(0)}K | IRA (Goldman): $${(goldmanIra/1000).toFixed(0)}K | Brokerage (Goldman): $${(goldmanBrokerage/1000).toFixed(0)}K | Roth IRA (Schwab): $${(schwabRoth/1000).toFixed(0)}K | Brokerage (Schwab): $${(schwabBrokerage/1000).toFixed(0)}K | Crypto (Coinbase): $${(cryptoCoinbase/1000).toFixed(0)}K`;
            }
        }
        
        // Update net worth calculation
        this.updateNetWorth();
        
        // Update overview cards
        this.updateOverviewCards();
    }

    animateValueChange(element, newValue) {
        if (!element) return;
        
        const oldValue = parseFloat(element.textContent.replace(/[$,]/g, '')) || 0;
        const difference = newValue - oldValue;
        
        // Add visual feedback for changes
        if (Math.abs(difference) > 0) {
            element.style.animation = 'valueUpdate 0.6s ease-in-out';
            setTimeout(() => {
                element.style.animation = '';
            }, 600);
        }
        
        element.textContent = this.formatCurrency(newValue);
    }

    calculateFinancialIndependence() {
        const totalExpenses = parseFloat(this.summaryExpensesElement.textContent.replace(/[$,]/g, '')) || 0;
        const annualExpenses = totalExpenses * 12;
        const fiTarget = annualExpenses * 25; // 4% rule
        const currentPortfolio = parseFloat(this.investmentsElement.textContent.replace(/[$,]/g, '')) || 0;
        const monthlySavings = parseFloat(this.totalSavingsElement.textContent.replace(/[$,]/g, '')) || 0;
        const annualSavings = monthlySavings * 12;

        // Calculate portfolio gap
        const portfolioGap = Math.max(0, fiTarget - currentPortfolio);
        
        // Calculate monthly portfolio income (4% rule)
        const monthlyPortfolioIncome = (currentPortfolio * 0.04) / 12;

        // Calculate years to FI using the 4% rule
        let yearsToFI = 0;
        let projectedPortfolio = currentPortfolio;
        
        while (projectedPortfolio < fiTarget && yearsToFI < 50) {
            projectedPortfolio += annualSavings;
            projectedPortfolio *= 1.07; // 7% annual return
            yearsToFI++;
        }

        // Update display
        this.annualExpensesElement.textContent = this.formatCurrency(totalExpenses);
        this.annualExpensesDisplay.textContent = this.formatCurrency(annualExpenses);
        this.fiTargetElement.textContent = this.formatCurrency(fiTarget);
        this.currentPortfolioElement.textContent = this.formatCurrency(currentPortfolio);
        this.portfolioGapElement.textContent = this.formatCurrency(portfolioGap);
        this.monthlyPortfolioIncomeElement.textContent = this.formatCurrency(monthlyPortfolioIncome);
        this.yearsToFIElement.textContent = yearsToFI === 0 ? 'Already FI!' : `${yearsToFI} years`;
    }

    initializeCharts() {
        this.createFITimelineChart();
        this.createPortfolioAllocationChart();
    }



    createFITimelineChart() {
        const ctx = document.getElementById('fiTimelineChart').getContext('2d');
        this.fiTimelineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Current', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years'],
                datasets: [{
                    label: 'Portfolio Value',
                    data: [1205794, 1350000, 1500000, 1650000, 1800000, 1950000],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'FI Target (4% Rule)',
                    data: [1664700, 1664700, 1664700, 1664700, 1664700, 1664700],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            font: { size: 11 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            },
                            color: '#ffffff'
                        },
                        grid: {
                            color: '#4a5568'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: '#4a5568'
                        }
                    }
                }
            }
        });
    }



    createPortfolioAllocationChart() {
        const ctx = document.getElementById('portfolioAllocationChart').getContext('2d');
        this.portfolioAllocationChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Fidelity 401K', 'Goldman IRA', 'Goldman Brokerage', 'Schwab Roth', 'Schwab Brokerage', 'Crypto'],
                datasets: [{
                    data: [350000, 510172, 308103, 6000, 23000, 16000],
                    backgroundColor: [
                        '#3b82f6', // Blue for 401K
                        '#10b981', // Green for IRA
                        '#f59e0b', // Orange for brokerage
                        '#8b5cf6', // Purple for Roth
                        '#ef4444', // Red for Schwab brokerage
                        '#6b7280'  // Gray for crypto
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
                            padding: 15,
                            usePointStyle: true,
                            color: '#ffffff',
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    updateCharts() {
        // Update Portfolio Allocation Chart
        if (this.portfolioAllocationChart) {
            const fidelity401k = parseFloat(this.fidelity401kInput.value) || 0;
            const goldmanIra = parseFloat(this.goldmanIraInput.value) || 0;
            const goldmanBrokerage = parseFloat(this.goldmanBrokerageInput.value) || 0;
            const schwabRoth = parseFloat(this.schwabRothInput.value) || 0;
            const schwabBrokerage = parseFloat(this.schwabBrokerageInput.value) || 0;
            const crypto = parseFloat(this.cryptoCoinbaseInput.value) || 0;
            
            this.portfolioAllocationChart.data.datasets[0].data = [fidelity401k, goldmanIra, goldmanBrokerage, schwabRoth, schwabBrokerage, crypto];
            this.portfolioAllocationChart.update();
            
            // Update insight
            const accountCount = document.getElementById('accountCount');
            if (accountCount) {
                const activeAccounts = [fidelity401k, goldmanIra, goldmanBrokerage, schwabRoth, schwabBrokerage, crypto]
                    .filter(value => value > 0).length;
                accountCount.textContent = activeAccounts;
            }
        }

        // Update FI Timeline Chart
        if (this.fiTimelineChart) {
            const currentPortfolio = parseFloat(this.investmentsElement.textContent.replace(/[$,]/g, '')) || 0;
            const fiTarget = parseFloat(document.getElementById('fiTarget').textContent.replace(/[$,]/g, '')) || 0;
            
            // Project portfolio growth (assuming 8% annual return)
            const projection = [];
            for (let i = 0; i <= 5; i++) {
                projection.push(currentPortfolio * Math.pow(1.08, i));
            }
            
            this.fiTimelineChart.data.datasets[0].data = projection;
            this.fiTimelineChart.data.datasets[1].data = Array(6).fill(fiTarget);
            this.fiTimelineChart.update();
            
            // Update insight
            const yearsToFI = document.getElementById('yearsToFI');
            if (yearsToFI) {
                let years = 0;
                for (let i = 0; i < projection.length; i++) {
                    if (projection[i] >= fiTarget) {
                        years = i;
                        break;
                    }
                }
                yearsToFI.textContent = years;
            }
        }
    }

    openModal() {
        if (this.modal) {
            this.modal.style.display = 'block';
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            if (this.expenseForm) {
                this.expenseForm.reset();
            }
        }
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
        // Find the appropriate budget card based on category
        let targetCard;
        const budgetCards = document.querySelectorAll('.budget-card');
        
        for (let card of budgetCards) {
            const title = card.querySelector('h3').textContent;
            if (category === 'fixed' && title.includes('Fixed Expenses')) {
                targetCard = card;
                break;
            } else if (category === 'variable' && title.includes('Variable Expenses')) {
                targetCard = card;
                break;
            } else if (category === 'savings' && title.includes('Savings & Investments')) {
                targetCard = card;
                break;
            }
        }
        
        if (targetCard) {
            const budgetItems = targetCard.querySelector('.budget-total');
            const newItem = document.createElement('div');
            newItem.className = 'budget-item';
            newItem.innerHTML = `
                <span>${name}</span>
                <input type="number" value="${amount}" placeholder="Amount">
            `;
            
            budgetItems.parentNode.insertBefore(newItem, budgetItems);
            
            // Add event listener to the new input
            const newInput = newItem.querySelector('input');
            newInput.addEventListener('input', () => {
                this.calculateBudget();
                this.updateCharts();
                this.calculateFinancialIndependence();
            });
            
            // Recalculate budget immediately
            this.calculateBudget();
            this.updateCharts();
            this.calculateFinancialIndependence();
            
            // Add success notification
            addNotification(`Added ${name}: ${this.formatCurrency(amount)}`, 'success');
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

    exportReport() {
        const reportDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Gather all current data
        const netWorth = this.netWorthElement.textContent;
        const homeEquity = this.homeEquityElement.textContent;
        const investments = this.investmentsElement.textContent;
        const vehicles = this.vehiclesElement.textContent;
        
        const totalIncome = this.totalIncomeElement.textContent;
        const totalFixedExpenses = this.totalFixedExpensesElement.textContent;
        const totalVariableExpenses = this.totalVariableExpensesElement.textContent;
        const totalSavings = this.totalSavingsElement.textContent;
        const netCashFlow = this.netCashFlowElement.textContent;

        // Portfolio values
        const fidelity401k = this.fidelity401kInput.value;
        const goldmanIra = this.goldmanIraInput.value;
        const goldmanBrokerage = this.goldmanBrokerageInput.value;
        const schwabRoth = this.schwabRothInput.value;
        const schwabBrokerage = this.schwabBrokerageInput.value;
        const cryptoCoinbase = this.cryptoCoinbaseInput.value;

        // Financial Independence data
        const monthlyExpenses = this.annualExpensesElement.textContent;
        const annualExpenses = this.annualExpensesDisplay.textContent;
        const requiredPortfolio = this.fiTargetElement.textContent;
        const currentPortfolio = this.currentPortfolioElement.textContent;
        const portfolioGap = this.portfolioGapElement.textContent;
        const yearsToFI = this.yearsToFIElement.textContent;
        const monthlyPortfolioIncome = this.monthlyPortfolioIncomeElement.textContent;

        // Create the report HTML
        const reportHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craig's Financial Report - ${reportDate}</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #3b82f6;
            margin-bottom: 10px;
        }
        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        .section h2 {
            color: #1f2937;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .overview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .overview-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        .overview-item h3 {
            margin: 0 0 10px 0;
            color: #374151;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .overview-item .amount {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1f2937;
        }
        .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        .portfolio-item {
            background: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }
        .portfolio-item .account {
            font-weight: 600;
            color: #374151;
        }
        .portfolio-item .value {
            font-size: 1.1rem;
            font-weight: 700;
            color: #1f2937;
        }
        .portfolio-item .status {
            font-size: 0.8rem;
            color: #6b7280;
            font-style: italic;
        }
        .budget-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .budget-item {
            background: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }
        .budget-item .category {
            font-weight: 600;
            color: #374151;
            font-size: 0.9rem;
        }
        .budget-item .amount {
            font-size: 1.1rem;
            font-weight: 700;
            color: #1f2937;
        }
        .fi-summary {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #0ea5e9;
        }
        .fi-summary h3 {
            color: #0c4a6e;
            margin-bottom: 15px;
        }
        .fi-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding: 8px 0;
            border-bottom: 1px solid #e0f2fe;
        }
        .fi-item:last-child {
            border-bottom: none;
        }
        .fi-item .label {
            font-weight: 600;
            color: #0c4a6e;
        }
        .fi-item .value {
            font-weight: 700;
            color: #0c4a6e;
        }
        @media print {
            body { margin: 0; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Craig's Financial Planning Report</h1>
        <p>Generated on ${reportDate}</p>
    </div>

    <div class="section">
        <h2>Net Worth Overview</h2>
        <div class="overview-grid">
            <div class="overview-item">
                <h3>Total Net Worth</h3>
                <div class="amount">${netWorth}</div>
            </div>
            <div class="overview-item">
                <h3>Home Equity</h3>
                <div class="amount">${homeEquity}</div>
            </div>
            <div class="overview-item">
                <h3>Investment Portfolio</h3>
                <div class="amount">${investments}</div>
            </div>
            <div class="overview-item">
                <h3>Vehicle Assets</h3>
                <div class="amount">${vehicles}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Investment Portfolio Breakdown</h2>
        <div class="portfolio-grid">
            <div class="portfolio-item">
                <div class="account">401K (Fidelity)</div>
                <div class="value">$${parseInt(fidelity401k).toLocaleString()}</div>
                <div class="status">Rollover candidate</div>
            </div>
            <div class="portfolio-item">
                <div class="account">IRA (Goldman)</div>
                <div class="value">$${parseInt(goldmanIra).toLocaleString()}</div>
                <div class="status">Already with Goldman</div>
            </div>
            <div class="portfolio-item">
                <div class="account">Brokerage (Goldman)</div>
                <div class="value">$${parseInt(goldmanBrokerage).toLocaleString()}</div>
                <div class="status">Already with Goldman</div>
            </div>
            <div class="portfolio-item">
                <div class="account">Roth IRA (Schwab)</div>
                <div class="value">$${parseInt(schwabRoth).toLocaleString()}</div>
                <div class="status">Consolidate?</div>
            </div>
            <div class="portfolio-item">
                <div class="account">Brokerage (Schwab)</div>
                <div class="value">$${parseInt(schwabBrokerage).toLocaleString()}</div>
                <div class="status">Consolidate?</div>
            </div>
            <div class="portfolio-item">
                <div class="account">Crypto (Coinbase)</div>
                <div class="value">$${parseInt(cryptoCoinbase).toLocaleString()}</div>
                <div class="status">Keep separate</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Monthly Budget Summary</h2>
        <div class="budget-grid">
            <div class="budget-item">
                <div class="category">Total Income</div>
                <div class="amount">${totalIncome}</div>
            </div>
            <div class="budget-item">
                <div class="category">Fixed Expenses</div>
                <div class="amount">${totalFixedExpenses}</div>
            </div>
            <div class="budget-item">
                <div class="category">Variable Expenses</div>
                <div class="amount">${totalVariableExpenses}</div>
            </div>
            <div class="budget-item">
                <div class="category">Total Savings</div>
                <div class="amount">${totalSavings}</div>
            </div>
            <div class="budget-item">
                <div class="category">Net Cash Flow</div>
                <div class="amount">${netCashFlow}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Job Transition Financial Planning</h2>
        <div class="fi-summary">
            <h3>Financial Independence Analysis</h3>
            <div class="fi-item">
                <span class="label">Monthly Expenses (after job loss):</span>
                <span class="value">${monthlyExpenses}</span>
            </div>
            <div class="fi-item">
                <span class="label">Annual Expenses:</span>
                <span class="value">${annualExpenses}</span>
            </div>
            <div class="fi-item">
                <span class="label">Required Portfolio (4% rule):</span>
                <span class="value">${requiredPortfolio}</span>
            </div>
            <div class="fi-item">
                <span class="label">Current Investment Portfolio:</span>
                <span class="value">${currentPortfolio}</span>
            </div>
            <div class="fi-item">
                <span class="label">Portfolio Gap:</span>
                <span class="value">${portfolioGap}</span>
            </div>
            <div class="fi-item">
                <span class="label">Years to Financial Independence:</span>
                <span class="value">${yearsToFI}</span>
            </div>
            <div class="fi-item">
                <span class="label">Monthly Portfolio Income (4%):</span>
                <span class="value">${monthlyPortfolioIncome}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Goldman Sachs Meeting Notes</h2>
        <p><strong>Portfolio Consolidation Opportunities:</strong></p>
        <ul>
            <li>401K rollover to Goldman IRA - pros/cons analysis needed</li>
            <li>Portfolio income strategy during unemployment period</li>
            <li>Asset allocation optimization for job transition</li>
            <li>Tax optimization for severance + withdrawals</li>
            <li>Schwab account consolidation with Goldman</li>
        </ul>
        
        <p><strong>Key Questions for Goldman Sachs:</strong></p>
        <ul>
            <li>What are the benefits and drawbacks of rolling over 401K to Goldman IRA?</li>
            <li>How should I structure my portfolio for income during unemployment?</li>
            <li>What asset allocation is optimal for my job transition period?</li>
            <li>How can I optimize taxes on severance and portfolio withdrawals?</li>
            <li>Should I consolidate my Schwab accounts with Goldman?</li>
        </ul>
    </div>
</body>
</html>`;

        // Create a new window with the report
        const reportWindow = window.open('', '_blank');
        reportWindow.document.write(reportHTML);
        reportWindow.document.close();
        
        // Add notification
        addNotification('Report generated successfully!', 'success');
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