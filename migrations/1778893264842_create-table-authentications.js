exports.up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'TEXT',
      primaryKey: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('authentications');
};