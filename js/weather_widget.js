
$(".main-item").click( function()
{
	$(".menu").toggleClass("close");
	$(".hide").toggleClass("dis");
});

$(".logo").click( function()
{
	window.location.reload();
});

$("#refresh").click( function()
{
	window.location.reload();
});

var search;

var APPID = "0eabf6b60a6e42b76ff9638c21957f6c";

var elementDay;
var elementDate;

var elementTemp;

var elementLocation;
var elementCountry;
var elementIcon;


var elementDay2;
var elementIcon2;
var elementTemp2;

var elementDay3;
var elementIcon3;
var elementTemp3;

var elementDay4;
var elementIcon4;
var elementTemp4;

var elementDay5;
var elementIcon5;
var elementTemp5;


var count = 0;

var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

var months = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul","Aug.","Sep.","Oct.","Nov.", "Dec"];

var nodes = [];

var bar;


window.onload = function () 
{
	elementDay = document.getElementById("day");
	elementDate = document.getElementById("date");
	
	elementTemp = document.getElementById("temperature");
	
	
	elementLocation = document.getElementById("location");
	elementCountry = document.getElementById("country");
	elementIcon = document.getElementById("icon");
	
	bar = document.getElementById("bar");
	
	elementDay2 = document.getElementById("day2");
	elementIcon2 = document.getElementById("icon2");
	elementTemp2 = document.getElementById("temperature2");
	
	elementDay3 = document.getElementById("day3");
	elementIcon3 = document.getElementById("icon3");
	elementTemp3 = document.getElementById("temperature3");
	
	elementDay4 = document.getElementById("day4");
	elementIcon4 = document.getElementById("icon4");
	elementTemp4 = document.getElementById("temperature4");
	
	elementDay5 = document.getElementById("day5");
	elementIcon5 = document.getElementById("icon5");
	elementTemp5 = document.getElementById("temperature5");
	
}


search = document.getElementById("in");

search.addEventListener("keydown", function (e) 
{
    if (e.keyCode === 13) 
	{  
		var city_id = document.getElementById("in").value;
	
	
		var url = "http://api.openweathermap.org/data/2.5/forecast?" + "q=" + city_id + "&APPID=" + APPID;
		
		
		
		
		
		$(".quest").toggleClass("answer");
		$(".answer").toggleClass("quest");
		
		var b = document.getElementsByTagName("BODY")[0];
		
		b.style.backgroundImage = "url(fall2.jpg)";
		b.style.height = "100%";
		b.style.backgroundPosition = "center";
		b.style.backgroundSize = "cover";
		
		//alert(url);
		console.log(url);
		
		
		
		
		
		//264371 = id of Athens.
		sendRequest(url);
    }
});


$("#arrow").click( function()
{
	var city_id = document.getElementById("in").value;
	
	
	var url = "http://api.openweathermap.org/data/2.5/forecast?" + "q=" + city_id + "&APPID=" + APPID;
	
	
	
	
	
	$(".quest").toggleClass("answer");
	$(".answer").toggleClass("quest");
	
	var b = document.getElementsByTagName("BODY")[0];
	
	b.style.backgroundImage = "url(fall2.jpg)";
	b.style.height = "100%";
	b.style.backgroundPosition = "center";
	b.style.backgroundSize = "cover";
	
	//alert(url);
	console.log(url);
	
	
	
	
	
	//264371 = id of Athens.
    sendRequest(url);
	
});











function sendRequest(url)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{
			
			var data = JSON.parse(xmlhttp.responseText);
			
			
			console.log(JSON.stringify(data));
			
			count = Object.keys(data.list).length;
			//alert(count);
			
			var weather = new Date(data.list[0].dt_txt);
			
			
			///////////////////////////////////////////////////
			///////////////////////////////////////////////////
			
			var hours = weather.getHours();
			var day = weather.getDay();
			var weatherMonth = weather.getMonth();
			var weatherDate = weather.getDate();
			/* 
			alert(hours);
			
			alert(day);
			alert(days[day]);
			
			alert(weatherMonth);
			alert(months[weatherMonth]);
			
			alert(weatherDate);
			 */
			var firstDate = {};
			
			firstDate.day = days[day];
			firstDate.month = months[weatherMonth];
			firstDate.date = weatherDate;
			
			firstDate.temp = K2C(data.list[0].main.temp);
			firstDate.location = data.city.name;
			firstDate.country = data.city.country;
			firstDate.weather = data.list[0].weather[0].id;
			
			var x = 1;
			
			if(hours == 0)
				x = 5;
			else if(hours == 3)
				x = 4;
			else if(hours == 6)
				x = 3;
			else if(hours == 9)
				x = 2;
			
			
			
			
			///////////////////////////////////////////////////
			///////////////////////////////////////////////////
			var length = 0;
			var i;
			for(i=x; i<count; i++) //so that the hours of element is after the 1st day at 12.
			{
				var node = new Date(data.list[i].dt_txt);
				var nodeHours = node.getHours();
				var nodeDay = node.getDay();
				
				if(nodeHours == 12)
				{
					var nodeWeather = {};
					
					nodeWeather.temp = K2C(data.list[i].main.temp);
					nodeWeather.weather = data.list[i].weather[0].id;
					nodeWeather.day = days[nodeDay];
					/* 
					alert(nodeWeather.temp);
					alert(nodeWeather.weather);
					alert(nodeWeather.day);
					 */
					
					nodes[length++] = nodeWeather;
					
					
				}
				
				
				
			}
			
			console.log(nodes[0].day);
			console.log(nodes[1].day);
			console.log(nodes[2].day);
			console.log(nodes[3].day);
			
			
		
		
		
			update(firstDate, nodes);
			
			
		}
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}

function K2C(k)
{
    return Math.round(k - 273.15);
}



function update(firstDate, nodes)
{
	$(".temperature").toggleClass("temprature_dis");
	
	
	elementDay.innerHTML = firstDate.day;
	elementDate.innerHTML = firstDate.month + " " + firstDate.date;
	
	elementTemp.innerHTML = firstDate.temp;
	//elementDeg.innerHTML = + "&deg";
	
	elementLocation.innerHTML = firstDate.location + ", ";
	elementCountry.innerHTML = firstDate.country;
	
	var w = firstDate.weather;
	var f = w/100;
	f = Math.floor(f);
	
	if(w == 800)
		f = 10;
	
	//alert(f);
	
	elementIcon.src = "weathercons/" + f + ".svg";

	
	
	bar.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
	
	
	elementDay2.innerHTML = nodes[0].day
	
	var w2 = nodes[0].weather;
	var f2 = w2/100;
	f2 = Math.floor(f2);
	
	if(w2 == 800)
		f2 = 10;
	
	elementIcon2.src = "weathercons/" + f2 + ".svg";
	
	elementTemp2.innerHTML = nodes[0].temp;
	
	/////////////////////////////////////
	////////////////////////////////////
	
	elementDay3.innerHTML = nodes[1].day
	
	var w3 = nodes[1].weather;
	var f3 = w3/100;
	f3 = Math.floor(f3);
	
	if(w3 == 800)
		f3 = 10;
	
	elementIcon3.src = "weathercons/" + f3 + ".svg";
	
	elementTemp3.innerHTML = nodes[1].temp;
	
	/////////////////////////////////////
	////////////////////////////////////
	
	elementDay4.innerHTML = nodes[2].day
	
	var w4 = nodes[2].weather;
	var f4 = w4/100;
	f4 = Math.floor(f4);
	
	if(w4 == 800)
		f4 = 10;
	
	elementIcon4.src = "weathercons/" + f4 + ".svg";
	
	elementTemp4.innerHTML = nodes[2].temp;
	
	/////////////////////////////////////
	////////////////////////////////////
	
	elementDay5.innerHTML = nodes[3].day
	
	var w5 = nodes[3].weather;
	var f5 = w5/100;
	f5 = Math.floor(f3);
	
	if(w5 == 800)
		f5 = 10;
	
	elementIcon5.src = "weathercons/" + f5 + ".svg";
	
	elementTemp5.innerHTML = nodes[3].temp;
	
	
	
}

/* function getIcon(w)
{
	var f = w/100;
	f = Math.floor(f);
	
	if(w == 800)
		f = 10;
	
	return f
} 
*/


