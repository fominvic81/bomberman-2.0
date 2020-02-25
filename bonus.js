

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

        kill (flame = false) {
            if (flame) {
                level.addAnimation(createAnimation(this.x, this.y, this.rendWidth, this.rendHeight, animations.flame.frames, 0.5));
            }
            level.removeEntity(this.id);
        },
    }
}
