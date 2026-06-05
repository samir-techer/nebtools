/**
 * NebTools - Main JavaScript
 * Premium educational tools for NEB Grade 11 & 12 students
 * @version 1.0.0
 * @author NebTools Team
 */

// ============================================
// Global State
// ============================================
const state = {
    theme: 'dark',
    currentModal: null,
    timerInterval: null,
    timerSeconds: 1500,
    timerTotal: 1500,
    timerRunning: false,
    gpaSubjects: [],
    semesters: 1,
    formulas: []
};

// ============================================
// NEB Grading System
// ============================================
const NEB_GRADES = [
    { min: 90, max: 100, grade: 'A+', point: 4.0 },
    { min: 80, max: 89, grade: 'A', point: 3.6 },
    { min: 70, max: 79, grade: 'B+', point: 3.2 },
    { min: 60, max: 69, grade: 'B', point: 2.8 },
    { min: 50, max: 59, grade: 'C+', point: 2.4 },
    { min: 40, max: 49, grade: 'C', point: 2.0 },
    { min: 30, max: 39, grade: 'D+', point: 1.6 },
    { min: 20, max: 29, grade: 'D', point: 1.2 },
    { min: 0, max: 19, grade: 'E', point: 0.8 }
];

// ============================================
// Formula Database (65+ formulas)
// ============================================
const FORMULA_DB = [
    // Accounting Formulas
    { name: 'Gross Profit', formula: 'Gross Profit = Revenue - Cost of Goods Sold', category: 'accounting', desc: 'Profit before deducting operating expenses' },
    { name: 'Net Profit', formula: 'Net Profit = Gross Profit - Operating Expenses', category: 'accounting', desc: 'Final profit after all expenses' },
    { name: 'Current Ratio', formula: 'Current Ratio = Current Assets / Current Liabilities', category: 'accounting', desc: 'Liquidity ratio measuring ability to pay short-term obligations' },
    { name: 'Quick Ratio', formula: 'Quick Ratio = (Current Assets - Inventory) / Current Liabilities', category: 'accounting', desc: 'More stringent liquidity test excluding inventory' },
    { name: 'Debt-to-Equity Ratio', formula: 'D/E = Total Liabilities / Shareholders Equity', category: 'accounting', desc: 'Measures financial leverage of a company' },
    { name: 'Return on Investment', formula: 'ROI = (Net Profit / Investment) x 100%', category: 'accounting', desc: 'Measures efficiency of an investment' },
    { name: 'Working Capital', formula: 'Working Capital = Current Assets - Current Liabilities', category: 'accounting', desc: 'Capital available for day-to-day operations' },
    { name: 'Gross Profit Margin', formula: 'GPM = (Gross Profit / Revenue) x 100%', category: 'accounting', desc: 'Percentage of revenue retained as gross profit' },
    { name: 'Net Profit Margin', formula: 'NPM = (Net Profit / Revenue) x 100%', category: 'accounting', desc: 'Percentage of revenue retained as net profit' },
    { name: 'Inventory Turnover', formula: 'Inventory Turnover = COGS / Average Inventory', category: 'accounting', desc: 'How many times inventory is sold and replaced' },
    { name: 'Asset Turnover', formula: 'Asset Turnover = Revenue / Total Assets', category: 'accounting', desc: 'Efficiency of using assets to generate revenue' },
    { name: 'Return on Assets', formula: 'ROA = (Net Income / Total Assets) x 100%', category: 'accounting', desc: 'Profitability relative to total assets' },
    { name: 'Earnings Per Share', formula: 'EPS = (Net Income - Preferred Dividends) / Outstanding Shares', category: 'accounting', desc: 'Profit allocated to each outstanding share' },
    { name: 'Price-Earnings Ratio', formula: 'P/E = Market Price per Share / Earnings per Share', category: 'accounting', desc: 'Valuation ratio of current share price' },
    { name: 'Depreciation (Straight Line)', formula: 'Annual Depreciation = (Cost - Salvage Value) / Useful Life', category: 'accounting', desc: 'Equal depreciation expense each year' },
    { name: 'Depreciation (Reducing Balance)', formula: 'Depreciation = Book Value x Depreciation Rate', category: 'accounting', desc: 'Higher depreciation in early years' },
    { name: 'Break-Even Point', formula: 'BEP = Fixed Costs / (Selling Price - Variable Cost per Unit)', category: 'accounting', desc: 'Units needed to cover all costs' },
    { name: 'Margin of Safety', formula: 'MoS = (Actual Sales - BEP Sales) / Actual Sales x 100%', category: 'accounting', desc: 'How much sales can drop before losses' },
    { name: 'Contribution Margin', formula: 'CM = Selling Price - Variable Cost per Unit', category: 'accounting', desc: 'Amount available to cover fixed costs' },
    { name: 'Cost of Goods Sold', formula: 'COGS = Opening Stock + Purchases - Closing Stock', category: 'accounting', desc: 'Direct costs attributable to goods sold' },

    // Economics Formulas
    { name: 'GDP (Expenditure)', formula: 'GDP = C + I + G + (X - M)', category: 'economics', desc: 'Gross Domestic Product by expenditure approach' },
    { name: 'GDP Deflator', formula: 'GDP Deflator = (Nominal GDP / Real GDP) x 100', category: 'economics', desc: 'Measures price inflation in an economy' },
    { name: 'Inflation Rate', formula: 'Inflation = ((Current CPI - Previous CPI) / Previous CPI) x 100%', category: 'economics', desc: 'Rate of increase in general price level' },
    { name: 'Real Interest Rate', formula: 'Real Rate = Nominal Rate - Inflation Rate', category: 'economics', desc: 'Interest rate adjusted for inflation' },
    { name: 'Marginal Propensity to Consume', formula: 'MPC = Change in Consumption / Change in Income', category: 'economics', desc: 'Proportion of additional income spent' },
    { name: 'Marginal Propensity to Save', formula: 'MPS = Change in Saving / Change in Income', category: 'economics', desc: 'Proportion of additional income saved' },
    { name: 'Multiplier Effect', formula: 'Multiplier = 1 / (1 - MPC) = 1 / MPS', category: 'economics', desc: 'Factor by which initial spending multiplies' },
    { name: 'Elasticity of Demand', formula: 'Ed = (% Change in Quantity Demanded) / (% Change in Price)', category: 'economics', desc: 'Responsiveness of demand to price changes' },
    { name: 'Cross Elasticity', formula: 'Exy = (% Change in Qx) / (% Change in Py)', category: 'economics', desc: 'Response of demand for X to price of Y' },
    { name: 'Income Elasticity', formula: 'Ey = (% Change in Q) / (% Change in Income)', category: 'economics', desc: 'Response of demand to income changes' },
    { name: 'Consumer Surplus', formula: 'CS = Willingness to Pay - Actual Price', category: 'economics', desc: 'Benefit consumers receive beyond what they pay' },
    { name: 'Producer Surplus', formula: 'PS = Market Price - Willingness to Sell', category: 'economics', desc: 'Benefit producers receive above their cost' },
    { name: 'Total Revenue', formula: 'TR = Price x Quantity', category: 'economics', desc: 'Total money received from selling goods' },
    { name: 'Average Revenue', formula: 'AR = Total Revenue / Quantity', category: 'economics', desc: 'Revenue per unit sold' },
    { name: 'Marginal Revenue', formula: 'MR = Change in TR / Change in Q', category: 'economics', desc: 'Additional revenue from selling one more unit' },
    { name: 'Average Cost', formula: 'AC = Total Cost / Quantity', category: 'economics', desc: 'Cost per unit of output' },
    { name: 'Marginal Cost', formula: 'MC = Change in TC / Change in Q', category: 'economics', desc: 'Additional cost of producing one more unit' },
    { name: 'Terms of Trade', formula: 'ToT = (Export Price Index / Import Price Index) x 100', category: 'economics', desc: 'Ratio of export prices to import prices' },
    { name: 'Balance of Payments', formula: 'BOP = Current Account + Capital Account + Financial Account', category: 'economics', desc: 'Record of all economic transactions' },
    { name: 'Exchange Rate', formula: 'Exchange Rate = Domestic Currency / Foreign Currency', category: 'economics', desc: 'Value of one currency in terms of another' },
    { name: 'Unemployment Rate', formula: 'Unemployment % = (Unemployed / Labor Force) x 100', category: 'economics', desc: 'Percentage of labor force without jobs' },
    { name: 'Labor Force Participation', formula: 'LFPR = (Labor Force / Working Age Population) x 100', category: 'economics', desc: 'Percentage of working-age people in labor force' },
    { name: 'Money Multiplier', formula: 'MM = 1 / Reserve Ratio', category: 'economics', desc: 'Maximum amount commercial banks can create' },
    { name: 'Quantity Theory of Money', formula: 'MV = PY', category: 'economics', desc: 'Money supply x Velocity = Price x Output' },
    { name: 'Fisher Equation', formula: 'i = r + pi', category: 'economics', desc: 'Nominal interest = Real interest + Inflation' },

    // Business Studies Formulas
    { name: 'Market Share', formula: 'Market Share = (Company Sales / Total Market Sales) x 100%', category: 'business', desc: 'Company portion of total market sales' },
    { name: 'Market Growth', formula: 'Growth = ((Current - Previous) / Previous) x 100%', category: 'business', desc: 'Rate of market size increase' },
    { name: 'SWOT Analysis', formula: 'Strengths + Weaknesses + Opportunities + Threats', category: 'business', desc: 'Strategic planning framework' },
    { name: 'Marketing Mix (4Ps)', formula: 'Product + Price + Place + Promotion', category: 'business', desc: 'Core elements of marketing strategy' },
    { name: 'Extended Marketing Mix (7Ps)', formula: 'Product + Price + Place + Promotion + People + Process + Physical Evidence', category: 'business', desc: 'Service marketing framework' },
    { name: 'Break-Even Analysis', formula: 'Break-Even = Fixed Costs / Contribution per Unit', category: 'business', desc: 'Point where total cost equals total revenue' },
    { name: 'Payback Period', formula: 'Payback = Initial Investment / Annual Cash Inflow', category: 'business', desc: 'Time to recover initial investment' },
    { name: 'Net Present Value', formula: 'NPV = Sum of (CFt / (1 + r)^t) - Initial Investment', category: 'business', desc: 'Present value of future cash flows minus investment' },
    { name: 'Internal Rate of Return', formula: 'NPV = 0 at IRR', category: 'business', desc: 'Discount rate where NPV equals zero' },
    { name: 'Average Rate of Return', formula: 'ARR = (Average Annual Profit / Initial Investment) x 100%', category: 'business', desc: 'Average return on investment over project life' },
    { name: 'Liquidity Ratio', formula: 'Liquidity = Liquid Assets / Current Liabilities', category: 'business', desc: 'Ability to meet short-term obligations' },
    { name: 'Solvency Ratio', formula: 'Solvency = Total Assets / Total Liabilities', category: 'business', desc: 'Ability to meet long-term obligations' },
    { name: 'Efficiency Ratio', formula: 'Efficiency = Output / Input x 100%', category: 'business', desc: 'How well resources are used' },
    { name: 'Productivity', formula: 'Productivity = Output / Input', category: 'business', desc: 'Output per unit of input' },
    { name: 'Capacity Utilization', formula: 'CU = (Actual Output / Maximum Possible Output) x 100%', category: 'business', desc: 'Percentage of capacity being used' },
    { name: 'Stock Turnover', formula: 'Stock Turnover = COGS / Average Stock', category: 'business', desc: 'How quickly inventory is sold' },
    { name: 'Debt Collection Period', formula: 'DCP = (Debtors / Credit Sales) x 365 days', category: 'business', desc: 'Average days to collect payment from debtors' },
    { name: 'Credit Payment Period', formula: 'CPP = (Creditors / Credit Purchases) x 365 days', category: 'business', desc: 'Average days to pay creditors' },
    { name: 'Economic Order Quantity', formula: 'EOQ = Square Root of (2 x D x S / H)', category: 'business', desc: 'Optimal order quantity minimizing total costs' },
    { name: 'Reorder Level', formula: 'ROL = Maximum Usage x Maximum Lead Time', category: 'business', desc: 'Inventory level triggering new order' },
    { name: 'Safety Stock', formula: 'Safety Stock = (Maximum Usage - Average Usage) x Lead Time', category: 'business', desc: 'Buffer inventory to prevent stockouts' }
];

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeTheme();
    initializeNavigation();
    initializeScrollReveal();
    initializeBackToTop();
    initializeContactForm();
    initializeButtonRipple();
    initializeHeroStats();
    initializeFormulas();
});

// ============================================
// Loader
// ============================================
function initializeLoader() {
    setTimeout(function() {
        var loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1800);
}

// ============================================
// Theme Toggle
// ============================================
function initializeTheme() {
    var savedTheme = localStorage.getItem('nebtools-theme') || 'dark';
    setTheme(savedTheme);

    document.getElementById('themeToggle').addEventListener('click', function() {
        var newTheme = state.theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('nebtools-theme', newTheme);
        showToast('Switched to ' + newTheme + ' mode', 'info');
    });
}

function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    var icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ============================================
// Navigation
// ============================================
function initializeNavigation() {
    var navbar = document.getElementById('navbar');
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    var navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    var sections = document.querySelectorAll('section[id]');
    var scrollPos = window.scrollY + 100;

    sections.forEach(function(section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initializeScrollReveal() {
    var revealElements = document.querySelectorAll('.bento-card, .about-card, .stat-card, .info-card, .section-header');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function(el) {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ============================================
// Back to Top
// ============================================
function initializeBackToTop() {
    var btn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Hero Stats Animation
// ============================================
function initializeHeroStats() {
    var statNumbers = document.querySelectorAll('.stat-number');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(function(el) {
        observer.observe(el);
    });
}

function animateCounter(element) {
    var target = parseInt(element.getAttribute('data-count'));
    var duration = 2000;
    var start = performance.now();

    function update(currentTime) {
        var elapsed = currentTime - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);

        element.textContent = current.toLocaleString() + (target >= 1000 ? '+' : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString() + (target >= 1000 ? '+' : '');
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// Button Ripple Effect
// ============================================
function initializeButtonRipple() {
    document.querySelectorAll('.btn').forEach(function(btn) {
        btn.classList.add('btn-ripple');
        btn.addEventListener('click', function(e) {
            var rect = this.getBoundingClientRect();
            var ripple = document.createElement('span');
            var size = Math.max(rect.width, rect.height);

            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(function() { ripple.remove(); }, 600);
        });
    });
}

// ============================================
// Modal System
// ============================================
function openModal(tool) {
    var modalId = tool + 'Modal';
    var modal = document.getElementById(modalId);
    var overlay = document.getElementById('modalOverlay');

    if (!modal) return;

    state.currentModal = modalId;
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (tool === 'gpa') initializeGPA();
    if (tool === 'accounting') initializeAccounting();
    if (tool === 'formula') initializeFormulaHub();
    if (tool === 'percentage') initializePercentage();
    if (tool === 'cgpa') initializeCGPA();
    if (tool === 'timer') initializeTimer();
}

function closeModal() {
    var overlay = document.getElementById('modalOverlay');
    var modals = document.querySelectorAll('.modal');

    modals.forEach(function(modal) { modal.classList.remove('active'); });
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    state.currentModal = null;

    if (state.timerInterval) {
        pauseTimer();
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && state.currentModal) {
        closeModal();
    }
});

// ============================================
// GPA Calculator
// ============================================
function initializeGPA() {
    var container = document.getElementById('gpaSubjects');
    container.innerHTML = '';
    state.gpaSubjects = [];

    var defaultSubjects = ['English', 'Nepali', 'Mathematics'];
    defaultSubjects.forEach(function(name) { addGpaSubject(name); });
}

function addGpaSubject(name) {
    var container = document.getElementById('gpaSubjects');
    var index = state.gpaSubjects.length;

    var row = document.createElement('div');
    row.className = 'gpa-subject-row';
    row.innerHTML = '<input type="text" class="sub-name" placeholder="Subject Name" value="' + (name || '') + '" required><input type="number" class="sub-marks" placeholder="Marks (0-100)" min="0" max="100" required><input type="number" class="sub-credit" placeholder="Credit Hours" value="3" min="1" max="10" required><button class="btn-icon" onclick="removeGpaSubject(this)" title="Remove subject"><i class="fas fa-trash"></i></button>';

    container.appendChild(row);
    state.gpaSubjects.push(row);
}

function removeGpaSubject(btn) {
    var row = btn.closest('.gpa-subject-row');
    var index = state.gpaSubjects.indexOf(row);
    if (index > -1) state.gpaSubjects.splice(index, 1);
    row.remove();
}

function calculateGPA() {
    var rows = document.querySelectorAll('.gpa-subject-row');
    var totalPoints = 0;
    var totalCredits = 0;
    var validSubjects = 0;

    rows.forEach(function(row) {
        var marks = parseFloat(row.querySelector('.sub-marks').value);
        var credit = parseFloat(row.querySelector('.sub-credit').value);

        if (!isNaN(marks) && !isNaN(credit) && marks >= 0 && marks <= 100) {
            var gradePoint = getGradePoint(marks);
            totalPoints += gradePoint * credit;
            totalCredits += credit;
            validSubjects++;
        }
    });

    if (validSubjects === 0) {
        showToast('Please enter valid marks for at least one subject', 'error');
        return;
    }

    var gpa = totalPoints / totalCredits;
    var grade = getGradeFromGPA(gpa);

    document.getElementById('gpaValue').textContent = gpa.toFixed(2);
    document.getElementById('gpaGrade').textContent = grade;

    showToast('GPA calculated: ' + gpa.toFixed(2) + ' (' + grade + ')', 'success');
}

function getGradePoint(marks) {
    for (var i = 0; i < NEB_GRADES.length; i++) {
        if (marks >= NEB_GRADES[i].min && marks <= NEB_GRADES[i].max) {
            return NEB_GRADES[i].point;
        }
    }
    return 0;
}

function getGradeFromGPA(gpa) {
    if (gpa >= 3.6) return 'A+';
    if (gpa >= 3.2) return 'A';
    if (gpa >= 2.8) return 'B+';
    if (gpa >= 2.4) return 'B';
    if (gpa >= 2.0) return 'C+';
    if (gpa >= 1.6) return 'C';
    if (gpa >= 1.2) return 'D+';
    if (gpa >= 0.8) return 'D';
    return 'E';
}

function resetGPA() {
    initializeGPA();
    document.getElementById('gpaValue').textContent = '0.00';
    document.getElementById('gpaGrade').textContent = '-';
    showToast('GPA calculator reset', 'info');
}

// ============================================
// Accounting Automator
// ============================================
function initializeAccounting() {
    switchTab('trial');
    document.getElementById('trialInputs').innerHTML = createAccountingRow();
    document.getElementById('revenueInputs').innerHTML = createIncomeRow('rev');
    document.getElementById('expenseInputs').innerHTML = createIncomeRow('exp');
    document.getElementById('assetInputs').innerHTML = createIncomeRow('asset');
    document.getElementById('liabilityInputs').innerHTML = createIncomeRow('liab');
    document.getElementById('capitalAmount').value = '';
}

function createAccountingRow() {
    return '<div class="input-row"><input type="text" placeholder="Account Name" class="acct-name"><input type="number" placeholder="Debit (Rs.)" class="acct-debit" value="0"><input type="number" placeholder="Credit (Rs.)" class="acct-credit" value="0"><button class="btn-icon" onclick="removeRow(this)"><i class="fas fa-trash"></i></button></div>';
}

function createIncomeRow(type) {
    var label = type === 'rev' ? 'Revenue' : type === 'exp' ? 'Expense' : type === 'asset' ? 'Asset' : 'Liability';
    return '<div class="input-row"><input type="text" placeholder="' + label + ' Item" class="' + type + '-name"><input type="number" placeholder="Amount (Rs.)" class="' + type + '-amount" value="0"><button class="btn-icon" onclick="removeRow(this)"><i class="fas fa-trash"></i></button></div>';
}

function addTrialRow() {
    var container = document.getElementById('trialInputs');
    var div = document.createElement('div');
    div.innerHTML = createAccountingRow();
    container.appendChild(div.firstElementChild);
}

function addRevenueRow() {
    var container = document.getElementById('revenueInputs');
    var div = document.createElement('div');
    div.innerHTML = createIncomeRow('rev');
    container.appendChild(div.firstElementChild);
}

function addExpenseRow() {
    var container = document.getElementById('expenseInputs');
    var div = document.createElement('div');
    div.innerHTML = createIncomeRow('exp');
    container.appendChild(div.firstElementChild);
}

function addAssetRow() {
    var container = document.getElementById('assetInputs');
    var div = document.createElement('div');
    div.innerHTML = createIncomeRow('asset');
    container.appendChild(div.firstElementChild);
}

function addLiabilityRow() {
    var container = document.getElementById('liabilityInputs');
    var div = document.createElement('div');
    div.innerHTML = createIncomeRow('liab');
    container.appendChild(div.firstElementChild);
}

function removeRow(btn) {
    btn.closest('.input-row').remove();
}

function switchTab(tab) {
    document.querySelectorAll('.accounting-tabs .tab-btn').forEach(function(btn) { btn.classList.remove('active'); });
    document.querySelectorAll('.tab-content').forEach(function(content) { content.classList.remove('active'); });

    if (event && event.target) {
        event.target.classList.add('active');
    }
    document.getElementById(tab + 'Tab').classList.add('active');
}

function calculateAccounting() {
    var totalDebit = 0, totalCredit = 0;
    document.querySelectorAll('.acct-debit').forEach(function(el) { totalDebit += parseFloat(el.value) || 0; });
    document.querySelectorAll('.acct-credit').forEach(function(el) { totalCredit += parseFloat(el.value) || 0; });

    document.getElementById('totalDebit').textContent = 'Rs. ' + totalDebit.toLocaleString();
    document.getElementById('totalCredit').textContent = 'Rs. ' + totalCredit.toLocaleString();
    var diff = Math.abs(totalDebit - totalCredit);
    document.getElementById('trialDiff').textContent = 'Rs. ' + diff.toLocaleString();
    document.getElementById('trialDiff').style.color = diff === 0 ? '#22c55e' : '#ef4444';

    var totalRevenue = 0, totalExpenses = 0;
    document.querySelectorAll('.rev-amount').forEach(function(el) { totalRevenue += parseFloat(el.value) || 0; });
    document.querySelectorAll('.exp-amount').forEach(function(el) { totalExpenses += parseFloat(el.value) || 0; });

    document.getElementById('totalRevenue').textContent = 'Rs. ' + totalRevenue.toLocaleString();
    document.getElementById('totalExpenses').textContent = 'Rs. ' + totalExpenses.toLocaleString();
    var netIncome = totalRevenue - totalExpenses;
    document.getElementById('netIncome').textContent = 'Rs. ' + netIncome.toLocaleString();
    document.getElementById('netIncome').style.color = netIncome >= 0 ? '#22c55e' : '#ef4444';

    var totalAssets = 0, totalLiabilities = 0;
    document.querySelectorAll('.asset-amount').forEach(function(el) { totalAssets += parseFloat(el.value) || 0; });
    document.querySelectorAll('.liab-amount').forEach(function(el) { totalLiabilities += parseFloat(el.value) || 0; });
    var capital = parseFloat(document.getElementById('capitalAmount').value) || 0;
    var totalLiabCapital = totalLiabilities + capital;

    document.getElementById('totalAssets').textContent = 'Rs. ' + totalAssets.toLocaleString();
    document.getElementById('totalLiabCapital').textContent = 'Rs. ' + totalLiabCapital.toLocaleString();
    var balanceDiff = Math.abs(totalAssets - totalLiabCapital);
    document.getElementById('balanceDiff').textContent = 'Rs. ' + balanceDiff.toLocaleString();
    document.getElementById('balanceDiff').style.color = balanceDiff === 0 ? '#22c55e' : '#ef4444';

    showToast('Accounting statements calculated successfully!', 'success');
}

function exportPDF() {
    window.print();
    showToast('PDF export initiated. Use "Save as PDF" in print dialog.', 'info');
}

// ============================================
// Formula Hub
// ============================================
function initializeFormulaHub() {
    state.formulas = FORMULA_DB.slice();
    renderFormulas(state.formulas);
}

function initializeFormulas() {
    state.formulas = FORMULA_DB.slice();
}

function renderFormulas(formulas) {
    var container = document.getElementById('formulaList');
    container.innerHTML = '';

    if (formulas.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 2rem; color: var(--text-secondary);">No formulas found. Try a different search.</div>';
        return;
    }

    formulas.forEach(function(formula) {
        var item = document.createElement('div');
        item.className = 'formula-item';
        item.dataset.category = formula.category;
        item.innerHTML = '<div class="formula-name">' + formula.name + '</div><div class="formula-math">' + formula.formula + '</div><div class="formula-desc">' + formula.desc + '</div><span class="formula-category-tag">' + formula.category.charAt(0).toUpperCase() + formula.category.slice(1) + '</span>';
        container.appendChild(item);
    });
}

function searchFormulas() {
    var query = document.getElementById('formulaSearch').value.toLowerCase().trim();
    var activeCategoryBtn = document.querySelector('.cat-btn.active');
    var activeCategory = activeCategoryBtn ? activeCategoryBtn.textContent.toLowerCase() : 'all';

    var filtered = state.formulas.slice();

    if (activeCategory !== 'all') {
        filtered = filtered.filter(function(f) { return f.category === activeCategory; });
    }

    if (query) {
        filtered = filtered.filter(function(f) {
            return f.name.toLowerCase().includes(query) ||
                f.formula.toLowerCase().includes(query) ||
                f.desc.toLowerCase().includes(query) ||
                f.category.toLowerCase().includes(query);
        });
    }

    renderFormulas(filtered);
}

function filterCategory(category) {
    document.querySelectorAll('.cat-btn').forEach(function(btn) { btn.classList.remove('active'); });
    if (event && event.target) {
        event.target.classList.add('active');
    }

    var query = document.getElementById('formulaSearch').value.toLowerCase().trim();
    var filtered = state.formulas.slice();

    if (category !== 'all') {
        filtered = filtered.filter(function(f) { return f.category === category; });
    }

    if (query) {
        filtered = filtered.filter(function(f) {
            return f.name.toLowerCase().includes(query) ||
                f.formula.toLowerCase().includes(query) ||
                f.desc.toLowerCase().includes(query);
        });
    }

    renderFormulas(filtered);
}

// ============================================
// Percentage Calculator
// ============================================
function initializePercentage() {
    document.getElementById('pctValue1').value = '';
    document.getElementById('pctValue2').value = '';
    document.getElementById('pctOrig').value = '';
    document.getElementById('pctNew').value = '';
    document.getElementById('pctPart').value = '';
    document.getElementById('pctTotal').value = '';
    document.getElementById('pctOfResult').textContent = 'Result: -';
    document.getElementById('pctChangeResult').textContent = 'Result: -';
    document.getElementById('pctTotalResult').textContent = 'Result: -';
}

function switchCalcTab(tab) {
    document.querySelectorAll('.calc-tabs .tab-btn').forEach(function(btn) { btn.classList.remove('active'); });
    document.querySelectorAll('.calc-content').forEach(function(content) { content.classList.remove('active'); });

    if (event && event.target) {
        event.target.classList.add('active');
    }
    document.getElementById(tab).classList.add('active');
}

function calcPercentOf() {
    var val1 = parseFloat(document.getElementById('pctValue1').value);
    var val2 = parseFloat(document.getElementById('pctValue2').value);

    if (isNaN(val1) || isNaN(val2)) {
        showToast('Please enter valid numbers', 'error');
        return;
    }

    var result = (val1 / 100) * val2;
    document.getElementById('pctOfResult').textContent = 'Result: ' + result.toLocaleString();
}

function calcPercentChange() {
    var orig = parseFloat(document.getElementById('pctOrig').value);
    var newVal = parseFloat(document.getElementById('pctNew').value);

    if (isNaN(orig) || isNaN(newVal) || orig === 0) {
        showToast('Please enter valid numbers (original cannot be 0)', 'error');
        return;
    }

    var change = ((newVal - orig) / orig) * 100;
    var sign = change >= 0 ? '+' : '';
    document.getElementById('pctChangeResult').textContent = 'Result: ' + sign + change.toFixed(2) + '%';
}

function calcPercentTotal() {
    var part = parseFloat(document.getElementById('pctPart').value);
    var total = parseFloat(document.getElementById('pctTotal').value);

    if (isNaN(part) || isNaN(total) || total === 0) {
        showToast('Please enter valid numbers (total cannot be 0)', 'error');
        return;
    }

    var result = (part / total) * 100;
    document.getElementById('pctTotalResult').textContent = 'Result: ' + result.toFixed(2) + '%';
}

// ============================================
// CGPA Calculator
// ============================================
function initializeCGPA() {
    var container = document.getElementById('cgpaSemesters');
    container.innerHTML = '';
    state.semesters = 1;
    addSemester();
}

function addSemester() {
    var container = document.getElementById('cgpaSemesters');
    var semesterNum = container.children.length + 1;

    var row = document.createElement('div');
    row.className = 'semester-row';
    row.innerHTML = '<span class="sem-label">Semester ' + semesterNum + '</span><input type="number" class="sem-gpa" placeholder="GPA (0-4)" step="0.01" min="0" max="4" required><input type="number" class="sem-credits" placeholder="Credits" value="20" min="1" required>';

    container.appendChild(row);
}

function calculateCGPA() {
    var rows = document.querySelectorAll('.semester-row');
    var totalPoints = 0;
    var totalCredits = 0;
    var validSemesters = 0;

    rows.forEach(function(row) {
        var gpa = parseFloat(row.querySelector('.sem-gpa').value);
        var credits = parseFloat(row.querySelector('.sem-credits').value);

        if (!isNaN(gpa) && !isNaN(credits) && gpa >= 0 && gpa <= 4) {
            totalPoints += gpa * credits;
            totalCredits += credits;
            validSemesters++;
        }
    });

    if (validSemesters === 0) {
        showToast('Please enter valid GPA for at least one semester', 'error');
        return;
    }

    var cgpa = totalPoints / totalCredits;
    var grade = getGradeFromGPA(cgpa);

    document.getElementById('cgpaValue').textContent = cgpa.toFixed(2);
    document.getElementById('cgpaGrade').textContent = grade;

    showToast('CGPA calculated: ' + cgpa.toFixed(2) + ' (' + grade + ')', 'success');
}

function resetCGPA() {
    initializeCGPA();
    document.getElementById('cgpaValue').textContent = '0.00';
    document.getElementById('cgpaGrade').textContent = '-';
    showToast('CGPA calculator reset', 'info');
}

// ============================================
// Study Timer
// ============================================
function initializeTimer() {
    state.timerSeconds = 1500;
    state.timerTotal = 1500;
    state.timerRunning = false;
    updateTimerDisplay();
    document.getElementById('timerBar').style.width = '100%';
    document.getElementById('timerStart').disabled = false;
    document.getElementById('timerPause').disabled = true;
    document.getElementById('timerLabel').textContent = 'Focus Time';
}

function updateTimerDisplay() {
    var minutes = Math.floor(state.timerSeconds / 60);
    var seconds = state.timerSeconds % 60;

    document.querySelector('.timer-minutes').textContent = String(minutes).padStart(2, '0');
    document.querySelector('.timer-seconds').textContent = String(seconds).padStart(2, '0');

    var progress = (state.timerSeconds / state.timerTotal) * 100;
    document.getElementById('timerBar').style.width = progress + '%';
}

function startTimer() {
    if (state.timerRunning) return;

    state.timerRunning = true;
    document.getElementById('timerStart').disabled = true;
    document.getElementById('timerPause').disabled = false;
    document.getElementById('timerLabel').textContent = 'Focusing...';

    state.timerInterval = setInterval(function() {
        state.timerSeconds--;
        updateTimerDisplay();

        if (state.timerSeconds <= 0) {
            pauseTimer();
            showToast('Timer finished! Great job focusing!', 'success');
            document.getElementById('timerLabel').textContent = 'Session Complete!';
        }
    }, 1000);
}

function pauseTimer() {
    if (!state.timerRunning) return;

    state.timerRunning = false;
    clearInterval(state.timerInterval);
    document.getElementById('timerStart').disabled = false;
    document.getElementById('timerPause').disabled = true;
    document.getElementById('timerLabel').textContent = 'Paused';
}

function resetTimer() {
    pauseTimer();
    state.timerSeconds = state.timerTotal;
    updateTimerDisplay();
    document.getElementById('timerLabel').textContent = 'Ready to Focus';
}

function setTimer(minutes) {
    pauseTimer();
    state.timerTotal = minutes * 60;
    state.timerSeconds = state.timerTotal;
    updateTimerDisplay();
    document.getElementById('timerLabel').textContent = minutes + ' Minute Session';
    showToast('Timer set to ' + minutes + ' minutes', 'info');
}

// ============================================
// Contact Form
// ============================================
function initializeContactForm() {
    var form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
    });
}

// ============================================
// Toast Notifications
// ============================================
function showToast(message, type) {
    type = type || 'info';
    var container = document.getElementById('toastContainer');

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;

    var icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i><span>' + message + '</span>';

    container.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 3000);
}

// ============================================
// Service Worker Registration (PWA Support)
// ============================================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function(err) {
        console.log('Service Worker registration failed:', err);
    });
}
