import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
let container;
let camera;
let renderer; //render the 3d object
let scene; //3d world scene
let house;
let controls;

const init = () => {
    container = document.querySelector(".scene");

    //scene
    scene = new THREE.Scene();

    const fov = 20;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    //camera 
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 1, 25);

    //lighting
    const ambient = new THREE.AmbientLight(0x404040, 3); //add general lighting
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', light_update);

    function light_update() {
        light.position.copy(camera.position);
    }

    //load model
    let loader = new THREE.GLTFLoader;
    loader.load("./super_meat_boy_free/scene.gltf", function (gltf) {
        scene.add(gltf.scene);
        console.log(gltf)
        house = gltf.scene.children[0];
        renderer.render(scene, camera);
        animate()
    });
};

//rotate the model
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
};

const windowResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight)
}

init();
window.addEventListener("resize", windowResize);