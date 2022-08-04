// 1. Solution
// using a bidimensional array 100 x 100 (raster image- retea bidimensionala)

let paper = document.querySelector('#paper');
let colorpicker = document.querySelector('#colorpicker');
let brush = document.querySelector('#brushsize');



//HW4: update the code so it uses THIS color
//HW5: change pixel size (1 = 1div, 2 = 2div x 2div, 3 = 3div x 3div)
brush.addEventListener('change', (e) => {
  let brushSize = e.target.value;
  console.log(brushSize);
  return brushSize;
});

colorpicker.addEventListener('change', (e) => {
  let imageColor = e.target.value;
  console.log(imageColor);
  return imageColor;
});

paper.addEventListener('mousemove', (e, colorpicker) => {
  if (e.buttons === 1) {
    // console.log(e);
    let y = Math.floor(e.clientY / 5);
    let x = Math.floor(e.clientX / 5);
    // console.log(x,y);
   
    pixels[y][x].color = this.colorpicker.value;
    // pixels[y][x].brush = this.brush;
    pixels[y][x].needsUpdate = true;
    renderImage(pixels, true);
  }
  
});

//HW3: add image dimension as parameters
// try it with 50 x 50 (min32 in video)
const createImage = (h, w) => {

  let image = []; // Array

  for (let y=0; y < h; y++) {

    let row = [];
    for (let x=0; x < w; x++) {
      row.push(
        { 
          color: "#00000000", //transparent
          needsUpdate: true
         }
      ); 

    }
    image.push(row);

  }
  paper.style.height = `${h * 5}px`;
  paper.style.width = `${w * 5}px`;

  return image;
}


const renderImage = (image, update = false) => {

  let wrapper = undefined;
 
  if (!update) {
    // clean paper
    paper.innerHTML = '';

    // groups all 1000 divs
    wrapper = document.createElement('div');
  }

  for (let y=0; y < 100; y++) {
    for (let x=0; x < 100; x++) {
     
      //OPTIMIZATION2:
      // update only the affected DIV

      if (image[y][x].needsUpdate) {

        if (update) {
          let div = document.getElementById(`p-${y}-${x}`);
          div.style.background = image[y][x].color;
        } else {
          let div = document.createElement('div');
          div.id = `p-${y}-${x}`;
          div.classList.add('point');
          //HW1: name 3 more methods of .classList
          //HW2: cons/pros .className vs .classList

          div.style.background = image[y][x].color;

          // OPTIMIZATION1:
          wrapper.appendChild(div);

          image[y][x].needsUpdate = false;
        }
      }

    }
  }
  if (!update) {
    paper.appendChild(wrapper);
  }
}

/////////////////////////////////

let pixels = createImage(100, 100);
renderImage(pixels);

//
// pixels[99][99].color = 'red';


/********** HOMEWORK  ***********/
/* HW1:
The methods of .classList are:
* .add() - adds one or more tokens to the list;
* .remove() - removes one or more tokens from the list;
* .replace() - replaces a token in the list;
* .forEach() - executes a callback function for each token in the list;
* .toggle() - toggles between tokens in the list;
  ...


  HW2:
  * .classList
      -  Using classList, you can add or remove a class without affecting any other classes the element may have.

      -  So this is helpful for adding additional classes to an element that contain other classes.

      -  classList has some handy methods like toggle and replace.

  * .className
      -  If you use className, it will wipe out any existing classes while adding the new one (or if you assign an empty string it will wipe out all of them).

      -  Using className can be a convenience when you know this element will not use any other classes.

*/