exports.up = (pgm) => {
  pgm.createTable('companies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    description: {
      type: 'TEXT',
    },
    website: {
      type: 'TEXT',
    },
    location: {
      type: 'TEXT',
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('companies');
};