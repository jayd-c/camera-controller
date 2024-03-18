/*=============== RANGE SLIDER JS ===============*/
const rangeThumb = document.getElementById('range-thumb'),
      rangeNumber = document.getElementById('range-number'),
      rangeLine = document.getElementById('range-line'),
      rangeInput = document.getElementById('SPEED_SLIDER_PAN'),
      rangeThumb2 = document.getElementById('range-thumb2'),
      rangeNumber2 = document.getElementById('range-number2'),
      rangeLine2 = document.getElementById('range-line2'),
      rangeInput2 = document.getElementById('SPEED_SLIDER_TILT')

const rangeInputSlider = () =>{
      let spanValue = 0;
        if (SPEED_SLIDER_PAN.value < 50) {
            spanValue = SPEED_SLIDER_PAN.value*2 - 100;
      } if(SPEED_SLIDER_PAN.value > 50){
            spanValue = (SPEED_SLIDER_PAN.value-50)*2;
      }
   rangeNumber.textContent = spanValue;
      console.log("Range input value = " + SPEED_SLIDER_PAN.value);
   const thumbPosition = (SPEED_SLIDER_PAN.value / SPEED_SLIDER_PAN.max);
      console.log("thumb position = " +thumbPosition);
     const space = SPEED_SLIDER_PAN.offsetWidth - rangeThumb.offsetWidth;
         console.log(space)
   rangeThumb.style.left = (thumbPosition * space) + 'px'
   rangeLine.style.width = SPEED_SLIDER_PAN.value + '%'

   SPEED_SLIDER_PAN.addEventListener('input', rangeInputSlider)
}
rangeInputSlider();


const rangeInputSlider2 = () =>{
      let spanValue2 = 0;
      console.log("span value = " + spanValue2)
      if (SPEED_SLIDER_TILT.value < 50) {
            spanValue2 = SPEED_SLIDER_TILT.value*2 - 100;
      } else if(SPEED_SLIDER_TILT.value > 50){
            spanValue2 = (SPEED_SLIDER_TILT.value-50)*2;
      }
   // Insert the value of the input range
   rangeNumber2.textContent = spanValue2;

   const thumbPosition2 = (SPEED_SLIDER_TILT.value / SPEED_SLIDER_TILT.max);
     const space = SPEED_SLIDER_TILT.offsetWidth - rangeThumb2.offsetWidth;

   rangeThumb2.style.left = (thumbPosition2 * space) + 'px'

  
   rangeLine2.style.width = SPEED_SLIDER_TILT.value + '%'

   // We call the range input
   SPEED_SLIDER_TILT.addEventListener('input', rangeInputSlider2)
}
rangeInputSlider2()



