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

// Defining the geometry on our 3D element
// SphereGeometry(radius:Float, widthSegments:Int, heightSegments:Int)
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Creating the material
const material = new THREE.MeshLambertMaterial( {color: 0xffcc00} );
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(2, 2, -2) // is the same as:
// mesh.position.x = 2;
// mesh.position.y = 2;
// mesh.position.z = -2;

// Other two properties that you can add:
// mesh.rotation.set(45, 0, 0)
// mesh.scale.set(1, 2, 1)

// We add our sphere that we've created above into our scene:
scene.add(mesh);

// Adding light to our sphere
const light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10,0,25);
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

render();

// this is linked with the pluggin on line 16 in the index.html
this.tl = new TimelineMax({paused: true});
this.tl.to(this.mesh.scale, 1, {x: 2, ease: Expo.easeOut});
this.tl.to(this.mesh.scale, .5, {x: .5, ease: Expo.easeOut});
this.tl.to(this.mesh.position, .5, {x: 2, ease: Expo.easeOut});
this.tl.to(this.mesh.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut});

// we call an event listener in our body so that when the user click on it
// the object will "play"
document.body.addEventListener('click', () => {
  this.tl.play();
})







