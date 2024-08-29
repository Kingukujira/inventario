from django.contrib import admin
from .models import Usuario, Comentario, Departamento, Municipio, SitioTuristico, TipoServicio, Servicio

# Register your models here.

admin.site.register(Usuario)
admin.site.register(Comentario)
admin.site.register(Departamento)
admin.site.register(Municipio)
admin.site.register(SitioTuristico)
admin.site.register(TipoServicio)
admin.site.register(Servicio)