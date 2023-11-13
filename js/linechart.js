/*
    Demonstrate how to create a line chart
*/

async function getData() {
    const response = await fetch('../data/research-data.csv'); //.. moves up 1 folder
    const data = await response.text();     // CSV is in TEXT format
    console.log(data); 

    const xYears = []; // x-axis labels = years values
    const yTemps = []; // y-axis global temp values
    const yNHtemps = []; // y-axis NJ temp values
    const ySHtemps = []; // y-axis SH temp values

    const xTrials = [];
    const zeroADA = [];
    const zeroABA = [];
    const twoADA = [];
    const twoABA = [];
    const fourADA = [];
    const fourABA = [];
    const eightADA = [];
    const eightABA = [];
    const sixteenADA = [];
    const sixteenABA = [];
    // \n - new line character
    // split ('\n') will separate table into an array of individual rows
    // slice(start, end) - return a new array starting at index start 
    // up to but not including index end.
    const table = data.split('\n').slice(1);
    //console.log(table);

    table.forEach(row => {
        const columns = row.split(','); // split each row on the commas
        const trial  = columns[0];       // assign year value
        xTrials.push(trial);              // push year value into xYears array
        
        const zADA = parseFloat(columns[1]);    // assign temp values
        zeroADA.push(zADA + 14);         // push temp values + 14 to store mean temp values

        const zABA = parseFloat(columns[2]);    // n. hemi. temp deviation values
        zeroABA.push(zABA + 14);         // push temp values + 14 to store mean temp values
        
        const tADA = parseFloat(columns[3]);    // s. hemi. temp deviation values 
        twoADA.push(tADA + 14);         // push temp values + 14 to store mean temp values

        const tABA = parseFloat(columns[4]);    // s. hemi. temp deviation values 
        twoABA.push(tABA + 14);         // push temp values + 14 to store mean temp values

        const fADA = parseFloat(columns[5]);    // s. hemi. temp deviation values 
        fourADA.push(fADA + 14);         // push temp values + 14 to store mean temp values

        const fABA = parseFloat(columns[6]);    // s. hemi. temp deviation values 
        fourABA.push(fABA + 14);         // push temp values + 14 to store mean temp values

        const eADA = parseFloat(columns[7]);    // s. hemi. temp deviation values 
        eightADA.push(eADA + 14);         // push temp values + 14 to store mean temp values

        const eABA = parseFloat(columns[8]);    // s. hemi. temp deviation values 
        eightABA.push(eABA + 14);         // push temp values + 14 to store mean temp values

        const sADA = parseFloat(columns[9]);    // s. hemi. temp deviation values 
        sixteenADA.push(sADA + 14);         // push temp values + 14 to store mean temp values

        const sABA = parseFloat(columns[10]);    // s. hemi. temp deviation values 
        sixteenABA.push(sABA + 14);         // push temp values + 14 to store mean temp values

        //console.log(year, temp, nhTemp, shTemp);

    });
    return{xTrials, zeroADA, zeroABA, twoADA, twoABA, fourADA, fourABA, eightADA, eightABA, sixteenADA, sixteenABA}
}

async function createChart(){
    const data = await getData() // createChart will wait until getData() is finished processing 
    const ctx = document.getElementById('myChart');
    const degSym = String.fromCharCode(176);
    const myChart = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: data.xTrials,
            datasets: [
                {
                label: `Contact Angle of Adaxial Leaf Side with no Nitrogen Fertilizer`,
                data: data.zeroADA,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Abaxial Leaf Side Based with no Nitrogen Fertilizer`,
                data: data.zeroABA,
                fill: false,
                backgroundColor: 'rgba(0, 102, 255, 0.2)',
                borderColor: 'rgba(0, 102, 255, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Adaxial Leaf Side Based on 2mL of Nitrogen Fertilizer`,
                data: data.twoADA,
                fill: false,
                backgroundColor: 'rgba(0, 102, 255, 0.2)',
                borderColor: 'rgba(0, 102, 255, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Abaxial Leaf Side Based on 2mL of Nitrogen Fertilizer`,
                data: data.twoABA,
                fill: false,
                backgroundColor: 'rgba(0, 153, 51, 0.2)',
                borderColor: 'rgba(0, 153, 51, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Adaxial Leaf Side Based on 4mL of Nitrogen Fertilizer`,
                data: data.fourADA,
                fill: false,
                backgroundColor: 'rgba(0, 153, 51, 0.2)',
                borderColor: 'rgba(0, 153, 51, 1)',
                borderWidth: 1
                },
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
                        maxTicksLimit: data.zeroADA.length/10,    // limit # of ticks
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