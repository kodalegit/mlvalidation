document.addEventListener('DOMContentLoaded', function(){

    let savePrediction = document.querySelector('#saveprediction');
    let saveForm = document.querySelector('#save_form');
    let prediction = document.querySelector('#predicted');
    const dashBoard = document.querySelector('#dashboard');

    savePrediction.addEventListener('click', function(){
        const result = prediction.textContent;
        saveForm.style.display = 'block';
        const currentDate = new Date().toISOString().split('T')[0];
        let timeField = document.querySelector('#timeField');
        timeField.value = currentDate;

        // Update database with predicted value
        fetch('save_prediction',{
            method: 'POST',
            body: JSON.stringify({
                strength: result
            })
        }).then(() => {
            // Display updated database entries
            fetch('save_prediction')
            .then(res => res.json())
            .then(sample => {
                const entry = document.createElement('p');
                entry.innerHTML = `${sample.description} has strength ${sample.prediction}`;
                dashBoard.appendChild(entry);
            }).catch(err => {
                console.error(err);
            })
        }).catch(err => {
            console.error(err);
        })
    })






})
