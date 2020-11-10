$( document ). ready( function(){

  var raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2(-1000,-1000);

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $( "body" ).append( renderer.domElement );

  scene.add( camera );
  camera.position.z = 5;

  let light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 0, camera.position.z );
  scene.add( light );

  let rotation = Math.random() * 20;
  let rotationInterval = 360/rotation;

  let contenedorCirculos = new THREE.Object3D();
  scene.add( contenedorCirculos );

  for ( let i = 0; i < 500; i+=rotationInterval ){
    let circulo = new THREE.Object3D();
    circulo.rotation.y += toRadians(i);
    contenedorCirculos.add( circulo );
  }

  let num = 70;
  let interval = 360/num;
  let radius = 2.4;
  let sizebox=  Math.random() * 0.1;

for ( let j = 0; j < contenedorCirculos.children.length; j++) {
  for( let i = 0; i < 360; i+= interval ){
    let geometry = new THREE.BoxGeometry( sizebox, sizebox, 0.2 );
    let material = new THREE.MeshLambertMaterial({ color: 0xffce00 , flatShading: true});
    let nodo = new THREE.Mesh( geometry, material );
    nodo.position.y = Math.cos( toRadians ( i ) ) * radius;
    nodo.position.z = Math.sin( toRadians ( i ) ) * radius;
  //  console.log(toRadians (i) );
    geometry.computeFlatVertexNormals();
    contenedorCirculos.children[ j ].add( nodo );
  }
}


  function animate(){
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    contenedorCirculos.rotation.y -= 0.002;
    contenedorCirculos.rotation.x -= 0.002;
   contenedorCirculos.rotation.z -= 0.001;

    raycaster.setFromCamera( mouse, camera );

  	var intersects = raycaster.intersectObjects( contenedorCirculos.children, true);
  	for ( var i = 0; i < intersects.length; i++ ) {
  		intersects[ i ].object.material.color.set( 0xffffff );

  }
}
animate();

function toRadians(degrees){
  var pi = Math.PI;
  return degrees * (pi/120);
}

$( document ).on( 'mousemove', function( e ){
   mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
   mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
   camera.position.x = mouse.x *2;
   camera.position.y = mouse.y*3;
   light.position.x = mouse.x*2;
   light.position.y = mouse.y*2;
   contenedorCirculos.rotation.z =  mouse.x/2;
   contenedorCirculos.rotation.x = mouse.y/2;
   camera.lookAt(0,0,0,);
});
});
