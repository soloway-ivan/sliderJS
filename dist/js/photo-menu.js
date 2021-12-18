import { selectDOMElement } from "./utils.js";
import { constants } from "./constants.js";
import { gallery } from "./gallery.js";

const choosePhoto = (() => {
  const galleryList = selectDOMElement('#photo-list');
  let step = constants.initialIndexOfStep;
  let stepChangeCB = () => {};

  const getCurrentStep = () => {
    return step
  }

  const setCurrentStep = (cb) => {
    stepChangeCB = cb
  }

  for (let i = 0; i <= galleryList.children.length - 1;) {
    let wrapperImg = selectDOMElement(`[data-photo-gallery="${i}"]`)
    wrapperImg.firstElementChild.dataset.photoGalleryImgId = i;

    for (let key in gallery) {
      if (wrapperImg.firstElementChild.dataset.photoGalleryImgId === key) {
        wrapperImg.firstElementChild.src = gallery[key]['source']
      }
    }
    i++;
  }

  const updatePicture = () => {
    for (let slide = 0; slide <= galleryList.children.length - 1;) {
      let galleryImg = selectDOMElement(`[data-photo-gallery-img-id="${slide}"]`)

      galleryImg.addEventListener('click', () => {
        step = galleryImg.dataset.photoGalleryImgId
        stepChangeCB();
      })
      slide++;
    }
  }

  return {
    setCurrentStep,
    updatePicture,
    getCurrentStep
  }
})()

export { choosePhoto }