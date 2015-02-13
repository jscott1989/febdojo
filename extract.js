// Extract from http://www.w3schools.com/html/html_colornames.asp

function extract() {
  var table = document.getElementById("mytable");
  
  var str = "";
  for (var i = 0; i < table.rows.length; i++) {
    var name = table.rows[i].cells[0].textContent;
    var color = table.rows[i].cells[1].textContent;
    str += "\"" +  name + "\": convertHexToRGB(\""+color+"\"),\n";
  }
  
  return str;
}