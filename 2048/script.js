let model = [
    [0, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 0, 2],
    [0, 2, 0, 0]
]

function draw()
{
    setInterval(onframe, 100);
}

function onframe()
{
    var canvas = document.getElementById('main');
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 1000, 1000);

    for (var i = 0; i < 4; i++)
    {
        for (var j = 0; j < 4; j++)
        {
            drawSquare(ctx, model[j][i].toString(), i, j);
        }
    }
}

function drawSquare(ctx, value, i, j)
{
    let x = 50 + i * 100;
    let y = 50 + j * 100;

    let number = parseInt(value);
    let red = 0;
    let green = 255;
    let blue = 0;

    if (number == 0)
    {
        green = red = 20;
        blue = 40
    }

    while (red < 255 && number > 2)
    {
        number /= 2;
        red += 51;
    }
    while (green > 0 && number > 2)
    {
        number /= 2;
        green -= 51;
    }

    ctx.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")"; 
    ctx.fillRect(x, y, 100, 100);
    
    if (number == 0)
        return

    ctx.fillStyle = "rgb(0, 0, 0)"; 
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value, x + 50, y + 50);
}

document.addEventListener('keydown', function(event)
{
    if (event.key == 'a' || event.key == 'A')
    {
        left();
    }
    else if (event.key == 's' || event.key == 'S')
    {
        down();
    }
    else if (event.key == 'd' || event.key == 'D')
    {
        right();
    }
    else if (event.key == 'w' || event.key == 'W')
    {
        up();
    }
});

function down()
{
    let moved = false;
    for (let i = 0; i < 4; i++)
    {
        for (let j = 2; j > -1; j--)
        {
            if (model[j][i] == 0)
                continue;
            let newj = j
            while (newj < 3 && model[newj + 1][i] == 0)
            {
                newj++;
            }

            if (newj != j)
            {
                model[newj][i] = model[j][i]
                model[j][i] = 0
                moved = true;
            }
            
            if (newj == 3)
                continue;
            
            if (model[newj][i] == model[newj + 1][i])
            {
                model[newj][i] = 0
                model[newj + 1][i] *= 2
                moved = true;
            }
        }
    }
    if (moved)
    {
        addNew();
    }
}

function up()
{
    let moved = false;
    for (let i = 0; i < 4; i++)
    {
        for (let j = 1; j < 4; j++)
        {
            if (model[j][i] == 0)
                continue;
            let newj = j
            while (newj > 0 && model[newj - 1][i] == 0)
            {
                newj--;
            }

            if (newj != j)
            {
                model[newj][i] = model[j][i]
                model[j][i] = 0
                moved = true;
            }
            
            if (newj == 0)
                continue;
            
            if (model[newj][i] == model[newj - 1][i])
            {
                model[newj][i] = 0
                model[newj - 1][i] *= 2
                moved = true;
            }
        }
    }
    if (moved)
    {
        addNew();
    }
}

function left()
{
    let moved = false;
    for (let j = 0; j < 4; j++)
    {
        for (let i = 1; i < 4; i++)
        {
            if (model[j][i] == 0)
                continue;
            let newi = i;
            while (newi > 0 && model[j][newi - 1] == 0)
            {
                newi--;
            }

            if (newi != i)
            {
                model[j][newi] = model[j][i]
                model[j][i] = 0
                moved = true;
            }
            
            if (newi == 0)
                continue;
            
            if (model[j][newi] == model[j][newi - 1])
            {
                model[j][newi] = 0
                model[j][newi - 1] *= 2
                moved = true;
            }
        }
    }
    if (moved)
    {
        addNew();
    }
}

function right()
{
    let moved = false;
    for (let j = 0; j < 4; j++)
    {
        for (let i = 2; i > -1; i--)
        {
            if (model[j][i] == 0)
                continue;
            let newi = i;
            while (newi < 3 && model[j][newi + 1] == 0)
            {
                newi++;
            }

            if (newi != i)
            {
                model[j][newi] = model[j][i]
                model[j][i] = 0
                moved = true;
            }
            
            if (newi == 3)
                continue;
            
            if (model[j][newi] == model[j][newi + 1])
            {
                model[j][newi] = 0
                model[j][newi + 1] *= 2
                moved = true;
            }
        }
    }
    if (moved)
    {
        addNew();
    }
}

function addNew()
{
    var index = Math.floor(1000 * Math.random());
    while (true)
    {
        for (var i = 0; i < 4; i++)
        {
            for (var j = 0; j < 4; j++)
            {
                if (model[j][i] != 0)
                    continue;
                
                index--;
                if (index != 0)
                    continue;
                
                model[j][i] = Math.random() < 0.8 ? 2 : 4;
                return;
            }
        }
    }
}