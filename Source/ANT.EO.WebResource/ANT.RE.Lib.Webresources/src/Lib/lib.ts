import { _Attributes } from './Attributes/attributes';
import { _Controls } from './Controls/controls';
import { _Entity } from './Entity/entity';
import { _FormContext } from './Context/FormContext/formcontext';
import { _GlobalContext } from './Context/GlobalContext/globalcontext';
import { _GridContext } from './Context/GridContext/gridcontext';
import { logger } from './Logger/logger';
import { _Navigate } from './Navigate/navigate';
import { _OData } from './Odata/odata';
import { _Process } from './Process/process';
import { _SOAP } from './SOAP/soap';
import { Utilities } from './Utility/utility';
import { _Validation } from './Validation/validation';

export class Lib {
  Attributes = _Attributes;
  Controls = _Controls;
  Entity = _Entity;
  FormContext = _FormContext;
  GlobalContext = _GlobalContext;
  GridContext = _GridContext;
  Logger = logger;
  Navigate = _Navigate;
  OData = _OData;
  Process = _Process;
  SOAP = _SOAP;
  Utility = Utilities;
  Validation = _Validation;
}
