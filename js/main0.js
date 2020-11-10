$ ( document ).ready( function(){
 console.log('DOM listo');


      let mouse = new THREE.Vector2(-1000,-1000);

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      var renderer = new THREE.WebGLRenderer();
 			renderer.setSize( window.innerWidth, window.innerHeight );
 			$("body").append( renderer.domElement );

      var light = new THREE.PointLight( 0xffffff, 1, 1000 );
      light.position.set( 0, 0, 4 );
      light.castShadow = true;
      scene.add( light );

      camera.position.z = 6;
      let contenedor = new THREE.Object3D();
      scene.add( contenedor);




      function animate(){
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
    animate();

    let isPressed = false;
    let = timeCounter = 0;


    $( window ).on( 'mousemove', function( e ){
       mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  	   mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
       camera.position.x = mouse.x*5;
       camera.position.y = mouse.y*5;
       light.position.x = mouse.x*2;
       light.position.y = mouse.y*2;
       camera.lookAt(0, 0, 0, );


       if(isPressed){

             mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
             mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

             //let geometry = new THREE.BoxGeometry( 0.2 * mouse.x, 0.2 * mouse.y, 0.2);
             let geometry = new THREE.BoxGeometry( 0.2 * (timeCounter * 0.1), 0.2 * (timeCounter * 0.1),0.2 * (timeCounter * 10));
             let material = new THREE.MeshLambertMaterial({ color: 0xF5314d, flatShading: true} );
             geometry.computeFlatVertexNormals();
             let ico = new THREE.Mesh( geometry, material );

             var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
             vector.unproject( camera );
             var dir = vector.sub( camera.position ).normalize();
             var distance = - camera.position.z / dir.z;
             var pos = camera.position.clone().add(dir.multiplyScalar( distance ));
             ico.position.copy(pos);

             ico.position.z += (timeCounter* 0.005);
             ico.rotation.z += (timeCounter* 0.01);

             contenedor.add( ico );
             timeCounter++;
             camera.position.z ++;
             light.position.z ++;
       }
    });


    $( window ).on( 'mousedown', function(){
      isPressed = true;
    });

    $( window ).on( 'mouseup', function(){
      isPressed = false;
      timeCounter = 0;
    });



    $( window ).on('click', function(e){
    });
  });
