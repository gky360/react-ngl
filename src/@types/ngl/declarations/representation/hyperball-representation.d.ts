/**
 * @file Hyperball Representation
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */
import LicoriceRepresentation from './licorice-representation.js';
import HyperballStickBuffer from '../buffer/hyperballstick-buffer.js';
import { BallAndStickRepresentationParameters } from './ballandstick-representation';
import { Structure, Volume } from '../ngl';
import Viewer from '../viewer/viewer';
import { BondDataParams, BondDataFields, AtomDataFields } from '../structure/structure-data';
import StructureView from '../structure/structure-view';
import { StructureRepresentationData } from './structure-representation';
import SphereGeometryBuffer from '../buffer/spheregeometry-buffer';
import Surface from '../surface/surface';
export interface HyperballRepresentationParameters extends BallAndStickRepresentationParameters {
    shrink: number;
}
/**
 * Hyperball Representation
 */
declare class HyperballRepresentation extends LicoriceRepresentation {
    protected shrink: number;
    protected __center: Float32Array;
    constructor(structure: Structure, viewer: Viewer, params: Partial<HyperballRepresentationParameters>);
    init(params: Partial<HyperballRepresentationParameters>): void;
    getBondParams(what?: BondDataFields, params?: BondDataParams): {
        what: BondDataFields | undefined;
        colorParams: {
            structure: Structure;
            scheme: string;
            volume?: Volume | undefined;
            surface?: Surface | undefined;
            scale: string | string[];
            mode: import("../color/colormaker").ColorMode;
            domain: number[];
            value: number;
            reverse: boolean;
        };
        radiusParams: {
            type: "" | "data" | "size" | "sstruc" | "bfactor" | "explicit" | "vdw" | "covalent";
            scale: number;
            size: number;
            data: {
                [k: number]: number;
            };
        };
    } & BondDataParams;
    createData(sview: StructureView): {
        bufferList: (SphereGeometryBuffer | HyperballStickBuffer)[];
    };
    updateData(what: AtomDataFields, data: StructureRepresentationData): void;
}
export default HyperballRepresentation;
