// MatCap-style image rendered on a sphere

var camera, scene, renderer;
var image;

init();
animate();

function init() {

  info = document.createElement( 'div' );
  info.style.position = 'absolute';
  info.style.top = '30px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.style.color = '#fff';
  info.style.fontWeight = 'bold';
  info.style.backgroundColor = 'transparent';
  info.style.zIndex = '1';
  info.style.fontFamily = 'Monospace';
  info.innerHTML = 'Drag mouse to rotate camera; scroll to zoom';
  document.body.appendChild( info );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 0, 150 );

  controls = new THREE.OrbitControls( camera );
  controls.minDistance = 75;
  controls.maxDistance = 200;
    controls.enablePan = false;

    image = document.createElement( 'img' );
    document.body.appendChild( image );

    var texture = new THREE.Texture( image );
    image.addEventListener( 'load', function ( event ) { texture.needsUpdate = true; } );

  var uniforms = {
    "texture": { type: "t", value: texture }
  };

  // material
  var material = new THREE.ShaderMaterial( {
    uniforms    : uniforms,
    vertexShader  : document.getElementById( 'vertex_shader' ).textContent,
    fragmentShader  : document.getElementById( 'fragment_shader' ).textContent
  } );

  scene.add( new THREE.Mesh( new THREE.SphereGeometry( 30, 32, 24 ), material ) );

}

function animate() {

  requestAnimationFrame( animate );

  //controls.update(); // not required here

  render();

}

function render() {

  renderer.render( scene, camera );

}

image.src = 'assets/James_Eye_Green.jpg'
