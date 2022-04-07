alert("AL 1/2");
//

fetchText("/version.json");

async function fetchText(filePath) {
  let response = await fetch(filePath, "no-cache");
  let data = await response.text();
  alert(data);
}



//async function fetchText() {
//  let response = await fetch('/version.json');
//  let data = await response.text();
//  alert(data);
//}


///
alert("AL 2/2");