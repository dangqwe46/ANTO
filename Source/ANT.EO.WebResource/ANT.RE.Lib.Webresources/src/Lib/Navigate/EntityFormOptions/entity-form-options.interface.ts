import { IRelationship } from "../Relationship/relationship.interface";

export interface IEntityFormOptions {
    entityName: string;
    entityId?: string;
    formId?: string;
    cmdbar?: boolean;
    createFromEntity: { entityType: string; id: string; name?: string };
    height?: number;
    navbar: 'on' | 'off' | 'entity';
    openInNewWindow?: boolean;
    windowPosition?: 1 | 2;
    relationship: IRelationship;
    selectedStageId?: string;
    useQuickCreateForm?: boolean;
    width?: number;
}
