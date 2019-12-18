// getting the values using ajax from file 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			
			var data = JSON.parse(this.responseText);

			btn1.innerHTML = data.buttons[0];
			btn1.setAttribute("value", data.buttons[0]);

			btn2.innerHTML = data.buttons[1];
			btn2.setAttribute("value", data.buttons[1]);

			btn3.innerHTML = data.buttons[2];
			btn3.setAttribute("value", data.buttons[2]);

			btn4.innerHTML = data.buttons[3];
			btn4.setAttribute("value", data.buttons[3]);  
			
			
			// genrate dynamic bars using for loop 

			for (var i = 0; i < data.bars.length; i++)
			{
				var progress = document.createElement("div");
				var cont = document.getElementById("content");
				cont.appendChild(progress);
				progress.setAttribute("class", "cmyprogress");
				progress.setAttribute("id", "progress" + i);

				var bar = document.createElement("div");
				progress.appendChild(bar);
				bar.setAttribute("class", "cmybar");
				bar.setAttribute("id", "Btn" + i);
				bar.style.width = data.bars[i] + "%";


				var lb = document.createElement("label");
				bar.appendChild(lb);
				lb.setAttribute("class", "clabel");
				lb.setAttribute("id", "label" + i);
				lb.innerHTML = data.bars[i] + "%";
			}

			var ddl = document.createElement("select");                  
			var but = document.getElementById("sel");
			but.appendChild(ddl);
			ddl.setAttribute("id", "ddselect");
		   
			for (var i = 0; i < data.bars.length; i++)
			{
				var opt = document.createElement("option");
				ddl.appendChild(opt);
				opt.setAttribute("id", "ddl" + i);
				opt.setAttribute("value", i);
				opt.innerHTML = "progessbar " + (1+i);
			}

		}
   
	};
	btn1.addEventListener('click', function () {
		addwidth(this.value);
	});
	btn2.addEventListener('click', function () {
		addwidth(this.value);
	});
	btn3.addEventListener('click', function () {
		addwidth(this.value);
	});
	btn4.addEventListener('click', function () {
		addwidth(this.value);
	});
	
	function addwidth(value)
	{
	 
		var v = parseInt(document.getElementById("ddselect").value);
		var a = document.getElementById("label"+v).innerHTML;
						
		value = parseInt(value) + parseInt(a);

		if (value >= 100)
		{

			document.getElementById("Btn"+v).style.backgroundColor = "red";
			document.getElementById("Btn"+v).style.width = "100%";
			document.getElementById("label"+v).innerHTML = value + "%";                   
		} 
		 else if (value <= 100 && value > 0)
		{
			document.getElementById("Btn"+v).style.backgroundColor = "lightblue";
			document.getElementById("Btn"+v).style.width = value + "%";
			document.getElementById("label"+v).innerHTML = value + "%";
		} 
		  else if (value <= 0)
		{
			document.getElementById("Btn"+v).style.width = "0%";
			document.getElementById("label"+v).innerHTML = "0%";

		} 
	}
 
	xhttp.open("GET", "http://pb-api.herokuapp.com/bars");
	xhttp.send();