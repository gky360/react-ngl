/**
 * @file Colormaker
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */
import { Vector3 } from 'three';
import * as chroma from 'chroma-js';
import { NumberArray, Partial } from '../types';
import Structure from '../structure/structure';
import Surface from '../surface/surface';
import Volume from '../surface/volume';
import AtomProxy from '../proxy/atom-proxy';
import BondProxy from '../proxy/bond-proxy';
export declare type ColorMode = 'rgb' | 'hsv' | 'hsl' | 'hsi' | 'lab' | 'hcl';
export declare const ScaleDefaultParameters: {
    scale: string | string[];
    mode: ColorMode;
    domain: number[];
    value: number;
    reverse: boolean;
};
export declare type ScaleParameters = typeof ScaleDefaultParameters;
export interface ColormakerParameters extends ScaleParameters {
    structure?: Structure;
    volume?: Volume;
    surface?: Surface;
}
export declare type StuctureColormakerParams = {
    structure: Structure;
} & Partial<ColormakerParameters>;
export declare type VolumeColormakerParams = {
    volume: Volume;
} & Partial<ColormakerParameters>;
export declare type ColormakerScale = (v: number) => number;
/**
 * Class for making colors.
 * @interface
 */
declare abstract class Colormaker {
    parameters: ColormakerParameters;
    atomProxy?: AtomProxy;
    /**
     * Create a colormaker instance
     * @param  {ColormakerParameters} params - colormaker parameter
     */
    constructor(params?: Partial<ColormakerParameters>);
    getScale(params?: Partial<ScaleParameters>): chroma.Scale<any>;
    /**
     * safe a color to an array
     * @param  {Integer} color - hex color value
     * @param  {Array|TypedArray} array - destination
     * @param  {Integer} offset - index into the array
     * @return {Array} the destination array
     */
    colorToArray(color: number, array?: NumberArray, offset?: number): NumberArray;
    atomColor?(atom: AtomProxy): number;
    /**
     * safe a atom color to an array
     * @param  {AtomProxy} atom - atom to get color for
     * @param  {Array|TypedArray} array - destination
     * @param  {Integer} offset - index into the array
     * @return {Array} the destination array
     */
    atomColorToArray(atom: AtomProxy, array: NumberArray, offset: number): NumberArray;
    /**
     * return the color for an bond
     * @param  {BondProxy} bond - bond to get color for
     * @param  {Boolean} fromTo - whether to use the first or second atom of the bond
     * @return {Integer} hex bond color
     */
    bondColor(bond: BondProxy, fromTo: boolean): number;
    /**
     * safe a bond color to an array
     * @param  {BondProxy} bond - bond to get color for
     * @param  {Boolean} fromTo - whether to use the first or second atom of the bond
     * @param  {Array|TypedArray} array - destination
     * @param  {Integer} offset - index into the array
     * @return {Array} the destination array
     */
    bondColorToArray(bond: BondProxy, fromTo: boolean, array: NumberArray, offset: number): NumberArray;
    volumeColor?(index: number): number;
    /**
     * safe a volume cell color to an array
     * @param  {Integer} index - volume cell index
     * @param  {Array|TypedArray} array - destination
     * @param  {Integer} offset - index into the array
     * @return {Array} the destination array
     */
    volumeColorToArray(index: number, array: NumberArray, offset: number): NumberArray;
    positionColor?(position: Vector3): number;
    /**
     * safe a color for coordinates in space to an array
     * @param  {Vector3} coords - xyz coordinates
     * @param  {Array|TypedArray} array - destination
     * @param  {Integer} offset - index into the array
     * @return {Array} the destination array
     */
    positionColorToArray(coords: Vector3, array: NumberArray, offset: number): NumberArray;
}
export default Colormaker;
