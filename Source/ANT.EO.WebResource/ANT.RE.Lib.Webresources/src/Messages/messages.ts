
export class Messages {
  static messages: any;
  private constructor() {}

  static get(msgId: string): string{
    try{ 
      let languageId = Xrm.Utility.getGlobalContext().userSettings.languageId;

      if (this.messages === undefined) Messages.messages = ANT.Caching.getData('Message-' + languageId);
      return Messages.messages[msgId] ?? msgId;
    }
    catch(ex: any){
      console.log(ex.message);
      return msgId;
    }

  }
}
