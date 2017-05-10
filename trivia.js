//https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function () {
    var TrivalNumber = 0;
    var point = 0;
    var TriviaQuestion = new Array();
    var questionLock = false;
    var TotalTriviaQuestion;
    var stage = "#game1";
    var stage2 = new Object;

    //http://api.jquery.com/jquery.getjson/
    $.getJSON('triviaList.json', function (data) {
        for (i = 0; i < data.Dota2Trivia.length; i++) {
            TriviaQuestion[i] = new Array;
            TriviaQuestion[i][0] = data.Dota2Trivia[i].question;
            TriviaQuestion[i][1] = data.Dota2Trivia[i].answer1;
            TriviaQuestion[i][2] = data.Dota2Trivia[i].answer2;
            TriviaQuestion[i][3] = data.Dota2Trivia[i].answer3;
						TriviaQuestion[i][4] = data.Dota2Trivia[i].question2;
        }
        TotalTriviaQuestion = TriviaQuestion.length;
        showTrivia();
    })

    function showTrivia() {
        var random = Math.random() * 3;
        random = Math.ceil(random);
        var answer1; var answer2; var answer3;

        if (random == 1) {
            answer1 = TriviaQuestion[TrivalNumber][1];
            answer2 = TriviaQuestion[TrivalNumber][2];
            answer3 = TriviaQuestion[TrivalNumber][3];
        }
        if (random == 2) {
            answer2 = TriviaQuestion[TrivalNumber][1];
            answer3 = TriviaQuestion[TrivalNumber][2];
            answer1 = TriviaQuestion[TrivalNumber][3];
        }
        if (random == 3) {
            answer3 = TriviaQuestion[TrivalNumber][1];
            answer1 = TriviaQuestion[TrivalNumber][2];
            answer2 = TriviaQuestion[TrivalNumber][3];
        }

        //http://api.jquery.com/append/
        if (TriviaQuestion[TrivalNumber][0].includes(".mp3")) {
            $(stage).append(
						'<div class= "TriviaText">' + TriviaQuestion[TrivalNumber][4]
            +'<div><audio controls src="triviaQuestion/' + TriviaQuestion[TrivalNumber][0]
            + '"></div><div id="1" class="pix"><img src="triviaAnswer/' + answer1
            + '"></div><div id="2" class="pix"><img src="triviaAnswer/' + answer2
            + '"></div><div id="3" class="pix"><img src="triviaAnswer/' + answer3 + '"></div>'
            );}
				if (TriviaQuestion[TrivalNumber][0].includes(".mp4")) {
		        $(stage).append(
						'<div class= "TriviaText">' + TriviaQuestion[TrivalNumber][4]
		        +'<div><video width="400" height="300" autoplay loop src="triviaQuestion/' + TriviaQuestion[TrivalNumber][0]
		        + '"></div><div id="1" class="pix"><img src="triviaAnswer/' + answer1
		        + '"></div><div id="2" class="pix"><img src="triviaAnswer/' + answer2
		        + '"></div><div id="3" class="pix"><img src="triviaAnswer/' + answer3 + '"></div>'
		        );}
        if (TriviaQuestion[TrivalNumber][0].includes(".png")) {
            $(stage).append(
            '<div><img src="triviaQuestion/' + TriviaQuestion[TrivalNumber][0]
            + '"></div><div id="1" class="pix"><img src="triviaAnswer/' + answer1
            + '"></div><div id="2" class="pix"><img src="triviaAnswer/' + answer2
            + '"></div><div id="3" class="pix"><img src="triviaAnswer/' + answer3 + '"></div>'
            );}

        $('.pix').click(
            function () {
                if (questionLock == false) {
                    questionLock = true;
                    	if (this.id == random) {
                        $(stage).append('<div class="feedback1">CORRECT</div>');
                        point++;
                    }
                    	if (this.id != random) {
                        $(stage).append('<div class="feedback2">WRONG</div>');
                    }
                    setTimeout(function () { nextQuestion() }, 1000);
									}})
		}

    function nextQuestion() {
        TrivalNumber++;
        if (stage == "#game1") {
            stage2 = "#game1"; stage = "#game2";
        }
        else {
            stage2 = "#game2"; stage = "#game1";
        }

        if (TrivalNumber < TotalTriviaQuestion) {
            showTrivia();
        }
        else {
            finalScore();
        }

        //http://api.jquery.com/animate/
        $(stage2).animate
        (
            { "right": "+=800px" }, "slow",
            function () {
                $(stage2).css('right', '-800px');
                $(stage2).empty();
            }
        );
        $(stage).animate
        (
            { "right": "+=800px" }, "slow",
            function () {
                questionLock = false;
            }
           );
    }

    function finalScore() {
        $(stage).append(
		'<div class="TriviaText">You finished the Trivia<br><br>Total Trivia answered: '
		+ TotalTriviaQuestion
		+ '<br>Correct answers: '
		+ point
		+ '</div>'

  );
    }
    
}
);
