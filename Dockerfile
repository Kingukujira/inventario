FROM python:3.9

WORKDIR /backend

COPY . .

COPY docker.env .env

# Instala dependencias
RUN pip install -r requirements.txt

# Expongo el puerto 8000
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]