

const createBonus = (x, y, bonusName) => {
    return { 
        x: x,
        y: y,
        time: 0,
        sFrame: bonuses[bonusName].sFrame,
        varName: bonuses[bonusName].varName,
        maxCount: bonuses[bonusName].maxCount,
        width: bonuses[bonusName].width,
        height: bonuses[bonusName].height,
        rendWidth: bonuses[bonusName].rendWidth,
        rendHeight: bonuses[bonusName].rendHeight,
        entityName: 'bonus',

        update (dt) {
            this.time += dt;
        },

        render () {
            draw(this.sFrame, this.x, this.y, this.rendWidth, this.rendHeight);
        },

        kill () {
            level.removeEntity(this.id);
        },
    }
}
