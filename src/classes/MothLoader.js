import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Boids from './Boids'
import ThreeScene from './ThreeScene'
import RAF from '../utils/raf'
import * as THREE from "three"

class MothLoader {
    constructor() {
        this.bind()
        this.modelLoader = new GLTFLoader()
        this.moth
        this.animations

    }

    init() {
        this.modelLoader.load('moth.glb', this.onLoad)
    }

    onLoad(obj) {
        this.moth = obj.scene
        this.moth.scale.multiplyScalar(.01)
        this.moth.traverse(child => {
            if (child instanceof THREE.Mesh)
                child.material = new THREE.MeshNormalMaterial()
        })

        this.animations = obj.animations
        Boids.init({ scene: ThreeScene.scene, mesh: this.moth })

    }

    bind() {
        this.onLoad = this.onLoad.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new MothLoader()
export default _instance