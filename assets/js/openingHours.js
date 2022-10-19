
function addZero(i){
  if(i < 10){i = "0" + i;}
  return i; }

const holiday = new Map([
  // Test [key, value]
  // ["AUCKLAND Anniversary", "19/10/2022"],
  // -------------------------------------------------------------------------------------ADD HOLIDAY----
  // ["LABOUR holiday",      "22/10/2022"],
  ["LABOUR day",          "24/10/2022"],
  ["CHRISTMAS",           "25/12/2022"],
  ["BOXING Day",          "26/12/2022"],
  ["CHRISTMAS Holiday",   "27/12/2022"],
  // 2023
  ["NEW YEAR'S Day",      "01/01/2023"],
  ["Day after NEW YEAR'S","02/01/2023"],
  ["NEW YEAR'S Holiday",  "03/01/2023"],
  // ["AUCKLAND Anniversary","30/01/2023"],
  // ["WAITANGI Day",        "06/02/2023"],
  // ["GOOD FRIDAY",         "07/04/2023"],
  // ["EASTER MONDAY",       "10/04/2023"],
  // ["ANZAC Day",           "25/04/2023"],
  // ["KING'S BIRTHDAY",     "05/06/2023"],
  // ["MATARIKI",            "14/07/2023"],
  // ["LABOUR day",          "23/10/2023"],
  // ["CHRISTMAS",           "25/12/2023"],
  // ["BOXING day",          "26/12/2023"],
  // ----------------------------------------------------------------------------------------------------
]);

const d = new Date();
const currentDate = addZero(d.getDate()) + "/" + addZero((d.getMonth()+1)) + "/" + d.getFullYear();
const gettingHours = d.getHours();
const gettingDays = d.getDay();

// init map for this week
let thisWeek = new Map();

// Add current week's dates, and matching click message into the map object
for (let index = 0; index < 7; index++) {
  let cMessage = "";
  const date = new Date();
  date.setDate(d.getDate() + index);
  
  switch (date.getDay()) {
    case 0:
      cMessage = "Sun &nbsp&nbspClosed"; break;
    case 1:
      cMessage = "Mon &nbsp&nbsp 8am - 5pm"; break;
    case 2:
      cMessage = "Tue &nbsp&nbsp 8am - 5pm"; break;
    case 3:
      cMessage = "Wed &nbsp&nbsp 8am - 5pm"; break;
    case 4:
      cMessage = "Thu &nbsp&nbsp 8am - 5pm"; break;
    case 5:
      cMessage = "Fri &nbsp&nbsp 8am - 5pm"; break;
    case 6:
      cMessage = "Sat &nbsp&nbsp 9am - 3pm"; break;  }

  thisWeek.set(date, cMessage);  }

// day is neither saturday nor sunday AND time is at or later than 8 AND earlier than 5.
let isWeekday = ((gettingDays != 6 && gettingDays != 0) && gettingHours >= 8 && gettingHours < 17);
// day is saturday AND time is at or later than 9 AND earlier than 3.
let isSaturday = (gettingDays == 6 && gettingHours >= 9 && gettingHours < 15);
// non holiday message
let openClosed = (isWeekday || isSaturday)? '- we are currently OPEN -' : '- we are currently CLOSED -';
// non holiday colour
let barColour = (isWeekday || isSaturday)? '#4c6439' : '#643a39';

// foreach to check if there is a holiday in this week
holiday.forEach(function(value, key){     // key "LABOUR day"     value "24/10/2022"
  thisWeek.forEach(function(value2, key2){// key "Tue Oct 18..."  value "click Message!"
    // convert date object into matching syntax for comparison
    let key2Date = addZero(key2.getDate()) + "/" + addZero((key2.getMonth()+1)) + "/" + key2.getFullYear();
    // if a date of current week matches to a holiday
    if (value == key2Date) {
      let newMessage = value2.split("&nbsp&nbsp");
      thisWeek.set(key2, key + " &nbsp|&nbsp " + newMessage[0] + "&nbsp&nbspClosed");  } });
  // if today is holiday
  if(value === currentDate){
    // edit prompt holiday message
    openClosed = key + "<br />" + "we are currently CLOSED";
    barColour = '#643a39';

    // ----------------------------------------------------------------------EDIT holiday MESSAGE!!----
    // Wishing everyone a safe and happy ...
    // Happy ... !
    // It's ... Thanks you for your hard work!
    // Wishing you a truly wonderful ... filled with peace and love
    // Happy HOLIDAYS!
    // Best wishes for the Holidays, and for health and happiness throughout the coming year
    // WISHING YOU A MERRY CHRISTMAS and a HAPPY NEW YEAR

    // clickMessage = "Wishing everyone a safe and happy " + key + "!";
    // ------------------------------------------------------------------------------------------------
    } });

function setClickMessages(i, j, k){
  $("#show").load("#show");
  document.getElementById("closeOrOpened").innerHTML = j;
  document.querySelector('.hours').style.backgroundColor = k;

  let counter = 0;
  i.forEach(function(value, key){
    // alert(value);
    document.getElementById("whatDay" + counter).innerHTML = value;
    // + " " + Math.random();
    counter += 1; });
}
setClickMessages(thisWeek, openClosed, barColour);
// $(function () {
  setInterval(()=>setClickMessages(thisWeek, openClosed, barColour), 10000);
// });