var scene;
var camera;
var renderer;

function createRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
                  45,
                  window.innerWidth / window.innerHeight
                  0.1,
                  1000);
  camera.position.x = 15;
  camera.position.y = 16;
  camera.position.z = 13;
  camera.lookAt(scene.position);

}

function createSphere() {
  var sphereGeometry = new THREE.SphereGeometry(6, 30, 30);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 'red'
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true;
  scene.add(sphere);
}

function createPlane() {
  var planeGeometry = new THREE.PlaneGeometry(40, 40);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcccccc
  });
  var plane = THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.rotation.y = -5;
  scene.add(plane);
}

function createLight() {
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(10, 20, 20);
  spotLight.shadowCameraNear = 20;
  spotLight.shadowCameraFar = 50;
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function init() {
  scene = new THREE.Scene();
  createRenderer();
  createCamera();
  createSphere();
  createPlane();
  createLight();
  document.body.appendChild(renderer.domElement);
  render();
}

function render() {
  renderer.render(camera, scene);
  requestAnimationFrame(render);
}

init();
