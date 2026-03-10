# Crear y asignar permisos a un usuario

## Crear usuario con contraseña

En PostgreSQL los usuarios realmente son roles con LOGIN.
```sql
CREATE ROLE user_test 
WITH LOGIN 
PASSWORD '4862';
```

Limitar permisos 

```sql
CREATE ROLE user_test 
WITH LOGIN 
PASSWORD 'password_seguro'
NOSUPERUSER
NOCREATEDB
NOCREATEROLE;
```

GRANT CONNECT ON DATABASE task_db TO user_test;
GRANT USAGE ON SCHEMA public TO user_test;
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO user_test;
GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO user_test;