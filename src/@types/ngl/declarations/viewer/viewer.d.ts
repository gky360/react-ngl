/**
 * @file Viewer
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */
import { Signal } from 'signals';
import { PerspectiveCamera, OrthographicCamera, Box3, Matrix4, Color, WebGLRenderer, Scene, Group } from 'three';
import '../shader/BasicLine.vert';
import '../shader/BasicLine.frag';
import '../shader/Quad.vert';
import '../shader/Quad.frag';
import Stats from './stats';
import { ImageParameters } from './viewer-utils';
import Buffer from '../buffer/buffer';
export declare type CameraType = 'perspective' | 'orthographic' | 'stereo';
export interface ViewerSignals {
    ticked: Signal;
    rendered: Signal;
}
export interface ViewerParameters {
    fogColor: Color;
    fogNear: number;
    fogFar: number;
    backgroundColor: Color;
    cameraType: CameraType;
    cameraFov: number;
    cameraEyeSep: number;
    cameraZ: number;
    clipNear: number;
    clipFar: number;
    clipDist: number;
    clipMode: string;
    clipScale: string;
    lightColor: Color;
    lightIntensity: number;
    ambientColor: Color;
    ambientIntensity: number;
    sampleLevel: number;
}
export interface BufferInstance {
    matrix: Matrix4;
}
/**
 * Viewer class
 * @class
 * @param {String|Element} [idOrElement] - dom id or element
 */
export default class Viewer {
    signals: ViewerSignals;
    container: HTMLElement;
    wrapper: HTMLElement;
    private rendering;
    private renderPending;
    private lastRenderedPicking;
    private isStill;
    sampleLevel: number;
    private cDist;
    private bRadius;
    private parameters;
    stats: Stats;
    perspectiveCamera: PerspectiveCamera;
    private orthographicCamera;
    private stereoCamera;
    camera: PerspectiveCamera | OrthographicCamera;
    width: number;
    height: number;
    scene: Scene;
    private spotLight;
    private ambientLight;
    rotationGroup: Group;
    translationGroup: Group;
    private modelGroup;
    private pickingGroup;
    private backgroundGroup;
    private helperGroup;
    renderer: WebGLRenderer;
    private supportsHalfFloat;
    private pickingTarget;
    private sampleTarget;
    private holdTarget;
    private compositeUniforms;
    private compositeMaterial;
    private compositeCamera;
    private compositeScene;
    private boundingBoxMesh;
    boundingBox: Box3;
    private boundingBoxSize;
    private boundingBoxLength;
    private info;
    private distVector;
    constructor(idOrElement: string | HTMLElement);
    private _initParams;
    private _initCamera;
    private _initStats;
    private _initScene;
    private _initRenderer;
    private _initHelper;
    updateHelper(): void;
    add(buffer: Buffer, instanceList?: BufferInstance[]): void;
    addBuffer(buffer: Buffer, instance?: BufferInstance): void;
    remove(buffer: Buffer): void;
    private _updateBoundingBox;
    updateBoundingBox(): void;
    getPickingPixels(): Uint8Array | Float32Array;
    getImage(picking: boolean): Promise<unknown>;
    makeImage(params?: Partial<ImageParameters>): Promise<Blob>;
    setLight(color: Color | number | string, intensity: number, ambientColor: Color | number | string, ambientIntensity: number): void;
    setFog(color?: Color | number | string, near?: number, far?: number): void;
    setBackground(color?: Color | number | string): void;
    setSampling(level: number): void;
    setCamera(type: CameraType, fov?: number, eyeSep?: number): void;
    setClip(near: number, far: number, dist: number, clipMode?: string, clipScale?: string): void;
    setSize(width: number, height: number): void;
    handleResize(): void;
    updateInfo(reset?: boolean): void;
    animate(): void;
    pick(x: number, y: number): {
        pid: number;
        instance: any;
        picker: any;
    };
    requestRender(): void;
    updateZoom(): void;
    /**
     * Convert an absolute clip value to a relative one using bRadius.
     *
     * 0.0 -> 50.0
     * bRadius -> 0.0
     */
    absoluteToRelative(d: number): number;
    /**
     * Convert a relative clip value to an absolute one using bRadius
     *
     * 0.0 -> bRadius
     * 50.0 -> 0.0
     */
    relativeToAbsolute(d: number): number;
    /**
     * Intepret clipMode, clipScale and set the camera and fog clipping.
     * Also ensures bRadius and cDist are valid
     */
    private __updateClipping;
    private __updateCamera;
    private __setVisibility;
    private __updateLights;
    private __renderPickingGroup;
    private __renderModelGroup;
    private __renderSuperSample;
    private __renderStereo;
    private __render;
    render(picking?: boolean): void;
    clear(): void;
    dispose(): void;
}
