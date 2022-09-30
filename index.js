var ctx = document.getElementById("myChart").getContext("2d");
var modaltitle = document.querySelector(".modal-title");

var myChart = new Chart(ctx, {
  plugins: [ChartDataLabels],
  type: "line",
  data: {
    labels: ["Point 0", "Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],

    datasets: [{
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
let ex = document.querySelector("#export");
let json_data = document.querySelector("#importJson");
let confirmimp = document.querySelector("#confirmImport");
let getChart = document.querySelector("#getChart");
let coinsdata = document.querySelector("#coins");
var deleteCoin = document.querySelector("#deleteCoin");
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


function extractCoindata(coin) {

  fetch(`https://api.coingecko.com/api/v3/search?query=${coin}`)
    .then(response => response.json())
    .then(data => data);


}

function submitfunc(point0, point1) {
  //////////////wave 1///////////////




  if ((point0 && point1) == null) {
    wave1s = document.querySelector("#wave1s").value;
    wave1e = document.querySelector("#wave1e").value;
    let multiplier = document.querySelector('#Multiplier');
    if (multiplier.value == "") {
      wave1s = wave1s * 1;
      wave1e = wave1e * 1;
    } else {
      wave1s = wave1s * parseInt(multiplier.value);
      wave1e = wave1e * parseInt(multiplier.value);
    }
  }
  if ((point0 && point1) != null) {
    wave1s = point0;
    wave1e = point1;
  }
  wave1s = parseFloat(wave1s);
  wave1e = parseFloat(wave1e);
  //console.log("wave 1 starting=", wave1s, "wave 1 ending=", wave1e);
  ////////////wave 2///////////////
  w1len = wave1e - wave1s;
  wave2upl = wave1e - (wave1e - wave1s) * 0.5;
  wave2mdl = wave1e - (wave1e - wave1s) * 0.618;
  wave2dwl = wave1e - (wave1e - wave1s) * 0.786;
  //console.log("wave 2 retracement prices=", wave2upl, wave2mdl, wave2dwl);
  //////////////wave 3///////////////
  w3nor = wave2dwl + w1len * 1.618;
  w3ext = wave2dwl + w1len * 2.618;
  w3ext2 = wave2dwl + w1len * 4.236;

  /*console.log(
    "wave 3 end prices (normal,extended,extended2)  =",
    w3nor,
    w3ext,
    w3ext2,
    w3ext3,
    w3ext4
  );*/
  w3len1 = w3nor - wave2dwl;
  w3len2 = w3ext - wave2dwl;
  w3len3 = w3ext2 - wave2dwl;

  //////////////wave 4///////////////
  w4len1 = [w3nor - w3len1 * 0.236, w3nor - w3len1 * 0.382, w3nor - w3len1 * 0.5];
  w4len2 = [w3ext - w3len2 * 0.236, w3ext - w3len2 * 0.382, w3ext - w3len2 * 0.5];
  w4len3 = [
    w3ext2 - w3len3 * 0.236,
    w3ext2 - w3len3 * 0.382,
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

  /*console.log(
    "wave 4 retracement prices (w3 extended+)=",
    w4len1[2],
    w4len2[2],
    w4len3[2]
  );
  console.log("wave 5 prices (w3 extended+) =", wave5_e, wave5_e2);*/

  wave5_n = [w1len ,(w3nor - wave1s) * 0.62, (w3nor - wave1s) * 1.62];
  //console.log("wave 4 retracement prices (w3 normal)=", w4len1[2]);
  //console.log("wave 5 prices (w3 normal) =", wave5_n);

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

  //console.log(myChart.data.datasets[0].data);
}

submit.addEventListener("click", () => {
  submitfunc();

});

save.addEventListener("click", () => {
  let name = prompt("Please enter name of Asset");
  if (name != null) {
    let coins_arr;
    coins_arr = JSON.parse(localStorage.getItem('coins_arr'));
    if (coins_arr == null) {
      coins_arr = [];
    }
    let temp_obj = {};
    temp_obj.name = `${name}`, temp_obj.w1s = `${wave1s}`, temp_obj.w1e = `${wave1e}`;
    coins_arr.push(temp_obj);
    localStorage.removeItem('coins_arr');
    localStorage.setItem('coins_arr', JSON.stringify(coins_arr));

  }
  coinsdata.innerHTML = "";
  show();
});
//console.log(coins.children[1]);

show();


// ------------- SHOWS COIN  FUNCTION ------//

function show() {
  var coinarray = JSON.parse(localStorage.getItem('coins_arr'));
  console.log(coinarray);
  for (let i = 0; i < coinarray.length; i++) {
    coinsdata.innerHTML =
      coinsdata.innerHTML +
      `
    <tr class="coin">
    
      <td><img width="32px" alt="" src="https://s3-symbol-logo.tradingview.com/crypto/XTVC${coinarray[i].name.toUpperCase()}.svg" onerror="this.onerror=null;this.src='https://static.thenounproject.com/png/3674270-200.png';"></td>
      <td>${coinarray[i].name}</td>
      <td>${coinarray[i].w1s}</td>
      <td>${coinarray[i].w1e}</td>
      <td><a class="text-danger" onclick="delCoin(${i})"><i class="fas fa-trash-alt"></i></a></td>
      
      
    </tr>`;
    coins = document.querySelectorAll(".coin");


  }
}

// ------------- DELETE COIN FUNCTION ------//
function delCoin(coin) {
  if (confirm(`Are you sure you want to delete ?`)) {
    var coinarray = JSON.parse(localStorage.getItem('coins_arr'));
    console.log(coinarray)
    coinarray.splice(coin, 1);
    console.log(coinarray)
    localStorage.removeItem('coins_arr');
    localStorage.setItem('coins_arr', JSON.stringify(coinarray));
    coinsdata.innerHTML = '';
    show();
  } else {

  }

};

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



// ------------- EXPORT COIN DATA FUNCTION ------//
function exportToJsonFile() {
  
  let dataStr = localStorage.getItem('coins_arr')
  if(dataStr!=''){
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    let exportFileDefaultName = 'data.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
  else{
    alert('List is Empty');
  }
  
}


confirmimp.addEventListener('click',()=>{
  try{
    let append_arr = JSON.parse(json_data.value);
    let coins_arr;
    coins_arr = JSON.parse(localStorage.getItem('coins_arr'));
    if (coins_arr == null) {
      coins_arr = [];
    }
  for(let i=0;i<append_arr.length;i++){
    coins_arr[coins_arr.length]=append_arr[i];
  }
  localStorage.removeItem('coins_arr');
  localStorage.setItem('coins_arr', JSON.stringify(coins_arr));
  alert('Data Successfully Imported')
  coinsdata.innerHTML = "";
  show();
  }
  catch(err){
    alert(err);
    json_data.value='';
  };
  
  
})
ex.addEventListener('click',()=>{exportToJsonFile();})
