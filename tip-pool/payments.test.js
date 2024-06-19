describe("Payments test (with setup and tear-down)", function () {

    beforeEach(function () {
        // initialization logic
        billAmtInput.value = "100";
        tipAmtInput.value = "5.65";
    });

    it("Should add a payment object to all payments on submitPaymentInfo()", function () {
        allServers = {server1: { serverName: "Alice" }};

        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments.payment1).toEqual({
            billAmt: "100",
            tipAmt: "5.65",
            tipPercent: 6
        });

        expect(paymentTbody.children.length).toEqual(1);
        expect(paymentTbody.children[0].children[0].innerText).toEqual("$" + allPayments.payment1.billAmt);
        expect(paymentTbody.children[0].children[1].innerText).toEqual("$" + allPayments.payment1.tipAmt);
        expect(paymentTbody.children[0].children[2].innerText).toEqual(calculateTipPercent(
            allPayments.payment1.billAmt, allPayments.payment1.tipAmt
        ) + "%");

        expect(serverTbody.children.length).toEqual(1);
        expect(serverTbody.children[0].children[0].innerText).toEqual("Alice");
        expect(serverTbody.children[0].children[1].innerText).toEqual("$5.65");

        expect(summaryTds.length).toEqual(3);
        expect(summaryTds[0].innerText).toEqual("$100");
        expect(summaryTds[1].innerText).toEqual("$5.65");
        expect(summaryTds[2].innerText).toEqual("6%");
    });

    it("Should return an payment object on createCurPayment()", function () {
        expect(createCurPayment()).toEqual({
            billAmt: "100",
            tipAmt: "5.65",
            tipPercent: 6});

        tipAmtInput.value = "0";
        expect(createCurPayment()).toEqual({
            billAmt: "100",
            tipAmt: "0",
            tipPercent: 0});
        
        tipAmtInput.value = "";
        expect(createCurPayment()).toEqual(undefined);

        billAmtInput.value = "";
        tipAmtInput.value = "5";
        expect(createCurPayment()).toEqual(undefined);

        billAmtInput.value = "-100";
        tipAmtInput.value = "5";
        expect(createCurPayment()).toEqual(undefined);

        billAmtInput.value = "100";
        tipAmtInput.value = "-5";
        expect(createCurPayment()).toEqual(undefined);

        billAmtInput.value = "-100";
        tipAmtInput.value = "-5";
        expect(createCurPayment()).toEqual(undefined);
    });

    it("Should append a row to the payment table on appendPaymentTable(payment_object)", function () {
        appendPaymentTable(createCurPayment())
        expect(paymentTbody.children.length).toEqual(1);
        expect(paymentTbody.children[0].children[0].innerText).toEqual("$" + billAmtInput.value);
        expect(paymentTbody.children[0].children[1].innerText).toEqual("$" + tipAmtInput.value);
        expect(paymentTbody.children[0].children[2].innerText).toEqual(calculateTipPercent(
            billAmtInput.value, tipAmtInput.value
        ) + "%");
    });

    it("Should update the summary table on updateSummary()", function () {

        allPayments = {};
        updateSummary();
        expect(summaryTds.length).toEqual(3);
        expect(summaryTds[0].innerText).toEqual("$0");
        expect(summaryTds[1].innerText).toEqual("$0");
        expect(summaryTds[2].innerText).toEqual("0%");

        allPayments = {
            payment1: {billAmt: "125.62", tipAmt: "22.61", tipPercent: 18},
            payment2: {billAmt: "252.89", tipAmt: "50.58", tipPercent: 20},
            payment3: {billAmt: "185.34", tipAmt: "27.80", tipPercent: 15},
        };
        updateSummary();
        expect(summaryTds.length).toEqual(3);
        expect(summaryTds[0].innerText).toEqual("$563.85");
        expect(summaryTds[1].innerText).toEqual("$100.99");
        expect(summaryTds[2].innerText).toEqual("18%");
    });

    it("Append a delete button to a payment table row on appendDeletePaymentBtn(tr_obj)", function(){
        const newTr = document.createElement("tr");
        appendDeletePaymentBtn(newTr);

        expect(newTr.children.length).toEqual(1);
        expect(newTr.children[0].innerText).toEqual("X");
        
        newTr.remove()
    });

    afterEach(function () {
        // 
        billAmtInput.value = "";
        tipAmtInput.value = "";
        allPayments = {};
        paymentId = 0;
        serverNameInput.value = "";
        allServers = {};
        serverId = 0;

        while (paymentTbody.firstChild) paymentTbody.removeChild(paymentTbody.lastChild);
        while (serverTbody.firstChild) serverTbody.removeChild(serverTbody.lastChild);

        summaryTds[0].innerText = "";
        summaryTds[1].innerText = "";
        summaryTds[2].innerText = "";
    });
});