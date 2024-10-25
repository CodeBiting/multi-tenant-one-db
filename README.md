# multi-tenant-one-db
Test project to evalute how to create a multi tenant app with one database, how to scale and mantain

## Project Overview

This project aims to assess the feasibility of a multi-tenant web application utilizing a single database for all tenants. The primary objectives include:

- Shared Tables: Evaluate how all tenants can share the same tables within the database.
- Performance Optimization: Minimize performance loss while ensuring efficient data handling.
- Maintenance and Backups: Simplify maintenance processes and backup procedures for the database.
- Scalability: Develop strategies to scale the application to accommodate an increasing number of tenants effectively.

The project will also compare how easy it is to implement these requirements using MySQL and PostgreSQL databases. It will consider techniques such as Row-Level Security (RLS) and Sharding to enhance the multi-tenant architecture.

Through this project, we seek to identify the advantages and challenges associated with implementing a single database architecture in a multi-tenant environment, ultimately striving for a solution that balances performance, ease of maintenance, and scalability.

Some useful links to begin:

- https://blog.logto.io/implement-multi-tenancy/
- RLS (Row-Level Security) allows us to execute queries without worrying about the existence of tenant_id
- https://www.crunchydata.com/blog/designing-your-postgres-database-for-multi-tenancy
