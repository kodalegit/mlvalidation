document.addEventListener('DOMContentLoaded', function(){

    const savePrediction = document.querySelector('#saveprediction');
    const saveForm = document.querySelector('#save_form');
    const prediction = document.querySelector('#predicted');
    const strengthField = document.querySelector('#strengthField');
    const dashBoard = document.querySelector('#dashboard');

    savePrediction.addEventListener('click', function(){
        const result = prediction.textContent;
        saveForm.style.display = 'block';
        const currentDate = new Date().toISOString().split('T')[0];
        let timeField = document.querySelector('#timeField');
        timeField.value = currentDate;
        strengthField.value = result;
        console.log(result)

    });

    saveForm.onsubmit = (event) => {
        event.preventDefault();
        // Update database with predicted value
        fetch('save',{
            method: 'POST',
            body: JSON.stringify({
                strength: result
            })
        }).then(() => {
            // Display updated database entries
            fetch('save')
            .then(res => res.json())
            .then(sample => {
                console.log(sample)
                sample.samples.forEach(item => {
                    const entry = document.createElement('p');
                    entry.innerHTML = `${item.description} has strength ${item.prediction}`;
                    dashBoard.appendChild(entry);
                });
                
            }).catch(err => {
                console.error(err);
            })
        }).catch(err => {
            console.error(err);
        })
    }






})
