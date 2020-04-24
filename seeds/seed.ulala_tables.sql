BEGIN;

TRUNCATE
  ulala_guide_users
  RESTART IDENTITY CASCADE;

INSERT INTO ulala_guide_users (user_name, password, classes)
VALUES
  ('demoUser', 'demoPassw0rd', 'Assassin, Druid, Warlock, Warrior');

COMMIT;