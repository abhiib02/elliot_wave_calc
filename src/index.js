var ctx = document.getElementById("myChart").getContext("2d");
var modaltitle = document.querySelector(".modal-title");

var myChart = new Chart(ctx, {
  plugins: [ChartDataLabels],
  type: "line",
  data: {
    labels: ["Point 0", "Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],

    datasets: [
      {
        label: "Extended + ",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: ["rgb(0, 153, 15)"],
        borderColor: ["rgb(0, 153, 15)"],
        borderWidth: 1,
        datalabels: {
          anchor: "end",
          align: "top",
          offset: 10
        }
      },
      {
        label: "Extended",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: ["rgba(255, 128, 0)"],
        borderColor: ["rgba(255, 128, 0)"],
        borderWidth: 1,
        datalabels: {
          anchor: "end",
          align: "top",
          offset: 10
        }
      },
      {
        label: "Normal",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: ["rgba(2, 100, 181)"],
        borderColor: ["rgba(2, 100, 181)"],
        borderWidth: 1,
        datalabels: {
          anchor: "end",
          align: "top",
          offset: 10
        }
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        mode: "index",
        intersect: false
      }
    },
    hover: {
      mode: "nearest",
      intersect: false
    },
    scales: {
      x: {
        display: true
      },
      y: {
        display: true
      }
    }
  }
});

let submit = document.querySelector("#submit");
let save = document.querySelector("#save");
let wavepoints = document.querySelector(".wavepoints");

let getChart = document.querySelector("#getChart");
let coinsdata = document.querySelector("#coins");
var coins;

let wave1s;
let wave1e;
let w1len,
  wave2upl,
  wave2mdl,
  wave2dwl,
  w3nor,
  w3ext,
  w3ext2,
  w3ext3,
  w3ext4,
  w3len1,
  w3len2,
  w3len3,
  w4len1,
  w4len2,
  w4len3,
  wave5_e,
  wave5_e2,
  wave5_n;

function submitfunc(point0, point1) {
  //////////////wave 1///////////////
  if ((point0 && point1) == null) {
    wave1s = document.querySelector("#wave1s").value;
    wave1e = document.querySelector("#wave1e").value;
  }
  if ((point0 && point1) != null) {
    wave1s = point0;
    wave1e = point1;
  }
  wave1s = parseFloat(wave1s);
  wave1e = parseFloat(wave1e);
  console.log("wave 1 starting=", wave1s, "wave 1 ending=", wave1e);
  //////////////wave 2///////////////
  w1len = wave1e - wave1s;
  wave2upl = wave1e - (wave1e - wave1s) * 0.5;
  wave2mdl = wave1e - (wave1e - wave1s) * 0.62;
  wave2dwl = wave1e - (wave1e - wave1s) * 0.79;
  console.log("wave 2 retracement prices=", wave2upl, wave2mdl, wave2dwl);
  //////////////wave 3///////////////
  w3nor = wave2dwl + w1len * 1.62;
  w3ext = wave2dwl + w1len * 2.62;
  w3ext2 = wave2dwl + w1len * 4.236;

  console.log(
    "wave 3 end prices (normal,extended,extended2)  =",
    w3nor,
    w3ext,
    w3ext2,
    w3ext3,
    w3ext4
  );
  w3len1 = w3nor - wave2dwl;
  w3len2 = w3ext - wave2dwl;
  w3len3 = w3ext2 - wave2dwl;

  //////////////wave 4///////////////
  w4len1 = [w3nor - w3len1 * 0.24, w3nor - w3len1 * 0.38, w3nor - w3len1 * 0.5];
  w4len2 = [w3ext - w3len2 * 0.24, w3ext - w3len2 * 0.38, w3ext - w3len2 * 0.5];
  w4len3 = [
    w3ext2 - w3len3 * 0.24,
    w3ext2 - w3len3 * 0.38,
    w3ext2 - w3len3 * 0.5
  ];

  //////////////wave 5///////////////

  wave5_e = [
    w4len2[2] + w1len * 1.62,
    w4len2[2] + w1len * 2.62,
    w4len2[2] + w1len * 4.23
  ];
  wave5_e2 = [
    w4len3[2] + w1len * 1.62,
    w4len3[2] + w1len * 2.62,
    w4len3[2] + w1len * 4.23
  ];

  console.log(
    "wave 4 retracement prices (w3 extended+)=",
    w4len1[2],
    w4len2[2],
    w4len3[2]
  );
  console.log("wave 5 prices (w3 extended+) =", wave5_e, wave5_e2);

  wave5_n = [(w3nor - wave1s) * 0.62, (w3nor - wave1s) * 1.62];
  console.log("wave 4 retracement prices (w3 normal)=", w4len1[2]);
  console.log("wave 5 prices (w3 normal) =", wave5_n);

  wavepoints.innerHTML = `
    
    <tr>
      <td>Point 0</td>
      <td><b>${wave1s.toFixed(4)}</b></td>
      <td>--</td>
      <td>--</td>
      
    </tr>
    <tr>
      <td>Point 1</td>
      <td><b>${wave1e.toFixed(4)}</b></td>
      <td>--</td>
      <td>--</td>
      
    </tr>
    <tr>
      <td>Point 2</td>
      <td><b>${wave2dwl.toFixed(4)}</b></td>
      <td><b>${wave2mdl.toFixed(4)}</b></td>
      <td><b>${wave2upl.toFixed(4)}</b></td>
      
    </tr>
    <tr class="text-dark">
      <td>(if Point3 is)</td>
      <td style="background:#0d53a8;"><b>Normal</b></td>
      <td style="background:#1f7308;"><b>Extended</b></td>
      <td style="background:#ff8000;"><b>Extended +</b></td>
      
    </tr>
    <tr>
      <td>Point 3</td>
      <td><b>${w3nor.toFixed(4)}</b></td>
      <td><b>${w3ext.toFixed(4)}</b></td>
      <td><b>${w3ext2.toFixed(4)}</b></td>
      
    </tr>
    <tr>
      <td>Point 4 </td>
      <td><b>${w4len1[2].toFixed(4)}</b></td>
      <td><b>${w4len2[2].toFixed(4)}</b></td>
      <td><b>${w4len3[2].toFixed(4)}</b></td>
     
    </tr>
    <tr>
      <td>Point 5</td>
      <td>
          <b>
              <span style="color: #0d53a8;">[${wave5_n[0].toFixed(4)}]</span>
              &nbsp;
              <span style="color: #0da872;">[${wave5_n[1].toFixed(4)}]</span>
          </b>
      </td>
      <td>
          <b><span style="color: #1f7308;">[${wave5_e[2].toFixed(4)}]</span></b>
      </td>
      <td>
          <b><span style="color: #1f7308;">[${wave5_e2[2].toFixed(
            2
          )}]</span></b>
      </td>
      
  </tr>
  
    `;

  getChart.removeAttribute("disabled");
  save.removeAttribute("disabled");

  myChart.data.datasets[2].data[0] = wave1s.toFixed(2);
  myChart.data.datasets[2].data[1] = wave1e.toFixed(2);
  myChart.data.datasets[2].data[2] = wave2dwl.toFixed(2);
  myChart.data.datasets[2].data[3] = w3nor.toFixed(2);
  myChart.data.datasets[2].data[4] = w4len1[2].toFixed(2);
  myChart.data.datasets[2].data[5] = wave5_n[1].toFixed(2);

  myChart.data.datasets[1].data[0] = wave1s.toFixed(2);
  myChart.data.datasets[1].data[1] = wave1e.toFixed(2);
  myChart.data.datasets[1].data[2] = wave2mdl.toFixed(2);
  myChart.data.datasets[1].data[3] = w3ext.toFixed(2);
  myChart.data.datasets[1].data[4] = w4len2[2].toFixed(2);
  myChart.data.datasets[1].data[5] = wave5_e[2].toFixed(2);

  myChart.data.datasets[0].data[0] = wave1s.toFixed(2);
  myChart.data.datasets[0].data[1] = wave1e.toFixed(2);
  myChart.data.datasets[0].data[2] = wave2upl.toFixed(2);
  myChart.data.datasets[0].data[3] = w3ext2.toFixed(2);
  myChart.data.datasets[0].data[4] = w4len3[2].toFixed(2);
  myChart.data.datasets[0].data[5] = wave5_e2[2].toFixed(2);

  myChart.update();

  console.log(myChart.data.datasets[0].data);
}

submit.addEventListener("click", () => {
  submitfunc();
});

save.addEventListener("click", () => {
  let name = prompt("Please enter name of Asset");
  if (name != null) {
    localStorage.setItem(`${name}`, `${wave1s},${wave1e}`);
  }
  coinsdata.innerHTML = "";
  show();
});
//console.log(coins.children[1]);

show();

function show() {
  var coinarray = Object.keys(localStorage);
  coinarray = coinarray.sort();
  for (let i = 0; i < coinarray.length; i++) {
    let arr = localStorage.getItem(coinarray[i]).split(",");
    if (coinarray[i] !== "__test__") {
      if (coinarray[i] !== "running") {
        coinsdata.innerHTML =
          coinsdata.innerHTML +
          `
    <tr class="coin">
    
      <td><img width="32px" src="https://cryptoicon-api.vercel.app/api/icon/${coinarray[
        i
      ].toLowerCase()}"/></td>
      <td>${coinarray[i]}</td>
      <td>${arr[0]}</td>
      <td>${arr[1]}</td>
      <td><button class="btn btn-danger" onclick="deleteCoin('${coinarray[i]}')"><i class="fas fa-times-circle"></i></button></td>
      
      
    </tr>`;
        coins = document.querySelectorAll(".coin");
      }
    }
  }
}
if (coins) {
  coins.forEach((coin) => {
    coin.addEventListener("click", () => {
      document.querySelector("#wave1s").value = "";
      document.querySelector("#wave1e").value = "";
      document.querySelector("#wave1s").value = coin.children[2].textContent;
      document.querySelector("#wave1e").value = coin.children[3].textContent;
      submitfunc(coin.children[2].textContent, coin.children[3].textContent);
    });
  });
}
function deleteCoin(cointicker){
  console.log(cointicker);
  localStorage.removeItem(cointicker.toString());
}