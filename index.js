let renderer, scene, camera, container, raycaster
let mouse = new THREE.Vector2(),
  INTERSECTED

init()
animate()
addCube()

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
  camera.position.set(0, 0, 10)
  camera.lookAt(0, 0, 0)

  // scene/render/raycaster init
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  raycaster = new THREE.Raycaster()

  // appending renderer
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)

  // making a cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  console.log(cube)

  // attaching mouse coordinate getter and window resizer
  document.addEventListener('mousemove', onDocumentMouseMove, false)
  document.addEventListener('resize', onResize, false)
  renderer.render(scene, camera)
}

function onDocumentMouseMove(e) {
  e.preventDefault()
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = (e.clientY / window.innerHeight) * 2 + 1
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
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  console.log(cube)
}

function render() {
  // console.log(mouse)
  raycaster.setFromCamera(mouse, camera)
  let intersects = raycaster.intersectObjects(scene.children, true)
  renderer.render(scene, camera)
}
