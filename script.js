

    function getContainerDetails() {
      const con = document.getElementById("containerType").value.trim();
      const cm1l = parseFloat(document.getElementById("cartonLength").value.trim());
      const cm1w = parseFloat(document.getElementById("cartonWidth").value.trim());
      const cm1h = parseFloat(document.getElementById("cartonHeight").value.trim());
      const a = parseFloat(document.getElementById("bulgingLength").value.trim());
      const b = parseFloat(document.getElementById("bulgingWidth").value.trim());
      const c = parseFloat(document.getElementById("bulgingHeight").value.trim());
      const d20ft = parseFloat(document.getElementById("cmb20ft").textContent.trim());
      const d40ft = parseFloat(document.getElementById("cmb40ft").textContent.trim());
      const d20fthq = parseFloat(document.getElementById("cmb20fthq").textContent.trim());
      const d40fthq = parseFloat(document.getElementById("cmb40fthq").textContent.trim());
      const d45fthq = parseFloat(document.getElementById("cmb45fthq").textContent.trim());
      
      let containerDetails = "<h3> <center> <u>";
      let p, q, r;

      switch (con) {
        case "20":
          containerDetails += "20ft Standed container";
          p = 5898; // con20l,
          q = 2352; // con20w,
          r = 2393; // con20h,
          break;
        case "40":
          containerDetails += "40ft Standed container";
          p = 12032; // con40l
          q = 2352; // con40w
          r = 2393; // con40h
          break;
        case "20hq":
          containerDetails += "20ft High Cube Container";
          p = 5898; // con20hql
          q = 2344; // con20hqw
          r = 2690; // con20hqh
          break;
        case "40hq":
          containerDetails += "40ft High Cube Container";
          p = 12032; // con40hql
          q = 2352; // con40hqw
          r = 2698; // con40hqh
          break;
        default:
          containerDetails += "45ft High Cube Container";
          p = 13544; // con45hql
          q = 2352; // con45hqw
          r = 2698; // con45hqh
      }
      containerDetails += "</h2>";

      // Carton Measurement Dimensions
      containerDetails += "<p><b>Carton Size dimensions are :-</b> <br><br> &nbsp; &nbsp;L = " +
        cm1l +
        " mm, W = " +
        cm1w +
        " mm, H = " +
        cm1h +
        " mm</p>";

      // Additional measurements
      const x = cm1l + a; // Carton length
      const y = cm1w + b; // Carton Width
      const z = cm1h + c; // Carton Height
      const d = cm1l / 1000; // Carton length by M
      const e = cm1w / 1000; // Carton width by M
      const f = cm1h / 1000; // Carton height by M

      // Calculate loading quantity without flat
      const r1 = Math.floor(p / x); // Number of Columns
      const c1 = Math.floor(q / y); // Number of Rows Horizontally
      const d1 = Math.floor(r / z); // Number of Rows vertically
      const loqty1 = r1 * c1 * d1;

      containerDetails +=
        "<p><b>01. Loading qty without flat: " + loqty1 + " Boxes</b></p>";
      containerDetails +=
        "<p>&nbsp; &nbsp;&nbsp; &nbsp;Number of rows &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;: " +
        r1 +
        ", <br>&nbsp; &nbsp;&nbsp; &nbsp;Number of rows horizontally&nbsp;: " +
        c1 +
        ", <br>&nbsp; &nbsp;&nbsp; &nbsp;Number of rows Vertically &nbsp;&nbsp; &nbsp; : " +
        d1 +
        "</p>";

      // Calculate flat loading quantity of rest of the Length
      const r2 = p % x;
      const c2 = q % y;
      const d2 = r % z;
      const flco = Math.floor(r2 / y);
      const flro = Math.floor(q / x);
      const flroh = Math.floor(r / z);
      const loqty2 = flco * flro * flroh;

      containerDetails +=
        "<p><b>02. Flat loading Qty rest of the length: " + loqty2 + " Boxes</b></p>";
      containerDetails +=
        "<p>&nbsp; &nbsp;&nbsp; &nbsp;Number of Flat rows rest length: " +
        flco +
        ",<br>&nbsp; &nbsp;&nbsp; &nbsp;Number of Flat rows horizontally&nbsp;&nbsp;: " +
        flro +
        ", <br>&nbsp; &nbsp;&nbsp; &nbsp;Number of Flat rows Vertically&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;: " +
        flroh +
        "</p>";

      // Calculate flat loading quantity rest of the Height
      const flcohv = Math.floor(d2 / y);
      const flrohh = Math.floor(q / z);
      const flrohl = Math.floor(p / x);
      const loqty3 = flcohv * flrohh * flrohl;

      containerDetails +=
        "<p><b>03. Flat loading Qty rest of the height: " + loqty3 + " Boxes</b></p>";
      containerDetails +=
        "<p> &nbsp;&nbsp; &nbsp;&nbsp;Number of Flat rows rest height: " +
        flrohl +
        ", <br>&nbsp; &nbsp;&nbsp;&nbsp;Number of Flat rows horizontally&nbsp;&nbsp;: " +
        flrohh +
        ",<br> &nbsp; &nbsp;&nbsp;&nbsp;Number of Flat rows Vertically&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;: " +
        flcohv +
        "</p>";
      containerDetails +=
        "<p><b><u>Total Loading Qty with flat: " +
        (loqty1 + loqty2 + loqty3) +
        " Boxes</u></b></p>";

      const containerCBM = {
        "20": d20ft,
        "40": d40ft,
        "20hq": d20fthq,
        "40hq": d40fthq,
        "46": d45fthq
      }[con];
      
      const utilizedVolume = loqty1 * d * e * f;
      const freeSpace = containerCBM - utilizedVolume;

      containerDetails += "<p><b>Utilized Volume CBM: " + utilizedVolume.toFixed(2) + " CBM</b></p>";
      containerDetails += "<p><b>Free Space: " + freeSpace.toFixed(2) + " CBM</b></p>";

      document.getElementById("containerDetails").innerHTML = containerDetails;
    }

    function clearData() {
      document.getElementById("containerType").value = "";
      document.getElementById("cartonLength").value = "";
      document.getElementById("cartonWidth").value = "";
      document.getElementById("cartonHeight").value = "";
      document.getElementById("bulgingLength").value = "";
      document.getElementById("bulgingWidth").value = "";
      document.getElementById("bulgingHeight").value = "";
      document.getElementById("containerDetails").innerHTML = "";
    }