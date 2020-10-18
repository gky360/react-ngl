/**
 * @file Sphere Buffer
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */
import { Vector3, Matrix4 } from 'three';
import { BufferData } from './buffer';
export interface SphereBufferData extends BufferData {
    radius: Float32Array;
}
export declare const SphereBufferDefaultParameters: {
    disableImpostor: boolean;
} & {
    sphereDetail: number;
} & {
    opaqueBack: boolean;
    side: import("./buffer").BufferSide;
    opacity: number;
    depthWrite: boolean;
    clipNear: number;
    clipRadius: number;
    clipCenter: Vector3;
    flatShaded: boolean;
    wireframe: boolean;
    roughness: number;
    metalness: number;
    diffuse: number;
    diffuseInterior: boolean;
    useInteriorColor: boolean;
    interiorColor: number;
    interiorDarkening: number;
    forceTransparent: boolean;
    matrix: Matrix4;
    disablePicking: boolean;
    sortParticles: boolean;
    background: boolean;
};
export declare type SphereBufferParameters = typeof SphereBufferDefaultParameters;
/**
 * Sphere buffer. Depending on the value {@link ExtensionFragDepth} and
 * `params.disableImpostor` the constructor returns either a
 * {@link SphereGeometryBuffer} or a {@link SphereImpostorBuffer}
 * @implements {Buffer}
 *
 * @example
 * var sphereBuffer = new SphereBuffer( {
 *     position: new Float32Array( [ 0, 0, 0 ] ),
 *     color: new Float32Array( [ 1, 0, 0 ] ),
 *     radius: new Float32Array( [ 1 ] )
 * } );
 */
declare class SphereBuffer {
    /**
     * @param {Object} data - buffer data
     * @param {Float32Array} data.position - positions
     * @param {Float32Array} data.color - colors
     * @param {Float32Array} data.radius - radii
     * @param {Picker} [data.picking] - picking ids
     * @param {BufferParameters} params - parameters object
     * @return {SphereGeometryBuffer|SphereImpostorBuffer} the buffer object
     */
    constructor(data: SphereBufferData, params: SphereBufferParameters);
}
export default SphereBuffer;
