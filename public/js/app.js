const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent ='Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location ).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           // console.log()
            messageOne.textContent = data.error
        }
       // console.log(data)
       messageOne.textContent = data[0].location 
       messageTwo.textContent = data[0].forcast
    })
})   
})