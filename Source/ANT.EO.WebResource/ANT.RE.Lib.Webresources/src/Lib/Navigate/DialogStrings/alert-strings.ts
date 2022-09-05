import { IAlertStrings } from './alert-strings.interface';

export class AlertStrings implements IAlertStrings {
  constructor(public text: string, public confirmButtonLabel?: string, public title?: string) {}
}

