sleep 2
echo Run db upgrade
poetry run flask db upgrade
poetry run flask add-events-groups
# echo Run app
# flask run -h 0.0.0.0
echo Run app server
poetry run gunicorn --timeout 60 -w 4 -b 0.0.0.0 'wsgi:app'
