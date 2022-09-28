let galleryImages = document.querySelectorAll('.box .row img');
let currentImage;
let nextImage;
let isFirst;
let isLast;
let currentIndex;
let currentImageSrc;

galleryImages.forEach(function callback (image, index) {
  image.onclick = () => {
    
    currentImage = image;
    image.setAttribute('src', image.getAttribute('src').replace(' - thumb.png', ' - Edited.png'));

    if(index === 0){
      currentIndex = index;
      
      isFirst = true;
      isLast = false;
      document.querySelector('.popup-img #left').style.pointerEvents = "none";
      document.querySelector('.popup-img #left').style.opacity = "0";
    }
    else if(index === 24){
      currentIndex = index;

      isFirst = false;
      isLast = true;
      document.querySelector('.popup-img #right').style.pointerEvents = "none";
      document.querySelector('.popup-img #right').style.opacity = "0";
    }
    else if(index === 25){
      return;
    }
    else{
      currentIndex = index;

      isFirst = false;
      isLast = false;
      
      document.querySelector('.popup-img #left').style.pointerEvents = "all";
      document.querySelector('.popup-img #left').style.opacity = "100";
      document.querySelector('.popup-img #right').style.pointerEvents = "all";
      document.querySelector('.popup-img #right').style.opacity = "100";
    }

    document.querySelector('.popup-img').style.display = 'block';
    document.querySelector('.popup-img img').src = image.getAttribute('src');
    // currentImage = image.getAttribute('src');

    // for (let index = 0; index < galleryImages.length; index++) {
    //   const element = galleryImages[index];
      
    // }

    document.querySelector('.popup-img #exit').onclick = () =>{
      document.querySelector('.popup-img').style.display = 'none';
    }

    // document.querySelector('.popup-img img').onclick = () =>{
    //   document.querySelector('.popup-img').style.display = 'none';
    // }

    document.querySelector('.popup-img #left').onclick = () =>{
      document.querySelector('.popup-img #right').style.pointerEvents = "all";
      document.querySelector('.popup-img #right').style.opacity = "100";
      isLast = false;

      if(!isFirst){
        currentImage = image.parentElement.parentElement.parentElement.children[currentIndex - 1].children[0].children[0];


        document.querySelector('.popup-img').style.display = 'block';
        document.querySelector('.popup-img img').src = currentImage.getAttribute('src').replace(' - thumb.png', ' - Edited.png');
        currentIndex -= 1;
        if(currentIndex === 0){
          isFirst = true;
          document.querySelector('.popup-img #left').style.pointerEvents = "none";
          document.querySelector('.popup-img #left').style.opacity = "0";
        }
        // alert(isFirst);
      }
    }

    document.querySelector('.popup-img #right').onclick = () =>{
      document.querySelector('.popup-img #left').style.pointerEvents = "all";
      document.querySelector('.popup-img #left').style.opacity = "100";
      isFirst = false;

      if(!isLast){
        currentImage = image.parentElement.parentElement.parentElement.children[currentIndex + 1].children[0].children[0];
        document.querySelector('.popup-img').style.display = 'block';
        document.querySelector('.popup-img img').src = currentImage.getAttribute('src').replace(' - thumb.png', ' - Edited.png');
        currentIndex += 1;
        if(currentIndex === 24){
          isLast = true;
          document.querySelector('.popup-img #right').style.pointerEvents = "none";
          document.querySelector('.popup-img #right').style.opacity = "0";
        }
        // alert(isFirst);
      }
    }
  }
});


