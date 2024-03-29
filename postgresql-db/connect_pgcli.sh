source "$(pwd)/postgresql-db/props.sh"

pgcli -U root -h localhost -p 5433 -d "$DB_NAME"
