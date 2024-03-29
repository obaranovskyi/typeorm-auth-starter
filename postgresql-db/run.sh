source "$(pwd)/postgresql-db/props.sh"

docker run \
  -p 5433:5432 \
  -d \
	--name db-container \
	-e POSTGRES_PASSWORD="root" \
	-e POSTGRES_USER="root" \
  -e POSTGRES_DB="$DB_NAME" \
	-v "$(pwd)/pg":/var/lib/postgresql/data \
	postgres
