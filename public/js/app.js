const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message_1');
const messageTwo = document.querySelector('#message_2');

messageOne.textContent='';
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent='LOADING!!!';
    messageTwo.textContent='';
    fetch(`/weather?address=${location}`).then(res => {
    res.json().then((data) => {
        if(data.error) {
            messageOne.textContent=data.error;
        }
        else {
            messageTwo.textContent=data.forecast;
            messageOne.textContent=data.location;
        }
    })
});
    console.log(location)
})