import { Constants } from '../../Constant/constants';
import { _GlobalContext } from '../Context/GlobalContext/globalcontext'

export class Extensions {
  constructor() {
    String.prototype.toODataFormattedValue = function (): string {
      var str = String(this);
      if (str !== ''.trim()) return str + Constants.ODataFormattedValue;
      return str;
    };

    String.prototype.toODataLookupId = function (): string {
      var str = String(this);
      if (str !== ''.trim()) return '_' + str + '_value';
      return str;
    };

    String.prototype.toODataLookupEntityType = function (): string {
      var str = String(this);
      if (str !== ''.trim()) return this.toODataLookupId() + Constants.ODataLookupLogicalName;
      return str;
    };

    String.prototype.toODataLookupName = function (): string {
      var str = String(this);
      if (str !== ''.trim()) return this.toODataLookupId() + Constants.ODataFormattedValue;
      return str;
      };

    
    Date.prototype.dateDiff = function (compareDate: string | Date): number {
      let date1 = new Date(this.getFullYear(), this.getMonth(), this.getDate());
      let date2: Date;
      if (typeof compareDate === 'string') {
        date2 = new Date(compareDate);
        date2.setHours(0);
        date2.setMinutes(0);
        date2.setSeconds(0);
        date2.setMilliseconds(0);
      }
      else date2 = new Date(compareDate.getFullYear(), compareDate.getMonth(), compareDate.getDate());

      let Difference_In_Time = date1.getTime() - date2.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      return Difference_In_Days
    };

    (Number.prototype as any).toMoney = function (decimals: number) {
      var userSettings = _GlobalContext.userSettings;
      var langId = userSettings.languageId

      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 2 }).format(decimals);
    };
    (Number.prototype as any).toDecimal = function (decimals: number) {
      new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 2 }).format(decimals)
    }
  }
}


