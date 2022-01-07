let submit = document.querySelector("#submit");
let waves = document.querySelector(".waves");
let chart = document.querySelector(".chart");
let getChart = document.querySelector("#getChart");
let wave1s;
let wave1e;
let w1len,
  wave2upl,
  wave2mdl,
  wave2dwl,
  w3nor,
  w3ext,
  w3ext2,
  w3len1,
  w3len2,
  w3len3,
  w4len1,
  w4len2,
  w4len3,
  wave5_e,
  wave5_e2,
  wave5_n;

submit.addEventListener("click", () => {
  //////////////wave 1///////////////
  wave1s = document.querySelector("#wave1s").value;
  wave1e = document.querySelector("#wave1e").value;
  wave1s = parseFloat(wave1s);
  wave1e = parseFloat(wave1e);
  console.log("wave 1 starting=", wave1s, "wave 1 ending=", wave1e);
  //////////////wave 2///////////////
  w1len = wave1e - wave1s;
  wave2upl = wave1e - (wave1e - wave1s) * 0.5;
  wave2mdl = wave1e - (wave1e - wave1s) * 0.62;
  wave2dwl = wave1e - (wave1e - wave1s) * 0.79;
  console.log("wave 2 retracement prices=", wave2upl, wave2dwl);
  //////////////wave 3///////////////
  w3nor = wave2dwl + w1len * 1.62;
  w3ext = wave2dwl + w1len * 2.62;
  w3ext2 = wave2dwl + w1len * 4.25;
  console.log(
    "wave 3 end prices (normal,extended,extended2)  =",
    w3nor,
    w3ext,
    w3ext2
  );
  w3len1 = w3nor - wave2dwl;
  w3len2 = w3ext - wave2dwl;
  w3len3 = w3ext2 - wave2dwl;
  //////////////wave 4///////////////
  w4len1 = [w3nor - w3len1 * 0.24, w3nor - w3len1 * 0.38, w3nor - w3len1 * 0.5];
  w4len2 = [w3ext - w3len2 * 0.24, w3ext - w3len2 * 0.38, w3ext - w3len2 * 0.5];
  w4len3 = [
    w3ext2 - w3len3 * 0.24,
    w3ext2 - w3len3 * 0.5,
    w3ext2 - w3len3 * 0.5
  ];

  //////////////wave 5///////////////

  wave5_e = [
    w4len2[2] + w1len * 1.62,
    w4len2[2] + w1len * 2.62,
    w4len2[2] + w1len * 4.45
  ];
  wave5_e2 = [
    w4len3[2] + w1len * 1.62,
    w4len3[2] + w1len * 2.62,
    w4len3[2] + w1len * 4.45
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

  waves.innerHTML = `
  <table>
  <tr>
    <td>Points</td>
    <td>Price</td>
    <td>Price 2</td>
    <td>Price 3</td>
  </tr>
  <tr>
    <td>Point 0</td>
    <td><b>${wave1s.toFixed(2)}</b></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Point 1</td>
    <td><b>${wave1e.toFixed(2)}</b></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Point 2</td>
    <td><b>${wave2dwl.toFixed(4)}</b></td>
    <td><b>${wave2mdl.toFixed(4)}</b></td>
    <td><b>${wave2upl.toFixed(4)}</b></td>
    
  </tr>
  <tr class="text-light">
    <td>(if Point3 is)</td>
    <td style="background:#0d53a8;"><b>Normal</b></td>
    <td style="background:#0da872;"><b>Extended</b></td>
    <td style="background:#1f7308;"><b>Fully Extended</b></td>
  </tr>
  <tr>
    <td>Point 3</td>
    <td><b>${w3nor.toFixed(2)}</b></td>
    <td><b>${w3ext.toFixed(2)}</b></td>
    <td><b>${w3ext2.toFixed(2)}</b></td>
  </tr>
  <tr>
    <td>Point 4 </td>
    <td><b>${w4len1[2].toFixed(2)}</b></td>
    <td><b>${w4len2[2].toFixed(2)}</b></td>
    <td><b>${w4len3[2].toFixed(2)}</b></td>
  </tr>
  <tr>
    <td>Point 5</td>
    <td>
        <b>
            <span style="color: #0d53a8;">[${wave5_n[0].toFixed(2)}]</span>
            &nbsp;
            <span style="color: #0da872;">[${wave5_n[1].toFixed(2)}]</span>
        </b>
    </td>
    <td>
        <b><span style="color: #0d53a8;">[${wave5_e[0].toFixed(
          2
        )}]</span>&nbsp;<span style="color: #0da872;">[${wave5_e[1].toFixed(
    2
  )}]</span>&nbsp;<span style="color: #1f7308;">[${wave5_e[2].toFixed(
    2
  )}]</span></b>
    </td>
    <td>
        <b><span style="color: #0d53a8;">[${wave5_e2[0].toFixed(
          2
        )}]</span>&nbsp;<span style="color: #0da872;">[${wave5_e2[1].toFixed(
    2
  )}]</span>&nbsp;<span style="color: #1f7308;">[${wave5_e2[2].toFixed(
    2
  )}]</span></b>
    </td>
</tr>
</table>

  `;
  getChart.removeAttribute("disabled");
  chart.innerHTML = `
  <table class="charts-css line" id="my-chart">
          <tbody>
            
            <tr>            
              <td style="--start: 0; --size: 0.4; --color: blue;"">
                <span class="data"> $${wave1e.toFixed(2)} </span>
              </td>
            </tr>
            <tr>
              <td style="--start: 0.4; --size: 0.1; --color: blue;">
                <span class="data"> $${wave2dwl.toFixed(4)} </span>
              </td>
              <td style="--start: 0.4; --size: 0.2; --color: teal;">
                <span class="data"> $${wave2mdl.toFixed(4)} </span>
              </td>
              <td style="--start: 0.4; --size: 0.3; --color: green;">
                <span class="data"> $${wave2upl.toFixed(4)} </span>
              </td>
            </tr>
            <tr>
              <td style="--start: 0.1; --size: 0.6; --color: blue;">
                <span class="data"> $${w3nor.toFixed(2)} </span>
              </td>
              <td style="--start: 0.2; --size: 0.7; --color: teal;">
              <span class="data"> $${w3ext.toFixed(2)} </span>
            </td>
            <td style="--start: 0.3; --size: 0.8; --color: green;">
            <span class="data"> $${w3ext2.toFixed(2)} </span>
          </td>
            </tr>
            <tr>
              <td style="--start: 0.6; --size: 0.2; --color: blue;">
                <span class="data"> $${w4len1[2].toFixed(2)} </span>
              </td>
              <td style="--start: 0.7; --size: 0.3; --color: teal;">
              <span class="data"> $${w4len2[2].toFixed(2)} </span>
            </td>
            <td style="--start: 0.8; --size: 0.4; --color: green;">
            <span class="data"> $${w4len3[2].toFixed(2)} </span>
          </td>
            </tr>
            <tr>
              <td style="--start: 0.2; --size: 0.7; --color: blue;">
                <span class="data"> $${wave5_n[1].toFixed(2)} </span>
              </td>
              <td style="--start: 0.3; --size: 0.8; --color: teal;">
              <span class="data"> $${wave5_e[2].toFixed(2)} </span>
            </td>
            <td style="--start: 0.4; --size: 0.9; --color: green;">
            <span class="data"> $${wave5_e2[2].toFixed(2)} </span>
          </td>
            </tr>
          </tbody>
        </table>
  `;
});
