import { constants } from "./constants.js";
import { gallery } from "./gallery.js";
import { galleryList } from "./gallery-list.js";
import { backlight } from "./backlight.js";
import { createSlider } from "./slider.js";
import { selectDOMElement } from "./utils.js";

const stepController = (() => {
  const slider = createSlider(gallery, constants.initialIndexOfStep, selectDOMElement);

  const carouselList = selectDOMElement('#carousel-list')
  let currentStep = constants.initialIndexOfStep;

  backlight.setDefaultBacklight(currentStep)
  galleryList.updatePicture()

  slider.onStepUpdate((operationType) => {
    if (operationType === 'increment') {
      currentStep++
      if (currentStep >= carouselList.children.length) {
        currentStep = carouselList.children.length - 1
      }
    }

    if (operationType === 'decrement') {
      currentStep--
      if (currentStep <= 0) {
        currentStep = 0
      }
    }
    update(currentStep)
  })

  galleryList.setCurrentStep((step) => {
    currentStep = step;
    update(currentStep)
  })

  const update = (currentStep) => {
    slider.choosePicture(currentStep)
    backlight.getActive(currentStep)
  }
})();