from django.db import models

# Create your models here.


class Departamento(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre


class Municipio(models.Model):
    nombre = models.CharField(max_length=100)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class SitioTuristico(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)
    coordenadas = models.CharField(max_length=255, blank=True, null=True)  # or use a more specific type
    tipo = models.CharField(max_length=50, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


class TipoServicio(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre


class Servicio(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    tipo_servicio = models.ForeignKey(TipoServicio, on_delete=models.CASCADE)
    costo = models.DecimalField(max_digits=10, decimal_places=2)
    sitio_turistico = models.ForeignKey(SitioTuristico, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo_electronico = models.EmailField(max_length=100, unique=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Comentario(models.Model):
    sitio_turistico = models.ForeignKey(SitioTuristico, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    comentario = models.TextField()
    rating = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comentario