# multi-tenant-one-db
Test project to evalute how to create a multi tenant app with one database, how to scale and mantain

## Project Overview

This project aims to assess the feasibility of a multi-tenant web application utilizing a single database for all tenants. The primary objectives include:

- **Shared Tables**: Evaluate how all tenants can share the same tables within the database.
- **Performance Optimization**: Minimize performance loss while ensuring efficient data handling.
- **Maintenance and Backups**: Simplify maintenance processes and backup procedures for the database.
- **Scalability**: Develop strategies to scale the application to accommodate an increasing number of tenants effectively. Here are 8 must-know strategies to scale your system (<https://www.youtube.com/watch?v=EWS_CIxttVw>):
  - **Stateless Services**: Design stateless services because they don’t rely on server-specific data and are easier to scale.
  - **Horizontal Scaling**: Add more servers so that the workload can be shared.
  - **Load Balancing**: Use a load balancer to distribute incoming requests evenly across multiple servers.
  - **Auto Scaling**: Implement auto-scaling policies to adjust resources based on real-time traffic.
  - **Caching**: Use caching to reduce the load on the database and handle repetitive requests at scale.
  - **Database Replication**: Replicate data across multiple nodes to scale the read operations while improving redundancy.
  - **Database Sharding**: Distribute data across multiple instances to scale the writes as well as reads.
  -  **Async Processing**: Move time-consuming and resource-intensive tasks to background workers using async processing to scale out new requests. 

The project will also compare how easy it is to implement these requirements using MySQL and PostgreSQL databases. It will consider techniques such as Row-Level Security (RLS) and Sharding to enhance the multi-tenant architecture.

Through this project, we seek to identify the advantages and challenges associated with implementing a single database architecture in a multi-tenant environment, ultimately striving for a solution that balances performance, ease of maintenance, and scalability.

Some useful links to begin:

- https://blog.logto.io/implement-multi-tenancy/
- https://satoricyber.com/mysql-security/mysql-row-level-security/
- https://www.crunchydata.com/blog/designing-your-postgres-database-for-multi-tenancy
