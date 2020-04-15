const Sequelize = require("sequelize");

const db = new Sequelize( {
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'
})

const Tasks = db.define('tasks', {

    //id of todo
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    //Title of todo : compulsory field
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    //Description of todo : optional field
    description: {
        type: Sequelize.STRING(1234),
        allowNull: true
    },

    //due date - compulsory field handled at front end
    due: {
        type: Sequelize.DATE
    },

    /*status of todo : Completed/Incompleted
    New todo - incompleted state
    CompletedTodo - True,
    IncompletedTodo - False */
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    /*Priority of todo
    Can be HIGH, MEDIUM, LOW
    defaults to MEDIUM */
    priority: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Medium'
    }
})

const Notes = db.define('notes', {

    //id of note
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    //acutal note content
    note: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//One-to-Many Relationship : 1:M
Tasks.hasMany(Notes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Notes.belongsTo(Tasks)

module.exports = {
    db, Tasks, Notes
}



//this function populates sample data, so when project is deployed, it already has some data
async function populateData() {

    await db.sync({ force: true })
    await Tasks.bulkCreate([
      {
         id:1,title:"Work on Task and Notes Manager",description:"Node js Assignment",
         due:"2020-04-16",priority:"High",
  },
      { 
        id:2,title:"Attend Session",description:"Angular Session",
      due:'2020-04-14',status:1,priority:"Medium",
    }
    ])

    await Notes.bulkCreate([
        {id:1,note:"Do it anyhow. VVV Imp",taskId:1},
        {id:2,note:"Learn Typescript",taskId:2},
        {id:3,note:"Revise previous class as well",taskId:2}
    ])
  }
  
populateData()



db.sync()
  .then(()=>console.log("Database has been synced."))
  .catch((err)=>console.error("Error creating the database!!"))