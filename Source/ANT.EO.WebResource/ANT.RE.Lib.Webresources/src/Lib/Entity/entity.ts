import { ContextBase } from '../Context/contextBase';
import { IEntity } from './entity.interface';

class Entity extends ContextBase implements IEntity {
    constructor() {
        super();
    }
    getPrimaryAttributeValue(): string {
        return this.context.data.entity.getPrimaryAttributeValue();
    }
    getDataXml(): string {
        return this.context.data.entity.getDataXml();
    }
    getId(): string {
        return this.context.data.entity.getId();
    }
    getEntityReference() {
        this.context.data.entity.getEntityReference();
    }
    getEntityName(): string {
        return this.context.data.entity.getEntityName();
    }

    getIsDirty(): boolean {
        return this.context.data.entity.getIsDirty();
    }
    addOnSave(fn: () => void) {
        this.context.data.entity.addOnSave(fn);
    }

    addOnLoad(fn: () => void) {
        this.context.data.addOnLoad(fn);
    }
    removeOnSave(fn: () => void) {
        this.context.data.entity.removeOnSave(fn);
    }
}

export const _Entity = new Entity();
