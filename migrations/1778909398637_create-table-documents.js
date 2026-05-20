exports.up = (pgm) => {
  pgm.createTable('documents', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    original_name: {
      type: 'TEXT',
      notNull: true,
    },
    filename: {
      type: 'TEXT',
      notNull: true,
    },
    mimetype: {
      type: 'TEXT',
      notNull: true,
    },
    size: {
      type: 'INTEGER',
      notNull: true,
    },
    path: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('documents');
};