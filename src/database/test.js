const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // Inserir dados

    proffyValue = {
        name: 'Diego Fernandes', 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: 1234, 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br></br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    }
    
    classValue = {
        subject: 1, 
        cost: "20", 
        // o proff id virá pelo banco de dados
    }

    classScheduleValues = [
        // cless_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1, 
            time_form: 720, 
            time_to: 1220
        },
        {
            weekday: 1, 
            time_form: 520, 
            time_to: 1220
        }
    ]
    
    await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})
    // Consultar os dados inseridos
    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffy")
    //console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectedClasseAndProffys = await db.all(`
        SELECT classes.*, proffy.*
        FROM proffy
        JOIN classes ON (classes.proffy_id = proffy.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectedClasseAndProffys)

    // o horário que a pessoa trabalah, por exelmplo, é das 8h - 118h
    // o horário do time_from (18h) precisa ser antes menor ou igual ao horário solicitado
    // o time_to precisa see acima
    const selectedClassesScedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    //console.log(selectedClassesScedules)
})