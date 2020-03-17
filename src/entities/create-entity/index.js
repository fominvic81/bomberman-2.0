

export const createEntity = (level, entity, delay) => {
    return {
        level: level,
        entity: entity,
        delay: delay,
        time: 0,

        update (dt) {
            this.time += dt;

            if (this.time >= this.delay) {
                this.level.addEntity(entity);
                this.level.removeEntity(this.id);
            }
        },

        render () {

        }
    }
}