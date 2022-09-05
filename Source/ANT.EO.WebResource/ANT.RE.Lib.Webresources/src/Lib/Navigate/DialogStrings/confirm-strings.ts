import { IConfirmStrings } from './confirm-strings.interface';

export class ConfirmStrings implements IConfirmStrings {
  constructor(public text: string, public confirmButtonLabel?: string, public title?: string, public cancelButtonLabel?: string, public subtitle?: string) {
  }
}

