document.querySelector("#purchase-btn").addEventListener("click", giveChange);

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

document.querySelector(".price").innerText = `Total: $${price}`;
document.querySelector(".cid").innerHTML = `${updatedCID([...cid].reverse())}`;

function giveChange() {
  let input = document.querySelector("#cash").value;
  let div = document.querySelector("#change-due");
  div.innerHTML = "";
  if (input < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (input == price) {
    div.innerText = "No change due - customer paid with exact cash";
  } else {
    let change = Number((input - price).toFixed(2));
    const denomMap = {
      PENNY: 0.01,
      NICKEL: 0.05,
      DIME: 0.1,
      QUARTER: 0.25,
      ONE: 1,
      FIVE: 5,
      TEN: 10,
      TWENTY: 20,
      "ONE HUNDRED": 100,
    };

    let cidReversed = cid.map((inner) => [...inner]).reverse();
    let changeGiven = {};
    cidReversed.forEach((el) => {
      let name = el[0];
      let amount = el[1];
      let value = denomMap[name];
      let give = 0;
      while (change >= value && amount >= value) {
        change = Number((change - value).toFixed(2));
        amount = Number((amount - value).toFixed(2));
        el[1] = Number(amount);
        give = Number((give + value).toFixed(2));
      }
      if (give > 0) {
        changeGiven[name] = give;
      }
    });
    let totalLeftInDrawer = Number(
      cidReversed.reduce((acc, c) => acc + c[1], 0).toFixed(2)
    );

    if (change > 0) {
      div.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (change == 0 && totalLeftInDrawer == 0) {
      div.innerHTML = `Status: CLOSED</br>${formatChange(changeGiven)}`;
    } else {
      div.innerHTML = `Status: OPEN</br>${formatChange(changeGiven)}`;
    }
  }
  document.querySelector("#cash").value = "";
  document.querySelector(".cid").innerHTML = `${updatedCID(cidReversed)}`;
}

function formatChange(obj) {
  let result = "";
  for (let key in obj) {
    if (key !== "Status") {
      result += `${key}: $${obj[key]}</br>`;
    }
  }
  return result;
}

function updatedCID(arr) {
  let result = "";
  const newArr = [...arr].reverse();
  return `<p>Change in drawer:</p>
          Pennies: $${newArr[0][1]}</br>
          Nickels: $${newArr[1][1]}</br>
          Dimes: $${newArr[2][1]}</br>
          Quarters: $${newArr[3][1]}</br>
          Ones: $${newArr[4][1]}</br>
          Fives: $${newArr[5][1]}</br>
          Tens: $${newArr[6][1]}</br>
          Twenties: $${newArr[7][1]}</br>
          Hundreds: $${newArr[8][1]}
  `;
}
