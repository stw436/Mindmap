var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.global = {
    hp : 500
};
game.state.add('menuState', test.menuState);
game.state.add('title', test.title);
game.state.add('lvl1', test.lvl1);
game.state.add('lvl2', test.lvl2);
game.state.add('highschool', test.highschool);
game.state.add('college', test.college);
game.state.add('boss', test.bossLevel);
game.state.add('gameOver', test.gameOver);
game.state.add('gameWin', test.gameWin);
game.state.start('menuState');