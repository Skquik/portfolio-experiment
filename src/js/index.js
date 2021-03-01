import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import type from '../css/helvetiker_bold.typeface.json'

const canvas = document.querySelector('canvas.webgl')
const scene  = new THREE.Scene()
const fontLoader = new THREE.FontLoader()


const font = new THREE.Font(type)
const normalMaterial = new THREE.MeshNormalMaterial()

const textGeometry = new THREE.TextGeometry('PAUL',
    {
        font,
        size: 2,
        height:1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize:0.04,
        bevelOffset:0,
        bevelSegments: 5,
    })
const paul = new THREE.Mesh(
    textGeometry,
    normalMaterial
)
const nallet = new THREE.Mesh(
    new THREE.TextGeometry('NALLET',
        {
            font,
            size: 2,
            height:1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize:0.04,
            bevelOffset:0,
            bevelSegments: 5,
        }),
    normalMaterial
)
nallet.geometry.computeBoundingBox()
nallet.geometry.center()
nallet.position.y = -0.5
textGeometry.computeBoundingBox()
textGeometry.center()
paul.position.y = 1.8
scene.add(paul, nallet)


const particleMat = new THREE.PointsMaterial({
    size:0.02,
    sizeAttenuation:true
})
const sphereParticles = new THREE.SphereGeometry(8, 32, 32)
const particles = new THREE.Points(sphereParticles, particleMat)
scene.add(particles)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 8
scene.add(camera)
scene.background = new THREE.Color("#1C1C1C")

// Controls,
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    paul.rotation.y =  - Math.cos(elapsedTime ) * .3
    nallet.rotation.y =  Math.cos(elapsedTime) * 0.2

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()