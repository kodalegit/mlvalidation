function submitForm(event){
    event.preventDefault();

    let res = document.getElementById('displayStrength');
    if (res) {
        res.remove();
    }

    const form = document.querySelector('#predict_form');
    const result = document.createElement('p');
    result.setAttribute('id', 'displayStrength')

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
        },
    })
    .then((response) => response.json())
    .then((data) => {
        result.innerHTML = `<strong>Predicted Compressive Strength: <strong/>${data.prediction} MPa`;
        result.setAttribute('data-strength', `${data.prediction}`)
        document.getElementById('results_form').appendChild(result);
    })
    .catch(err => {
        console.error(err);
    });
}
