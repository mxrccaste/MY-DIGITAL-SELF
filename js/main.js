import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;
let objToRender = 'iphone';
const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    object.tipo = `models/${objToRender}/scene.gltf`;
    object.scale.set(90, 90, 90);
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = objToRender === "dino" ? 25 : 500;

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "iphone" ? 5 : 1);
scene.add(ambientLight);

if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
}

let mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);
var contadorModelos = 0;


document.getElementById('btn').addEventListener('click', function () {
  var textElements = document.getElementsByClassName('headline-container');
  for (var i = 0; i < textElements.length; i++) {
    textElements[i].style.display = 'none';
  }
  for (var i = scene.children.length - 1; i >= 0; i--) {
    var obj = scene.children[i];
    if (obj.type !== 'DirectionalLight' && obj.type !== 'AmbientLight' && obj.type !== 'PointLight') {
      scene.remove(obj);
    }
  }
 
  var closeFriendsElement = document.getElementById('closefriends');
  if (closeFriendsElement !== null) {
    closeFriendsElement.style.display = 'none';
  }

  var compartirElement = document.getElementById('compartir');
  if (compartirElement !== null) {
    compartirElement.style.display = 'none';
  }


  var modelos = {
    'models/eye/scene.gltf': { titulo: 'LIMITED PRIVACY', escala: { x: 1, y: 1, z: 1 } },
    'models/teddy5/scene.gltf': { titulo: 'COMMUNITY', escala: { x: 0.4, y: 0.4, z: 0.4 } },
    'models/sanic/scene.gltf': { titulo: 'FUNNY', escala: { x: 0.25, y: 0.25, z: 0.25 } },
    'models/plane/scenica.gltf': { titulo: 'GLOBALIZATION', escala: { x: 1, y: 1, z: 1 } }
  };
  var rutasModelos = Object.keys(modelos);
  var modeloEspecifico = rutasModelos[contadorModelos % rutasModelos.length];

  contadorModelos++;

  loader.load(modeloEspecifico, function (gltf) {
    object = gltf.scene;
    object.tipo = modeloEspecifico;
    var escala = modelos[modeloEspecifico].escala;
    object.scale.set(escala.x, escala.y, escala.z);
    scene.add(object);

    var titulo = document.getElementById('titulo');
    titulo.style.display = 'block';
    titulo.innerText = modelos[modeloEspecifico].titulo;
    if (modeloEspecifico === 'models/sanic/scene.gltf') {
      object.position.y += 90;
    }
  });
  if (modeloEspecifico === 'models/plane/scenica.gltf') {
    
    document.getElementById('compartir').style.display = 'block';
    document.getElementById('compartir').addEventListener('click', function () {
      var modeloEspecificoCompartir = 'models/plane/scenica.gltf';
      loader.load(modeloEspecificoCompartir, function (gltf) {
        scene.add(gltf.scene);
        gltf.animations = [];
        gltf.scene.position.x = 700;
        gltf.scene.scale.set(400, 400, 400);
        gltf.scene.rotation.set(0, 0, 0);

        
        

        
        

      
        function animate() {
          requestAnimationFrame(animate);
          gltf.scene.position.y += 1;
          gltf.scene.position.x -= 12;
          gltf.scene.position.z += 1;
          
          renderer.render(scene, camera);
        }
        animate();
        
      });
    });
  } 

  if (modeloEspecifico === 'models/teddy5/scene.gltf') {
    document.getElementById('closefriends').style.display = 'block';

    document.getElementById('closefriends').addEventListener('click', function () {
      var modeloEspecificoCloseFriends = 'models/teddy/scene.gltf';

      loader.load(modeloEspecificoCloseFriends, function (gltf) {
        var object = gltf.scene;
        object.tipo = modeloEspecifico;
        var escala = { x: 0.4, y: 0.4, z: 0.4 };
        object.scale.set(escala.x, escala.y, escala.z);

        var radio = 200;
        var angulo = Math.random() * Math.PI * 2;
        var x = radio * Math.cos(angulo);
        var z = radio * Math.sin(angulo);
        object.position.set(x, 200, z);

        scene.add(object);

        var velocidad = 9.8;
        function animate() {
          requestAnimationFrame(animate);
          if (object.position.y > 0) {
            object.position.y -= velocidad;
          } else {
            document.getElementById('closefriends').disabled = false;
          }
        }
        animate();
      });
    });
  }
});


function animate() {
  requestAnimationFrame(animate);
  if (object) {
    if (object.tipo !== 'models/teddy5/scene.gltf' && object.tipo !== 'models/sanic/scene.gltf' && object.tipo !== 'models/plane/scenica.gltf') {
      object.rotation.y = -3 + mouseX / window.innerWidth * 3;
      object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
    if (object.tipo === 'models/sanic/scene.gltf') {
      object.rotation.y += 0.2;
    }
  }
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();