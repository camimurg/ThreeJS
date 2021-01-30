// This three variables are the primary things you have to set up for every
// ThreeJS project:
// 1. SCENE
const scene = new THREE.Scene();

// 2. CAMERA
// creating a PERSPECTIVE camera (there are also more) with 4 different parameters
const camera = new THREE.PerspectiveCamera(
  75, // field of view (FOV = the extent of the scene that is seen on the display
  // at any given moment. The value is in degrees
  window.innerWidth/window.innerHeight, // the aspect ratio
   0.1, // near and far plane
  1000 // ???
  );
camera.position.z = 5; // in order to display our sphere

// 3. RENDERER (WebGL, CSS 2d, CSS 3d, SVG)
// antialias true otherwise result will look jagged
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#1f3360"); // set the background color
// set the size of the render
renderer.setSize(window.innerWidth,window.innerHeight);

// now we need to append child the renderer DOM element. In a fancy way:
// I create our canvas element with the renderer settings
document.body.appendChild(renderer.domElement);

// readjusting the window screen
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // everytime we have an adjustment on the camera we have to call update
  // Projection Matrix function
  camera.updateProjectionMatrix();
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Defining the geometry on our 3D element

// SphereGeometry(radius:Float, widthSegments:Int, heightSegments:Int)
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Creating the material
const material = new THREE.MeshLambertMaterial({color: 0xffcc00});
// const mesh = new THREE.Mesh(geometry, material);

// We add our sphere that we've created above into our scene:
// scene.add(mesh);
meshX = -10;
for(var i = 0; i<15;i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 10;
  mesh.position.z = (Math.random() - 0.5) * 10;
  scene.add(mesh);
  meshX+=1;
}


// Adding light to our sphere
var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000);
light.position.set(0,0,25);
scene.add(light);

// Creating a function where we set the animation property so that the object
// stay the same if we resize the window and ... in order to have the background
// colour set up, and also the position of the camera,
// we need to render it in the renderer with the method render
const render = function() {
  requestAnimationFrame(render);
  // Rotating the object!
  // mesh.rotation.x += 0.02; it's adding 0.01 every time the function is called
  // mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
};

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.x = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    // intersects[i].object.material.color.set(colorname) --> to change the color

    // this is linked with the pluggin on line 16 in the index.html
    // !!! scale is not working, cannot read the property 'scale' of undefined!!!
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
    this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
    this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
    this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5");
  }
}

window.addEventListener('mousemove', onMouseMove);
render();





