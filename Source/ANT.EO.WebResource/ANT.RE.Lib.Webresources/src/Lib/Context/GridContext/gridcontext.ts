import { logger } from '../../Logger/logger';
import { Grid } from './grid';
import { IGridContext } from './gridContext.interface';

class GridContext extends Grid implements IGridContext {
  constructor() {
    super();
  }
  getEntityName(): any {
    try {
      return this.gridContext['getEntityName']();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.getEntityName');
    }
  }
  getFetchXml(): any {
    try {
      return this.gridContext['getFetchXml']();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.getFetchXml');
    }
  }
  getGridType(): any {
    try {
      return this.gridContext['getGridType']();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.getGridType');
    }
  }
  getRelationship() {
    try {
      return this.gridContext['getRelationship']();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.getRelationship');
    }
  }
  getUrl(client: number): any {
    try {
      return this.gridContext['getUrl'](client);
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.getUrl');
    }
  }
  getViewSelector() {
    try {
      return this.gridContext['getViewSelector']();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.getViewSelector');
    }
  }
  openRelatedGrid(): void {
    try {
      this.gridContext['openRelatedGrid']();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.openRelatedGrid');
    }
  }
  refresh() {
    try {
      return this.gridContext['refresh']();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.refresh');
    }
  }
  refreshRibbon() {
    try {
      return this.gridContext['refreshRibbon']();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.refreshRibbon');
    }
  }

  getRrow(): any {
    try {
      return super.getRrow();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.getRrow');
    }
  }
  getSelectedRows(): any {
    try {
      return super.getSelectedRows();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.getSelectedRows');
    }
  }
  getTotalRecordCount(): any {
    try {
      return super.getTotalRecordCount();
    } catch (e: any) {
      logger.Error(e.message, 'GridContext.getTotalRecordCount');
    }
  }
}

export const _GridContext = new GridContext();
