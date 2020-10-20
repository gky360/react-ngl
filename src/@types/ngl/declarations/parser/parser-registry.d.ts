/**
 * @file Parser Registry
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */
import Registry from '../utils/registry';
declare class ParserRegistry extends Registry {
    constructor();
    __hasObjName(key: string, objName: string): boolean;
    isTrajectory(key: string): boolean;
    isStructure(key: string): boolean;
    isVolume(key: string): boolean;
    isSurface(key: string): boolean;
    isBinary(key: string): any;
    isXml(key: string): any;
    isJson(key: string): any;
    getTrajectoryExtensions(): string[];
    getStructureExtensions(): string[];
    getVolumeExtensions(): string[];
    getSurfaceExtensions(): string[];
}
export default ParserRegistry;
