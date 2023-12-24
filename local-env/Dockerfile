# Use an official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=database

# Install Node.js and Yarn

# Clean up

# Expose the PostgreSQL port
EXPOSE 5432

# Copy any initialization scripts or additional configuration files
# COPY init.sql /docker-entrypoint-initdb.d/

# Entrypoint command to start PostgreSQL
CMD ["postgres"]
