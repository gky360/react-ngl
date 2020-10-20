/**
 * @file Kin Parser
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */
import Parser from './parser';
declare class KinParser extends Parser {
    get type(): string;
    get __objName(): string;
    _parse(): void;
}
export default KinParser;
