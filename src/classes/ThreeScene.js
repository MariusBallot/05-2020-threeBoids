import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import RAF from '../utils/raf'
import MothLoader from "./MothLoader"
import Boids from './Boids'
import MYGUI from '../managers/GUIManager'

class ThreeScene {
    constructor() {
        this.bind()

        this.orCamera
        this.scene
        this.renderer
        this.controls
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        document.body.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()

        this.orCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.orCamera.position.set(0, 0, 5)
        this.controls = new OrbitControls(this.orCamera, this.renderer.domElement)
        this.controls.enabled = true
        this.controls.maxDistance = 1500
        this.controls.minDistance = 0

        this.followCam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.fCamPos = new THREE.Vector3()
        this.offSetVec = new THREE.Vector3(0, 0, -.3)

        let light = new THREE.AmbientLight()
        let pointLight = new THREE.PointLight()
        pointLight.position.set(10, 10, 0)
        this.scene.add(light, pointLight)

        MothLoader.init()

        this.followCamActive = false
        MYGUI.addParam({ object: this, prop: "followCamActive" })

        window.addEventListener("resize", this.resizeCanvas)
        RAF.subscribe('threeSceneUpdate', this.update)
    }

    update() {
        if (Boids.group.children[0] != undefined) {
            this.fCamPos.copy(Boids.group.children[0].position)
            this.fCamPos.add(this.offSetVec)
            this.followCam.position.copy(this.fCamPos)
            this.followCam.lookAt(Boids.group.children[0].position)
        }

        let currCam = this.followCamActive ? this.followCam : this.orCamera
        this.renderer.render(this.scene, currCam);
    }


    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.orCamera.aspect = window.innerWidth / window.innerHeight
        this.orCamera.updateProjectionMatrix()

        this.followCam.aspect = window.innerWidth / window.innerHeight
        this.followCam.updateProjectionMatrix()
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new ThreeScene()
export default _instance