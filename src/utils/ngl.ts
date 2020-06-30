/* eslint-disable import/no-extraneous-dependencies */

// structure-component
import { StructureRepresentationParameters } from 'ngl/declarations/representation/structure-representation';
import { AngleRepresentationParameters } from 'ngl/declarations/representation/angle-representation';
import { AxesRepresentationParameters } from 'ngl/declarations/representation/axes-representation';
import { BallAndStickRepresentationParameters } from 'ngl/declarations/representation/ballandstick-representation';
import { CartoonRepresentationParameters } from 'ngl/declarations/representation/cartoon-representation';
import { ContactRepresentationParameters } from 'ngl/declarations/representation/contact-representation';
import { DihedralRepresentationParameters } from 'ngl/declarations/representation/dihedral-representation';
import { DihedralHistogramRepresentationParameters } from 'ngl/declarations/representation/dihedral-histogram-representation';
import { DistanceRepresentationParameters } from 'ngl/declarations/representation/distance-representation';
import { HyperballRepresentationParameters } from 'ngl/declarations/representation/hyperball-representation';
import { LabelRepresentationParameters } from 'ngl/declarations/representation/label-representation';
import { LineRepresentationParameters } from 'ngl/declarations/representation/line-representation';
import { PointRepresentationParameters } from 'ngl/declarations/representation/point-representation';
import { SurfaceRepresentationParameters } from 'ngl/declarations/representation/surface-representation';
import { RibbonRepresentationParameters } from 'ngl/declarations/representation/ribbon-representation';
import { RocketRepresentationParameters } from 'ngl/declarations/representation/rocket-representation';
import { TraceRepresentationParameters } from 'ngl/declarations/representation/trace-representation';
import { UnitcellRepresentationParameters } from 'ngl/declarations/representation/unitcell-representation';
import { SliceRepresentationParameters } from 'ngl/declarations/representation/slice-representation';
import { MolecularSurfaceRepresentationParameters } from 'ngl/declarations/representation/molecularsurface-representation';
import { DotRepresentationParameters } from 'ngl/declarations/representation/dot-representation';
import { StructureRepresentationType } from 'ngl/declarations/component/structure-component';

// surface-component
import { SurfaceRepresentationType } from 'ngl/declarations/component/surface-component';

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

export * from 'ngl';
export type { StageParameters } from 'ngl/declarations/stage/stage';
export type { ComponentParameters } from 'ngl/declarations/component/component';
export type { StructureRepresentationType } from 'ngl/declarations/component/structure-component';
export type { SurfaceRepresentationType } from 'ngl/declarations/component/surface-component';
export type { StageLoadFileParams } from 'ngl/declarations/stage/stage';
