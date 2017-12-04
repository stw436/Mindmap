var content = [
    "Uh oh not again...", "The familiar hug of some new reality closes in on you.", "Old age wanes, and the exhilaration of youth floods in.", "Suddenly!"
];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

test.title = function(){};
test.title.prototype = {

create: function(){

    text = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });

    nextLine();

},

update: function(){

if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('lvl1');
        }
}
}

function nextLine() {

    if (lineIndex === content.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

function nextWord() {

    //  Add the next word onto the text string, followed by a space
    text.text = text.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text.text = text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, nextLine, this);
    }

}