class World{
character = new Character();
background = new Background();
background_2 = new Background_2();
background_3 = new Background_3();
enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
];
clouds = [
    new Cloud()
]
canvas;
ctx;
    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw(){
        this.ctx.fillStyle = 'rgb(135, 178, 235)';
        this.ctx.fillRect(0, 0, 720, 480);
        this.ctx.drawImage(this.background_3.img, this.background_3.x, this.background_3.y, this.background_3.width, this.background_3.height);
        this.ctx.drawImage(this.background_2.img, this.background_2.x, this.background_2.y, this.background_2.width, this.background_2.height);
        this.ctx.drawImage(this.background.img, this.background.x, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        
        
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x +300, enemy.y, enemy.width, enemy.height);
        });

        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x +300, cloud.y, cloud.width, cloud.height);
        })

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        })
        
    }
}