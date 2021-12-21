import { selectDOMElement } from "./utils.js";
import { constants } from "./constants.js";

const backlight = (() => {
  let galleryImg;
  const galleryList = selectDOMElement('#photo-list')

  const getGalleryImg = (index) => {
    return galleryImg = selectDOMElement(`[data-photo-gallery-img-id="${index}"]`)
  }

  const getActive = (step) => {
    for (let i = 0; i <= galleryList.children.length - 1; i++) {
      getGalleryImg(i)

      if (galleryImg.classList.contains('active')) {
        galleryImg.classList.remove('active')
        break;
      }
    }
    getGalleryImg(step)
    galleryImg.classList.add('active')
  }

  const setDefaultBacklight = (currentStep) => {
    getGalleryImg(currentStep)
    galleryImg.classList.add('active')
  }

  return {
    getActive,
    setDefaultBacklight
  }
})()

export { backlight }