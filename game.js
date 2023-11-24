// window.onload = function() {
//   const image = new Image()
//   image.src = './assets/surface.png';
  
// };

const image = new Image()
image.src = './assets/surface.png';

// import surface from './assets/surface.png' 
// window.addEventListener('load',()=>{
//   window.location.replace('./index.html')
// })

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024 
canvas.height = 576
const g = 0.4

class Character {
    constructor() {
        this.position = {
            x: 90,
            y: 0
        }
        this.speed = {
            x :3,
            y : 0.9
        }
        this.width = 30
        this.height = 30
    }
    shape() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    edit() {
        this.shape();
        this.position.x += this.speed.x
        this.position.y += this.speed.y;
      
        const isWithinCanvas = this.position.y + this.speed.y + this.height <= canvas.height;
      
        if (isWithinCanvas) {
          this.speed.y += g;
        } else {
          this.speed.y = 0;
        }
      }
}
// class Character {
//   // ... (existing code)
//   constructor() {
//     this.position = {
//         x: 90,
//         y: 90
//     }
//     this.speed = {
//         x : 0.5,
//         y : 0.9
//     }
//     this.width = 30
//     this.height = 30
// }
// shape() {
//     context.fillStyle = 'red'
//     context.fillRect(this.position.x, this.position.y, this.width, this.height)
// }
// edit() {
//   this.shape();
//   this.position.x += this.speed.x
//   this.position.y += this.speed.y;

//   const isWithinCanvas = this.position.y + this.speed.y + this.height <= canvas.height;

//   if (isWithinCanvas) {
//     this.speed.y += g;
//   } else {
//     this.speed.y = 0;
//   }
// }

//   edit() {
//       this.shape();
//       this.position.x += this.speed.x;
//       this.position.y += this.speed.y;

//       const isWithinCanvas = this.position.y + this.speed.y + this.height <= canvas.height;
//       const maxHeight = 200; // Set your desired maximum height

//       if (isWithinCanvas && this.position.y < maxHeight) {
//           this.speed.y += g;
//       } else {
//           this.speed.y = 0;
//           this.position.y = Math.min(this.position.y, maxHeight); // Limit the character's height
//       }
//   }
// }

  


class Surface{
    constructor({x,y, image}) {
        this.position = {
            x: x,
            y: y
        }
        this.image = image   //image
        this.width = image.width
        this.height = image.height
         
    }

    draw(){
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}



const character = new Character()
const surfaces = [new Surface({x:0, y:470, image}), 
  new Surface
  ({x:image.width-2,y:470, image: image}), new Surface({x:image.width + 750, y:350,image: image}), new Surface({x:image.width + 1000, y:200,image: image}),new Surface({x:image.width + 1800, y:500,image: image})]


const key = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
      pressed: false
    }
}

let winScenario = 0   //scrollOffset

function animation() {
    requestAnimationFrame(animation)

    var blueprint_background = new Image();
blueprint_background.src = './assets/parralaxBackground.png'; 
blueprint_background.onload = function(){
    var pattern = context.createPattern(this, "repeat");
    context.fillStyle = pattern;
    context.fill();
};

    // context.fillStyle = pattern;
    // context.fill();
    // context.fillStyle = 'black'
    context.fillRect(0,0, canvas.width, canvas.height)
    
    surfaces.forEach((surface) =>{
      surface.draw()
    })
    character.edit()
    

    if (key.right.pressed && character.position.x<400){
        
        character.speed.x = 8
    }
    else if(key.left.pressed && character.position.x > 100){
        character.speed.x = -8
    }
    else if(key.up.pressed && character.position.y > canvas.height){
      character.speed.y = 0
    }
    else{
        character.speed.x = 0

        if(key.right.pressed) {
          winScenario += 5
          surfaces.forEach((surface) =>{
            surface.position.x -= 8
          })
      
        }
        else if(key.left.pressed) {
          winScenario -= 5
          surfaces.forEach((surface) =>{
            surface.position.x += 8
          })
            
        }
        if (winScenario > 2000) {
          console.log('you win')
        }
    }

    character.speed.x = key.right.pressed && character.position.x <400 ? 15 : key.left.pressed && character.position.x > 100  ? -15 : 0;

    surfaces.forEach((surface) =>{
    
    if(character.position.y + character.height <= surface.position.y 
          && character.position.y + character.height + character.speed.y  >=surface.position.y && character.position.x + character.width >= surface.position.x && character.position.x <= surface.position.x + surface.width) {
        character.speed.y = 0 
    } 
  })

}

animation()

addEventListener('keydown', ({ keyCode }) => {
    if (keyCode === 65) {
      console.log('left');
      key.left.pressed = true;
    }
     else if (keyCode === 83) {
      console.log('down');
    } 
    else if (keyCode === 87) {
      console.log('up');
      character.speed.y -= 15;
    } 
    else if (keyCode === 68) {
      console.log('right');
      key.right.pressed = true;
    }
  });
  

  addEventListener('keyup', ({ keyCode }) => {
    if (keyCode === 65) {
      console.log('left');
      key.left.pressed = false;
    } 
    else if (keyCode === 83) {
      console.log('down');
    }
     else if (keyCode === 87) {
      console.log('up');
      character.speed.y += 5; 
    }
     else if (keyCode === 68) {
      console.log('right');
      key.right.pressed = false;
    }
  });
  
//   let counter = document.getElementById('counter')
//   let timerId;
//   var count = 3
//   counter.innerText = count
  
//   function timer(){
//     timerId = setInterval(function () {
//       count--
//       counter.innerText = count;
// if (count === 0) {
//         clearInterval(timerId)
//       counter.style.visibility = 'hidden';
//       if (!localStorage.getItem('pageRefreshed')) {
//         // Set a flag in local storage
//         localStorage.setItem('pageRefreshed', true);
      
//         // Reload the page
//         window.location.reload();}

// }
//   },1000)
//   }


// Run the timer function once after a delay (e.g., 1000 milliseconds or 1 second)
// setTimeout(timer, 1000)


// let counter = document.getElementById('counter');
//     let timerId;
//     let count = 3;
//     counter.innerText = count;

//     function timer() {
//         timerId = setInterval(function () {
//             count--;
//             counter.innerText = count;

//             if (count === 0) {
//                 clearInterval(timerId);
//                 counter.style.visibility = 'hidden';

//                 if (!localStorage.getItem('pageRefreshed')) {
//                     // Set a flag in local storage
//                     localStorage.setItem('pageRefreshed', true);

//                     // Reload the page
//                     window.location.reload();
//                 }
//             }
//         }, 1000);
//     }

//     // Run the timer function once
//     timer()

// let counter = document.getElementById('counter');
//     let count = 3;
//     counter.innerText = count;

//     function timer() {
//         count--;
//         counter.innerText = count;

//         if (count < 0) {
//             clearInterval(timerId);
//             counter.style.visibility = 'hidden';

//             if (!localStorage.getItem('pageRefreshed')) {
//                 // Set a flag in local storage
//                 localStorage.setItem('pageRefreshed', true);

//                 // Reload the page
//                 location.reload();
//             }
//         }
//     }

//     // Run the timer function once after a delay (e.g., 1000 milliseconds or 1 second)
//     let timerId = setInterval(timer, 1000);

// function generateRandomSurfaces(number) {
//   const surfaceWidth = 50; // You can adjust the width of surfaces
//   const generatedSurfaces = [];

//   for (let i = 0; i < number; i++) {
//       const randomX = Math.random() * (canvas.width - surfaceWidth);
//       const randomY = Math.random() * (canvas.height - 100); // Adjust as needed

//       generatedSurfaces.push(new Surface({ x: randomX, y: randomY, image }));
//   }

//   return generatedSurfaces;
// }

let counter = document.getElementById('counter');
    let count = 3;
    counter.innerText = count;

    function timer() {
        count--;
        counter.innerText = count;

        if (count <= 0) {
            clearInterval(timerId);
            counter.style.visibility = 'hidden';

            if (!localStorage.getItem('pageRefreshed')) {
                // Set a flag in local storage
                localStorage.setItem('pageRefreshed', true);

                // Reload the page
                location.reload();
            }
        }
    }

    // Run the timer function once after a delay (e.g., 1000 milliseconds or 1 second)
    let timerId = setInterval(timer, 1000);