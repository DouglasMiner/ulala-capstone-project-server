const BuildService ={
  getUserBuilds(knex, user_name) {
    return knex.select('classes', 'user_name').from('ulala_guide_users').where('user_name', user_name).first();
  },
  updateClasses(knex, user_name, build) {
    return knex('ulala_guide_users')
      .where({user_name})
      .update(build);
  },
};

module.exports = BuildService;