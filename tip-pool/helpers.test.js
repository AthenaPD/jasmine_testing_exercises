describe("helpers test (with setup and tear-down)", function() {

    beforeEach(function () {
        // initialization logic
        allPayments = {
            payment1: {billAmt: "125.62", tipAmt: "22.61", tipPercent: 18},
            payment2: {billAmt: "252.89", tipAmt: "50.58", tipPercent: 20},
            payment3: {billAmt: "185.34", tipAmt: "27.80", tipPercent: 15},
        };
    });

    it("Should sum up the type of payment specified", function () {
        expect(sumPaymentTotal("billAmt")).toEqual(563.85);
        expect(sumPaymentTotal("tipAmt")).toEqual(100.99);
        expect(sumPaymentTotal("tipPercent")).toEqual(53);
    });

    it("Should calculate the percentage of tip based on the tip and total bill amount", function () {
        expect(calculateTipPercent(allPayments.payment1.billAmt, 
            allPayments.payment1.tipAmt)).toEqual(allPayments.payment1.tipPercent);
        expect(calculateTipPercent(allPayments.payment2.billAmt, 
            allPayments.payment2.tipAmt)).toEqual(allPayments.payment2.tipPercent);
        expect(calculateTipPercent(allPayments.payment3.billAmt, 
            allPayments.payment3.tipAmt)).toEqual(allPayments.payment3.tipPercent);        
    });

    it("Should create + append a new td element to the input row element with the input value",
        function () {
            const newTr = document.createElement("tr");
            for (let key in allPayments.payment1) {
                appendTd(newTr, allPayments.payment1[key]);
            }
            expect(newTr.children.length).toEqual(3);
            expect(newTr.children[0].innerText).toEqual(allPayments.payment1.billAmt.toString());
            expect(newTr.children[1].innerText).toEqual(allPayments.payment1.tipAmt.toString());
            expect(newTr.children[2].innerText).toEqual(allPayments.payment1.tipPercent.toString());
    });

    afterEach(function () {
        // teardown logic
        allPayments = {};
    });
});