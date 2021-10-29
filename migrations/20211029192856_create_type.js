
exports.up = function(knex) {
    return knex.schema.createTable('type', table => {
        table.increments('id'); //adds an auto icrementing primary key
        table.string('type').notNullable();
        table.timestamps(true, true); //adds created_at and updated_at
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pokemon');  
};
