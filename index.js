const removeButton = document.querySelector('.btn-remove')

removeButton.addEventListener('click', reloadScene)

let renderer, scene, camera, container, raycaster, cube
let mouse = new THREE.Vector2(),
  INTERSECTED

init()
animate()

for (let i = 0; i <= 20; i++) {
  addCube()
}

function init() {
  container = document.createElement('div')
  document.body.appendChild(container)

  // camera init
  camera = new THREE.PerspectiveCamera(
    75, // view angle
    window.innerWidth / window.innerHeight, // Aspect ratio (?)
    0.1, // near
    1000 // far
  )
  camera.position.set(0, 0, 20)
  camera.lookAt(0, 0, 0)

  // scene/render/raycaster init
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  raycaster = new THREE.Raycaster()

  // appending renderer
  renderer.setClearColor(0xcccccc)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)

  // attaching mouse coordinate getter and window resizer
  document.addEventListener('mousemove', onDocumentMouseMove, false)
  window.addEventListener('resize', onResize, false)
  renderer.render(scene, camera)
}

function onDocumentMouseMove(e) {
  e.preventDefault()
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.updateProjectionMatrix()
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function addCube() {
  const geometry = new THREE.BoxGeometry(3, 1, 1)
  const material = new THREE.MeshNormalMaterial()

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = getRandomInt(-10, 10)
  cube.position.y = getRandomInt(-10, 10)
  cube.position.z = getRandomInt(-10, 10)

  cube.rotation.x = getRandomInt(-10, 10)
  cube.rotation.y = getRandomInt(-10, 10)
  cube.rotation.z = getRandomInt(-10, 10)

  scene.add(cube)
}

function reloadScene() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0])
  }
  for (let i = 0; i <= 10; i++) {
    addCube()
  }
}

function render() {
  raycaster.setFromCamera(mouse, camera)
  let intersects = raycaster.intersectObjects(scene.children, true)

  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.rotation.x += 0.05
    intersects[i].object.rotation.y -= 0.05
    intersects[i].object.rotation.z -= 0.05
  }

  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED) {
        INTERSECTED.material.wireframe = false
      }
      // This is the code that happens when the raycaster intersects with an object
      INTERSECTED = intersects[0].object
      INTERSECTED.material.wireframe = true
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.wireframe = false
    INTERSECTED = null
  }
  renderer.render(scene, camera)
}
