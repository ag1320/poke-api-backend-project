
exports.up = function(knex) {
    return knex.schema.createTable('moves', table => {
        table.increments('id'); //adds an auto icrementing primary key
        table.string('move').notNullable();
        table.timestamps(true, true); //adds created_at and updated_at
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pokemon');  
};