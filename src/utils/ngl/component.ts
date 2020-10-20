/* eslint-disable import/no-extraneous-dependencies */

// structure-component
import { StructureRepresentationParameters } from '../../@types/ngl/declarations/representation/structure-representation';
import { AngleRepresentationParameters } from '../../@types/ngl/declarations/representation/angle-representation';
import { AxesRepresentationParameters } from '../../@types/ngl/declarations/representation/axes-representation';
import { BallAndStickRepresentationParameters } from '../../@types/ngl/declarations/representation/ballandstick-representation';
import { CartoonRepresentationParameters } from '../../@types/ngl/declarations/representation/cartoon-representation';
import { ContactRepresentationParameters } from '../../@types/ngl/declarations/representation/contact-representation';
import { DihedralRepresentationParameters } from '../../@types/ngl/declarations/representation/dihedral-representation';
import { DihedralHistogramRepresentationParameters } from '../../@types/ngl/declarations/representation/dihedral-histogram-representation';
import { DistanceRepresentationParameters } from '../../@types/ngl/declarations/representation/distance-representation';
import { HyperballRepresentationParameters } from '../../@types/ngl/declarations/representation/hyperball-representation';
import { LabelRepresentationParameters } from '../../@types/ngl/declarations/representation/label-representation';
import { LineRepresentationParameters } from '../../@types/ngl/declarations/representation/line-representation';
import { PointRepresentationParameters } from '../../@types/ngl/declarations/representation/point-representation';
import { SurfaceRepresentationParameters } from '../../@types/ngl/declarations/representation/surface-representation';
import { RibbonRepresentationParameters } from '../../@types/ngl/declarations/representation/ribbon-representation';
import { RocketRepresentationParameters } from '../../@types/ngl/declarations/representation/rocket-representation';
import { TraceRepresentationParameters } from '../../@types/ngl/declarations/representation/trace-representation';
import { UnitcellRepresentationParameters } from '../../@types/ngl/declarations/representation/unitcell-representation';
import { SliceRepresentationParameters } from '../../@types/ngl/declarations/representation/slice-representation';
import { MolecularSurfaceRepresentationParameters } from '../../@types/ngl/declarations/representation/molecularsurface-representation';
import { DotRepresentationParameters } from '../../@types/ngl/declarations/representation/dot-representation';
import { StructureRepresentationType } from '../../@types/ngl/declarations/component/structure-component';

// surface-component
import { SurfaceRepresentationType } from '../../@types/ngl/declarations/component/surface-component';

// copied from
// https://github.com/arose/ngl/blob/7bf7e3551c3433f34e9f47c97aa76cc5838e8b92/src/component/structure-component.ts#L51
export interface StructureRepresentationParametersMap {
  angle: AngleRepresentationParameters;
  axes: AxesRepresentationParameters;
  backbone: BallAndStickRepresentationParameters;
  'ball+stick': BallAndStickRepresentationParameters;
  base: BallAndStickRepresentationParameters;
  cartoon: CartoonRepresentationParameters;
  contact: ContactRepresentationParameters;
  dihedral: DihedralRepresentationParameters;
  'dihedral-histogram': DihedralHistogramRepresentationParameters;
  distance: DistanceRepresentationParameters;
  dot: DotRepresentationParameters;
  helixorient: StructureRepresentationParameters;
  hyperball: HyperballRepresentationParameters;
  label: LabelRepresentationParameters;
  licorice: BallAndStickRepresentationParameters;
  line: LineRepresentationParameters;
  molecularsurface: MolecularSurfaceRepresentationParameters;
  point: PointRepresentationParameters;
  ribbon: RibbonRepresentationParameters;
  rocket: RocketRepresentationParameters;
  rope: CartoonRepresentationParameters;
  slice: SliceRepresentationParameters;
  spacefill: BallAndStickRepresentationParameters;
  surface: SurfaceRepresentationParameters;
  trace: TraceRepresentationParameters;
  tube: CartoonRepresentationParameters;
  unitcell: UnitcellRepresentationParameters;
  validation: StructureRepresentationParameters;
}

export type StructureRepresentationDescriptor = {
  [K in StructureRepresentationType]: {
    type: K;
    params?:
      | Partial<StructureRepresentationParametersMap[K]>
      | { defaultAssembly: string };
    // hidden?: boolean;
  };
}[StructureRepresentationType];

export type SurfaceRepresentationDescriptor = {
  type: SurfaceRepresentationType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: { [k: string]: any };
};

export type RepresentationDescriptor =
  | StructureRepresentationDescriptor
  | SurfaceRepresentationDescriptor;
