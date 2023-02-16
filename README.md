## Generate typescript types from pocketsbase

- SSH into server
- Get into root `sudo su`
- Note the location of docker volume with `docker volume inspect server_book` (or do docker volume list first)
- copy the files to a non-root location (cp *.db ~/data/book/)
- copy to your machine with `scp <user>@<ip>:/home/<name>/data/book/data.db`
- run `pnpm dlx pocketbase-typegen --db .\data.db --out src/book-types.ts`