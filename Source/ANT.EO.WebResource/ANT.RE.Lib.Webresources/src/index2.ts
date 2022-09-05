import { Extensions } from './Lib/Extensions/extensions';
import { Constants as _Constants } from './Constant/constants';
import { Lib as _Lib } from './Lib/lib';
import { _Webresource } from './Webresource/webresource';
import { Messages as _Messages } from './Messages/messages';
import { _Attributes } from './Lib/Attributes/attributes';
import { _Controls } from './Lib/Controls/controls';
import { _Entity } from './Lib/Entity/entity';
import { _FormContext } from './Lib/Context/FormContext/formcontext';
import { _GlobalContext } from './Lib/Context/GlobalContext/globalcontext';
import { _GridContext } from './Lib/Context/GridContext/gridcontext';
import { logger } from './Lib/Logger/logger';
import { _Navigate } from './Lib/Navigate/navigate';
import { _OData } from './Lib/Odata/odata';
import { _Process } from './Lib/Process/process';
import { _SOAP } from './Lib/SOAP/soap';
import { Utilities } from './Lib/Utility/utility';
import { _Validation } from './Lib/Validation/validation';

export let Constants = _Constants;
export let Lib = new _Lib();
export let Webresource = _Webresource;
export let Messages = _Messages;

export let Attributes = _Attributes;
export let Controls = _Controls;
export let Entity = _Entity;
export let FormContext = _FormContext;
export let GlobalContext = _GlobalContext;
export let GridContext = _GridContext;
export let Logger = logger;
export let Navigate = _Navigate;
export let OData = _OData;
export let Process = _Process;
export let SOAP = _SOAP;
export let Utility = Utilities;
export let Validation = _Validation;

new Extensions();
