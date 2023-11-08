/*
    Demonstrate how to create a line chart
*/

async function getData() {
    const response = await fetch('../data/global-mean-temp.csv'); //.. moves up 1 folder
    const data = await response.text();     // CSV is in TEXT format
    console.log(data); 

    const xYears = []; // x-axis labels = years values
    const yTemps = []; // y-axis global temp values
    const yNHtemps = []; // y-axis NJ temp values
    const ySHtemps = []; // y-axis SH temp values

    // \n - new line character
    // split ('\n') will separate table into an array of individual rows
    // slice(start, end) - return a new array starting at index start 
    // up to but not including index end.
    const table = data.split('\n').slice(1);
    //console.log(table);

    table.forEach(row => {
        const columns = row.split(','); // split each row on the commas
        const year  = columns[0];       // assign year value
        xYears.push(year);              // push year value into xYears array
        
        const temp = parseFloat(columns[1]);    // assign temp values
        yTemps.push(temp + 14);         // push temp values + 14 to store mean temp values


        const nhTemp = parseFloat(columns[2]);    // n. hemi. temp deviation values
        yNHtemps.push(nhTemp + 14);         // push temp values + 14 to store mean temp values
        
        const shTemp = parseFloat(columns[3]);    // s. hemi. temp deviation values 
        ySHtemps.push(shTemp + 14);         // push temp values + 14 to store mean temp values

        //console.log(year, temp, nhTemp, shTemp);

    });
    return{xYears, yTemps, yNHtemps, ySHtemps}
}

async function createChart(){
    const data = await getData() // createChart will wait until getData() is finished processing 
    const ctx = document.getElementById('myChart');
    const degSym = String.fromCharCode(176);
    const myChart = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: data.xYears,
            datasets: [
                {
                label: `Combine Global Land-Surface Air and Sea-Surface Water Temperature in ${degSym}C`,
                data: data.yTemps,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
                },
                {
                label: `Combined N.H. Land-Surface Air and Sea-Surface Water Temperature in ${degSym}C`,
                data: data.yNHtemps,
                fill: false,
                backgroundColor: 'rgba(0, 102, 255, 0.2)',
                borderColor: 'rgba(0, 102, 255, 1)',
                borderWidth: 1
                },
                {
                label: `Combined S.H. Land-Surface Air and Sea-Surface Water Temperature in ${degSym}C`,
                data: data.ySHtemps,
                fill: false,
                backgroundColor: 'rgba(0, 153, 51, 0.2)',
                borderColor: 'rgba(0, 153, 51, 1)',
                borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,           // Re-size based on screen size
            scales: {                    // Display options for x & y axes
                x: {
                    title: {
                        display: true,
                        text: 'Year',   // x-axis title
                        font: {         // font properties
                            size: 20
                        },
                    },
                    ticks: {
                        callback: function(val, index){
                            // Labeling of tick marks can be controlled by code and font size
                            return index % 5 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font: {
                            size: 16
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Global Mean Temperatures (°C)',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        maxTicksLimit: data.yTemps.length/10,    // limit # of ticks
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {               // Display options
                title: {
                    display: true, 
                    text: 'Global Mean Temperature vs. Year (since 1880)',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10, 
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();