window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const loanAmt = document.querySelector("#loan-amount");
  loanAmt.value = 100000;

  const loanYear = document.querySelector("#loan-years");
  loanYear.value = 10;

  const loanRate = document.querySelector("#loan-rate");
  loanRate.value = 0.06;

  const loanObj = {amount: loanAmt.value, years: loanYear.value, rate: loanRate.value};

  const currMonthly = calculateMonthlyPayment(loanObj);
  updateMonthly(currMonthly);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const newLoanObj = getCurrentUIValues();
  const newMonthly = calculateMonthlyPayment(newLoanObj);
  updateMonthly(newMonthly);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const monthly = values.amount * values.rate / 12 / (1 - (1 + values.rate / 12) ** (-values.years * 12));
  const monthlyRound = Math.round(monthly * 100) / 100;
  const monthlyStr = monthlyRound.toString();
  if (!monthlyStr.split(".")[1]) return monthlyStr.concat(".00");
  return monthlyStr;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPaySpan = document.querySelector("#monthly-payment");
  monthlyPaySpan.innerText = "$" + monthly;
}
