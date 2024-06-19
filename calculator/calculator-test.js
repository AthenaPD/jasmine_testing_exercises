
it('should calculate the monthly rate correctly', function () {
  loanObj = {
    amount: 100000,
    years: 30,
    rate: 0.05
  }
  expect(calculateMonthlyPayment(loanObj)).toEqual("536.82");
});


it("should return a result with 2 decimal places", function() {
  loanObj = {
    amount: 100000,
    years: 30,
    rate: 0.05
  }
  expect(calculateMonthlyPayment(loanObj).split(".")[1].length).toEqual(2);
});
