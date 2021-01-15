// This three variables are the primary things you have to set up for every ThreeJS project:
// 1. SCENE
const scene = new THREE.Scene();

// 2. CAMERA
// creating a PERSPECTIVE camera (there are also more) with 4 different parameters
const camera = new THREE.PerspectiveCamera(
  75, // field of view (FOV = the extent of the scene that is seen on the display at any given moment. The value is in degrees)
  window.innerWidth/window.innerHeight, // the aspect ratio based on the inner width and inner height
   0.1, // near and far plane
  1000 // ???
  );
camera.position.z = 5; // in order to display our sphere

// 3. RENDERER (WebGL, CSS 2d, CSS 3d, SVG)
const renderer = new THREE.WebGLRenderer({antialias: true}); // otherwise the result will look jagged
renderer.setClearColor("#e5e5e5"); // set the background color
renderer.setSize(window.innerWidth,window.innerHeight); // set the size of the render

// now we need to append child the renderer DOM element. In a fancy way: I create our canvas element with the renderer settings
document.body.appendChild(renderer.domElement);

// readjusting the window screen
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // everytime we have an adjustment on the camera we have to call update Project Matrix function
  camera.updateProjectionMatrix();
});

// Defining the geometry on our 3D element
const geometry = new THREE.BoxGeometry(1, 1, 1); // SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer
// Creating the material
const material = new THREE.MeshLambertMaterial( {color: 0xffcc00} );
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(2, 2, -2) // is the same as:
// mesh.position.x = 2;
// mesh.position.y = 2;
// mesh.position.z = -2;
mesh.rotation.set(45, 0, 0)

// We add our sphere that we've created above into our scene:
scene.add(mesh);

// Adding light to our sphere
const light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10,0,25);
scene.add(light);

// Creating a function where we set the animation property so that the object stay the same if we resize the window and ... in order to have the background colour set up, and also the position of the camera, we need to render it in the renderer with the method render
const render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();










