

document.querySelector('#logout').addEventListener('click', () => {

    axios({
        url:'/api/games',
        methods:"GET"
    }).then(res=>{
        console.log(res)
    })
    
});