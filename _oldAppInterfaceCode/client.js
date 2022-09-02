$ = jQuery;
var pdf;
//var svg;
var svg_obj;
//var p5 = require('p5');
//var jquery = require('/lib/jquery.min.js');
//var p5svg = require('p5.js-svg')(p5);


var s; 
var h; 
var cells = [];
var cells_workcopy = [];
var finc= [];
var store = [];
var countries = [];
unit = 45;
var celldensity = 5;
var symbolspace = 0;
var _space = symbolspace;
var terms = 0;
var send = 0;
var email = 0;
var print_right = 0;
var emailtransport = '';
var print = 0;
var pixlmode = 2;
var grid = 0;
var grid_color = '#ff3d87';
var main_color = '#000000';
// var main_color = '#ef3e3e';
d = new data(1, 55, 'Romania', 'Austria',  10, 1, "email");
//var cw = Raphael.colorwheel(dom_element, height_width [, segments]);
//define a websocket to be used later
var socket;


//get country data and push it into object

  d3.csv('country-data.csv', function(error, data){
  data.forEach(function (d) {
    countries.push(new country(d.country, d.pop_estimate, d.perc_eu_pop, d.no_minorities, d.minority_percent, d.cultural_group, d.gdp));
  })
   var option = '';
    for (var i=0;i<countries.length;i++){
    option += '<option value="'+ countries[i].country + '">' + countries[i].country + '</option>';
    }
    $('#country-current-select').append(option);
    $('#country-origin-select').append(option);
  });
var socket = io();//.connect(window.location.hostname);  
var myFont;
function preload() {
  myFont = loadFont('fonts/montserrat/Montserrat-Regular.otf');
}

function setup() {
  var canv;
  if(displayWidth > 1024)
  {
    createCanvas(560,560, SVG);
  }
  else{
  createCanvas(560, 560, SVG);
  }
  pdf = createPDF();
  unit = width/20;
  
  $('#help').hide();
  refresh();

  if (localStorage.getItem("data") !== null) {
    var temp = localStorage.getItem('data');
    d = JSON.parse(temp);
    $(`#country-origin-select option[value="${d.c}"]`).prop('selected', true);
    $(`#country-current-select option[value="${d.c2}"]`).prop('selected', true);
    $(`#education > select option[value="${d.ed}"]`).prop('selected', true);
    $(`#work-input > select option[value="${d.prof}"]`).prop('selected', true);
    $(`input[name=relationship][value="${d.re}"]`).prop('checked',true);
    $(`input[name=relationship][value="${d.re}"]`).siblings('.radiosvg').click();
    $(`#age-input`).val(d.a);
    refresh();
  }

}

  	 
function draw() {
  //$("#education > select").change(function () {
    //console.log($(this).val());
    //});
  //background(255); 
  
}

//INTERACTIONS area
$(document).ready(function() {

  //connect to socket for interaction with the server machine
   
 
  

  //socket=io.connect('http://192.168.1.88:6070');
  socket.on('error', function() { console.error(arguments) });
  socket.on('message', function() { console.log(arguments) });
  socket.on('test', function() { console.log('received server message.') });
  socket.on('attachment_available', function(data)
  {
    console.log(data);
    if (email == 1)
    {
      sendEmail(emailtransport);
    }
     
  }) 

  socket.on('pdf_available', function()
  {
    if (print == 1 )
    {
      sendPrint();
    
    } 
    
  })
   socket.on('email_sent', function(data)
  {
     alert(`Attempting to send email. 
    Check Inbox (and spam folder)!
    If it didn't arrive you might need to try again.
    The email server is rather fickle.`);
  });
   socket.on('print_done', function(data)
  {
    alert('File printing, check printer !');
  });


   $(".form-element").on('change', 'input, select, radio', function() {
    refresh();
    localStorage.setItem('data', JSON.stringify(d));
   });

 
    //Get value of education
   $("#education > select").change(function () {
    console.log($(this).val());
    d.ed = $(this).val();
    //refresh();
    });
   
   //Get value of relationship
   $("input[type='radio']").change(function () {
    console.log('Relationship is :' + $(this).val());
    d.re = $(this).val();
    //refresh(); 
  });
   //Get value of work
   $('#work-input > select').change(function(){
    console.log('work is :' + $(this).val());
    d.prof = $(this).val();
    //refresh();
   });

   //Get value of age
   $("#age-input").change(function(){
    console.log('age is :' + $(this).val());
    d.a = $(this).val();
    //refresh();
   });

   $("#country-origin-select").change(function(){
    console.log('origin country is :' + $(this).val());
    d.c = $(this).val();
    //refresh();
   });

   $("#country-current-select").change(function(){
    console.log('current country is :' + $(this).val());
    d.c2 = $(this).val();
    //refresh();
   });

   $("#email").change(function(){
    if (ValidateEmail($(this).val()))
    {
    emailtransport = $(this).val();
    //refresh();
    }
   });
/*
   $(".generator").click(function(){
    console.log('generating...');
    if (terms == 1)
    {
    send = 1;
    refresh();
    $('#help').css('display','block');
    }
    else 
    {
      alert('Sorry, this process will not work without agreeing to the terms and conditions');
    }
   });
*/
   $(".medium").change(function () {
    console.log($(this).val());
    pixlmode = parseInt($(this).val());
    //refresh();
    });

   $(".cells").change(function () {
    console.log('celldensity:'+$(this).val());
    celldensity = parseInt($(this).val());
    //refresh();
    });

   $("#conf").change(function(){
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        console.log('agree');
        terms = 1;
    } else {
      console.log('disagree');
      terms = 0;
        // the checkbox was unchecked
    }
   });

   $("#grid").change(function(){
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        console.log('grid');
        grid = 1;
    } else {
      console.log('nogrid');
      grid = 0;
        // the checkbox was unchecked
    }
   });


  var r = (Math.floor(Math.random() * 128 ) + 127).toString(16);
  r = ( r.length == 1 ? "0"+r : r);
  var g = (Math.floor(Math.random() * 32 ) ).toString(16);
  g = ( g.length == 1 ? "0"+g : g);
  var b = (Math.floor(Math.random() * 32 ) ).toString(16);
  b = ( b.length == 1 ? "0"+b : b);
  var color = '#'+r+g+b;
  console.log("color = " + color);
  $('#color').attr('value', color);
  update(r+g+b);
  $('.jscolor').addClass("{onFineChange:'update(this)'}");


  // svg_obj = $('#defaultCanvas').svg('get'); 
   /* $('path', svg_obj.root()).on('click', function(){
      if ($(this).attr('fill') != 'rgb(255,255,255)')
      {
         $(this).attr('fill', main_color);
      }
    }); */

   /*$('path').click(function() {
      if ($(this).attr('fill') != 'rgb(255,255,255)')
      {
         $(this).attr('fill', main_color);
      }
   }); */

   $(".pdf").click(function(){
    console.log('making pdf...');
    
    if (terms == 1)
    {
    if (pdf != undefined)
     { 
        send = 1;
        print = 1;
        refresh();
        //pdf.save();
     }
    }
    else 
    {
      alert('Sorry, this process will not work without agreeing to the Terms and Conditions');
    }
  });

     $(".generator").click(function(){
    console.log('checking terms...');
    
    if (terms == 1)
    {
    if (pdf != undefined)
     { 
        send = 1;
        if (emailtransport != undefined)
        {
           email = 1;
        }
        else alert("This process won't work without an email destination.")
        refresh();
        //pdf.save();
     }
    }
    else 
    {
      alert('Sorry, this process will not work without agreeing to the Terms and Conditions');
    }
    
   });

});


//REDRAW

function refresh()
{
  pdf.beginRecord();
  background(255);
  s = 90;
  h = sin(PI/3)*s;
  count= 0;
  count_x = Math.floor(width/unit);
  count_y = Math.floor(height / unit);
  const today = new Date();
  
  push();
    fill(main_color);
    textFont(myFont);
    textSize(22);
    text(`Embroidered Data - Ioan O. Cernei - 2015 - ${today.getFullYear()}`, 30, 20);
    textSize(16);
    text('http://ioan.cernei.ro || http://embroiderdata.herokuapp.com', 55, 40);
  pop();

   if(displayWidth > 1024)
  {
    strokeWeight(1.2);
  }
  else{
    strokeWeight(1.2);
  }
  
  stroke('#fff');
  var a = 0; // an index for the array loading

//load array with cell objects
for ( j = 0; j <= count_y; j++)
{
  for (i = 0; i<= count_x; i++)
  {
      cells[a++] = new cell_square(i*unit, j*unit, unit, bitFactory(4,2,i, d), '1111'/*bitFactory(4,3)*/, main_color, '#ff5194'/*'#ae89ff'*/, 1/*Math.floor(Math.random()*2)*/, 1/*Math.floor(Math.random()*2)*/, j , i);    
  }
 } 
//draw square for all cell objects in the array

//fill work_copy of array
cells_workcopy = cells;

finc = symmetryFactory(cells_workcopy);

//finc = advancedSymmetryFactory(cells_workcopy,6);
 //beginRecord();
for ( k=1; k <= count_y/2; k++){
for(l = 0; l <= 2*count_x; l++ ) 
  
    {
      square(finc[l].x, finc[l].y + k * unit * 2, finc[l].unit, finc[l].fillstate, finc[l].colorstate, finc[l].color1, finc[l].color2, pixlmode, symbolspace);
    }
  }
if (grid >= 1)
{
  stroke(grid_color);
  strokeWeight(0.5);
  for (gri = 0; gri <= width; gri+= unit/(celldensity))
  {
        line(gri, 0, gri, height);
      
  }
  for (gris = 0; gris <= height; gris+=unit/(celldensity))
  {
      

        line(0, gris, width, gris);
      
  }
  noStroke();
}
pdf.endRecord();

if (send == 1)
{
findSVG();
}
svg_obj = $('#defaultCanvas').svg('get');
  $('.coming').html(d.c);
  $('.living').html(d.c2);
  $('.old').html(d.a);
  $('.work').html($('#work-input > select > option:selected').text());
  $('.education').html($('#education > select > option:selected').text());
  if (d.re == 0) 
  {
    $('.relationship').html('No relationship.');
  }
  else if (d.re == 1) 
  {
    $('.relationship').html('A relationship.');
  }
  else {
    $('.relationship').html('Unknown.');
  }
  
}  

//COMMUNICATION
function findSVG()
{
  transmit = new transmission_data($('#defaultCanvas').html(), d);
  sendSVG(transmit);
}

function sendSVG(transmit)
{
    socket.emit('data_send', /*{*/transmit/*}*/); //testing for safari/ipad - why selects are not working
    send = 0;
}

function sendEmail(emailinfo)
{
    socket.emit('send_email', /*{*/emailinfo/*}*/); //testing for safari/ipad - why selects are not working
    email = 0;
}

function sendPrint()
{
    socket.emit('print_file'); //testing for safari/ipad - why selects are not working
    print = 0;
}

//WAREHOUSES
//instantiate an object that is to hold a square in an array
function cell_square(_x, _y, _unit, _fillstate, _colorstate, _color1, _color2, _hsym, _vsym, _row, _column) {
   this.x = _x;
   this.y = _y;
   this.unit = _unit;
   this.fillstate = _fillstate;
   this.colorstate = _colorstate;
   this.color1 = _color1;
   this.color2 = _color2;
   this.hsym = _hsym;
   this.vsym = _vsym;
   this.row = _row;
   this.column = _column; 
}

//FACTORIES

function bitFactory(number_of_times, limit, i, data)
{
  var number = number_of_times;
  var dat = data;
  var cnt = i;
  var output = '';
  var currentChar = '';
  var r = 0;

  //edit code of one row for relationship status
  if (cnt == count_x/2-1)
  {
    if (dat.re == 0)
    {    
      output = '0000';
    }
    else if (dat.re == 1) {
      
      output = '1001';
     
    }
    else {
       output = '1010';
    }
   
  } //convert education to symbol
  else if(cnt == count_x/2-2 )
  { 
    currentChar = '0';
    output = dec2bin(d.ed);
       if (output.length != 4)
          {
            for (o=0; o<4-output.length; o++)
            {
              output = currentChar + output;
            }
          }
     //return output;     
  }        
   
           
  
  //encode profession
   else if(cnt == count_x/2-3 )
  { 
     output = dec2bin(d.prof);
     currentChar = '0';
     if (output.length != 4)
          {
            for (o=0; o<4-output.length; o++)
            {
              output = currentChar + output;
            }
          }
     //return output;       
  }
      
           
  //encode age
  else if ( cnt == count_x/2-4)
  {
    output = dec2bin(Math.floor(d.a/7));  
    currentChar = '0';
     if (output.length != 4)
          {
            for (co=0; co<4-output.length; co++)
            {
              output = currentChar+ output;
            }
          }
  }
  //encode origin country population
  else if ( cnt == count_x/2-5)
  {
    var cap = 0;
    for (cou = 0 ; cou < countries.length; cou++)
    {
      if (countries[cou].country == d.c)
      {
        var pop = countries[cou].pop;
        if (pop < 3000000000)
          {
            cap = 15;     
          }
        if (pop < 600000000)
          {
            cap = 14;     
          }
        if (pop < 400000000)
          {
            cap = 13;     
          }
        if (pop < 300000000)
          {
            cap = 12;     
          }
        if (pop < 200000000)
          {
            cap = 11;     
          }
        if ( pop < 100000000)
        {
          cap = 10;
        } 
        if ( pop < 50000000)
        {
          cap = 9;
        }
        if ( pop < 15000000)
        {
          cap = 8;
        }
        if ( pop < 10000000)
        {
          cap = 7;
        }
        if ( pop < 3000000)
        {
          cap = 6;
        }
        if ( pop < 1000000)
        {
          cap = 5;
        }
        if ( pop < 100000)
        {
          cap = 4;
        }
        if ( pop < 50000)
        {
          cap = 3;
        }
        if ( pop < 10000)
        {
          cap = 2;
        }
        if ( pop < 800)
        {
          cap = 1;
        }
      }
    }

    output = dec2bin(cap);  
    currentChar = '0';
     if (output.length != 4)
          {
            for (co=0; co<4-output.length; co++)
            {
              output = currentChar+ output;
            }
          }
  }


   else if ( cnt == count_x/2-6)
  {
    var cap = 0;
    for (cou = 0 ; cou < countries.length; cou++)
    {
      if (countries[cou].country == d.c)
      {
        var cul = countries[cou].cult;
        switch (cul)
        {
          case 'northern':
            cap = 14;
            break;
          case 'caucas':  
            cap = 13;
            break;
          case 'southern':
            cap = 12;
            break;
          case 'south-eastern':
            cap = 11;
            break;
          case 'western':
            cap = 10;
            break;
          case 'eastern':
            cap = 9;
            break;
          case 'baltic':
            cap = 8;
            break;
          case 'creole':
            cap = 7;
            break;
          case 'indo-american':
            cap = 6;
            break;
          case 'mixed':
            cap = 5; 
            break;
          case 'mestizo':
            cap = 4; 
            break;      
        }
      }
    }

    output = dec2bin(cap);  
    currentChar = '0';
     if (output.length != 4)
          {
            for (co=0; co<4-output.length; co++)
            {
              output = currentChar+ output;
            }
          }
  }

  else if ( cnt == count_x/2-7)
  {
    var cap = 0;
    for (cou = 0 ; cou < countries.length; cou++)
    {
      if (countries[cou].country == d.c)
      {
        var gd = countries[cou].gdp;
        
          
          if (gd < 20000000)
          {
            cap = 14;
          }
          if (gd < 7000000)
          {
            cap = 13;
          }
          if (gd < 6000000)
          {
            cap = 12;
          }

          if (gd < 5000000)
          {
            cap = 11;
          }
          if (gd < 4000000)
          {
            cap = 10;
          }
          if (gd < 4000000)
          {
            cap = 10;
          }
          if (gd < 3000000)
          {
            cap = 9;
          }  
          if (gd < 1000000)
          {
            cap = 8;
          }
          if (gd < 700000)
          {
            cap = 7;
          }  
          if (gd < 300000)
          {
            cap = 6;
          }
          if (gd < 100000)
          {
            cap = 5;
          }
          if (gd < 50000)
          {
            cap = 4;
          }
          if (gd < 20000)
          {
            cap = 3;
          }
          if (gd < 10000)
          {
            cap = 2;
          }
          if (gd < 5000)
          {
            cap = 1;
          } 
      }
    }

    output = dec2bin(cap);  
    currentChar = '0';
     if (output.length != 4)
          {
            for (co=0; co<4-output.length; co++)
            {
              output = currentChar+ output;
            }
          }
  }

  else if ( cnt == count_x/2-8)
  {
    var cap = 0;
    for (cou = 0 ; cou < countries.length; cou++)
    {
      if (countries[cou].country == d.c2)
      {
        var gd = countries[cou].gdp;
          
          if (gd < 8000000)
          {
            cap = 15;
          }
          if (gd < 7000000)
          {
            cap = 14;
          }
          if (gd < 7000000)
          {
            cap = 13;
          }
          if (gd < 6000000)
          {
            cap = 12;
          }

          if (gd < 5000000)
          {
            cap = 11;
          }
          if (gd < 4000000)
          {
            cap = 10;
          }
          if (gd < 3000000)
          {
            cap = 9;
          }  
          if (gd < 1000000)
          {
            cap = 8;
          }
          if (gd < 700000)
          {
            cap = 7;
          }  
          if (gd < 300000)
          {
            cap = 6;
          }
          if (gd < 100000)
          {
            cap = 5;
          }
          if (gd < 50000)
          {
            cap = 4;
          }
          if (gd < 20000)
          {
            cap = 3;
          }
          if (gd < 10000)
          {
            cap = 2;
          }
          if (gd < 5000)
          {
            cap = 1;
          } 
      }
    }

    output = dec2bin(cap);  
    currentChar = '0';
     if (output.length != 4)
          {
            for (co=0; co<4-output.length; co++)
            {
              output = currentChar+ output;
            }
          }
  }

  else if ( cnt == count_x/2-9)
  {
    var cap = 0;
    for (cou = 0 ; cou < countries.length; cou++)
    {
      if (countries[cou].country == d.c2)
      {
        cap = countries[cou].min;
      }
    }

    output = dec2bin(cap);  
    currentChar = '0';
     if (output.length != 4)
          {
            for (co=0; co<4-output.length; co++)
            {
              output = currentChar+ output;
            }
          }
  }

  else if ( cnt == count_x/2-10)
  {
    var cap = 0;
    for (cou = 0 ; cou < countries.length; cou++)
    {
      if (countries[cou].country == d.c2)
      {
        var mp = countries[cou].min_p;
        
        if (mp < 80)
          {
            cap = 15;
          }
        if (mp < 60)
          {
            cap = 14;
          }
          if (mp < 55)
          {
            cap = 13;
          }  
          if (mp < 50)
          {
            cap = 12;
          }
          if (mp < 45)
          {
            cap = 11;
          }  
          if (mp < 40)
          {
            cap = 10;
          }
          if (mp < 25)
          {
            cap = 8;
          }
          if (mp < 20)
          {
            cap = 7;
          }
          if (mp < 15)
          {
            cap = 4;
          }
          if (mp < 10)
          {
            cap = 3;
          }
          if (mp < 5)
          {
            cap = 2;
          }   

      }
    }

    output = dec2bin(cap);  
    currentChar = '0';
     if (output.length != 4)
          {
            for (co=0; co<4-output.length; co++)
            {
              output = currentChar+ output;
            }
          }
  }

  else {
  for (h=0; h < number; h++ )
  {
    r = Math.floor((Math.random() * limit));
    currentChar = r.toString();
    output += currentChar;
  }
  }
  return output;
}


//mixed symmetry

function symmetryFactory(cell)
{
  for(s = 0; s < cell.length; s++ )
    {
      
      
      //do horizontal symmetry for half the columns on even rows 

      if (cell[s].row % 2 == 0)
      {
        if (cell[s].column == count_x/2 -1) 
        {
            for(c = 0; c < count_x/2; c++)
              {

                switch(cell[s-c].fillstate) {     
                                case '1000':
                                  cell[s+c+1].fillstate = '1000';
                                  break;
                                case '0010':
                                  cell[s+c+1].fillstate = '0010';  
                                  break;
                                case '0100':
                                  cell[s+c+1].fillstate = '0001';
                                  break;
                                case '0001':
                                  cell[s+c+1].fillstate = '0100';
                                  break;
                                case '0101':
                                  cell[s+c+1].fillstate = '0101';
                                  break;
                                case '1010':
                                  cell[s+c+1].fillstate = '1010';
                                  break;  
                                case '0110':
                                  cell[s+c+1].fillstate = '0011';
                                  break;
                                case '1100':
                                  cell[s+c+1].fillstate = '1001';
                                  break;     
                                case '1001':
                                  cell[s+c+1].fillstate = '1100';
                                  break;
                                case '0011':
                                  cell[s+c+1].fillstate = '0110';
                                  break;
                                case '0111':
                                  cell[s+c+1].fillstate = '0111';
                                  break;     
                                case '1101':
                                  cell[s+c+1].fillstate = '1101';
                                  break;
                                case '1011':
                                  cell[s+c+1].fillstate = '1110';
                                  break;  
                                case '1110':
                                  cell[s+c+1].fillstate = '1011';
                                  break;
                                case '1111':
                                  cell[s+c+1].fillstate = '1111';
                                  break;
                                case '0000':
                                  cell[s+c+1].fillstate = '0000';
                                  break;
                                } 
                          }
            
        }
      }


      //do vertical symmetry only on odd rows - use even rows as reference
      if ( cell[s].row % 2 != 0)
      {
        if (cell[s].vsym == 1)
            {
               
              switch(cell[s-(count_x+1)].fillstate) {
                  

                  case '1000':
                    cell[s].fillstate = '0010';
                    break;
                  case '0010':
                    cell[s].fillstate = '1000'  
                    break;
                  case '0100':
                    cell[s].fillstate = '0100';
                    break;
                  case '0001':
                    cell[s].fillstate = '0001';
                    break;
                  case '0101':
                    cell[s].fillstate = '0101';
                    break;
                  case '1010':
                    cell[s].fillstate = '1010';
                    break;  
                  case '0110':
                    cell[s].fillstate = '1100';
                    break;
                  case '1100':
                    cell[s].fillstate = '0110';
                    break;     
                  case '1001':
                    cell[s].fillstate = '0011';
                    break;
                  case '0011':
                    cell[s].fillstate = '1001';
                    break;
                  case '0111':
                    cell[s].fillstate = '1101';
                    break;     
                  case '1101':
                    cell[s].fillstate = '0111';
                    break;
                  case '1011':
                    cell[s].fillstate = '1011';
                    break;  
                  case '1110':
                    cell[s].fillstate = '1110';
                    break;
                  case '1111':
                    cell[s].fillstate = '1111';
                    break;
                  case '0000':
                    cell[s].fillstate = '0000';
                    break;
                  } 
            }
      }
    }
  return cell;  
} 






//geometry generators
//define square object class / to be understood here as a visual cell object  
function square(x, y, unit, fillstate, colorstate, color1, color2, mode, symbol) {
  //var angle = TWO_PI / npoints;
 
  // define the 5 internal vertices of the square
  // optimize later to include some sort of object definition for point
  var _space = symbol; //unused yet
  var pixel = mode; 
  var state = fillstate;
  var cstate = colorstate;

  var point_1_x = x;
  var point_1_y = y;

  var point_2_x = x+unit;
  var point_2_y = y;
  
  var point_3_x = x+unit;
  var point_3_y = y+unit;

  var point_4_x = x;
  var point_4_y = y+unit;

  var point_5_x = x + unit/2;
  var point_5_y = y + unit/2;

  switch (pixel)
  {
    /* 
   ____  ___ 
   \ 0/  |1\   / \    /3|
    \/   | /  /_2_\   \ | 
  
  state values corresponding to the 
  fill state of the triangles 
  within the unit square
  */
    case 1: //if mode is 1 (vector graphics print) - do a triagles within cells based on 5 points and 3 vertices
      //unit = width/20;
      if (state[3] == '1')
      {
        
        push();
         //color the triangle

          if (cstate[3] == '1')
          {
            fill(color1);
          } 
          else if (cstate[3] == '2')
          { 
            fill(color2);
          } 

          else 
          {
            fill('#fff');
          }
        beginShape();
          vertex(point_2_x,point_2_y);
          vertex(point_5_x, point_5_y);
          vertex(point_3_x, point_3_y);
        endShape(CLOSE); 
        pop();   
      }
      if (state[2] == '1')
      {
        push();
        //color triangle
        if (cstate[2] == '1')
          {
            fill(color1);
          } 
          else if (cstate[2] == '2')
          { 
            fill(color2);
          } 
          else 
          {
            fill('#fff');
          }
        beginShape();
          vertex(point_3_x,point_3_y);
          vertex(point_5_x, point_5_y);
          vertex(point_4_x, point_4_y);
        endShape(CLOSE); 
        pop(); 
      }
      if (state[1] == '1')
      {

        push();

        //color triangle

        if (cstate[1] == '1')
          {
            fill(color1);
          } 
          else if (cstate[1] == '2')
          { 
            fill(color2);
          } 

          else 
          {
            fill('#fff');
          }

        beginShape();
          vertex(point_1_x,point_1_y);
          vertex(point_5_x, point_5_y);
          vertex(point_4_x, point_4_y);
        endShape(CLOSE); 
        pop(); 
      }
      if (state[0] == '1')
      {
        push();

        //color triangle

        if (cstate[0] == '1')
          {
            fill(color1);
          } 
          else if (cstate[0] == '2')
          { 
            fill(color2);
          } 

          else 
          {
            fill('#fff');
          }


        beginShape();
          vertex(point_1_x,point_1_y);
          vertex(point_5_x, point_5_y);
          vertex(point_2_x, point_2_y);
        endShape(CLOSE); 
        pop(); 
      }
      break;
    case 2:
      
      var sunit = unit/(celldensity); //define the pixel density unit in this case the base unit divided by 9
      if (state[3] == '1')
      {
        
        push();
         //color the triangle
        if (cstate[3] == '1')
          {
            fill(color1);
          } 
          else if (cstate[3] == '2')
          { 
            fill(color2);
          } 

          else 
          {
            fill('#fff');
          }
        angleWalkerDraughtman(x,y,celldensity,sunit,3);
        pop();   
      }
      if (state[2] == '1')
      {
        push();
        //color triangle
        if (cstate[2] == '1')
          {
            fill(color1);
          } 
          else if (cstate[2] == '2')
          { 
            fill(color2);
          } 
          else 
          {
            fill('#fff');
          }
        angleWalkerDraughtman(x,y,celldensity,sunit,2);
        pop(); 
      }
      if (state[1] == '1')
      {

        push();

        //color triangle
        if (cstate[1] == '1')
          {
            fill(color1);
          } 
          else if (cstate[1] == '2')
          { 
            fill(color2);
          } 

          else 
          {
            fill('#fff');
          }
        angleWalkerDraughtman(x,y,celldensity,sunit,1);
        pop(); 
      }
      if (state[0] == '1')
      {
        push();
        //color triangle
        if (cstate[0] == '1')
          {
            fill(color1);
          } 
          else if (cstate[0] == '2')
          { 
            fill(color2);
          } 

          else 
          {
            fill('#fff');
          }
        angleWalkerDraughtman(x,y,celldensity,sunit,0);
        pop(); 
      }
      break;
      
  }
}

function data(relationship, age, country, country2, education, profession, email)
{
  this.re = relationship;
  this.a = age;
  this.c = country;
  this.c2 = country2;
  this.ed = education;
  this.prof = profession;
  this.email = email;
}

function country(country_name, population_estimate, percent_of_eu, no_minorities, minority_percent, culture_group, gdp)
{
  this.country = country_name;
  this.pop = population_estimate;
  this.perc = percent_of_eu;
  this.min = no_minorities;
  this.min_p = minority_percent;
  this.cult = culture_group;
  this.gdp = gdp;

}

function transmission_data(_svg, _data)
{
  this.svg = _svg;
  this.d = _data;
}



//convert integer to 4 bit binary value to be used in
// generation of square patterns (this code takes cae that if a value is e.g. 11 it will be listed as 0011)
function dec2bin(val) {
            var bits = [];
            for (var i = 0; i < 4; i++) {
              bits.push(val % 2);
                val = (val - val % 2) / 2;
            }
            bits.reverse();
            return bits.join("");
  }

function keyPressed()
{
  if(key == "S")
  {
    exportSVG = true;
  }
}

function angleWalkerDraughtman(x,y,units,_unit,valuecase){
  var _valuecase = valuecase;
  var _symbolspace = _space;

  //strokeWeight(0.2);
  noStroke();
  switch (_valuecase){
    case 0: // x-> ; y -> <- -- movement direction and order -- similarity with case 2 reverse movement pattern
        beginShape();
        var direction = 1; //direction of movement for or back
        var cur_y  = y; //store current y
        var cur_x = x
        vertex(cur_x,cur_y); //initial vertex
        for (w=1; w <= units; w++) 
        { 
          if (direction > 0) //if direction is for
          {
          cur_y = y+(direction*_unit*w);  
          vertex(cur_x, cur_y); //make forward moving vertices
          //cur_y = cur_y+(direction*unit*w); //actualize y
          cur_x = x+(_unit*w); //actualize x
          vertex(cur_x, cur_y); 
          }
          else 
          {
            cur_x = x+(_unit*w); //actualize x
            vertex(cur_x, cur_y); //if direction is back
            cur_y = y+(_unit*units)+(_unit*direction*w);   //actualize y
            vertex(cur_x, cur_y); //make backward moving vertices
            

          }
          if ( units-w == w-1) // if middle element has been reached 
            {
              //cur_x = x+(direction*unit*w); //store y
              direction*=-1; //switch direction
              cur_y= cur_y - _unit;
              vertex(cur_x, cur_y);  // make first backward vertex

            }
           
        }
        endShape(CLOSE);
        /*
        switch(_symbolspace){
          case 0:
            break;
          case 1:
            push()
            fill('#fff');
            var direction = 1; //direction of movement for or back
            var cur_y  = y; //store current y
            var cur_x = x+_unit;
            var _x = x+_unit;
            
            for (w=1; w <= units-1; w++) 
            { 
              if (direction > 0) //if direction is for
              {
              cur_y = y+(direction*_unit*w);  
              //make forward moving vertices
              //cur_y = cur_y+(direction*unit*w); //actualize y
              cur_x = x+(_unit*w); //actualize x
              rect(cur_x,cur_y,_unit,_unit);
              }
              else 
              {
                cur_x = _x+(_unit*w);
                cur_y = cur_y-_unit;
                rect(cur_x,cur_y,_unit,_unit); 
              }
              if ( units-w == w-1) // if middle element has been reached 
                {
                cur_y = y+(direction*_unit*w);
                 direction*=-1;

                }
               
            }
            endShape(CLOSE);
            pop();
            break;
          case 2:
            break;
          } */
      break;
    case 1: // x-> <- ; y -> -- similarity with case 3 reverse movement pattern
          beginShape();
          var direction = 1; //direction of movement for or back
          var cur_y  = y; //store current y
          var cur_x = x;
          vertex(x,y); //initial vertex
          for (w=1; w <= units; w++) 
          { 
            if (direction > 0) //if direction is for
            {
            cur_x = x+(direction*_unit*w);   //actualize x
            vertex(cur_x, cur_y); //make forward moving vertices
            cur_y = y+(_unit*w); //actualize y
            vertex(cur_x, cur_y); 
            }
            else //if direction is back
            {
              cur_y = y+(_unit*w);
              vertex(cur_x, cur_y); //make backward moving vertices
              cur_x = x+(units*_unit)+(direction*_unit*w);//actualize x
              vertex(cur_x, cur_y); 
            }

            if ( units-w == w-1) // if middle element has been reached 
              {
                cur_y = y+(_unit*w); //store y
                direction*=-1; //switch direction
                vertex(cur_x - _unit, cur_y);  // make first backward vertex
                cur_x = cur_x -_unit;
              }
             
          }
          endShape(CLOSE);
      break;
    case 2: // x->  ; y <- -> -- similarity with case 0 reverse movement pattern
            beginShape();
            var direction = -1; //direction of movement forward or back
            var cur_y  = y+(units*_unit); //move y to the end of the unit
            var cur_x = x;
            vertex(cur_x, cur_y); //initial vertex
            for (w=1; w <= units; w++) 
            { 
      
              if (direction < 0)
              {
                cur_y =y+(units*_unit)+(direction*_unit*w);
                vertex(cur_x, cur_y); //if direction is back
                cur_x = x+(_unit*w); //actualize x
                vertex(cur_x, cur_y); //make backward moving vertices
                //cur_y=y+(direction*unit*w);   //actualize y

              }
              else //if direction is forward
              {
              cur_x = x+(_unit*w);  
              vertex(cur_x, cur_y); //make forward moving vertices
              cur_y = y+(direction*_unit*w); //actualize y
              vertex(cur_x, cur_y); 
               //actualize x
              }

              if ( units-w == w-1) // if middle element has been reached 
                {
                  //cur_y = cur_y+(direction*unit*w); //store y
                  cur_x = x+(_unit*w);
                  direction*=-1; //switch direction
                  vertex(cur_x, cur_y + _unit);  // make first backward vertex
                  cur_y = cur_y + _unit;
                }
               
            }
            endShape(CLOSE);
      break;
    case 3: // x <- ->  ; y -> - similarity with case 1 - reverse movement pattern
            beginShape();
            var direction = -1; //direction of movement for or back
            var cur_y  = y; //store current y
            var cur_x = x + (units * _unit); //move x to the end of the unit
            vertex(cur_x,cur_y); //initial vertex
            for (w=1; w <= units; w++) 
            { 
             
              if (direction < 0) //if direction is back
                {
                  cur_x = x + (units * _unit)+(direction*_unit*w)
                  vertex(cur_x, cur_y); //make backward moving vertices
                  cur_y = y+(_unit*w);
                  vertex(cur_x, cur_y); 
                }

              else  //if direction is forward
                {
                cur_y = y+(_unit*w);  
                vertex(cur_x, cur_y);   
                 //actualize y
                cur_x = x+(direction*_unit*w); //actualize x 
                vertex(cur_x, cur_y); //make forward moving vertice
                }

              if ( units-w == w-1) // if middle element has been reached 
                {
                  cur_x = cur_x + _unit;
                  //cur_x = cur_x+(direction*_unit*w); //store y
                  direction*=-1; //switch direction
                  vertex(cur_x, cur_y);  // make first backward vertex
                  
                }
               
            }
            endShape(CLOSE);
          break;
      
  }
}

function update(jscolor) {
    // 'jscolor' instance can be used as a string
    main_color='#' + jscolor;
}
//make some regular polygons
function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


//checks email using a RegEx to make sure that user has used a properly formatted email
function ValidateEmail(mail)   
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    $('#invalid').css('display', 'none'); 
    return (true);
  }  
 else {
  //alert("You have entered an invalid email address!")
    $('#invalid').css('display', 'block');
    email = 0;    
    return (false);
 }  
      
}  
