  const gettingHours = new Date().getHours()
  const gettingDays = new Date().getDay()
  const weekday = ((gettingDays != 6 && gettingDays != 0) && gettingHours >= 8 && gettingHours < 13);
  const saturday = (gettingDays == 6 && gettingHours >= 9 && gettingHours < 16);
  const openClosed = (weekday || saturday) ? 'OPEN' : 'CLOSED';

  document.querySelector('.closeOrOpened').innerHTML = openClosed;
  
  if(openClosed === 'OPEN'){
    document.querySelector('.hours').style.backgroundColor = '#000e29';
  }
  else{
    document.querySelector('.hours').style.backgroundColor = '#290000';
  }