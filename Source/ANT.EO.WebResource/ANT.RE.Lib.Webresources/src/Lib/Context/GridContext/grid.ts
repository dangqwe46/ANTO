import { logger } from '../../Logger/logger';
import { ContextBase } from '../contextBase';

export class Grid extends ContextBase implements IGrid {
  constructor() {
    super();
  }
  getRrow() {
    try {
      return this.gridContext['getGrid']()['getRows']();
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getRrow');
    }
  }
  getSelectedRows() {
    try {
      return this.gridContext['getGrid']()['getSelectedRows']();
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getSelectedRows');
    }
  }
  getTotalRecordCount() {
    try {
      return this.gridContext['getGrid']()['getTotalRecordCount']();
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getTotalRecordCount');
    }
  }
}

export interface IGrid {
  getRrow(): any;
  getSelectedRows(): any;
  getTotalRecordCount(): any;
}
