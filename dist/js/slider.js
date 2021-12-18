import { constants } from "./constants.js"; //!

const createSlider = (gallery, initialStep, selectDOMElement) => {
  const previousSlideBtn = selectDOMElement('#button-previous')
  const nextSlideBtn = selectDOMElement('#button-next')
  const galleryList = selectDOMElement('#carousel-list')

  let stepChangeCB = () => {}

  for (let i = 0; i <= galleryList.children.length - 1;) {
    let wrapperImg;
    wrapperImg = selectDOMElement(`[data-slider-id="${i}"]`)
    wrapperImg.firstElementChild.dataset.sliderImgId = i;
    
    for (let key in gallery) {
      if (wrapperImg.firstElementChild.dataset.sliderImgId === key) {
        wrapperImg.firstElementChild.src = gallery[key]['source']
        wrapperImg.firstElementChild.style.width = gallery[key]['width']
        wrapperImg.firstElementChild.style.height = gallery[key]['height']
      }
    }
    i++;
  }

  const choosePicture = (step) => {
    let position = constants.initialCountOfPosition;
    let width = constants.widthOfStep;
    position = -step * width;
    updatePicure(position)
  }

  const updatePicure = (position) => {
    galleryList.style.marginLeft = position + 'px'
  }

  const onStepUpdate = (cb) => {
    stepChangeCB = cb
  }

  nextSlideBtn.addEventListener('click', () => {
    stepChangeCB('increment')
  });

  previousSlideBtn.addEventListener('click', () => {
    stepChangeCB('decrement');
  });

  return{
    onStepUpdate, 
    choosePicture,
    onStepUpdate
  }
};

export { createSlider };