- Switch default database to sqlite3, allows easier bootstrapping on local
  machines and now.sh.
- Prefer now.sh as the main deployment target. Provide an example .ebextensions
  scripts for AWS EB, but that should remain an example.
  - Chase up region affinity on now.sh
