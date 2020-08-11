module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    // inserir dados na tabelas de teachers
    const insertedProffy = await db.run(`
        INSERT INTO proffy (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // insetir dados na tabela classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        )
    `)
    const class_id = insertedClass.lastID

    // insetir dados na tabela class_schedule
    const insertedAllCalssSceduleValue = classScheduleValues.map((classScheduleValues) => {
          return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValues.weekday}",
                "${classScheduleValues.time_from}",
                "${classScheduleValues.time_to}"
            );
        `)
    })
       // aqui vou executar todos os db.runs( das class scedules)
    await Promise.all(insertedAllCalssSceduleValue)
}