import { Constants } from "../../Constant/constants";


export interface INotification {
  actions?: INotification_Actions[];
  messages: string[];
  notificationLevel: Constants.NotificationLevel;
  uniqueId: string;
}

interface INotification_Actions {
  message?: string;
  actions?: [() => {}];
}
