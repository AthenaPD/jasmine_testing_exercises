describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it("Should update the server table on updateServerTable()", function () {

    allServers = {server1: { serverName: serverNameInput.value }};

    updateServerTable();

    expect(serverTbody.children.length).toEqual(1);
    expect(serverTbody.children[0].id).toEqual("server1");
    expect(serverTbody.children[0].children[0].innerText).toEqual(serverNameInput.value);
  });

  it("Should append a delete button to a table row on appendDeleteBtn(tr_object)", function() {
    const newTr = document.createElement("tr");
    appendDeleteBtn(newTr);

    expect(newTr.children.length).toEqual(1);
    expect(newTr.children[0].innerText).toEqual("X");

    newTr.remove();
  });

  afterEach(function() {
    // teardown logic
    while (serverTbody.firstChild) {
      serverTbody.removeChild(serverTbody.lastChild);
    };
    allServers = {};
    serverId = 0;

    serverNameInput.value = '';
  });
});
