/*
    Demonstrate how to create a line chart
*/

async function getData() {
    const response = await fetch('../data/research-data.csv'); //.. moves up 1 folder data directory for local dev
    // const response = await fetch('/CHENSE2324/research-data.csv'); // data directory for GitHub pages
    const data = await response.text();     // CSV is in TEXT format
    console.log(data); 

    const xTrials = [];     // x-axis labels = trials values
    const zeroADA = [];     // y-axis contact angle based on zero mL of nitrogen for adaxial side
    const zeroABA = [];     // y-axis contact angle based on zero mL of nitrogen for abaxial side
    const twoADA = [];      // y-axis contact angle based on two mL of nitrogen for adaxial side
    const twoABA = [];      // y-axis contact angle based on two mL of nitrogen for abaxial side
    const fourADA = [];     // y-axis contact angle based on four mL of nitrogen for adaxial side
    const fourABA = [];     // y-axis contact angle based on four mL of nitrogen for abaxial side
    const eightADA = [];    // y-axis contact angle based on eight mL of nitrogen for adaxial side
    const eightABA = [];    // y-axis contact angle based on eight mL of nitrogen for abaxial side
    const sixteenADA = [];  // y-axis contact angle based on sixteen mL of nitrogen for adaxial side
    const sixteenABA = [];  // y-axis contact angle based on sixteen mL of nitrogen for abaxial side

    // \n - new line character
    // split ('\n') will separate table into an array of individual rows
    // slice(start, end) - return a new array starting at index start 
    // up to but not including index end.
    const table = data.split('\n').slice(1);
    //console.log(table);

    table.forEach(row => {
        const columns = row.split(',');   // split each row on the commas
        const trial  = columns[0];        // assign trial value
        xTrials.push(trial);              // push trial value into xTrials array
        
        const zADA = parseFloat(columns[1]);    // zero mL of nitrogen for adaxial side angle values
        zeroADA.push(zADA);                     // push zADA (angle) values for zeroADA

        const zABA = parseFloat(columns[2]);    // zero mL of nitrogen for abaxial side angle values
        zeroABA.push(zABA + 14);                // push zABA (angle) values for zeroABA
        
        const tADA = parseFloat(columns[3]);    // two mL of nitrogen for adaxial side angle values
        twoADA.push(tADA + 14);                 // push tADA (angle) values for twoADA

        const tABA = parseFloat(columns[4]);    // two mL of nitrogen for abaxial side angle values
        twoABA.push(tABA + 14);                 // push tABA (angle) values for twoABA

        const fADA = parseFloat(columns[5]);    // four mL of nitrogen for adaxial side angle values
        fourADA.push(fADA + 14);                // push fADA (angle) values for fourADA

        const fABA = parseFloat(columns[6]);    // four mL of nitrogen for abaxial side angle values
        fourABA.push(fABA + 14);                // push fABA (angle) values for fourABA

        const eADA = parseFloat(columns[7]);    // eight mL of nitrogen for adaxial side angle values
        eightADA.push(eADA + 14);               // push eADA (angle) values for eightADA

        const eABA = parseFloat(columns[8]);    // eight mL of nitrogen for abaxial side angle values
        eightABA.push(eABA + 14);               // push eABA (angle) values for eightABA

        const sADA = parseFloat(columns[9]);    // sixteen mL of nitrogen for adaxial side angle values
        sixteenADA.push(sADA + 14);             // push sADA (angle) values for sixteenADA

        const sABA = parseFloat(columns[10]);   // sixteen mL of nitrogen for abaxial side angle values
        sixteenABA.push(sABA + 14);             // push sABA (angle) values for sixteenABA

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
                backgroundColor: 'rgba(255, 20, 147, 0.2)',
                borderColor: 'rgba(255, 20, 147, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Abaxial Leaf Side Based on 2mL of Nitrogen Fertilizer`,
                data: data.twoABA,
                fill: false,
                backgroundColor: 'rgba(225, 228, 181, 0.2)',
                borderColor: 'rgba(225, 228, 181, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Adaxial Leaf Side Based on 4mL of Nitrogen Fertilizer`,
                data: data.fourADA,
                fill: false,
                backgroundColor: 'rgba(65, 105, 225, 0.2)',
                borderColor: 'rgba(65, 105, 225, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Abaxial Leaf Side Based on 4mL of Nitrogen Fertilizer`,
                data: data.fourABA,
                fill: false,
                backgroundColor: 'rgba(0, 255, 255, 0.2)',
                borderColor: 'rgba(0, 255, 255, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Adaxial Leaf Side Based on 8mL of Nitrogen Fertilizer`,
                data: data.eightADA,
                fill: false,
                backgroundColor: 'rgba(25, 25, 112, 0.2)',
                borderColor: 'rgba(25, 25, 112, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Abaxial Leaf Side Based on 8mL of Nitrogen Fertilizer`,
                data: data.eightABA,
                fill: false,
                backgroundColor: 'rgba(148, 0, 211, 0.2)',
                borderColor: 'rgba(148, 0, 211, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Adaxial Leaf Side Based on 16mL of Nitrogen Fertilizer`,
                data: data.sixteenADA,
                fill: false,
                backgroundColor: 'rgba(105, 105, 105, 0.2)',
                borderColor: 'rgba(105, 105, 105, 1)',
                borderWidth: 1
                },
                {
                label: `Contact Angle of Abaxial Leaf Side Based on 16mL of Nitrogen Fertilizer`,
                data: data.sixteenABA,
                fill: false,
                backgroundColor: 'rgba(0, 128, 128, 0.2)',
                borderColor: 'rgba(0, 128, 128, 1)',
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
                        text: 'Trials',   // x-axis title
                        font: {         // font properties
                            size: 20
                        },
                    },
                    ticks: {
                        callback: function(val, index){
                            // Labeling of tick marks can be controlled by code and font size
                            return index % 1 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font: {
                            size: 16
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Angle Values for Each Trial (°)',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        maxTicksLimit: data.zeroADA.length,    // limit # of ticks
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {               // Display options
                title: {
                    display: true, 
                    text: 'Contact Angle of Adaxial and Abaxial Leaf  vs. Levels of Nitrogen Fertilizer (mL)',
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