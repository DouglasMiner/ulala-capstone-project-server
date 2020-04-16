BEGIN;

TRUNCATE
  ulala_guide_users_builds,
  ulala_guide_users,
  ulala_guide_builds
  RESTART IDENTITY CASCADE;

INSERT INTO ulala_guide_users (user_name, password)
VALUES
  ('demoUser', 'demoPassw0rd');

INSERT INTO ulala_guide_builds (class, clatters, skills, tempers, whishes, attributes)
VALUES
  ('Assassin', 'assassinClatters', 'assassinSkills', 'assassinTempers', 'assassinWishes', 'assassinAttributes'),
  ('Druid', 'druidClatters', 'druidSkills', 'druidTempers', 'druidWishes', 'druidAttributes'),
  ('Gladiator', 'gladClatters', 'gladSkills', 'gladTempers', 'gladWishes', 'gladAttributes'),
  ('Hunter', 'hunterClatters', 'hunterSkills', 'hunterTempers', 'hunterWishes', 'hunterAttributes'),
  ('Mage', 'mageClatters', 'mageSkills', 'mageTempers', 'mageWishes', 'mageAttributes'),
  ('Shaman', 'shamanClatters', 'shamanSkills', 'shamanTempers', 'shamanWishes', 'shamanAttributes'),
  ('Warlock', 'warlockClatters', 'warlockSkills', 'warlockTempers', 'warlockWishes', 'warlockAttributes'),
  ('Warrior', 'warriorClatters', 'warriorSkills', 'warriorTempers', 'warriorWishes', 'warriorAttributes');

INSERT INTO ulala_guide_users_builds (user_id, build_id)
VALUES
  (1, 1),
  (1, 8),
  (1, 7),
  (1, 6);

COMMIT;