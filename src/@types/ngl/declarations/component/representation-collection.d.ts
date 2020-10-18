/**
 * @file Component Collection
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */
import { Color } from 'three';
import RepresentationElement from './representation-element';
import Collection from './collection.js';
declare class RepresentationCollection extends Collection<RepresentationElement> {
    setParameters(params: any): this;
    setVisibility(value: boolean): this;
    setSelection(string: string): this;
    setColor(color: number | string | Color): this;
    update(what: any): this;
    build(params?: any): this;
    dispose(params?: any): this;
}
export default RepresentationCollection;
