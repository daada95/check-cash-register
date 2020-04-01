function checkCashRegister(price, cash, cid) {
  let change$ = cash - price;
  let change4Compare = cash - price;
  let cashInDrawer = 0;
  let maxIndex = cid.length - 1;
  let changeFinalOfFinals = [];
  let changeKey = [[0.01], [0.05], [0.1], [0.25], [1], [5], [10], [20], [100]];
  let changeFinal = [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

  for (let i = 0; i < cid.length; i++) {
    cashInDrawer += cid[i][1];
  }

  cashInDrawer = Math.round(cashInDrawer * 100) / 100;
  
  function StatusAndChange(status, change) {
    this.status = status,
    this.change = change
  }

  if (cashInDrawer < change$) {
  let status = new StatusAndChange("INSUFFICIENT_FUNDS", []);
  return status;
  } else if (cashInDrawer == change$) {
  let status = new StatusAndChange("CLOSED", cid);
  return status;
  } else if (cashInDrawer > change$) {
  for (let i = 0; i <= maxIndex; i++) {
  if (cid[maxIndex - i][1] !== 0) {
  if (cid[maxIndex - i] !== 0) {
  let diffOne = Math.floor(change$ / changeKey[maxIndex - i]);
  let diffTwo = Math.floor(cid[maxIndex - i][1] / changeKey[maxIndex - i]);
  
  if (diffOne >= diffTwo) {
    changeFinal[maxIndex - i][1] += diffTwo * changeKey[maxIndex - i];
    change$ -= diffTwo * changeKey[maxIndex - i];
    change$ = change$.toFixed(2);
  } 
      
  else if (diffOne < diffTwo) {
    changeFinal[maxIndex - i][1] += diffOne * changeKey[maxIndex - i];
    change$ -= diffOne * changeKey[maxIndex - i];
    change$ = change$.toFixed(2);
  }
  } 
  }
    if (i == maxIndex) {
    let changeWeCan = 0;
  for (let i = 0; i <= maxIndex; i++) {
      changeWeCan += changeFinal[i][1];
  }
  if (changeWeCan !== change4Compare) {
      let status = new StatusAndChange("INSUFFICIENT_FUNDS", []);
      return status;
  } else {
      changeFinal = changeFinal.reverse();
  for (let i = 0; i < changeFinal.length; i++) {
  if (changeFinal[i][1] > 0) {
      changeFinalOfFinals.push(changeFinal[i]);
  }
  }
      console.log(changeFinalOfFinals);
      let status = new StatusAndChange("OPEN", changeFinalOfFinals)
      return status;
    }
  }
  }
  }
  }

// below an example input
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
