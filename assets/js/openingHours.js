  const gettingHours = new Date().getHours()
  const gettingDays = new Date().getDay()
  // const current

  const holiday = new Map([
    // Test 
    ["CLOSED :( t", "17102022"],

    ["Labour Day", "24102022"],
    ["Christmas Day", "25122022"],
    ["Boxing Day", "26122022"]
  ]);

  const currentDate = new Date().getDate() + new Date().getMonth() + new Date().getFullYear();
  const weekday = ((gettingDays != 6 && gettingDays != 0) && gettingHours >= 8 && gettingHours < 17);
  const saturday = (gettingDays == 6 && gettingHours >= 9 && gettingHours < 15);
  const openClosed = (weekday || saturday) ? 'we are currently OPEN' : 'we are currently CLOSED' + currentDate;


  document.querySelector('.closeOrOpened').innerHTML = openClosed;
  
  if(openClosed === 'we are currently OPEN'){
    document.querySelector('.hours').style.backgroundColor = '#4c6439';
  }
  else{
    document.querySelector('.hours').style.backgroundColor = '#643a39';
  }

  if(gettingDays == 0){
    document.querySelector('.whatDay').innerHTML = "Sunday | Closed";
  }
  else if(gettingDays == 6){
    document.querySelector('.whatDay').innerHTML = "Saturday | 9am - 3pm";
  }
  else{
    document.querySelector('.whatDay').innerHTML = "Monday - Friday | 8am - 5pm";
  }