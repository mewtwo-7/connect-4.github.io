// JavaScript code goes here
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 360;
var y = 650;
var count = 0;
var  y_arr = [655,655,655,655,655,655,655];
var Logic = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
var Player_1 = "";
var Player_2 = "";

function drawBoard()
{
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#3209FF";
    ctx.fill();
    ctx.closePath();

    for(let i = 0; i < 6;i++)
    {
        ctx.beginPath();
        for(let j =0;j<7;j++)
        {
            ctx.arc(j*100+60, 100*i+55, 45, 0, Math.PI * 2, true)
        }
        ctx.fillStyle = "#260EA2";
        ctx.fill();
        ctx.closePath();
    }
    
}

document.addEventListener("keydown", keyDown);



function keyDown(e)
{
    switch(e.keyCode)
    {
        case 37:
            if(x > 60)
            {
                
                x = x - 100;
                ctx.beginPath();
                ctx.arc(x+100,y,46,0, Math.PI*2,true);
                ctx.fillStyle = "#3209FF";
                ctx.strokeStyle = "#3209FF";
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            
            break;
        
        case 39:
            if(x < 660)
            {
                
                x = x + 100;
                ctx.beginPath();
                ctx.arc(x-100,y,46,0, Math.PI*2,true);
                ctx.fillStyle = "#3209FF";
                ctx.strokeStyle = "#3209FF";
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            break;
        
        case 38:

            var pos = (x - 60)/100;
            
            if(y_arr[pos]>0)
            {
                y_arr[pos] -= 100;
                
            }
            var posy = (555 - y_arr[pos])/100;
            if(count%2 == 0)
            {
                ctx.beginPath();
                ctx.arc(x,y_arr[pos],45,0, Math.PI*2,true);
                ctx.fillStyle = "Red";
                ctx.fill();
                ctx.closePath();
                if(y_arr[pos]>0)
                {
                    count++;
                    Logic[posy][pos] = 1;
                }
            }
            else
            {
                ctx.beginPath();
                ctx.arc(x,y_arr[pos],45,0, Math.PI*2,true);
                ctx.fillStyle = "Yellow";
                ctx.fill();
                ctx.closePath();
                if(y_arr[pos]>0)
                {
                    count++;
                    Logic[posy][pos] = -1;
                }
            }
            break;
    }
}

function MakeBall()
{
    if(Player_1 =="")
    {
        Player_1 =prompt("Player 1:")
    }
    if(Player_2 =="")
    {
        Player_2 =prompt("Player 2:")
    }
    if(count%2 == 0)
    {
        ctx.beginPath();
        ctx.arc(x,y,45,0, Math.PI*2,true);
        ctx.fillStyle = "Red";
        ctx.strokeStyle = "#3209FF";
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    else
    {
        ctx.beginPath();
        ctx.arc(x,y,45,0, Math.PI*2,true);
        ctx.fillStyle = "Yellow";
        ctx.strokeStyle = "#3209FF";
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    
}

function A()
    {
        var wanna_play = prompt("wanna play(P) , see high score(H)")
                if(wanna_play == 'P')
                {
                    document.location.reload();
                }
                else if (wanna_play == 'H')
                {
                    var highscore = localStorage.getItem("highscore");
                    var player = localStorage.getItem("player");
                    alert("Best win achieved by "+ player +" in "+ highscore +" moves");
                    return A();
                }
                else
                {
                    alert("Is this  P or H. We accept only english." );
                    return A();
                }
    }


function Physics()
{
    MakeBall();
    if(count == 42)
    {
        alert("DRAW");
        A();
    }

    

    for(let i = 0; i < 4;i++)
    {
        for(let j = 0; j < 3; j++)
        {
            var points = Logic[j][i] + Logic[j][i+1] + Logic[j][i+2] + Logic[j][i+3];
            var points1 = Logic[j][i] + Logic[j+1][i+1] + Logic[j+2][i+2] + Logic[j+3][i+3];
            var points2 = Logic[j][i] + Logic[j+1][i] + Logic[j+2][i] + Logic[j+3][i];
            var points3 = Logic[j+3][i] + Logic[j+2][i+1] + Logic[j+1][i+2] + Logic[j][i+3];

            console.log(points+ " "+points1+" "+points2+ " " + points3);
            if(points3 == 4||points == 4 || points1 == 4 || points2 == 4)
            {
                console.log("....");
                alert(Player_1+" Wins");
                var score = localStorage.getItem("highscore");
                
                if(score != null)
                {
                    if(count < parseInt(score))
                    {
                        localStorage.setItem("highscore", count);
                        localStorage.setItem("player", Player_1);
                    }

                    
                }
                else{
                    localStorage.setItem("highscore", 42);
                    localStorage.setItem("player", Player_2);
                }
                A();
                
                
            }

            if(points3 == -4||points == -4 || points1 == -4 || points2 == -4)
            {
                console.log("....");
                alert(Player_2+" Wins");
                var score = localStorage.getItem("highscore");
                if(score != null)
                {
                    if(count < parseInt(score))
                    {
                        localStorage.setItem("highscore", count);

                    }

                    
                }
                else{
                    localStorage.setItem("highscore", 42);
                }
                A();
            }


        }
    }
    
    requestAnimationFrame(Physics);
}
drawBoard();
Physics();