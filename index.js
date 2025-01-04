const config = {
    type: Phaser.AUTO,
    width:400,
    height:714,
    // Preload 一定要放在Array的第一個, 因為所有Scene的constructor行完就到
    // 行第一個的 create()
    parent: 'app', // parent 一定要
    dom: { createContainer: true},
    scene:[Preload, GameScene, GameOver, GameStart, Explanation, Bubble],
    language: 'en' ,// en | zh 
    DEBUG:1
}

new Phaser.Game(config);

