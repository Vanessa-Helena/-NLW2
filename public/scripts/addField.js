// Procurar o botão 
document.querySelector("#add-time")
// Quando clicar no botão
.addEventListener('click', cloneField)

// Executar uma ação
function cloneField() {
    //Duplicar os campos. Que Campos?
    const newfieldscontainer = document.querySelector('.schedule-item').cloneNode(true)// boolean true ou false

    // pegar os campos: Que campos?
    const fields = newfieldscontainer.querySelectorAll('input')

    // paracada campo limpar
    fields.forEach(function(field) {
        // pegar o field do momento e limpa ele
        field.value = ""
    })

    //colocar na pagina: Onde?
    document.querySelector('#schedule-items').appendChild(newfieldscontainer)
}
