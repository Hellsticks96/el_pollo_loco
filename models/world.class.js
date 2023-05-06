class World{
character = new Character();
enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
];

ctx;
    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.draw();
    }


    draw(){
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            this.ctx.drawImage(enemy.img, enemy.x +300, enemy.y, enemy.width, enemy.height);
        }
    }
}