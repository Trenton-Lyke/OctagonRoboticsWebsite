//createDiv() makes the divs that are seen in the background
function createDiv(id, tags, question, cardType) {
	var div =
	"<div id = 'card" + id + "' class = 'card " + cardType + "'>" +
		"<div class = 'card-header'>" +
			tags +
		"</div>" +
		"<div class = 'card-body justify-content-center'>" +
			"<h5 class = 'card-title'>" +
				question +
			"</h5>" +
			"<a href = '#' class = 'btn card-btn'>Answer</a>" +
		"</div>" +
	"</div>";
	return div;
}
//Almost all the code here, code for generating random positions for all the cards
function pasteRandom() {
	//info about
	var docHeight = $("#header").outerHeight(true);
	var docWidth = $("#header").outerWidth(true);
	var barHeight = $("#headbar").height();
	var barWidth = $("#headbar").width();

	$.getJSON("qExamples.json", function(data) {
		var ObjTops = [];
		var ObjLefts = [];
		for(var i = 0; i < data.length; i++) {
			//creating the div in the dom here
			var question = data[i].question;
			var tags = data[i].tags;
			var cardType = data[i].cardType;
			var div = createDiv(i, tags, question, cardType);
			$("#cardBackground").append(div);

			//saving the positioning variables in an object here
			var divHeight = $("#card" + i).height();
			var divWidth = $("#card" + i).width();
			var scale = Math.random() + 1.5;
			var useTop = (Math.random()*1.3-0.3)*100;
			var useLeft = (Math.random()*1.3-0.3)*100;
			ObjLefts.push(useLeft);
			ObjTops.push(useTop);
			$("#card" + i).css("transform", "translate(" + useLeft + "vw, " + useTop + "vh) scale(" + scale + ")");
			$("#card" + i).delay(80*(i+1)).fadeTo(900, 1);
		}
	});
}
//darkens the background after all the divs have been pasted
function darkenBack() {
	$("#grand-parent").addClass("bg-dark");
}

$(function() {
	setTimeout(pasteRandom, 400);
	setTimeout(darkenBack, 2500);
});
