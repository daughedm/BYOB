exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('companies', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.number('totalQuestions')

      table.timestamps(true, true);
    }),

    knex.schema.createTable('questions', function (table) {
      table.increments('id').primary();
      table.string('question');
      table.string('position');
      table.string('date');
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('questions'),
    knex.schema.dropTable('companies')
  ]);
};