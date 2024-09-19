# Beam Suntory

1. Run

```bash
poetry install
```

2. Create '.env' file (simply copy file .env.sample):

3. Run

```bash
docker compose up d db
```

to create an docker container

4. Create db with command

```bash
flask db upgrade
```

5. In main folder need install node_modules to work with tailwind, run

```bash
yarn
```

6. Create admin and user roles

```bash
flask create-admin
```

7. Init event group

```bash
flask init-data
```

8. If you want to add some groups and products you can use this comand (optional)

```bash
flask fill-db
```

## Project explanation

Warehouse product management system with which you can add entities such as users with roles, warehouses, products, groups, product groups, create orders, stores with addresses for pickup, also view all inventory, track all reports and manage orders.

[Project schema](https://excalidraw.com/#json=x4aiNjD7zsBfrVbgaXBdj,hXDqib0-12cyrMm65Ya-vg)
